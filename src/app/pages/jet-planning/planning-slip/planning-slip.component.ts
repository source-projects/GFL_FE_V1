import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  DyeingChemicalData
} from "app/@theme/model/dyeing-process";
import { DyeingProcessService } from "app/@theme/services/dyeing-process.service";
import { JetPlanningService } from "app/@theme/services/jet-planning.service";
import { PlanningSlipService } from 'app/@theme/services/planning-slip.service';
import { ToastrService } from "ngx-toastr";
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: "ngx-planning-slip",
  templateUrl: "./planning-slip.component.html",
  styleUrls: ["./planning-slip.component.scss"],
})
export class PlanningSlipComponent implements OnInit {
  public currentSlipId: any;

  public loading: boolean = false;
  public formSubmitted: boolean = false;
  public disableButton: boolean = false;
  public isPrinting: boolean = true;
  public index: string;
  @Input() isPrintDirect:boolean;
  @Input() batchEntryId;
  public itemListArray: any = [];
  public slipData: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private jetPlannService: JetPlanningService,
    private toastr: ToastrService,
    private DyeingProcessService: DyeingProcessService,
    private planningSlipService: PlanningSlipService
  ) {}

  ngOnInit(): void {
    this.getItemData();
    this.getSlipDataFromBatch();
    if(this.isPrintDirect){
      //directly print slip
      this.printSlip();
    }
  }

  // get activeModel() {
    
  //   return this.activeModal;
  // }

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

  getSlipDataFromBatch(){
    this.planningSlipService.getSlipDataByBatch(this.batchEntryId).subscribe(
      data=>{
        if(data['success']){
          this.slipData = data['data']
        }else{
          this.toastr.error(data['msg']);
        }
      },error=>{

      }
    )
  }

  onKeyUp(e, rowIndex, colIndex, colName, parentDataIndex) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "itemList" + (rowIndex + 1) + "-" + colIndex;
      if (
        rowIndex ===
        this.slipData[parentDataIndex].dyeingChemicalData.length - 1
      ) {
        let item = this.slipData[parentDataIndex].dyeingChemicalData[rowIndex];

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
        this.slipData[parentDataIndex].dyeingChemicalData.push(obj);
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

  removeItem(rowIndex, parentDataIndex) {
    let idCount = this.slipData[parentDataIndex].dyeingChemicalData.length;
    if (idCount == 1) {
      this.slipData[parentDataIndex].dyeingChemicalData[0].byChemical = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].concentration = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].controlId = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].id = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].itemId = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].itemName = null;
      this.slipData[parentDataIndex].dyeingChemicalData[0].supplierName = null;
    } else {
      let removed = this.slipData[parentDataIndex].dyeingChemicalData.splice(
        rowIndex,
        1
      );
    }
  }

  itemSelected(rowIndex, parentIndex) {
    this.itemListArray.forEach((e) => {
      if (
        e.itemId ==
        this.slipData[parentIndex].dyeingChemicalData[rowIndex].itemId
      ) {
        this.slipData[parentIndex].dyeingChemicalData[rowIndex].supplierName =
          e.supplierName;
        this.slipData[parentIndex].dyeingChemicalData[rowIndex].itemName =
          e.itemName;
      }
    });
  }

  saveSlipData(myForm) {
    this.formSubmitted = true;
    this.disableButton = true;
    if (myForm.valid) {
      this.planningSlipService.updateSlipData(this.slipData).subscribe(
        data=>{
          if(data['success']){
            this.toastr.success(data['msg']);
          }else{
            this.toastr.error(data['msg']);
          }
          this.activeModal.close();
        },
        error=>{
          this.toastr.error("Internal server error!")
          this.activeModal.close();
        }
      );
    }
  }

  printSlip(myForm?) {
    this.isPrinting = false;
    if(!this.isPrintDirect){
      this.saveSlipData(myForm)
    }
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
    let inter = setInterval(()=>{
      let element = <HTMLElement>document.getElementById("print-slip");
      if(element){
        doc.append(element);
        doc.print();
        clearInterval(inter);
        this.activeModal.close();
      }
    },10);
    
  }
}
