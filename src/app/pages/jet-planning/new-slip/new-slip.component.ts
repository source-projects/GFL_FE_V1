import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { sortBy as _sortBy } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DyeingChemicalData, DyeingProcessData } from '../../../@theme/model/dyeing-process';
import { DyeingProcessService } from "../../../@theme/services/dyeing-process.service";
import { PlanningSlipService } from "../../../@theme/services/planning-slip.service";
import { ProductionPlanningService } from "../../../@theme/services/production-planning.service";
import * as wijmo from "@grapecity/wijmo";
import { ProductionBatchDetail } from '../../../@theme/model/production-planning';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';

@Component({
  selector: 'ngx-new-slip',
  templateUrl: './new-slip.component.html',
  styleUrls: ['./new-slip.component.scss']
})
export class NewSlipComponent implements OnInit {

  @Input() isPrintDirect = false;
  @Input() batchId;
  @Input() stockId;
  @Input() additionSlipFlag = false;
  @Input() productionBatchDetail: ProductionBatchDetail;

  public slipData: any;
  public myDate: any;
  public itemListArray: any = [];
  public itemListArrayCopy: any = [];
  public approveByFlag: boolean = false;
  public formSubmitted: boolean = false;
  public refreshPipe: number = 0;

  supplierSelected = [];
  itemIndex: number;
  public index: string;

  public itemList: DyeingChemicalData[] = [];
  addNewFlag: boolean = false;
  dyeingChemicalData: any[];
  liquorRatio: any;
  isColor: boolean;
  count: number;
  saveAndPrintFlag: boolean;
  saveSetFlag: boolean;
  dyeingProcessStepNew: DyeingProcessData;

  public processTypes = ["Scouring", "Dyeing", "RC", "Cold Wash", "Addition"];
  disableButton: boolean;

  quantityNullFlag = false;
  slipObj: any;
  public saveClicked: boolean = false;
  public isSavedForPrint: boolean = false;
  public isPrinting: boolean = true;

  totalMtr: number = 0;
  totalWt: number = 0;

