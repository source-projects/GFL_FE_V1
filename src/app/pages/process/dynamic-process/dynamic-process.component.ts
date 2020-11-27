import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Step } from 'app/@theme/model/process';
import { ProcessService } from 'app/@theme/services/process.service';
import { QualityService } from 'app/@theme/services/quality.service';
import { ToastrService } from 'ngx-toastr';
import { AddStepComponent } from '../add-step/add-step.component';
import * as errorData from 'app/@theme/json/error.json';

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
    this.getQualityList();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 46 || charCode > 57) || charCode == 47)) {
      return false;
    }
    return true;
  }

  getQualityList() {
    this.qualityService.getallQuality(0, "all").subscribe(
      data => {
        if (data["success"])
          this.qualityList = data["data"];
      }, error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  onAddStep() {
    const modalRef = this._modalService.open(AddStepComponent);
    modalRef.componentInstance.position = this.stepList.length + 1;
    modalRef.componentInstance.stepList = this.stepList;
    modalRef.componentInstance.editStep = false;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        let step = new Step();
        step.stepName = result.name;
        step.stepNo = result.position;
        if (!this.stepList.length || result.position == this.stepList.length + 1) {
          this.stepList.push(step);
        } else {
          this.stepList.splice(result.position - 1, 0, step);
        }
        console.log(this.stepList)
        console.log(step)

      }
    });
  }

  onEditStep(step) {
    const modalRef = this._modalService.open(AddStepComponent);
    modalRef.componentInstance.position = step.stepPosition;
    modalRef.componentInstance.stepList = this.stepList;
    modalRef.componentInstance.editStep = true;
    modalRef.result
      .then((result) => {
        if (result) {
          this.stepList[step.stepPosition - 1].stepName = result.name;
        }
      });
  }

  onStepClick(step) {
    this.selectedStep = step.stepPosition;
  }

  onSubmit(myForm) {
    this.formSubmitted = true;
  }
}
