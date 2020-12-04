import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dosing, FunctionObj, NewRecordData, OperatorMessage, ProcessValue, PumpControl, Step, StepsRecordData, TempratureControl, WaterControl } from 'app/@theme/model/process';
import { ProcessService } from 'app/@theme/services/process.service';
import { QualityService } from 'app/@theme/services/quality.service';
import { ToastrService } from 'ngx-toastr';
import { AddStepComponent } from '../add-step/add-step.component';
import * as errorData from 'app/@theme/json/error.json';
import { AddFunctionComponent } from '../add-function/add-function.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-dynamic-process',
  templateUrl: './dynamic-process.component.html',
  styleUrls: ['./dynamic-process.component.scss']
})
export class DynamicProcessComponent implements OnInit {
  //form values..
  processValue: ProcessValue = new ProcessValue();
  stepList: Step[] = [];
  newRecordData: NewRecordData[] = [];
  functionListReq: FunctionObj[] = [];
  dosingControl: Dosing[] = [];
  pumpControl: PumpControl[] = [];
  tempratureControl: TempratureControl[] = [];
  waterControl: WaterControl[] = [];
  operatorMessage: OperatorMessage[] = [];
  qualityList;
  formSubmitted = false;
  selectedStep: any;
  public errorData: any = (errorData as any).default;

