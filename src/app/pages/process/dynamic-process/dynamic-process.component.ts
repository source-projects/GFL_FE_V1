import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FunctionObj, Step } from 'app/@theme/model/process';
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
  formValues = {
    processName: null,
    time: null,
  }
  stepList: Step[] = [];
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stepList, event.previousIndex, event.currentIndex);
    this.stepList.forEach((ele, index) => {
      // ele.stepPosition = index + 1;
    })
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
          func = result;
          if (!functionList.length || result.funcPosition == functionList.length + 1) {
            functionList.push(func);
          } else {
            functionList.splice(result.funcPosition - 1, 0, func);
          }
        }
      });
  }

  onSubmit(myForm) {
    this.formSubmitted = true;
  }
}
