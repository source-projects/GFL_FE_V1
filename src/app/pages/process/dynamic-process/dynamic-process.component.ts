import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as errorData from "app/@theme/json/error.json";
import {
  ChemicalReq,
  Dosing,
  FunctionObj,
  OperatorMessage,
  ProcessValue,
  PumpControl,
  Step,
  StepsRecordData,
  TempratureControl,
  WaterControl
} from "app/@theme/model/process";
import { CommonService } from "app/@theme/services/common.service";
import { ProcessService } from "app/@theme/services/process.service";
import { ToastrService } from "ngx-toastr";
import { AddFunctionComponent } from "../add-function/add-function.component";
import { AddStepComponent } from "../add-step/add-step.component";

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
  chemicalOb: ChemicalReq[] = [];
  qualityList;
  formSubmitted = false;
  indexOfStep: number = 0;
  selectedStep: any;
  currentProcessId: number;
  public errorData: any = (errorData as any).default;
  constructor(
    private commonService: CommonService,
    private processService: ProcessService,
    private _modalService: NgbModal,
    private toastr: ToastrService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentProcessId = parseInt(this.router.snapshot.paramMap.get("id"));
    this.processValue.steps = [];
    if (this.currentProcessId) this.getUpdateDataOfProcess();
  }

  getUpdateDataOfProcess() {
    this.processService.getProcessById(this.currentProcessId).subscribe(
      (data) => {
        if (data["success"]) {
          this.processValue = data["data"];
          this.setAllValuesForUpdate();
        } 
        // else this.toastr.error(data["msg"]);
      },
      (error) => {
        // this.toastr.error(errorData.Internal_Error);
      }
    );
  }

  setAllValuesForUpdate() {
    this.stepList = [];
    let stepArray = [];
    //set step name position
    if (this.processValue.steps.length) {
      this.processValue.steps.forEach((e) => {
        if (stepArray.findIndex((v) => v == e.stepName) == -1) {
          stepArray.push(e.stepName);
          let s = new Step();
          s.id = e.id;
          s.stepName = e.stepName;
          s.stepNo = e.stepPosotion;
          s.functionList = [];
          this.stepList.push(s);
        }
      });

      //set indiviual function values
      this.processValue.steps.forEach((e) => {
        let stepIndex = this.stepList.findIndex(
          (e1) => e1.stepName == e.stepName
        );
        if (stepIndex > -1) {
          let dosingOb = new Dosing();
          let tempOb = new TempratureControl();
          let pumpOb = new PumpControl();
          let waterOb = new WaterControl();
          let operatorOb = new OperatorMessage();

          if (e.isDosingControl) {
            dosingOb.doseAtTemp = e.doesAtTemp;
            dosingOb.doseType = e.doesType;
            dosingOb.doseWhileHeating = e.doseWhileHeating;
            dosingOb.dosingPercentage = e.dosingPercentage;
            dosingOb.fillType = e.fillType;
            dosingOb.haveDose = e.haveDose;
            dosingOb.dosingChemical = e.dosingChemical;
            this.chemicalOb = [...dosingOb.dosingChemical];
          } else if (e.isOperatorMessage) {
            operatorOb.operatorCode = e.operatorCode;
            operatorOb.operatorMessage = e.operatorMessage;
            operatorOb.startAtTemp = e.startAtTemp;
          } else if (e.isPumpControl) {
            pumpOb.pumpSpeed = e.pumpSpeed;
          } else if (e.isTempControl) {
            tempOb.holdTime = e.holdTime;
            tempOb.pressure = e.pressure;
            tempOb.rateOfRise = e.rateOfRise;
            tempOb.setValue = e.setValue;
          } else if (e.isWaterControl) {
            if (e.drainType) {
              waterOb.type = "drain";
              waterOb.drainType = e.drainType;
            } else {
              waterOb.type = "water";
              waterOb.fabricRatio = e.fabricRatio;
              waterOb.jetLevel = e.jetLevel;
              waterOb.waterType = e.waterType;
            }
          }

          let funcObj = new FunctionObj();
          funcObj.funcValue = e.functionValue;
          funcObj.funcPosition = e.functionPosotion;
          funcObj.funcName = e.functionName;
          funcObj.dosingFunc = dosingOb;
          funcObj.waterControlFunc = waterOb;
          funcObj.tempratureControlFunc = tempOb;
          funcObj.pumpControlFunc = pumpOb;
          funcObj.operatorMessageFunc = operatorOb;
          this.stepList[stepIndex].functionList.push(funcObj);
        }
      });
    }
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

  convertFormAccordingToRequestObj(addFlag) {
    this.processValue.steps = [];
    let i = 1;
    this.stepList.forEach((step) => {
      if (step.functionList.length != 0) {
        let j = 1;
        step.functionList.forEach((func) => {
          let stepObj = new StepsRecordData();
          stepObj.stepPosotion = i;
          stepObj.stepName = step.stepName;

          stepObj.functionName = func.funcName;
          stepObj.functionPosotion = j;
          stepObj.functionValue = func.funcValue;

          if (func.funcValue == "pump") {
            stepObj.isPumpControl = true;
            stepObj.pumpSpeed = func.pumpControlFunc.pumpSpeed;
          } else if (func.funcValue == "operator") {
            stepObj.isOperatorMessage = true;
            stepObj.operatorCode = func.operatorMessageFunc.operatorCode;
            stepObj.operatorMessage = func.operatorMessageFunc.operatorMessage;
            stepObj.startAtTemp = func.operatorMessageFunc.startAtTemp;
          } else if (func.funcValue == "temprature") {
            stepObj.isTempControl = true;
            stepObj.setValue = func.tempratureControlFunc.setValue;
            stepObj.rateOfRise = func.tempratureControlFunc.rateOfRise;
            stepObj.pressure = func.tempratureControlFunc.pressure;
            stepObj.holdTime = func.tempratureControlFunc.holdTime;
          } else if (func.funcValue == "water") {
            stepObj.isWaterControl = true;
            stepObj.drainType = func.waterControlFunc.drainType;
            stepObj.fabricRatio = func.waterControlFunc.fabricRatio;
            stepObj.jetLevel = func.waterControlFunc.jetLevel;
            stepObj.waterType = func.waterControlFunc.waterType;
          } else if (func.funcValue == "dosing") {
            stepObj.isDosingControl = true;
            stepObj.doesAtTemp = func.dosingFunc.doseAtTemp;
            stepObj.doesType = func.dosingFunc.doseType;
            if (stepObj.doesType == "color") {
              stepObj.doseWhileHeating = false;
              func.dosingFunc.dosingChemical = [];
            } else {
              stepObj.doseWhileHeating = func.dosingFunc.doseWhileHeating;
              func.dosingFunc.dosingChemical.forEach((e) => {
                delete e.supplierName;
              });
              stepObj.dosingChemical = func.dosingFunc.dosingChemical;
            }
            stepObj.dosingPercentage = func.dosingFunc.dosingPercentage;
            stepObj.fillType = func.dosingFunc.fillType;
            stepObj.haveDose = func.dosingFunc.haveDose;
          }
          j++;
          if (addFlag) {
            delete stepObj.id;
            delete stepObj.controlId;
          }
          this.processValue.steps.push(stepObj);
        });
      }
      i++;
    });
    //this.processValue.steps.splice(this.processValue.steps.length - 1, 1);
  }

  addProcess(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      if (this.stepList.length != 0) {
        this.convertFormAccordingToRequestObj(1);
        let userHead = this.commonService.getUserHeadId();
        let user = this.commonService.getUser();
        this.processValue.userHeadId = userHead.userHeadId;
        this.processValue.createdBy = user.userId;
        this.processService.saveProcess(this.processValue).subscribe(
          (data) => {
            if (data["success"]) {
              this.route.navigate(["/pages/process"]);
              this.toastr.success(data["msg"]);
            } 
            // else this.toastr.error(data["msg"]);
          },
          (error) => {
            this.toastr.error(errorData.Internal_Error);
          }
        );
      } else {
        return;
      }
    }
  }

  updateProcess(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      this.convertFormAccordingToRequestObj(0);
      let user = this.commonService.getUser();
      this.processValue.updatedBy = user.userId;
      console.log(this.processValue.steps);
      this.processService.updateProcess(this.processValue).subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(errorData.Update_Success);
            this.route.navigate(["pages/process"]);
          }
          //  else {
          //   this.toastr.error(data["msg"]);
          // }
        },
        (error) => {
          this.toastr.error(errorData.Internal_Error);
        }
      );
    }
  }
}