  constructor(private qualityService: QualityService, private processService: ProcessService,
    private _modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getQualityList();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
      return false;
    }
    return true;
  }

  // getQualityList() {
  //   this.qualityService.getallQuality(0, "all").subscribe(
  //     data => {
  //       if (data["success"])
  //         this.qualityList = data["data"];
  //     }, error => {
  //       this.toastr.error(errorData.Serever_Error);
  //     }
  //   )
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.stepList, event.previousIndex, event.currentIndex);
  //   this.stepList.forEach((ele, index) => {
  //     // ele.stepPosition = index + 1;
  //   })
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stepList, event.previousIndex, event.currentIndex);
    console.log("CALLED IN")
  }


  dropFunction(event: CdkDragDrop<string[]>, stepPosition) {
    moveItemInArray(this.stepList[stepPosition - 1].functionList, event.previousIndex, event.currentIndex);
    this.stepList[stepPosition - 1].functionList.forEach((ele, index) => {
      ele.funcPosition = index + 1;
    })
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
        if (!this.stepList.length || result.position == this.stepList.length + 1) {
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
    modalRef.result
      .then((result) => {
        if (result) {
          this.stepList[step.stepNo - 1].stepName = result.name;
        }
      });
  }

  onDeleteStep(step) {
    let i = this.stepList.findIndex(v => v.stepNo == step.stepPosition);
    this.stepList.splice(i, 1);
  }

  onDeleteFunction(func) {
    let functionList = this.stepList[this.selectedStep - 1].functionList;
    let i = functionList.findIndex(v => v.funcPosition == func.funcPosition);
    functionList.splice(i, 1);
  }

  onEditFunction(func) {
    const modalRef = this._modalService.open(AddFunctionComponent);
    let functionList = this.stepList[this.selectedStep - 1].functionList;
    modalRef.componentInstance.position = func.funcPosition;
    modalRef.componentInstance.functionList = functionList;
    modalRef.componentInstance.editFunction = true;
    modalRef.result
      .then((result) => {
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
    modalRef.result
      .then((result) => {
        if (result) {
          let func = new FunctionObj();
          console.log(result)
          func = result;
          this.functionListReq.push(func)
          if (!functionList.length || result.funcPosition == functionList.length + 1) {
            functionList.push(func);
          } else {
            functionList.splice(result.funcPosition - 1, 0, func);
          }
        }
      });
  }

  addProcess(myForm) {
    this.formSubmitted = true;
    console.log("My FOrm", myForm)
    console.log(this.processValue);
    if (myForm.valid) {
      if (this.stepList.length != 0) {
        console.log(this.stepList);
        console.log(this.processValue);
        let i = 0

        console.log(this.functionListReq)
        this.stepList.forEach(step => {
          if (step.functionList.length) {
            step.functionList.forEach(func => {
              let dataRecord = new NewRecordData();
              dataRecord.stepName = step.stepName;
              dataRecord.functionName = func.funcName;
              dataRecord.stepPosotion = step.stepNo;
              dataRecord.functionPosotion = func.funcPosition;
              dataRecord.functionValue = func.funcValue;

              if (dataRecord.functionValue == "pump") {
                this.pumpControl.push({ pumpSpeed: func.pumpControlFunc.pumpSpeed })
                this.pumpControl.forEach(element => {
                  dataRecord.pumpSpeed = element.pumpSpeed;
                });
              }
              else {
                dataRecord.pumpSpeed = null;
              }

              if (dataRecord.functionValue == "operator") {
                console.log(func.operatorMessageFunc)
                this.operatorMessage.push(
                  {
                    operatorCode: func.operatorMessageFunc.operatorCode,
                    operatorMessage: func.operatorMessageFunc.operatorMessage,
                    startAtTemp: func.operatorMessageFunc.startAtTemp
                  })
                this.operatorMessage.forEach(element => {
                  dataRecord.operatorCode = element.operatorCode;
                  dataRecord.operatorMessage = element.operatorMessage;
                  dataRecord.startAtTemp = element.startAtTemp;
                });
              } else {
                dataRecord.operatorCode = null;
                dataRecord.operatorMessage = null;
                dataRecord.startAtTemp = null;
              }

              if (dataRecord.functionValue == "temperature") {
                // this.tempratureControl.push(
                //   setValue: func.tempratureControlFunc.setValue,
                //   rateOfRise: func.tempratureControlFunc.rateOfRise,
                //   holdTime: func.tempratureControlFunc.holdTime,
                //   pressure: func.tempratureControlFunc.pressure,
                // )
                console.log(func.tempratureControlFunc)
              }
              else {
                dataRecord.setValue = null;
                dataRecord.rateOfRise = null;
                dataRecord.holdTime = null;
                dataRecord.pressure = null;
              }

              if (dataRecord.functionValue == "water") {
                this.waterControl.push({
                  type: func.waterControlFunc,
                  waterType: func.waterControlFunc.waterType,
                  drainType: func.waterControlFunc.drainType,
                  fabricRatio: func.waterControlFunc.fabricRatio,
                  jetLevel: func.waterControlFunc.jetLevel,
                })
                this.waterControl.forEach(element => {
                  dataRecord.waterType = element.waterType;
                  dataRecord.drainType = element.drainType;
                  dataRecord.fabricRatio = element.fabricRatio;
                  dataRecord.jetLevel = element.jetLevel;
                });
              } else {
                dataRecord.waterType = null;
                dataRecord.drainType = null;
                dataRecord.fabricRatio = null;
                dataRecord.jetLevel = null;
              }

              if (dataRecord.functionValue == "dosing") {
                this.dosingControl.push({
                  haveDose: func.dosingFunc.haveDose,
                  doseAtTemp: func.dosingFunc.doseAtTemp,
                  fillType: func.dosingFunc.fillType,
                  dosingPercentage: func.dosingFunc.dosingPercentage,
                  doseWhileHeating: func.dosingFunc.doseWhileHeating,
                  doseType: func.dosingFunc.doseType,
                  dosingChemical: func.dosingFunc.dosingChemical
                })
                this.dosingControl.forEach(element => {
                  dataRecord.haveDose = element.haveDose;
                  dataRecord.doesAtTemp = element.doseAtTemp;
                  dataRecord.fillType = element.fillType;
                  dataRecord.dosingPercentage = element.dosingPercentage;
                  dataRecord.doseWhileHeating = element.doseWhileHeating;
                  dataRecord.doesType = element.doseType;
                });
              } else {
                dataRecord.haveDose = null;
                dataRecord.doesAtTemp = null;
                dataRecord.fillType = null;
                dataRecord.dosingPercentage = null;
                dataRecord.doseWhileHeating = null;
                dataRecord.doesType = null;
              }
              this.newRecordData.push(dataRecord)
            });
          }
          // this.functionListReq.forEach(elementFunction => {
          //   this.processValue.steps[i].stepName = element.stepName;
          //   this.processValue.steps[i].stepPosotion = element.stepNo;
          //   console.log(elementFunction)
          // });
          i++;
        });
        this.processValue.steps = this.newRecordData;
        console.log(this.processValue)
        console.log(this.processValue.steps)
      }
      else {
        console.log("Null");
      }

    }
    else {
      return
    }
  }
}
