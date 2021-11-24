import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as errorData from "../../../@theme/json/error.json";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  StockBatch,
  BatchCard,
  BatchMrtWt,
  BatchData,
} from "../../..//@theme/model/stock-batch";
import { PartyService } from "../../..//@theme/services/party.service";
import { QualityService } from "../../..//@theme/services/quality.service";
import { StockBatchService } from "../../..//@theme/services/stock-batch.service";
import { CommonService } from "../../..//@theme/services/common.service";
import { UpdateConfirmationDialogComponent } from "../../../@theme/components/update-confirmation-dialog/update-confirmation-dialog.component";
import { JobCardComponent } from "../job-card/job-card.component";
import { DateTimeAdapter } from "ng-pick-datetime";
import { InputBatchComponent } from "../input-batch/input-batch.component";

@Component({
  selector: "ngx-add-edit-stock-batch",
  templateUrl: "./add-edit-stock-batch.component.html",
  styleUrls: ["./add-edit-stock-batch.component.scss"],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class AddEditStockBatchComponent implements OnInit, OnDestroy {
  @ViewChild("forFocus") searchElement: ElementRef;
  public loading = false;
  public disableButton = false;
  public formSubmitted = false;
  public addFlag = true;
  public zeroValueBatch = false;
  production_flag: any = [];

  public errorData: any = (errorData as any).default;
  qualityList: any = [];
  partyList: any = [];
  wtPer100mtrCopy: any;
  user: any;
  userHead;
  index;
  wtPer100m;
  maxDate: any;
  currentStockBatchId;
  rearrangeStartIndex: any;
  dateForPicker = new Date();
  selectedTableChange;
  deleteFlag = 0;
  validationCardRowIndex = 0;
  flag = 0;

  stockDataValues1 = [
    {
      batchId: null,
      pchallanRef: null,
      totalWt: null,
      totalMt: null,
      isNotUnique: false,
      isProductionPlanned: false,
      batchMW: [
        {
          mtr: null,

          wt: null,
        },
      ],
    },
  ];
  stockDataValues = [];

  stockBatchArray: BatchData[] = [];
  stockBatch: StockBatch = new StockBatch();
  batchIdArray = [];
  totalMtr: number = 0;
  wtArray: any[] = [];
  mtArray: any[] = [];
  totalWt: number = 0;
  dateRange: any;
  weightFlag: boolean = false;
  weight = [];
  MtWtIndex = 0;
  isDirectPrintFlag: boolean = false;
  currentBatchSequence: any = 0;
  currentBatchSeqId = 0;
  totalGrs = 0;
  totalMeters = 0;
  totalWeights = 0;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private partyService: PartyService,
    private toastr: ToastrService,
    private route: Router,
    private qualityService: QualityService,
    private stockBatchService: StockBatchService,
    private _route: ActivatedRoute,
    private commonService: CommonService,
    private modalService: NgbModal,
    dateTimeAdapter: DateTimeAdapter<any>,
    private ckd: ChangeDetectorRef
  ) {
    dateTimeAdapter.setLocale('en-IN');
  }

  async ngOnInit() {
    await this.getQualityList();
    await this.getPartyList();
    await this.getQualityList();
    this.currentStockBatchId = this._route.snapshot.paramMap.get("id");
    if (this.currentStockBatchId) {
      this.addFlag = false;
      this.getStockBatchById();
    } else {
    }

    this.maxDate = new Date(
      this.dateForPicker.getFullYear(),
      this.dateForPicker.getMonth(),
      this.dateForPicker.getDate(),
      23,
      59
    );
    this.stockBatch.receiveDate = this.maxDate;
    this.stockBatch.chlDate = this.maxDate;
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }

  // getCurrentBatchSequence() {
  //   this.stockBatchService.getBatchSequence(true).pipe(takeUntil(this.destroy$)).subscribe((data) => {
  //     if (data["success"]) {
  //       this.currentBatchSequence = data["data"]["sequence"];
  //       this.currentBatchSeqId = data["data"]["id"];
  //       if (this.stockDataValues && this.stockDataValues[0])
  //         this.stockDataValues[0].batchId = this.currentBatchSequence;
  //     }
  //   });
  // }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
        //  else {
        //   this.toastr.error(data["msg"]);
        // }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"] && data["data"].length > 0) {
            this.qualityList = data["data"];
          } else {
          }
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  setQualityByParty(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.stockBatch.partyId) {
        this.qualityList = [];
        this.qualityService
          .getQualityByParty(this.stockBatch.partyId)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"])
                this.qualityList = data["data"].qualityDataList;
              if (this.qualityList && this.qualityList.length)
                this.stockBatch.qualityId = null;
            },
            (error) => {
              this.loading = false;
            }
          );
        this.loading = false;
      } else {
        this.loading = false;
      }
    } else {
      this.stockBatch.partyId = null;
      this.stockBatch.qualityId = null;
      this.stockBatch.unit = null;
      this.getPartyList();
      this.getQualityList();
      this.loading = false;
    }
  }
  getUnit(event) {
    this.weightFlag = false;
    if (event != undefined) {
      if (this.stockBatch.qualityId == null) {
        this.flag = 1;
        this.toastr.error("Please select quality first");
      } else {
        this.flag = 0;
        this.weightFlag = false;
        this.qualityList.forEach((element) => {
          // element.id ? (t) : null;
          let id = element.id ? element.id : element.qualityEntryId;
          if (id == this.stockBatch.qualityId) {
            this.stockBatch.partyId = element.partyId
            this.stockBatch.unit = element.unit;
            if (this.stockBatch.unit === "weight") {
              this.weightFlag = true;
            } else {
              this.weightFlag = false;
            }
            this.wtPer100mtrCopy = element.wtPer100m;
            if(this.addFlag)
            this.stockBatch.wtPer100m = element.wtPer100m;
          }
        });

        //re-calculate mtr/wt when quality changed
        this.reCalcMTWTValue();
      }
    } else {
      this.stockBatch.partyId = null;
      this.stockBatch.unit = null;
      this.getQualityList();
    }
  }

  reCalcMTWTValue() {
    this.stockDataValues.forEach((e, i) => {
      this.weight = [];
      e.batchMW.forEach((element) => {
        this.weight.push({ w: element.wt, meter: element.mtr });
      });
      this.calculateTotalMtrWt(this.stockBatch.unit, e);
    });
    //calculate total of everything to show on header..
    this.totalMeters = 0;
    this.totalWeights = 0;
    this.totalGrs = 0;
    this.stockDataValues.forEach(element => {
      this.totalMeters += element.totalMt;
      this.totalWeights += element.totalWt;
      element.batchMW.forEach(element => {
        this.totalGrs++;
      });
    });
  }
  getStockBatchById() {
    this.loading = true;
    this.stockBatchService
      .getStockBatchById(this.currentStockBatchId)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.stockBatch.receiveDate = new Date(data["data"].receiveDate);
            this.stockBatch.qualityId = data["data"].qualityId;
            this.stockBatch = data["data"];
            this.stockBatch.chlDate = new Date(this.stockBatch.chlDate);
            this.stockBatch.receiveDate = new Date(this.stockBatch.receiveDate);
            if (!this.stockBatch.batchData.length) {
            } else {
              this.stockBatch.batchData = _.sortBy(
                data["data"].batchData,
                "pchallanRef"
              );
              let batch1 = this.stockBatch.batchData.map((element) => {
                element.pchallanRef;
              });

              this.setStockDataValues1();
            }
          }
          // else {
          //   this.toastr.error(data["msg"]);
          // }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  setStockDataValues1() {
    let pChallanIDs = [
      ...new Set(this.stockBatch.batchData.map((x) => x.pchallanRef)),
    ];
    this.stockDataValues = [];
    pChallanIDs.forEach((x, i) => {
      this.stockDataValues.push(new BatchCard());
      this.stockDataValues[i].pchallanRef = pChallanIDs[i];
      this.stockDataValues[i]['old'] = true;
    });
    if (this.qualityList.length != 0) {
      this.qualityList.forEach((element) => {
        if (element.id == this.stockBatch.qualityId) {
          this.wtPer100mtrCopy = element.wtPer100m;
          if(this.addFlag)
            this.stockBatch.wtPer100m = element.wtPer100m;
          this.stockBatch.unit = element.unit;
          if (this.stockBatch.unit === "weight") {
            this.weightFlag = true;
          } else {
            this.weightFlag = false;
          }
        }
      });
    }
    this.stockDataValues.forEach((batch, i) => {
      this.production_flag[i] = false;
      this.stockBatch.batchData.forEach((x, j) => {
        if (x.pchallanRef == batch.pchallanRef) {
          batch.batchMW.push(
            new BatchMrtWt(
              x.mtr,
              x.wt,
              x.isProductionPlanned,
              x.id,
              x.controlId
            )
          );
          //batch.isProductionPlanned = x.isProductionPlanned;
          if (x.isProductionPlanned)
            this.production_flag[i] = true;
        }
      });

    });

    this.reCalcMTWTValue();
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
      if (this.weightFlag) {
        this.index = "grData" + (rowIndex + 1) + "-" + 1 + "" + idx;
      } else {
        this.index = "grData" + (rowIndex + 1) + "-" + 0 + "" + idx;
      }
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
        let obj = {
          id: null,
          controlId: null,
          mtr: null,
          wt: null,
          isProductionPlanned: false,
        };
        let list = this.stockDataValues[idx].batchMW;
        list.push({ ...obj });
        this.stockDataValues[idx].batchMW = [...list];
        this.stockDataValues[idx].batchMW = [...this.stockDataValues[idx].batchMW,]
        this.ckd.detectChanges();
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
          let objDiv = document.querySelectorAll('.datatable-body');
          if(objDiv && objDiv.length){
            objDiv[idx].scrollTop = objDiv[idx].scrollHeight;
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
    } else {
      //count total mtr wt...
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
      this.reCalcMTWTValue();
    } else {
      item.splice(id, 1);
      this.stockDataValues[row].batchMW = [...item];
      this.reCalcMTWTValue();
    }
  }

  addNewBatch(e) {
    if (!this.stockBatch.qualityId) {
      this.toastr.warning("Please select quality first");
      return;
    }

    var ob = new BatchCard();
    ob.batchMW.push(new BatchMrtWt());
    if (this.stockDataValues.length) {
      let index = this.stockDataValues.findIndex((v) => v.pchallanRef == null);
      if (index > -1 || this.flag) {
        this.toastr.error("Please fill all the required fields");
      } else {
        let itemList = [...this.stockDataValues];
        itemList = _.sortBy(itemList, "pchallanRef", "asc");
        let nextBatchId = itemList[itemList.length - 1].batchId;
        //call update sequence api.....
        this.wtArray = [];
            this.mtArray = [];
            this.stockDataValues.push({ ...ob });
            const className = "collapsible-panel--expanded";
            if (e.target.classList.contains(className)) {
              e.target.classList.remove(className);
            } else {
              e.target.classList.add(className);
            }
        // this.stockBatchService.getBatchSequence(true).pipe(takeUntil(this.destroy$)).subscribe((data) => {
        //   if (data["success"]) {
        //     ob.batchId = data["data"].sequence;
        //     if (ob.batchId < this.currentBatchSequence) {
        //       ob.batchId = this.currentBatchSequence;
        //     }
            
        //   }
        // });
      }
    } else {
      this.stockDataValues = [];
      var ob = new BatchCard();
      ob.batchMW.push(new BatchMrtWt());
      this.stockDataValues.push({ ...ob });
      // this.getCurrentBatchSequence();
      // this.stockDataValues[0].batchId = this.currentBatchSequence;
    }
  }

  removeBatch(index) {
    this.stockDataValues.splice(index, 1);
  }

  calculateWt(meter: number, i, j, col) {
    let w: number;
    w = (meter / 100) * this.stockBatch.wtPer100m;
    this.stockDataValues[i].batchMW[j].wt = w.toFixed(2);
    this.weight = [];
    this.stockDataValues[i].batchMW.forEach((e) => {
      this.weight.push({ meter: e.mtr, w: e.wt });
    });
    if (this.MtWtIndex == i) {
      this.weight[j] = {
        meter: meter,
        w: w,
      };
      this.calculateTotalMtrWt("meter");
      this.stockDataValues[i].totalMt = Number(
        Number(this.totalMtr).toFixed(2)
      );
      this.stockDataValues[i].totalWt = Number(Number(this.totalWt).toFixed(2));
    
    } else {
      this.MtWtIndex = i;
      this.weight[j] = {
        meter: meter,
        w: w,
      };
      this.calculateTotalMtrWt("meter");
      this.stockDataValues[this.MtWtIndex].totalMt = Number(
        Number(this.totalMtr).toFixed(2)
      );
      this.stockDataValues[this.MtWtIndex].totalWt = Number(
        Number(this.totalWt).toFixed(2)
      );
    }
    this.totalGrs = 0;
      this.totalMeters = 0;
      this.totalWeights = 0;
      this.stockDataValues.forEach(element => {
        this.totalMeters += element.totalMt;
        this.totalWeights += element.totalWt;
        this.totalGrs += element.batchMW.length;
      });
  }
  calculateTotalMtrWt(MW, batchCard?): any {
    this.totalWt = 0;
    this.totalMtr = 0;
    if (MW === "meter") {
      Object.keys(this.weight).forEach((element: any) => {
        this.totalWt += +this.weight[element].w;
        this.totalMtr += +this.weight[element].meter;
      });
    } else {
      Object.keys(this.weight).forEach((element: any) => {
        this.totalWt += +this.weight[element].w;
        this.totalMtr += +this.weight[element].meter;
      });
    }
    if (batchCard) {
      batchCard.totalMt = this.totalMtr;
      batchCard.totalWt = this.totalWt;
    }
  }
  calculateMtr(weight: number, i, j, col) {
    let m: number;
    m = (weight * 100) / this.stockBatch.wtPer100m;
    this.stockDataValues[i].batchMW[j].mtr = m.toFixed(2);
    this.weight = [];
    this.stockDataValues[i].batchMW.forEach((e) => {
      this.weight.push({ meter: e.mtr, w: e.wt });
    });
    if (this.MtWtIndex == i) {
      this.weight[j] = {
        meter: m,
        w: weight,
      };
      this.calculateTotalMtrWt("weight");
      this.stockDataValues[i].totalMt = Number(
        Number(this.totalMtr).toFixed(2)
      );
      this.stockDataValues[i].totalWt = Number(Number(this.totalWt).toFixed(2));
    } else {
      this.MtWtIndex = i;
      this.weight[j] = {
        meter: m,
        w: weight,
      };
      this.calculateTotalMtrWt("weight");
      this.stockDataValues[this.MtWtIndex].totalMt = Number(
        Number(this.totalMtr).toFixed(2)
      );
      this.stockDataValues[this.MtWtIndex].totalWt = Number(
        Number(this.totalWt).toFixed(2)
      );
    }
    this.totalGrs = 0;
      this.totalMeters = 0;
      this.totalWeights = 0;
      this.stockDataValues.forEach(element => {
        this.totalMeters += element.totalMt;
        this.totalWeights += element.totalWt;
        this.totalGrs += element.batchMW.length;
      });
  }

  checkValidation(myForm) {
    let returnValue = true;
    if (this.stockDataValues && this.stockDataValues.length) {
      if (this.stockDataValues.length == 1) {
        if (
          !this.stockDataValues[0].pchallanRef &&
          !this.stockDataValues[0].batchMW[0].mtr &&
          !this.stockDataValues[0].batchMW[0].wt
        ) {
          returnValue = false;
          if (this.stockBatch.receiveDate)
            if (this.stockBatch.chlDate)
              if (this.stockBatch.chlNo)
                if (this.stockBatch.stockInType)
                  if (this.stockBatch.partyId)
                    if (this.stockBatch.qualityId) {
                      returnValue = true;
                      return returnValue;
                    }
        }
      }
      this.stockDataValues.forEach((ele) => {
        let isNullOrUndefineFlag = ele.pchallanRef ? false : true;
        if (isNullOrUndefineFlag) {
          returnValue = false;
          return false;
        }
        if (ele.batchMW && ele.batchMW.length && ele.batchMW.length == 1) {
          let index = ele.batchMW.findIndex(
            (v) =>
              (v.wt == null || v.wt == undefined || v.wt == "") &&
              (v.mtr == null || v.mtr == undefined || v.mtr == "")
          );
          if (index > -1) {
            this.toastr.warning("Batch should have mtr/wt.");
            returnValue = false;
            return false;
          }
        }
        if (ele.batchMW && ele.batchMW.length) {
          let index = ele.batchMW.findIndex((v) => v.wt == 0 || v.mtr == 0);
          if (index > -1) {
            this.toastr.warning("Batch mtr/wt. cannot be 0.");
            returnValue = false;
            return false;
          }
        }
      });
    }
    if (returnValue) {
      returnValue = false;
      if (this.stockBatch.receiveDate)
        if (this.stockBatch.chlDate)
          if (this.stockBatch.chlNo)
            if (this.stockBatch.stockInType)
              if (this.stockBatch.partyId)
                if (this.stockBatch.qualityId) returnValue = true;
    }
    return returnValue;
  }

  reset(myForm) {
    myForm.reset();
    // this.getCurrentBatchSequence();
    this.totalGrs = 0;
    this.totalMeters = 0;
    this.totalWeights = 0;
    this.formSubmitted = false;
    this.stockDataValues = [
      {
        batchId: null,// this.currentBatchSequence,
        pchallanRef: null,
        totalWt: null,
        totalMt: null,
        isNotUnique: false,
        isProductionPlanned: false,
        batchMW: [
          {
            mtr: null,
            wt: null,
          },
        ],
      },
    ];
    this.stockBatch.chlDate = new Date();
    this.stockBatch.receiveDate = new Date();
    this.stockBatch.stockInType = "Fabric";
  }

  checkPChallanUniq(i){
    let checked = false;
    this.stockDataValues.forEach((element, index) => {
      if(index != i && this.stockDataValues[i].pchallanRef == element.pchallanRef){
        this.stockDataValues[i].isNotUnique = true;
        checked = true;
      }
    });
    if(!checked){
      this.stockBatchService.isPchallanExists(this.stockBatch.partyId, this.stockDataValues[i].pchallanRef).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          if(res['success']){
            this.stockDataValues[i].isNotUnique = res['data'];
          }
        }, err=> {
  
        }
      )
    }    
  }

  addUpdateStockBatch(myForm, next?) {
    this.disableButton = true;
    this.formSubmitted = true;
    let uniqueError = false;
    this.stockDataValues.forEach((e) => {
      if (e.isNotUnique) uniqueError = true;
    });
    if ((myForm.valid || this.checkValidation(myForm)) && !uniqueError) {
      this.loading = true;
      this.stockBatchArray = [];
      this.stockBatch.createdBy = this.user.userId;
      this.stockBatch.userHeadId = this.userHead.userHeadId;

      this.stockDataValues.forEach((ele) => {
        if (ele.batchMW && ele.batchMW.length) {
          ele.batchMW.forEach((subele) => {
            if (!!subele.mtr && !!subele.wt) {
              let obj = {
                id: 0,
                batchId: 0,
                pchallanRef: 0,
                mtr: 0,
                wt: 0,
                totalMt: 0,
                isNotUnique: false,
                totalWt: 0,
                isProductionPlanned: false,
                controlId: 0,
              };
              obj.id = subele.id;
              obj.pchallanRef = ele.pchallanRef;
              obj.batchId = ele.batchId;
              obj.mtr = subele.mtr;
              obj.wt = subele.wt;
              obj.totalMt = ele.totalMt;
              obj.totalWt = ele.totalWt;
              obj.isProductionPlanned = subele.isProductionPlanned;
              obj.controlId = subele.controlId;
              this.stockBatchArray.push(obj);
            }
          });
        }
      });
      this.stockBatch.batchData = this.stockBatchArray;
        if (this.addFlag) {
          this.stockBatchService.addPchallan(this.stockBatch).pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                this.loading = false;
                this.reset(myForm);
                this.stockDataValues = [];
                this.disableButton = false;
                this.toastr.success(data["msg"]);
                if (next) {
                  //this.printJobCard(myForm, data["data"]);
                  this.route.navigate(["/pages/stock-batch/stock-in"], {queryParams: {id:data['data']}});
                }
              } else {
                this.loading = false;
                this.disableButton = false;
                this.stockBatchArray = [];
              }
            },
            (error) => {
              this.loading = false;
              this.disableButton = false;
              this.stockBatchArray = [];
            }
          );
        } else {
          this.stockBatch.updatedBy = this.user.userId;
          this.stockBatchService.updatePchallan(this.stockBatch).pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                this.toastr.success(data["msg"]);
                if (next) {
                  // localStorage.setItem('stockdata', JSON.stringify({batchData: this.stockDataValues, commonData: this.stockBatch}));
                  this.route.navigate(["/pages/stock-batch/stock-in"], {queryParams: {id:data['data']}});
                }else{
                  this.route.navigate(["/pages/stock-batch"]);
                }
                
              } else {
                this.disableButton = false;
                this.stockBatchArray = [];
                // this.toastr.error(data["msg"]);
              }
              this.loading = false;
            },

            (error) => {
              this.stockBatchArray = [];
              this.toastr.error(errorData.Update_Error);
              this.loading = false;
              this.disableButton = false;
              this.loading = false;
            }
          );
          this.loading = false;
        
      }
    } else {
      this.disableButton = false;
    }
  }

  setViewJobValue(event) {
    if (event === "view table") {
      this.route.navigate(['/pages/stock-batch/view'])
    } else if (event === "job card") {
      this.selectedTableChange = null;
      const modalRef = this.modalService.open(InputBatchComponent)
    } else if(event === "pending"){
      this.route.navigate(['/pages/stock-batch/pending'])
    }else if(event == "report"){
      this.route.navigate(["/pages/all-report"]);
    }
  }

  gotoNextPage(){
    if(this.currentStockBatchId){
      this.route.navigate(["/pages/stock-batch/stock-in"], {queryParams: {id:this.currentStockBatchId}});
    }
  }

  printJobCard(form, data) {
    this.isDirectPrintFlag = true;
    const modalRef = this.modalService.open(JobCardComponent);
    modalRef.componentInstance.isDirectPrintFlag = this.isDirectPrintFlag;
    modalRef.componentInstance.stockBatchData = this.stockBatch;
    modalRef.componentInstance.stockId = Number(data);
    modalRef.result.then((result) => {
      this.disableButton = false;
    });
  }
}
