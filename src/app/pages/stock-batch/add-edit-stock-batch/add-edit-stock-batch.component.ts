import { Component, OnInit } from "@angular/core";
import { StockBatch, StockBatchData } from "app/@theme/model/stock-batch";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
} from "@nebular/theme";

import * as errorData from "app/@theme/json/error.json";
import { PartyService } from "app/@theme/services/party.service";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "app/@theme/services/common.service";
import { StockBatchService } from "app/@theme/services/stock-batch.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-add-edit-stock-batch",
  templateUrl: "./add-edit-stock-batch.component.html",
  styleUrls: ["./add-edit-stock-batch.component.scss"],
})
export class AddEditStockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status;

  formSubmitted = false;
  selectedFabricId = null;

  party: any[];
  user: any;
  index;
  stockList;

  newObj = {
    stockInType: "Fabric",
    partyId: null,
    billNo: null,
    billDate: null,
    chlNo: null,
    chlDate: null,
    lotNo: null,
    remark: null,
    userId: null,
    userHeadId: null,
    batch: [{
      batchId: null,
      batchMW: [
        {
          mtr: null,
          wt: null
        }
      ],
    }]
  };

  stockDataValues = [
    {
      batchId: null,
      batchMW: [
        {
          mtr: null,
          wt: null
        }
      ],
    }
  ]

  stockBatchArray: StockBatchData[] = [];
  stockBatch: StockBatch = new StockBatch();
  //stockBatchData: StockBatchData = new StockBatchData();

  blockNumber;

  constructor(
    private partyService: PartyService,
    private toastr: ToastrService,
    private route: Router,
    private commonService: CommonService,
    private stockBatchService: StockBatchService
  ) {
    // this.stockBatchArray.push(this.stockDataValues);
    // this.stockBatch.stockBatchData = this.stockBatchArray;
  }

  ngOnInit(): void {
    this.getPartyList();
  }

  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
        } else {
          this.toastr.error(data['msg']);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  onKeyUp(e, rowIndex, colIndex, colName, idx) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      //toaster
      this.status = "danger";
      const config = {
        status: this.status,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates,
      };
      this.index = "stockList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.stockDataValues[idx].batchMW.length - 1) {
        let item = this.stockDataValues[idx].batchMW[rowIndex];
        if (colName == "meter") {
          if (!item.mtr) {
            this.toastr.error("Enter Meter", "Meter Field required");
            return;
          }
        } else if (colName == "weight") {
          if (!item.wt) {
            this.toastr.error("Enter Weight", "Weight Field required");
            return;
          }
        }

        let obj = {
          mtr: null,
          wt: null,
        };
        let list = this.stockDataValues[idx].batchMW;
        list.push({ ...obj });
        this.stockDataValues[idx].batchMW = [...list];
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 500);
      } else {
        alert("Go to any last row input to add new row");
      }
    }
  }

  removeCard($event, index) {
    let idCount = this.stockDataValues.length;
    let item = this.stockDataValues;
    if (idCount == 1) {
      item = null;
      let obj = {
        batchId: null,
        batchMW: [{
          mtr: null,
          wt: null
        }]
      }
      this.stockDataValues = [obj];
    } else {
      let removed = item.splice(index, 1);
      let list = item;
      this.stockDataValues = [...list];
    }
  }

  removeItem(id, row) {
    let idCount = this.stockDataValues[row].batchMW.length;
    let item = this.stockDataValues[row].batchMW
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
    console.log(myForm);
    this.formSubmitted = true;
    if (myForm.valid) {
      this.newObj.billDate = this.stockBatch.billDate;
      this.newObj.billNo = this.stockBatch.billNo;
      this.newObj.chlDate = this.stockBatch.chlDate;
      this.newObj.chlNo = this.stockBatch.chlNo;
      this.newObj.lotNo = this.stockBatch.lotNo;
      this.newObj.partyId = this.stockBatch.partyId;
      this.newObj.remark = this.stockBatch.remark;
      this.newObj.stockInType = this.stockBatch.stockInType;
      this.newObj.userHeadId = this.stockBatch.userHeadId;
      this.newObj.userId = this.stockBatch.userId;
      this.newObj.batch = this.stockDataValues;
      console.log(this.newObj);
      this.stockBatchService.addStockBatch(this.newObj).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Add_Success);
          } else {
            this.toastr.error(data['msg']);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
  }

  updateStockBatch(stockBatch) {
    this.formSubmitted = true;
    if (stockBatch.valid) {
      this.stockBatchService.updateStockBatch(this.stockBatch).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/stock-batch"]);
            this.toastr.success(errorData.Update_Success);
          }
        },
        (error) => {
          this.toastr.error(errorData.Update_Error);
        }
      );
    }
  }

  addNew(e, myForm) {
    //event.preventDefault();
    let item = this.stockDataValues;
    var ob = {
      batchId: null,
      batchMW: [
        {
          mtr: null,
          wt: null
        }
      ],
    };
    console.log("called");
    item.push({ ...ob });
    this.stockDataValues = item;
    //document.getElementById("new").style.visibility = "visible";
    const className = "collapsible-panel--expanded";
    if (e.target.classList.contains(className)) {
      e.target.classList.remove(className);
    } else {
      e.target.classList.add(className);
    }

    console.log(`Form:`, myForm);
    console.log(this.stockDataValues);
  }
}
