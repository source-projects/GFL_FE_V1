import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import * as errorData from 'app/@theme/json/error.json';
import {
  ChemicalReq,
  Dosing,
  FunctionObj,
  OperatorMessage,
  PumpControl,
  TempratureControl,
  WaterControl
} from "app/@theme/model/process";
import { ProcessService } from 'app/@theme/services/process.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "ngx-add-function",
  templateUrl: "./add-function.component.html",
  styleUrls: ["./add-function.component.scss"],
})
export class AddFunctionComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  @Input() position;
  @Input() functionList = [];
  @Input() editFunction: any;
  positionValues = [];
  tempFuncPosition = 1;
  funcObj = new FunctionObj();
  dosing = new Dosing();
  tempDosing: any = [];
  tempratureControl = new TempratureControl();
  tempTemprature: any = [];
  pumpControl = new PumpControl();
  tempPump: any = [];
  waterControl = new WaterControl();
  tempWater: any = [];
  operatorMessage = new OperatorMessage();
  tempOperator: any = [];
  chemicalSubRecordArray: ChemicalReq[] = [];
  chemicalSubRecord: ChemicalReq;
  rowChemicalData: any;
  itemListArray: any = [];
  //id of foem-control to set focus
  index:string;
  functionDropdown = [
    { id: "dosing", name: "Dosing" },
    { id: "temprature", name: "Temprature Control" },
    { id: "pump", name: "Pump Control" },
    { id: "water", name: "Water Control" },
    { id: "operator", name: "Operator Message" },
  ];
  waterList = [
    { id: "water1", name: "water1" },
    { id: "water2", name: "water2" },
  ];
  drainTypeList = [
    { id: "Complete Drain (at 0 bar)", name: "Complete Drain (at 0 bar)" },
    { id: "Pressurize Drain (at 1 bar)", name: "Pressurize Drain (at 1 bar)" },
  ];
  fillList = [
    { id: "Post Fill Fresh Water", name: "Post Fill Fresh Water" },
    { id: "Pre Fill Fresh Water", name: "Pre Fill Fresh Water" },
    { id: "Post Fill Machine Water", name: "Post Fill Machine Water" },
    { id: "Pre Fill Machine Water", name: "Pre Fill Machine Water" },
  ];
  fillLevelList = [
    { id: "Level 1", name: "Level 1" },
    { id: "Level 2", name: "Level 2" },
  ];
  operatorMessageList = [
    { id: "1", name: "Load Fabric" },
    { id: "2", name: "UnLoad Fabric" },
    { id: "3", name: "Close the Door" },
    { id: "4", name: "Custom Message" },
  ];
  modalSubmitted: boolean = false;
  submitButton = "ADD";
  supplierList: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private processService: ProcessService
  ) {
    this.chemicalSubRecord = new ChemicalReq();
  }

  ngOnInit(): void {
    if (!this.editFunction) {
      if (this.position > 0) {
        this.funcObj.funcPosition = this.position;
        for (let i = 1; i <= this.position; i++) {
          this.positionValues.push(i);
        }
      }
    } else {
      this.submitButton = "Update";
      if (this.position > 0) {
        this.funcObj.funcPosition = this.position;
        let index = this.functionList.findIndex(
          (v) => v.funcPosition == this.position
        );
        if (index > -1) {
          let ele = this.functionList[index];
          this.funcObj.funcName = ele.funcName;
          this.funcObj.funcPosition = ele.funcPosition;
          this.funcObj.funcValue = ele.funcValue;
          this.dosing = ele.dosingFunc;
          this.waterControl = ele.waterControlFunc;
          this.tempratureControl = ele.tempratureControlFunc;
          this.pumpControl = ele.pumpControlFunc;
          this.operatorMessage = ele.operatorMessageFunc;
        }
        for (let i = 1; i <= this.functionList.length; i++) {
          this.positionValues.push(i);
        }
      }
    }
    this.getItemData();
    this.dosing.dosingChemical.push({
      id: null,
      dynamicProcessRecordId: null,
      itemId: null,
      itemName: null,
      supplierId: null,
      supplierName: null,
      concentration: null,
      lrOrFabricWt: null,
    });
  }

  itemSelected(event, rowIndex  ) {
    this.itemListArray.forEach((e) => {
      if (e.itemId == this.dosing.dosingChemical[rowIndex].itemId){
        this.dosing.dosingChemical[rowIndex].supplierName = e.supplierName;
        this.dosing.dosingChemical[rowIndex].itemName = e.itemName;
        this.dosing.dosingChemical[rowIndex].supplierId = e.supplierId
      }
    });
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "program" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.dosing.dosingChemical.length - 1) {
        let item = this.dosing.dosingChemical[rowIndex];
        
        if (colName == "concentration") {
          if (!item.concentration) {
            // this.toastr.error("Enter concentration");
            return;
          }
        } else if (colName == "lrOrFabricWt") {
          if (!item.lrOrFabricWt) {
            // this.toastr.error("Enter LR/FabricWt");
            return;
          }
        } 
        let obj = {
          id: null,
          dynamicProcessRecordId: null,
          itemId: null,
          itemName: null,
          supplierId: null,
          supplierName: null,
          concentration: null,
          lrOrFabricWt: null,
        };
        let list = this.dosing.dosingChemical;
        this.dosing.dosingChemical.push(obj);
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

  removeItem(rowIndex) {
    let idCount = this.dosing.dosingChemical.length;
    if (idCount == 1) {
      this.dosing.dosingChemical[0].id = null;
      this.dosing.dosingChemical[0].dynamicProcessRecordId = null;
      this.dosing.dosingChemical[0].itemId = null;
      this.dosing.dosingChemical[0].itemName = null;
      this.dosing.dosingChemical[0].supplierName = null;
      this.dosing.dosingChemical[0].concentration = null;
      this.dosing.dosingChemical[0].lrOrFabricWt = null;
    } else {
      let removed = this.dosing.dosingChemical.splice(rowIndex, 1);
    }
  }

  getItemData() {
    this.processService.getAllItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
            this.itemListArray = data["data"];
        } else {
          // this.toastr.error(data["msg"]);
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  onWaterTypeChange() {
    if (this.waterControl.type == "water") {
      this.waterControl.drainType = null;
    } else {
      this.waterControl.jetLevel = 0;
      this.waterControl.fabricRatio = null;
      this.waterControl.waterType = null;
    }
  }

  onDoseTypeChange() {
    if (this.dosing.doseType == "color") {
      this.dosing.doseWhileHeating = false;
      this.dosing.dosingChemical = []
    }else{
      if(!this.itemListArray){
        this.processService.getAllItemWithSupplier().subscribe(
          data=>{
            if(data['success'])
              this.itemListArray = data['data']
            // else
            //   // this.toastr.error(data['msg'])
          },
          error=>{
            //  this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    }
  }

  onSubmit(myForm) {
    this.modalSubmitted = true;
    if (myForm.valid) {
      let i = this.functionDropdown.findIndex(
        (v) => v.id === this.funcObj.funcValue
      );
      if (i > -1) {
        this.funcObj.funcName = this.functionDropdown[i].name;
      } else {
        this.funcObj.funcName = "";
      }
      if (this.funcObj.funcValue === "temprature") {
        this.tempTemprature = this.tempratureControl;
        this.funcObj.tempratureControlFunc = this.tempTemprature;
      } else if (this.funcObj.funcValue === "dosing") {
        this.tempDosing = this.dosing;
        this.funcObj.dosingFunc = this.tempDosing;
      } else if (this.funcObj.funcValue === "operator") {
        let i = this.operatorMessageList.findIndex(
          (v) => v.id === this.operatorMessage.operatorCode
        );
        if (i > -1 && i != 3) {
          this.operatorMessage.operatorMessage = this.operatorMessageList[
            i
          ].name;
        }
        this.tempOperator = this.operatorMessage;
        this.funcObj.operatorMessageFunc = this.tempOperator;
      } else if (this.funcObj.funcValue === "water") {
        this.tempWater = this.waterControl;
        this.funcObj.waterControlFunc = this.tempWater;
      } else if (this.funcObj.funcValue === "pump") {
        this.tempPump = this.pumpControl;
        this.funcObj.pumpControlFunc = this.tempPump;
      }
      this.activeModal.close(this.funcObj);
    } else {
      return;
    }
  }
}
