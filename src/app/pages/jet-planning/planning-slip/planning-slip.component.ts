import { Component, Input, OnInit } from "@angular/core";
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

@Component({
  selector: "ngx-planning-slip",
  templateUrl: "./planning-slip.component.html",
  styleUrls: ["./planning-slip.component.scss"],
  providers: [DatePipe],
})
export class PlanningSlipComponent implements OnInit {
  count: any;
  supplierSelected = [];
  itemIndex: number;
  public processTypes = ["Scouring", "Dyeing", "RC", "Cold Wash", "Addition"];

  addNewFlag: boolean = false;
  dyeingProcessStepNew: any;
  dyeingChemicalData = [];
  public currentSlipId: any;
  public loading: boolean = false;
  public formSubmitted: boolean = false;
  public disableButton: boolean = false;
  public isSaved: boolean = false;
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
  public itemListArray1: any = [];
  public colorFlag = false;
  public printFlag = false;
  public saveFlag = false;
  public slipData: any;
  public temp;
  public holdTime;
  public isColor;
  public liquorRatio;
  public list = [];
  public itemList = [
    {
      itemName: String,
      itemId: String,
      qty: Number,
      supplierId: Number,
      supplierName: String,
    },
  ];

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
  }

  async ngOnInit() {
    await this.getItemData();
    if (this.batchId && this.stockId) await this.getSlipDataFromBatch();
    if (this.isPrintDirect) {
      //directly print slip
      this.printSlip();
    }
    if (this.editAdditionFlag) {
      this.getUpdateDataForAdditionSlip();
    }
  }

  get activeModel() {
    return this.activeModal;
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
          this.itemListArray1 = this.itemListArray;
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
            console.log(this.slipData);
            let quantity;
            this.slipData.dyeingSlipDataList.forEach((element) => {
              element.dyeingSlipItemData.forEach((element1) => {
                if (element1.qty) {
                  quantity = element1.qty.toFixed(3);
                }
                element1.qty = quantity;
              });
            });
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
        "itemList" + parentDataIndex + "" + (rowIndex + 1) + "-" + colIndex;
      if (
        rowIndex ===
        this.slipData.dyeingSlipDataList[parentDataIndex].dyeingSlipItemData
          .length -
          1
      ) {
        let item = this.slipData.dyeingSlipDataList[parentDataIndex]
          .dyeingSlipItemData[rowIndex];

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
      this.index = "itemList" + "" + (rowIndex + 1) + "-" + colIndex;

      let obj = {
        itemName: null,
        itemId: null,
        qty: null,
        supplierId: null,
        supplierName: null,
      };
      this.itemList.push(obj);
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

  itemSelected(event, parentIndex) {
    console.log("Event:", event);
    console.log("Index:", parentIndex);

    this.supplierSelected.push(event);
    this.itemIndex = parentIndex;
    // this.itemListArray.forEach((e) => {
    //   if (
    //     e.itemId ==
    //     this.slipData.dyeingSlipDataList[parentIndex].dyeingSlipItemData.itemId
    //   ) {
    //     this.slipData.dyeingSlipDataList[
    //       parentIndex
    //     ].dyeingSlipItemData.supplierName = e.supplierName;
    //     this.slipData.dyeingSlipDataList[
    //       parentIndex
    //     ].dyeingSlipItemData.itemName = e.itemName;
    //   }
    // });
  }

  colorSelected(event, i) {
    this.list = [];
    let colorItemList = [];
    if (event) {
      this.colorFlag = true;
      this.slipData.dyeingSlipDataList[i].dyeingSlipItemData.forEach(
        (element) => {
          if (element.isColor) {
            colorItemList.push(element);
          }
        }
      );
      this.list = colorItemList;
    } else {
      this.colorFlag = false;
      console.log(this.slipData.dyeingSlipDataList[i].dyeingSlipItemData);
      this.list = this.slipData.dyeingSlipDataList[i].dyeingSlipItemData;
      this.itemListArray = this.itemListArray1;
    }
  }

  itemSelected1(event, index) {
    let i_id = event.target.value;
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
  }

  saveSlipData(myForm) {
    this.formSubmitted = true;
    this.disableButton = true;

    if (myForm.valid) {
      if (this.additionSlipFlag) {
        this.slipObj = {
          temp: myForm.value.temp,
          holdTime: myForm.value.holdTime,
          liquorRatio: myForm.value.liquorRatio,
          isColor: myForm.value.isColor,
          items: this.itemList,
        };
        this.isSaved = true;

        if (this.saveFlag) {
          this.activeModal.close(this.slipObj);
        }
      } else {
        this.planningSlipService.updateSlipData(this.slipData).subscribe(
          (data) => {
            if (data["success"]) {
              this.isSaved = true;
              this.toastr.success(data["msg"]);
              if (this.saveClicked) this.activeModal.close();
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
    }
  }

  approveByClicked() {
    const modalRef = this.modalService.open(AddShadeComponent);
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

  removeProcess(processIndex) {
    this.slipData.dyeingSlipDataList.splice(processIndex,1);
  }
  printSlip(myForm?) {
    this.isPrinting = false;
    if (!this.isPrintDirect) {
      this.approveByFlag = true;
      // this.slipData.approvedId = 0;
      this.saveSlipData(myForm);
    } else {
      this.isSaved = true;
      this.getSlipDataFromBatch();
    }
    let interval1 = setInterval(() => {
      if (this.slipData && this.isSaved) {
        clearInterval(interval1);
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
          console.log("ELEMENT:", element);
          if (element) {
            doc.append(element);
            doc.print();
            // this.printFlag = true;
            this.activeModal.close(this.slipObj);
            tempFlag = true;
            clearInterval(inter);
            this.activeModal.close();
          }
        }, 10);
      }
    }, 10);
  }

  addNew() {
    if (this.approveByFlag) {
      this.dyeingChemicalData = [];
      this.supplierSelected = [];
      this.liquorRatio = null;
      this.isColor = false;
      this.count = this.count + 1;
      this.addNewFlag = true;
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

      for (let i = 0; i < this.supplierSelected.length; i++) {
        this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData.push(
          this.dyeingChemicalData[i]
        );

        this.itemListArray.forEach((ele) => {
          if (ele.itemId == this.supplierSelected[i]) {
            this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData[
              i
            ].supplierId = ele.supplierId;
            this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData[
              i
            ].supplierName = ele.supplierName;
            this.slipData.dyeingSlipDataList[this.count].dyeingSlipItemData[
              i
            ].itemName = ele.itemName;
          }
        });
      }
      this.formSubmitted = false;
      this.addNewFlag = false;
    }else{
      this.toastr.error('Please fill all fields.')
    }
  }

  onEnter(e) {
    let keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.dyeingChemicalData.push(new DyeingChemicalData());
    }
  }

  removeChemicalData(index: any) {
    this.dyeingChemicalData.splice(index, 1);
  }
}
