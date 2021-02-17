import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DyeingChemicalData } from "../../../@theme/model/dyeing-process";
import { DyeingProcessService } from "../../../@theme/services/dyeing-process.service";
import { JetPlanningService } from "../../../@theme/services/jet-planning.service";
import { PlanningSlipService } from "../../../@theme/services/planning-slip.service";
import { ToastrService } from "ngx-toastr";
import * as wijmo from "@grapecity/wijmo";
import { DatePipe } from "@angular/common";
// import {AdditionSlip} from  "../../../@theme/model/additon-slip";
// import {DyeingSlipItemDatum} from  "../../../@theme/model/additon-slip";
// import {DyeingSlipData} from "../../../@theme/model/additon-slip";
@Component({
  selector: "ngx-planning-slip",
  templateUrl: "./planning-slip.component.html",
  styleUrls: ["./planning-slip.component.scss"],
  providers: [DatePipe],
})
export class PlanningSlipComponent implements OnInit {
  public currentSlipId: any;
  public loading: boolean = false;
  public formSubmitted: boolean = false;
  public disableButton: boolean = false;
  public isSaved: boolean = false;
  public isPrinting: boolean = true;
  public saveClicked: boolean = false;
  public index: string;
  public myDate: any;
  @Input() isPrintDirect: boolean;
  @Input() batchId;
  @Input() stockId;
  @Input() additionSlipFlag: boolean;
  @Input() editAdditionFlag: boolean;
  public itemListArray: any = [];
  public slipData: any;
  public temp;
  public holdTime;
  public isColor;
  public liquorRatio;
  public itemList=[{
    itemId:String,
    quantity:Number,
  }]

  planningSlipArray = [
    {
      temp: null,
      holdTime:null,
      color:null,
      itemList: [
        {
          itemName: null,
          quantity: null,
        },
      ],
    },
  ];

  //dyeingData:DyeingSlipData = new DyeingSlipData();
  //dyeingSlipDataList:DyeingSlipDataList = new DyeingSlipDataList();

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private DyeingProcessService: DyeingProcessService,
    private planningSlipService: PlanningSlipService
  ) {
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");
  }

  ngOnInit(): void {
    console.log(this.additionSlipFlag , this.batchId,this.stockId)
    this.getItemData();
    if (this.batchId && this.stockId) this.getSlipDataFromBatch();
    if (this.isPrintDirect) {
      //directly print slip
      this.printSlip();
    }
    // if(this.editAdditionFlag){
    //   this.getAdditionSlipData();
    // }
  }
  // get activeModal() {
  //   return this._NgbActiveModal;
  // }

  get activeModel() {

    return this.activeModal;
  }

  getItemData() {
    this.DyeingProcessService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemListArray = data["data"];
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
            console.log(this.slipData)

            
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

  onKeyUp1(e, rowIndex, colIndex, colName){
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index =
        "itemList" + "" + (rowIndex + 1) + "-" + colIndex;

        let obj = {
          itemId : null,
          quantity : null
        }
    
        this.itemList.push(obj);
            
    }



   
       

  }

  removeItem1(rowIndex){
    this.itemList.splice(rowIndex , 1);
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

  itemSelected(rowIndex, parentIndex) {
    this.itemListArray.forEach((e) => {
      if (
        e.itemId ==
        this.slipData.dyeingSlipDataList[parentIndex].dyeingSlipItemData.itemId
      ) {
        this.slipData.dyeingSlipDataList[
          parentIndex
        ].dyeingSlipItemData.supplierName = e.supplierName;
        this.slipData.dyeingSlipDataList[
          parentIndex
        ].dyeingSlipItemData.itemName = e.itemName;
      }
    });
  }

  saveSlipData(myForm) {
    console.log(myForm.value);
    this.formSubmitted = true;
    this.disableButton = true;
    if (myForm.valid) {
    if(this.additionSlipFlag){
      let slipObj = {
        temp : myForm.value.temp,
        holdTime : myForm.value.holdTime,
        liquorRatio : myForm.value.liquorRatio,
        isColor : myForm.value.isColor,
        items : this.itemList


      }
      this.activeModal.close(slipObj);
    }else{
      this.planningSlipService.updateSlipData(this.slipData).subscribe(
        (data) => {
          if (data["success"]) {
            this.isSaved = true;
            this.toastr.success(data["msg"]);
            if(this.saveClicked)
            this.activeModal.close();
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

  printSlip(myForm?) {
    this.isPrinting = false;
    if (!this.isPrintDirect) {
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
          if (element) {
            doc.append(element);
            doc.print();
            tempFlag = true;
            clearInterval(inter);
            this.activeModal.close();
          }
        }, 10);
      }
    }, 10);
    
  }



  addNew(e) {
    console.log("usdhj");
    // var ob = new BatchCard();
    // ob.batchMW.push(new BatchMrtWt());
    // if (this.stockDataValues.length) {
    //   let index = this.stockDataValues.findIndex((v) => v.batchId == null);
    //   if (index > -1 || this.flag) {
    //     this.toastr.error("Please fill all the required fields");
    //   } else {
    //     let itemList = [...this.stockDataValues];
    //     itemList = _.sortBy(itemList, "batchId", "asc");
    //     let nextBatchId = itemList[itemList.length - 1].batchId;
    //     ob.batchId = (++nextBatchId);
    //     this.stockDataValues.push({ ...ob });
    //     const className = "collapsible-panel--expanded";
    //     if (e.target.classList.contains(className)) {
    //       e.target.classList.remove(className);
    //     } else {
    //       e.target.classList.add(className);
    //     }
    //   }
    // }
  }

  removeBatch(index) {
  //   if (this.stockDataValues.length == 1) {
  //     this.stockDataValues[0] = new BatchCard();
  //     this.stockDataValues[0].batchMW.push(new BatchMrtWt());
  //    }else {
  //     this.stockDataValues.splice(index, 1);
  //   }
   }
}
