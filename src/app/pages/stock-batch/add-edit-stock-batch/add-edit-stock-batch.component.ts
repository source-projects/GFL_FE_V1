import { Component, OnInit, Renderer2 } from "@angular/core";
import { StockBatch, BatchData} from "app/@theme/model/stock-batch";

import * as errorData from "app/@theme/json/error.json";
import { PartyService } from "app/@theme/services/party.service";
import { ToastrService } from "ngx-toastr";
import { StockBatchService } from "app/@theme/services/stock-batch.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QualityService } from "app/@theme/services/quality.service";
import * as _ from 'lodash';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from "@ng-bootstrap/ng-bootstrap";
import { CommonService } from "app/@theme/services/common.service";

@Component({
  selector: "ngx-add-edit-stock-batch",
  templateUrl: "./add-edit-stock-batch.component.html",
  styleUrls: ["./add-edit-stock-batch.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AddEditStockBatchComponent implements OnInit {
  public loading = false;
  public errorData: any = (errorData as any).default;
  qualityList: any;
  formSubmitted = false;

  party: any[];
  user: any;
  userHead;
  index;
  stockList;
  wtPer100M;
  deleteFlag = 0;
  validationCardRowIndex = 0;
  ValidationTableRowIndex = 0;
  batch = {
    batchId: 0,
    mtr: 0,
    wt: 0,
  };

  dummy= {
    batchId: 0,
    batchMW: null,
  };

  stockDataValues= [
    {
      batchId: null,
      batchMW: [
        {
          mtr: null,

          wt: null,
        },
      ],
    },
  ];

  public totalMtr:number = 0;
  public totalWt:number = 0;
  stockBatchArray: BatchData[] = [];
  stockBatch: StockBatch = new StockBatch();
  stockBatchData: BatchData = new BatchData();
  blockNumber;
  currentStockBatch;
  isQualitySelected: Boolean = false;
  flag = 1;
  addFlag = false;
  batchIdArray = [];
  rearrangeStartIndex: any;

  constructor(
    private partyService: PartyService,
    private toastr: ToastrService,
    private route: Router,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService,
    private _route: ActivatedRoute,
    private commonService: CommonService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.addFlag = window.location.href.endsWith("add");
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.getPartyList();
    this.getQualityList();
    this.currentStockBatch = this._route.snapshot.paramMap.get("id");
    if (this.currentStockBatch != null || this.currentStockBatch != undefined)
      this.getUpdateData();
  }

  getUnit(event) {
    if (event != undefined) {
      if (this.stockBatch.qualityId == null) {
        this.flag = 1;
        this.toastr.error("Please select quality first");
      } else {
        this.flag = 0;
        this.qualityList.forEach((element) => {
          element.id ? (this.stockBatch.partyId = element.partyId) : null;
          let id = element.id? element.id: element.qualityEntryId
          if (id == this.stockBatch.qualityId ){
            this.stockBatch.unit = element.unit;
            this.wtPer100M = element.wtPer100m;
          } 
        });

        //re-calculate mtr/wt when quality changed
        this.stockDataValues.forEach((e) => {
          e.batchMW.forEach((e1) => {
            if (this.stockBatch.unit == "mtr") {
              e1.wt = (e1.mtr / 100) * this.wtPer100M;
            } else e1.mtr = (e1.wt * 100) / this.wtPer100M;
          });
        });
      }
    } else {
      this.stockBatch.partyId = null;
      this.stockBatch.unit = null;
      this.getQualityList();
    }
  }

  setQualityByParty(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.stockBatch.partyId) {
        this.qualityList = null;
        this.qualityService
          .getQualityByParty(this.stockBatch.partyId)
          .subscribe(
            (data) => {
              if (data["success"])
                this.qualityList = data["data"].qualityDataList;
                if(this.qualityList == null)
                  this.stockBatch.qualityId = null;
                else
                  this.stockBatch.qualityId = this.qualityList[0].qualityEntryId
              //this.loading = false;
            },
            (error) => {
              // this.toastr.error(errorData.Serever_Error);
              this.loading = false;
            }
          );
          this.loading = false;
      }
    } else {
      this.stockBatch.partyId = null;
      this.stockBatch.qualityId = null;
      this.stockBatch.unit = null;
      this.getPartyList();
      this.getQualityList();
    }
    this.loading = false;
  }

  getUpdateData() {
    this.loading = true;
    this.stockBatchService.getStockBatchById(this.currentStockBatch).subscribe(
      (data) => {
        if (data["success"]) {
          this.stockBatch.billDate = new Date(data["data"].billDate);
          this.stockBatch.qualityId = data["data"].qualityId;
          if (this.qualityList != undefined) {
            this.qualityList.forEach((element) => {
              if (element.id == this.stockBatch.qualityId) {
                this.wtPer100M = element.wtPer100m;
              }
            });
          }
          this.stockBatch = data['data']
          this.stockBatch.chlDate = new Date(this.stockBatch.chlDate);
          this.stockBatch.billDate = new Date(this.stockBatch.billDate);
          this.stockBatch.batchData = _.sortBy(data["data"].batchData, [function(o) { return o.batchId; }]);
          this.setStockDataValues();
        } else {
          this.toastr.error(data["msg"]);
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  setStockDataValues() {
    var prev = this.stockBatch.batchData[0].batchId;
    let k = 0;
    let i = 0;
    this.stockDataValues[0].batchId = prev;
    this.stockBatch.batchData.forEach((element) => {
      if (prev == element.batchId) {
        if (!this.stockDataValues[k])
          this.stockDataValues.push({ batchId: 0, batchMW: [] });
        if (!this.stockDataValues[k].batchMW[i])
          this.stockDataValues[k].batchMW.push({ mtr: 0, wt: 0 });
        this.stockDataValues[k].batchMW[i].mtr = element.mtr;
        this.stockDataValues[k].batchMW[i].wt = element.wt;
        i++;
      } else {
        i = 0;
        ++k;
        prev = element.batchId;
        if (!this.stockDataValues[k])
          this.stockDataValues.push({ batchId: 0, batchMW: [] });
        this.stockDataValues[k].batchId = prev;
        this.stockDataValues[k].batchMW.push({ mtr: 0, wt: 0 });
        this.stockDataValues[k].batchMW[i].mtr = element.mtr;
        this.stockDataValues[k].batchMW[i].wt = element.wt;
        i++;
      }
    });
    this.validationCardRowIndex = this.stockDataValues.length -1
    this.ValidationTableRowIndex = this.stockDataValues[this.validationCardRowIndex].batchMW.length -1
    this.flag = 0;
  }

  getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"] && data["data"].length > 0) {
            this.qualityList = data["data"];
          } else {
            this.toastr.error(errorData.Not_added);
          }
        } else {
          this.toastr.error(errorData.Internal_Error);
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }
  checkDuplicates() {
    for (let x = 0; x < this.validationCardRowIndex + 1; x++) {
      if (
        this.stockDataValues[this.validationCardRowIndex].batchId ==
          this.stockDataValues[x].batchId &&
        x != this.validationCardRowIndex
      ) {
        this.toastr.error("Cannot add duplicate batch No.");
        this.stockDataValues[this.validationCardRowIndex].batchId = null;
        break;
      }
    }
  }
  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
        } else {
          this.toastr.error(data["msg"]);
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }
  batchInsertCheck() {
    if (this.stockBatch.qualityId == null) {
      this.flag = 1;
      this.toastr.error("Please select quality first");
    } else {
      this.flag = 0;
    }
  }

  onKeyUp(e, rowIndex, colIndex, colName, idx) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "grData" + (rowIndex + 1) + "-" + colIndex + "" + idx;
      if (rowIndex === this.stockDataValues[idx].batchMW.length - 1) {
        let item = this.stockDataValues[idx].batchMW[rowIndex];
        if (colName == "mtr") {
          if (!item.mtr) {
            this.toastr.error("Enter Meter", "Meter Field required");
            return;
          }
        } else if (colName == "wt") {
          if (!item.wt) {
            this.toastr.error("Enter Weight", "Weight Field required");
            return;
          }
        }
        //let obj:BatchMrtWt  = new BatchMrtWt();
        let obj = {mtr:null,wt:null}
        let list = this.stockDataValues[idx].batchMW
        list.push({...obj});
        this.stockDataValues[idx].batchMW = [...list]
        this.ValidationTableRowIndex++;
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      }
    }else{
      //count total mtr wt...
    }
  }

  removeCard($event, index) {
    let idCount = this.stockDataValues.length;
    let item = this.stockDataValues;
    if (idCount == 1) {
      // let obj:BatchCard = new BatchCard();
      // let mtrWt = new BatchMrtWt();
      // obj.batchMW.push(mtrWt);
      let obj = {
        batchId: null,
        batchMW: [
          {
            mtr: null,
            wt: null,
          },
        ],
      };
      this.stockDataValues = [{...obj}];
    } else {
      item.splice(index, 1);
      this.stockDataValues = [...item];
      this.validationCardRowIndex--;
    }
  }

  removeItem(id, row) {
    let idCount = this.stockDataValues[row].batchMW.length;
    let item = this.stockDataValues[row].batchMW;
    if (idCount == 1) {
      item[0].mtr = null;
      item[0].wt = null;
      let list = item;
      this.stockDataValues[row].batchMW = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.stockDataValues[row].batchMW = [...list];
    }
  }

  addStockBatch(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      this.stockBatch.createdBy = this.user.userId;
      this.stockBatch.userHeadId = this.userHead.userHeadId;
      let k = 0;
      for (let i = 0; i < this.stockDataValues.length; i++) {
        for (let j = 0; j < this.stockDataValues[i].batchMW.length; j++) {
          this.stockBatchArray.push({ batchId: 0, mtr: 0, wt: 0 });
          this.stockBatchArray[k].batchId = this.stockDataValues[i].batchId;
          this.stockBatchArray[k].mtr = this.stockDataValues[i].batchMW[j].mtr;
          this.stockBatchArray[k].wt = this.stockDataValues[i].batchMW[j].wt;
          k++;
        }
      }
      this.stockBatch.batchData = this.stockBatchArray;
      this.stockBatchService.addStockBatch(this.stockBatch).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Add_Success);
          } else {
            this.stockBatchArray = [];
            // this.toastr.error(data['msg']);

          }
        },
        (error) => {
          this.stockBatchArray = [];
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
    else
    {
      const errorField = this.renderer.selectRootElement('#target');
          errorField.scrollIntoView();
    }
  }

  updateStockBatch(stockBatch) {
    this.loading = true;
    this.formSubmitted = true;
    if (stockBatch.valid) {
      this.stockBatch.updatedBy = this.user.userId;
      let k = 0;
      for (let i = 0; i < this.stockDataValues.length; i++) {
        for (let j = 0; j < this.stockDataValues[i].batchMW.length; j++) {
          this.stockBatchArray.push({ batchId: 0, mtr: 0, wt: 0 });
          this.stockBatchArray[k].batchId = this.stockDataValues[i].batchId;
          this.stockBatchArray[k].mtr = this.stockDataValues[i].batchMW[j].mtr;
          this.stockBatchArray[k].wt = this.stockDataValues[i].batchMW[j].wt;
          k++;
        }
        
      }
      this.stockBatch.batchData = this.stockBatchArray;
      this.stockBatch.id = parseInt(this.currentStockBatch);
      this.stockBatchService.updateStockBatch(this.stockBatch).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Update_Success);
          } else {
            this.stockBatchArray = [];
            this.toastr.error(data["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.stockBatchArray = [];
          this.toastr.error(errorData.Update_Error);
          this.loading = false;
        }
      );
      this.loading = false; 
    }
    
    else
    {
      const errorField = this.renderer.selectRootElement('#target');
      errorField.scrollIntoView();
    }
  }

  addNew(e, myForm) {
    //event.preventDefault();

    //let item = ;
    // let ob:BatchCard = new BatchCard();
    // let mtrWt = new BatchMrtWt();
    // ob.batchMW.push(mtrWt);
    var ob = {
      batchId: null,
      batchMW: [
        {
          mtr: null,
          wt: null,
        },
      ],
    };
    let length = this.stockDataValues[this.validationCardRowIndex].batchMW.length - 1;
    if (
      this.flag == 1 ||
      this.stockDataValues[this.validationCardRowIndex].batchId == null ||
      this.stockDataValues[this.validationCardRowIndex].batchMW[length].mtr == null
    ) {
      this.toastr.error("Please fill all the required fields");
    } else {
      let autoId = this.stockDataValues[this.validationCardRowIndex].batchId;
      ob.batchId = ++autoId;
      this.stockDataValues.push({ ...ob });
      const className = "collapsible-panel--expanded";
      if (e.target.classList.contains(className)) {
        e.target.classList.remove(className);
      } else {
        e.target.classList.add(className);
      }
      this.validationCardRowIndex++;
      this.ValidationTableRowIndex = 0;
    }
  }
  rearrangeBatchNo() {
    for (let x = 0; x < this.validationCardRowIndex + 1; x++) {
      this.batchIdArray[x] = this.stockDataValues[x].batchId;
    }
    this.rearrangeStartIndex = Math.min.apply(null, this.batchIdArray);
    this.stockDataValues[0].batchId = this.rearrangeStartIndex;
    for (let x = 1; x < this.validationCardRowIndex + 1; x++) {
      this.stockDataValues[x].batchId = ++this.rearrangeStartIndex;
    }
  }
  calculateWt(meter, i, j, col) {
    let w;
    w = (meter / 100) * this.wtPer100M;
    this.stockDataValues[i].batchMW[j].wt = w.toFixed(2);
  }
  calculateMtr(weight, i, j, col) {
    let m;
    m = (weight * 100) / this.wtPer100M;
    this.stockDataValues[i].batchMW[j].mtr = m.toFixed(2);
  }
}