  constructor(private planningSlipService: PlanningSlipService,
    private productionPlanningService: ProductionPlanningService,
    private datePipe: DatePipe,
    public activeModal: NgbActiveModal,
    private DyeingProcessService: DyeingProcessService,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService) {

    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, "dd/MM/yyyy");
    this.itemList.push(new DyeingChemicalData());

  }


  ngOnInit() {

    if (this.productionBatchDetail.batchId) {
      this.getGRForBatch();
    }

    this.getItemData();
    if (this.batchId && this.stockId) {
      this.getSlipDataFromBatch();
      this.getWeightByStockAndBatch();
    }
  }

  batchDetail;
  getGRForBatch() {

    this.stockBatchService
      .getJobCardData(this.productionBatchDetail.batchId).subscribe((data) => {
        if (data["success"]) {
          this.batchDetail = data["data"];
          let totalMtrl1 = 0;
          totalMtrl1 = this.batchDetail.batchDataList.map((a) => a.mtr).reduce(function (a, b) { return a + b; });
          let totalWtl1 = 0;
          totalWtl1 = this.batchDetail.batchDataList.map((a) => a.wt).reduce(function (a, b) { return a + b; });

        }
      });
  }

  confirmGr = false;
  updateGr() {
    this.stockBatchService
      .updateGrFromSlip(this.batchDetail.batchDataList).subscribe((data) => {
        if (data["success"]) {
          this.confirmGr = true;
        }
      });
  }

  confirmShade = false;
  confirmShadeFn() {
    this.confirmShade = true;
  }

  showProcessPreview = false;
  showPreviewToVerify() {
    this.showProcessPreview = true;
  }

  verfiedProcess = false;
  previewVerified() {
    this.verfiedProcess = true;
    this.showProcessPreview = false;
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];

          this.itemListArray = this.itemListArray.filter(v => v.itemType !== "Color");

          this.itemListArrayCopy = this.itemListArray;
        } else {
        }
      },
      (error) => { }
    );
  }

  getSlipDataFromBatch() {
    this.planningSlipService
      .getSlipDataByBatchStockId(this.batchId, this.stockId).subscribe(
        (data) => {
          if (data["success"]) {
            this.slipData = data["data"];
            if (this.slipData) {
              this.slipData.dyeingSlipDataList.forEach((element) => {
                element.dyeingSlipItemData.forEach((element1) => {
                  element1.qty = element1.qty
                    ? element1.qty.toFixed(3)
                    : element1.qty;
                });
                console.log(this.slipData)
                this.slipData.dyeingSlipDataList = _sortBy(this.slipData.dyeingSlipDataList, 'sequence')
                this.slipData.totalWt = Number(this.slipData.totalWt).toFixed(3);
              });

              this.slipData.dyeingSlipDataList.forEach((element) => {
                let list = element.dyeingSlipItemData.filter((element1) => {
                  if (element1.isColor == false) {
                    return true;
                  }
                });
                element.dyeingSlipItemData = list;
              });
              // if (this.isPrintDirect) this.printNOW();
            }
          }
        },
        (error) => { }
      );
  }

  getWeightByStockAndBatch() {
    if (this.batchId && this.stockId) {
      this.productionPlanningService
        .getWeightByStockIdAndBatchId(this.batchId, this.stockId).subscribe((data) => {
          if (data["success"]) {
            this.weight = data["data"].totalwt;
          }
        });
    }
  }

  numberOnly(evt) {
    // Only ASCII charactar in that range allowed
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode == 46) return true;
    if (
      (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) ||
      ASCIICode == 69
    )
      return false;
    return true;
  }

  removeProcess(processIndex) {
    this.slipData.dyeingSlipDataList.splice(processIndex, 1);
    //re arrange process step sequence..
    this.slipData.dyeingSlipDataList.forEach((element, i) => {
      element.sequence = i + 1;
    });
  }

  colorSelected(event, i) {
    this.refreshPipe++;
    if (this.refreshPipe > 10) this.refreshPipe = 1;
  }

  trackByFn(index: number, obj: any) {
    return obj ? obj["_id"] || obj : index;
  }

  itemSelected(event, parentIndex, index?) {

    this.supplierSelected.push(event);
    this.itemIndex = parentIndex;

    this.itemListArray.forEach((e) => {
      let item = 0;
      let itemObject = null;
      if (index || index == 0) {
        item = this.slipData.dyeingSlipDataList[index].dyeingSlipItemData[
          parentIndex
        ].itemId;
        itemObject = this.slipData.dyeingSlipDataList[index].dyeingSlipItemData[
          parentIndex
        ];
      } else {
        item = this.slipData.dyeingSlipDataList[parentIndex].dyeingSlipItemData
          .itemId;
        itemObject = this.slipData.dyeingSlipDataList[parentIndex]
          .dyeingSlipItemData;
      }
      if (e.itemId == item) {
        if (e.itemType == "Color") {
          itemObject.isColor = true;
        }

        itemObject.supplierName = e.supplierName;
        itemObject.itemName = e.itemName;
      }
    });
  }

  weight = [];
  calculateWt(meter: number, i, j) {
    let w: number;
    w = (meter / 100) * this.batchDetail.wtPer100m;
    this.batchDetail.batchDataList[j].wt = w.toFixed(2);
    this.weight = [];
    this.batchDetail.batchDataList.forEach((e) => {
      this.weight.push({ meter: e.mtr, w: e.wt });
    });
    this.weight[j] = {
      meter: meter,
      w: w,
    };
    this.calculateTotalMtrWt("meter");
    this.batchDetail.totalMt = Number(
      Number(this.totalMtr).toFixed(2)
    );
    this.batchDetail.totalWt = Number(Number(this.totalWt).toFixed(2));

    // this.totalGrs = 0;
    //   this.totalMeters = 0;
    //   this.totalWeights = 0;
    //   this.stockDataValues.forEach(element => {
    //     this.totalMeters += element.totalMt;
    //     this.totalWeights += element.totalWt;
    //     this.totalGrs += element.batchMW.length;
    //   });
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
  calculateMtr(weight: number, i, j) {
    let m: number;
    m = (weight * 100) / this.batchDetail.wtPer100m;
    this.batchDetail.batchDataList[j].mtr = m.toFixed(2);
    this.weight = [];
    this.batchDetail.batchDataList.forEach((e) => {
      this.weight.push({ meter: e.mtr, w: e.wt });
    });

    this.weight[j] = {
      meter: m,
      w: weight,
    };
    this.calculateTotalMtrWt("weight");
    this.batchDetail.totalMt = Number(
      Number(this.totalMtr).toFixed(2)
    );
    this.batchDetail.totalWt = Number(Number(this.totalWt).toFixed(2));
  }

  onKeyUpForGR(e, rowIndex, colName, idx) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      if (this.batchDetail.unit == "weight") {
        this.index = "grData" + (rowIndex + 1) + "-" + 1;
      } else {
        this.index = "grData" + (rowIndex + 1) + "-" + 0;
      }

      let interval = setInterval(() => {
        let field = document.getElementById(this.index) as any;
        if (field != null) {
          field.focus();
          field.select();
          clearInterval(interval);
        }
      }, 10);

    } else {
      //count total mtr wt...
    }
  }

  onKeyUp(e, rowIndex, colIndex, colName, parentDataIndex) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "itemList" + parentDataIndex + (rowIndex + 1) + "-" + 1;
      if (
        rowIndex ===
        this.slipData.dyeingSlipDataList[parentDataIndex].dyeingSlipItemData
          .length -
        1
      ) {
        let item = this.slipData.dyeingSlipDataList[parentDataIndex]
          .dyeingSlipItemData[rowIndex];

        if (item.itemName && item.qty) {
          if (colName == "concentration") {
            if (!item.concentration) {
              // this.toastr.error("Enter concentration");
              return;
            }
          } else if (colName == "byChemical") {
            if (!item.byChemical) {
              // this.toastr.error("Enter concentration");
              return;
            }
          }
          let obj = new DyeingChemicalData();
          //let list = this.dyeingChemicalData;
          this.slipData.dyeingSlipDataList[
            parentDataIndex
          ].dyeingSlipItemData.push(obj);
          let interval = setInterval(() => {
            let field = document.getElementById(this.index) as any;;
            if (field != null) {
              field.focus();
              field.select();
              clearInterval(interval);
            }
          }, 10);
        } else {
          this.toastr.error("Fill empty fields");
        }
      } else {
        this.index =
          "itemList" + parentDataIndex + (rowIndex + 1) + "-" + colIndex;
        let interval = setInterval(() => {
          let field = document.getElementById(this.index) as any;;
          if (field != null) {
            field.focus();
            field.select();
            clearInterval(interval);
          }
        }, 10);
      }
    }
  }

  removeItem(rowIndex, parentDataIndex) {
    let idCount = this.slipData.dyeingSlipDataList[parentDataIndex]
      .dyeingSlipItemData.length;
    if (idCount == 1) {
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].byChemical = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].qty = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].concentration = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].controlId = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].id = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].itemId = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].itemName = null;
      this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData[0].supplierName = null;
    } else {
      let removed = this.slipData.dyeingSlipDataList[
        parentDataIndex
      ].dyeingSlipItemData.splice(rowIndex, 1);
    }
  }

  addNew() {
    if (this.approveByFlag) {
      this.dyeingChemicalData = [];
      this.supplierSelected = [];
      this.liquorRatio = null;
      this.isColor = false;
      this.count = this.count + 1;
      this.addNewFlag = true;
      this.saveAndPrintFlag = true;
      this.saveSetFlag = true;
      this.dyeingProcessStepNew = new DyeingProcessData();
      this.dyeingChemicalData.push(new DyeingChemicalData());
    } else {
      this.toastr.warning("You do not have permission to edit slip data");
    }
  }

  onEnter(e, index, colIndex) {
    let keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      let indexOfEnter = "addList" + (index + 1) + "-" + 1;
      if (index == this.dyeingChemicalData.length - 1) {
        if (
          this.dyeingChemicalData[index].itemId &&
          this.dyeingChemicalData[index].qty
        ) {
          this.dyeingChemicalData.push(new DyeingChemicalData());
          // this.data.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
          //   this.data.last["nativeElement"].focus();
          // });
          let interval = setInterval(() => {
            let field = document.getElementById(indexOfEnter);
            if (field != null) {
              field.focus();
              clearInterval(interval);
            }
          }, 10);
        } else {
          this.toastr.error("Fill empty fields.");
        }
      } else {
        let indexOfEnter = "addList" + (index + 1) + "-" + colIndex;
        let interval = setInterval(() => {
          let field = document.getElementById(indexOfEnter);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      }
    }
  }

  onCancel(innerForm) {
    innerForm.reset();
    this.addNewFlag = false;
    this.saveAndPrintFlag = false;
    this.saveSetFlag = false;
  }

  removeChemicalData(index: any) {
    if (this.dyeingChemicalData.length == 1) {
      this.dyeingChemicalData[0] = new DyeingChemicalData();
    } else {
      this.dyeingChemicalData.splice(index, 1);
    }
  }

  onCreate(innerForm) {
    this.formSubmitted = true;
    if (innerForm.valid) {
      this.count = this.slipData.dyeingSlipDataList.length;
      this.slipData.dyeingSlipDataList.push(this.dyeingProcessStepNew);
      this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData = [];
      this.slipData.dyeingSlipDataList[
        this.count
      ].liquerRation = this.liquorRatio;
      this.slipData.dyeingSlipDataList[this.count].isColor = this.isColor;

      for (let i = 0; i < this.dyeingChemicalData.length; i++) {
        if (this.itemListArray) {
          this.itemListArray
            .filter((f) => f.itemId == this.dyeingChemicalData[i].itemId)
            .map((f) => {
              this.dyeingChemicalData[i].itemName = f.itemName;
              this.dyeingChemicalData[i].supplierId = f.supplierId;
              this.dyeingChemicalData[i].supplierName = f.supplierName;
            });
        }
      }
      this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData = [
        ...this.dyeingChemicalData,
      ];

      this.saveSetFlag = false;
      this.saveAndPrintFlag = false;
      this.formSubmitted = false;
      this.addNewFlag = false;
    } else {
      this.toastr.error("Please fill all fields.");
    }
  }

  saveSlipData(myForm) {
    this.checkItemListAndValue();
    this.formSubmitted = true;
    if (myForm.valid && !this.quantityNullFlag && !this.saveSetFlag) {
      this.disableButton = true;

      this.planningSlipService.updateSlipData(this.slipData).subscribe(
        (data) => {
          if (data["success"]) {
            this.isSavedForPrint = true;
            this.toastr.success(data["msg"]);
            if (this.saveClicked) {
              this.activeModal.close(true);
            }
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          //this.toastr.error("Internal server error!");
          this.disableButton = false;
        }
      );

    } else {
      this.formSubmitted = false;
      this.toastr.error("Fill empty fields.");
      return;
    }
  }

  checkItemListAndValue() {
    this.quantityNullFlag = false;
    if (this.slipData) {
      this.slipData.dyeingSlipDataList.forEach((element) => {
        element.dyeingSlipItemData.forEach((element1) => {
          if (element1.qty == null) {
            this.quantityNullFlag = true;
            return;
          }
        });
      });
    }
  }

  printSlip(myForm?) {
    //this.checkItemListAndValue();

    if ((myForm ? myForm.valid : true)) {
      this.isPrinting = false;
      this.saveSlipData(myForm);

      let interval1 = setInterval(() => {
        if (this.slipData && this.isSavedForPrint) {
          clearInterval(interval1);
          this.printNOW();
          clearInterval(interval1);
        }
      }, 10);

    } else {
      this.toastr.error("Fill empty fields.");
      return;
    }

  }

  printNOW() {
    let doc = new wijmo.PrintDocument({
      title: "",
    });
    doc.append(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">'
    );
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );
    doc.append('<link href="./planning-slip.component.scss" rel="stylesheet">');
    let tempFlag = false;
    let inter = setInterval(() => {
      let element = <HTMLElement>document.getElementById("print-slip");
      if (element) {
        doc.append(element);
        doc.print();
        tempFlag = true;
        clearInterval(inter);
        this.activeModal.close();
      }
    }, 10);
  }

}


