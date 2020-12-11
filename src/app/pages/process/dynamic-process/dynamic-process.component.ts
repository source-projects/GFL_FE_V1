import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  Dosing,
  FunctionObj,
  OperatorMessage,
  ProcessValue,
  PumpControl,
  Step,
  TempratureControl,
  WaterControl,
} from "app/@theme/model/process";
import { ProcessService } from "app/@theme/services/process.service";
import { QualityService } from "app/@theme/services/quality.service";
import { ToastrService } from "ngx-toastr";
import { AddStepComponent } from "../add-step/add-step.component";
import * as errorData from "app/@theme/json/error.json";
import { AddFunctionComponent } from "../add-function/add-function.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: "ngx-dynamic-process",
  templateUrl: "./dynamic-process.component.html",
  styleUrls: ["./dynamic-process.component.scss"],
})
export class DynamicProcessComponent implements OnInit {
  //form values..
  processValue: ProcessValue = new ProcessValue();

  stepList: Step[] = [];
  functionListReq: FunctionObj[] = [];
  dosingControl: Dosing[] = [];
  pumpControl: PumpControl[] = [];
  tempratureControl: TempratureControl[] = [];
  waterControl: WaterControl[] = [];
  operatorMessage: OperatorMessage[] = [];
  qualityList;
  formSubmitted = false;
  indexOfStep: number = 0;
  selectedStep: any;
  public errorData: any = (errorData as any).default;

