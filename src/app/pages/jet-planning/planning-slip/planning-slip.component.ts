import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from "@angular/core";
import {
  DyeingChemicalData,
  DyeingProcessData,
} from "../../../@theme/model/dyeing-process";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DyeingProcessService } from "../../../@theme/services/dyeing-process.service";
import { JetPlanningService } from "../../../@theme/services/jet-planning.service";
import { PlanningSlipService } from "../../../@theme/services/planning-slip.service";
import { ToastrService } from "ngx-toastr";
import * as wijmo from "@grapecity/wijmo";
import { DatePipe } from "@angular/common";
import { AddShadeComponent } from "../../production-planning/add-shade/add-shade.component";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
  selector: "ngx-planning-slip",
  templateUrl: "./planning-slip.component.html",
  styleUrls: ["./planning-slip.component.scss"],
  providers: [DatePipe],
})
export class PlanningSlipComponent implements OnInit {
  @ViewChildren("data") data: QueryList<NgSelectComponent>;
  count: any;
  supplierSelected = [];
  itemIndex: number;
  public processTypes = ["Scouring", "Dyeing", "RC", "Cold Wash", "Addition"];

  addNewFlag: boolean = false;
  public refreshPipe: number = 0;
  dyeingProcessStepNew: any;
  dyeingChemicalData: DyeingChemicalData[] = [];
  public loading: boolean = false;
  public formSubmitted: boolean = false;
  public disableButton: boolean = false;
  public isSavedForPrint: boolean = false;
  public isPrinting: boolean = true;
  public saveClicked: boolean = false;
  public approveByFlag: boolean = false;
  public index: string;
  public myDate: any;
  @Input() isPrintDirect: boolean;
  @Input() batchId;
  @Input() stockId;
  @Input() additionSlipFlag: boolean;
  @Input() editAdditionFlag: boolean;
  @Input() additionSlipData;
  public itemListArray: any = [];
  public itemListArrayCopy: any = [];
  public colorFlag = false;
  public printFlag = false;
  public additionSlipSaveFlag = false;
  public slipData: any;
  public temp;
  public holdTime;
  public isColor;
  public id;
  public liquorRatio;
  public list = [];
  public itemList: DyeingChemicalData[] = [];
  saveAndPrintFlag = false;
  quantityNullFlag = false;
  saveSetFlag = false;

  planningSlipArray = [
    {
      temp: null,
      holdTime: null,
      color: null,
      itemList: [
        {
          itemName: null,
          itemId: null,
          qty: null,
          supplierId: null,
          supplierName: null,
        },
      ],
    },
  ];
  slipObj: any;

  //dyeingData:DyeingSlipData = new DyeingSlipData();
  //dyeingSlipDataList:DyeingSlipDataList = new DyeingSlipDataList();

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private DyeingProcessService: DyeingProcessService,
    private planningSlipService: PlanningSlipService,
    private modalService: NgbModal
  ) {
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");
    this.itemList.push(new DyeingChemicalData());
  }

  async ngOnInit() {
    await this.getItemData();
    if (this.batchId && this.stockId) {
      await this.getSlipDataFromBatch();
    }
    if (this.isPrintDirect) {
      //directly print slip
      await this.printSlip();
    }
    if (this.editAdditionFlag) {
      this.getUpdateDataForAdditionSlip();
    }
  }

  get activeModel() {
    return this.activeModal;
  }

  numberOnly(evt) { 
          
    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57) || ASCIICode == 69) 
        return false; 
    return true; 
} 

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
          this.itemListArrayCopy = this.itemListArray;
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
              });
              if(this.isPrintDirect)
                this.printNOW();
            }
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => {}
      );
  }

  onKeyUp(e, rowIndex, colIndex, colName, parentDataIndex) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index =
        "itemList" + parentDataIndex + (rowIndex + 1) + "-" + 1;
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
        this.index = "itemList" + parentDataIndex + (rowIndex + 1) + "-" + colIndex;
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
    this.itemList.splice(rowIndex, 1);
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

  colorSelected(event, i) {
    this.refreshPipe++;
    if (this.refreshPipe > 10) this.refreshPipe = 1;
  }

  itemSelected1(event, index) {
    console.log(event);
    let i_id = event;
    console.log("id", i_id);
    this.itemListArray.forEach((element) => {
      if (element.itemId == i_id) {
        this.itemList[index].itemName = element.itemName;
        this.itemList[index].supplierId = element.supplierId;
        this.itemList[index].supplierName = element.supplierName;
      }
    });
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

  saveSlipData(myForm) {
    this.checkItemListAndValue();
    this.formSubmitted = true;
    if (myForm.valid && !this.quantityNullFlag && !this.saveSetFlag) {
      this.disableButton = true;
      if (this.additionSlipFlag) {
        this.slipObj = {
          id: this.id,
          temp: myForm.value.temp,
          holdTime: myForm.value.holdTime,
          liquorRatio: myForm.value.liquorRatio,
          isColor: myForm.value.isColor,
          items: this.itemList,
        };
        this.isSavedForPrint = true;

        if (this.additionSlipSaveFlag) {
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
            this.toastr.error("Internal server error!");
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

  approveByClicked() {
    const modalRef = this.modalService.open(AddShadeComponent,{ size: 'lg' });
    modalRef.componentInstance.editDyeingSlipFlag = true;
    modalRef.result.then((result) => {
      if (result) {
        this.approveByFlag = true;
        this.slipData.approvedId = result;
      } else {
        this.approveByFlag = false;
      }
    });
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

  removeProcess(processIndex) {
    this.slipData.dyeingSlipDataList.splice(processIndex, 1);
    //re arrange process step sequence..
    this.slipData.dyeingSlipDataList.forEach((element, i) => {
      element.sequence = i + 1;
    });
  }
  printSlip(myForm?) {
    //this.checkItemListAndValue();
    if ((myForm? myForm.valid : true) && !this.quantityNullFlag) {
      this.isPrinting = false;
      if (!this.isPrintDirect) {
        this.approveByFlag = true;
        this.saveSlipData(myForm);
      } else {
        this.isSavedForPrint = true;
        //this.getSlipDataFromBatch();
      }

      if(!this.isPrintDirect){
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

  printNOW(){
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
    doc.append(
      '<link href="./planning-slip.component.scss" rel="stylesheet">'
    );
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

  trackByFn(index: number, obj: any) {
    return obj ? obj["_id"] || obj : index;
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
          // this.data.changes.subscribe(() => {
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
}
