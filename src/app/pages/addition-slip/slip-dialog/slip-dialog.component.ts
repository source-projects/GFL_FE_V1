import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DyeingChemicalData } from '../../../@theme/model/dyeing-process';
import { DyeingProcessService } from '../../../@theme/services/dyeing-process.service';
import { JetPlanningService } from '../../../@theme/services/jet-planning.service';
import { PartyService } from '../../../@theme/services/party.service';
import { PlanningSlipService } from '../../../@theme/services/planning-slip.service';
import { ProductionPlanningService } from '../../../@theme/services/production-planning.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ShadeService } from '../../../@theme/services/shade.service';
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: 'ngx-slip-dialog',
  templateUrl: './slip-dialog.component.html',
  styleUrls: ['./slip-dialog.component.scss']
})
export class SlipDialogComponent implements OnInit {

  public processTypes = ["Scouring", "Dyeing", "RC", "Cold Wash", "Addition"];
  @Input() additionSlipFlag: boolean;
  @Input() isPrintDirect: boolean;
  @Input() batchId;
  @Input() stockId;
  @Input() editAdditionFlag: boolean;
  @Input() additionSlipData;
  public isPrinting: boolean = true;
  public itemListArray: any = [];
  public myDate: any;
  public itemList: any = [];
  public slipData: any;
  public slipObj: any;
  public quantityNullFlag = false;
  public formSubmitted: boolean = false;
  public disableButton: boolean = false;
  public isSavedForPrint: boolean = false;
  public additionSlipSaveFlag: boolean = false;
  public saveClicked: boolean = false;
  public temp;
  public holdTime;
  public isColor;
  public id;
  public liquorRatio;
  public index: string;
  public refreshPipe: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private DyeingProcessService: DyeingProcessService,
    private planningSlipService: PlanningSlipService,
  ) { 
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");
    this.itemList.push(new DyeingChemicalData());
  }

  async ngOnInit() {
    await this.getItemData();
    if (this.batchId && this.stockId) {
      await this.getSlipDataFromBatch();
      //this.getWeightByStockAndBatch();
    }
    if (this.isPrintDirect) {
      //directly print slip
      await this.printSlip();
    }
    if (this.editAdditionFlag) {
      this.getUpdateDataForAdditionSlip();
    }
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
          //this.itemListArrayCopy = this.itemListArray;
        } else {
        }
      },
      (error) => {}
    );
  }

  getSlipDataFromBatch() {
    this.planningSlipService
      .getSlipDataByBatchStockId(this.batchId, this.stockId)
      .subscribe(
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
                this.slipData.totalWt = Number(this.slipData.totalWt).toFixed(3);
                
              });
              if(this.isPrintDirect){
                this.printNOW();
              }
            } else {
            }
          } else {
          }
        },
        (error) => {}
      );
  }

  getUpdateDataForAdditionSlip() {
    let additionData = this.additionSlipData.dyeingSlipData;
    this.temp = additionData.temp;
    this.holdTime = additionData.holdTime;
    this.isColor = additionData.isColor;
    this.liquorRatio = additionData.liquerRation;
    this.itemList = additionData.dyeingSlipItemData;
    this.id = additionData.id;
  }

  // getWeightByStockAndBatch() {
  //   if (this.batchId && this.stockId) {
  //     this.productionPlanningService
  //       .getWeightByStockIdAndBatchId(this.batchId, this.stockId)
  //       .subscribe((data) => {
  //         if (data["success"]) {
  //           this.weight = data["data"].totalwt;
  //         }
  //       });
  //   }
  // }

  printSlip(myForm?) {
    //this.checkItemListAndValue();
    if ((myForm ? myForm.valid : true) && !this.quantityNullFlag) {
      if (!this.isPrintDirect) {
        //this.approveByFlag = true;
        this.saveSlipData(myForm, true);
      } else {
        this.isSavedForPrint = true;
        //this.isPrinting = false;
        //this.getSlipDataFromBatch();
      }

      if (!this.isPrintDirect && this.editAdditionFlag) {
        let interval1 = setInterval(() => {
          if (this.slipData && this.isSavedForPrint) {
            clearInterval(interval1);
            this.printNOW();
            clearInterval(interval1);
          }
        }, 10);
        this.quantityNullFlag = false;
      }
    } else {
      this.toastr.error("Fill empty fields.");
      this.quantityNullFlag = false;
      return;
    }
  }

  printNOW() {
    this.isPrinting = false;

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
        // this.printFlag = true;
        tempFlag = true;
        clearInterval(inter);
        this.activeModal.close(this.slipObj);
        //this.activeModal.close();
      }
    }, 10);
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

  itemSelected1(event, index) {
    let i_id = event;
    this.itemListArray.forEach((element) => {
      if (element.itemId == i_id) {
        this.itemList[index].itemName = element.itemName;
        this.itemList[index].supplierId = element.supplierId;
        this.itemList[index].supplierName = element.supplierName;
        this.itemList[index].itemType = element.itemType;
      }
    });
  }

  onKeyUp1(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "itemList" + (rowIndex + 1) + "-" + 1;
      if (rowIndex === this.itemList.length - 1) {
        let item = this.itemList[rowIndex];
        if (item.itemName && item.qty) {
          let obj = new DyeingChemicalData();
          this.itemList.push(obj);
          let interval = setInterval(() => {
            let field = document.getElementById(this.index);
            if (field != null) {
              field.focus();
              clearInterval(interval);
            }
          }, 10);
        } else {
          this.toastr.error("Fill empty fields");
        }
      } else {
        this.index = "itemList" + (rowIndex + 1) + "-" + colIndex;
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 10);
      }
    }
  }

  removeItem1(rowIndex) {
    if(this.itemList.length == 1){
      this.itemList = [];
      this.itemList.push(new DyeingChemicalData());
    }else{
      this.itemList.splice(rowIndex, 1);
    }
  }

  trackByFn(index: number, obj: any) {
    return obj ? obj["_id"] || obj : index;
  }

  colorSelected(event, i) {
    this.refreshPipe++;
    if (this.refreshPipe > 10) this.refreshPipe = 1;
  }

  saveSlipData(myForm, saveAndPrint = false) {
    this.checkItemListAndValue();
    this.formSubmitted = true;
    if (myForm.valid && !this.quantityNullFlag) {
      this.disableButton = true;
      if (this.additionSlipFlag) {
        this.slipObj = {
          id: this.id,
          temp: myForm.value.temp,
          holdTime: myForm.value.holdTime,
          liquorRatio: myForm.value.liquorRatio,
          isColor: myForm.value.isColor,
          items: this.itemList,
          printAlso: saveAndPrint,
        };
        // this.slipData = {...this.slipObj}
        this.isSavedForPrint = true;

        if (this.additionSlipSaveFlag || (saveAndPrint && !this.editAdditionFlag)) {
          this.activeModal.close(this.slipObj);
        }
      } else {
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
      }
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

}