  constructor(
    private commonService: CommonService,
    private processService: ProcessService,
    private _modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //this.getQualityList();
    this.processValue.steps = [
      {
      dosingPercentage: "",
      drainType: "",
      fabricRatio: "",
      fillType: "",
      functionName: "",
      functionPosotion: 0,
      functionValue: "",
      haveDose: false,
      holdTime: "",
      isDosingControl: false,
      isOperatorMessage: false,
      isPumpControl: false,
      isTempControl: false,
      isWaterControl: false,
      jetLevel: false,
      doseWhileHeating: "",
      operatorCode: "",
      operatorMessage: "",
      pressure: "",
      pumpSpeed: 0,
      rateOfRise: "",
      setValue: "",
      startAtTemp: "",
      stepName: "",
      stepPosotion: 0,
      waterType: "",
      doesAtTemp: "",
      doesType: "",
      dosingChemical: [],
    }
  ]
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57 || charCode == 47)) {
      return false;
    }
    return true;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stepList, event.previousIndex, event.currentIndex);
    console.log("CALLED IN");
  }

  dropFunction(event: CdkDragDrop<string[]>, stepPosition) {
    moveItemInArray(
      this.stepList[stepPosition - 1].functionList,
      event.previousIndex,
      event.currentIndex
    );
    this.stepList[stepPosition - 1].functionList.forEach((ele, index) => {
      ele.funcPosition = index + 1;
    });
  }

  onAddStep() {
    const modalRef = this._modalService.open(AddStepComponent);
    modalRef.componentInstance.position = this.stepList.length + 1;
    modalRef.componentInstance.stepList = this.stepList;
    modalRef.componentInstance.editStep = false;
    modalRef.result.then((result) => {
      if (result) {
        let step = new Step();
        step.stepName = result.name;
        step.stepNo = result.position;
        step.functionList = [];
        if (
          !this.stepList.length ||
          result.position == this.stepList.length + 1
        ) {
          this.stepList.push(step);
        } else {
          this.stepList.splice(result.position - 1, 0, step);
        }
      }
    });
  }

  onEditStep(step) {
    const modalRef = this._modalService.open(AddStepComponent);
    modalRef.componentInstance.position = step.stepNo;
    modalRef.componentInstance.stepList = this.stepList;
    modalRef.componentInstance.editStep = true;
    modalRef.result.then((result) => {
      if (result) {
        this.stepList[step.stepNo - 1].stepName = result.name;
      }
    });
  }

  onDeleteStep(step) {
    let i = this.stepList.findIndex((v) => v.stepNo == step.stepPosition);
    this.stepList.splice(i, 1);
  }

  onDeleteFunction(func) {
    let functionList = this.stepList[this.selectedStep - 1].functionList;
    let i = functionList.findIndex((v) => v.funcPosition == func.funcPosition);
    functionList.splice(i, 1);
  }

  onEditFunction(func) {
    const modalRef = this._modalService.open(AddFunctionComponent);
    let functionList = this.stepList[this.selectedStep - 1].functionList;
    modalRef.componentInstance.position = func.funcPosition;
    modalRef.componentInstance.functionList = functionList;
    modalRef.componentInstance.editFunction = true;
    modalRef.result.then((result) => {
      if (result) {
        functionList[func.funcPosition - 1] = result;
      }
    });
  }

  onStepClick(step) {
    this.selectedStep = step.stepNo;
  }
  onAddFunction(step) {
    if (step) {
      this.selectedStep = step.stepNo;
    }
    const modalRef = this._modalService.open(AddFunctionComponent);
    let functionList = this.stepList[this.selectedStep - 1].functionList;
    modalRef.componentInstance.position = functionList.length + 1;
    modalRef.componentInstance.functionList = functionList;
    modalRef.componentInstance.editFunction = false;
    modalRef.result.then((result) => {
      if (result) {
        let func = new FunctionObj();
        console.log(result);
        func = result;
        this.functionListReq.push(func);
        if (
          !functionList.length ||
          result.funcPosition == functionList.length + 1
        ) {
          functionList.push(func);
        } else {
          functionList.splice(result.funcPosition - 1, 0, func);
        }
      }
    });
  }

  pushAndSetNullInStep(){
    this.processValue.steps.push(
      {
        dosingPercentage: "",
        drainType: "",
        fabricRatio: "",
        fillType: "",
        functionName: "",
        functionPosotion: 0,
        functionValue: "",
        haveDose: false,
        holdTime: "",
        isDosingControl: false,
        isOperatorMessage: false,
        isPumpControl: false,
        isTempControl: false,
        isWaterControl: false,
        jetLevel: false,
        doseWhileHeating: "",
        operatorCode: "",
        operatorMessage: "",
        pressure: "",
        pumpSpeed: 0,
        rateOfRise: "",
        setValue: "",
        startAtTemp: "",
        stepName: "",
        stepPosotion: 0,
        waterType: "",
        doesAtTemp: "",
        doesType: "",
        dosingChemical: [],
      }
    ) 
    this.indexOfStep++;
  }

  addProcess(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      if (this.stepList.length != 0) {
        let i = 0
        //this.pushAndSetNullInStep()
        this.stepList.forEach((step) => {
          //let processData = new StepsRecordData(); 
          if (step.functionList.length != 0) {
            let j = 0;
            step.functionList.forEach((func) => {
              this.processValue.steps[this.indexOfStep].stepPosotion = i;
              this.processValue.steps[this.indexOfStep].stepName = step.stepName;
              
              this.processValue.steps[this.indexOfStep].functionName = func.funcName;
              this.processValue.steps[this.indexOfStep].functionPosotion = j;
              this.processValue.steps[this.indexOfStep].functionValue = func.funcValue;

              if (func.funcValue == "pump") {
                this.processValue.steps[this.indexOfStep].isPumpControl = true;
                this.processValue.steps[this.indexOfStep].pumpSpeed = func.pumpControlFunc.pumpSpeed;
              } else if (func.funcValue == "operator") {
                this.processValue.steps[this.indexOfStep].isOperatorMessage = true;
                this.processValue.steps[this.indexOfStep].operatorCode =
                  func.operatorMessageFunc.operatorCode;
                this.processValue.steps[this.indexOfStep].operatorMessage =
                  func.operatorMessageFunc.operatorMessage;
                this.processValue.steps[this.indexOfStep].startAtTemp = func.operatorMessageFunc.startAtTemp;
              } else if (func.funcValue == "temprature") {
                this.processValue.steps[this.indexOfStep].isTempControl = true;
                this.processValue.steps[this.indexOfStep].setValue = func.tempratureControlFunc.setValue;
                this.processValue.steps[this.indexOfStep].rateOfRise = func.tempratureControlFunc.rateOfRise;
                this.processValue.steps[this.indexOfStep].pressure = func.tempratureControlFunc.pressure;
                this.processValue.steps[this.indexOfStep].holdTime = func.tempratureControlFunc.holdTime;
              } else if (func.funcValue == "water") {
                this.processValue.steps[this.indexOfStep].isWaterControl = true;
                this.processValue.steps[this.indexOfStep].drainType = func.waterControlFunc.drainType;
                this.processValue.steps[this.indexOfStep].fabricRatio = func.waterControlFunc.fabricRatio;
                this.processValue.steps[this.indexOfStep].jetLevel = func.waterControlFunc.jetLevel;
                this.processValue.steps[this.indexOfStep].waterType = func.waterControlFunc.waterType;
              } else if (func.funcValue == "dosing") {
                this.processValue.steps[this.indexOfStep].isDosingControl = true;
                this.processValue.steps[this.indexOfStep].doesAtTemp = func.dosingFunc.doseAtTemp;
                this.processValue.steps[this.indexOfStep].doesType = func.dosingFunc.doseType;
                this.processValue.steps[this.indexOfStep].doseWhileHeating = func.dosingFunc.doseWhileHeating;
                func.dosingFunc.dosingChemical.forEach(e=>{
                  delete e.supplierName
                })
                this.processValue.steps[this.indexOfStep].dosingChemical = func.dosingFunc.dosingChemical;
                this.processValue.steps[this.indexOfStep].dosingPercentage = func.dosingFunc.dosingPercentage;
                this.processValue.steps[this.indexOfStep].fillType = func.dosingFunc.fillType;
                this.processValue.steps[this.indexOfStep].haveDose = func.dosingFunc.haveDose;
              }
              j++;
              this.pushAndSetNullInStep();
            });
          }
          i++;
        });
        this.processValue.steps.splice(this.processValue.steps.length-1, 1)
        let userHead = this.commonService.getUserHeadId();
        let user = this.commonService.getUser();
        this.processValue.userHeadId = userHead.userHeadId
        this.processValue.createdBy = user.userId
        this.processService.saveProcess(this.processValue).subscribe(
          data=>{
            if(data['success'])
              this.toastr.success(data['msg'])
              else
              this.toastr.error(data['msg'])
          },error=>{
            this.toastr.error(errorData.Internal_Error)
          }
        )
      } else {
        console.log("Null");
      }
    } else {
      return;
    }
  }
}
