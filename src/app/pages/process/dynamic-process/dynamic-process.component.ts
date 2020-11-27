import { Component, OnInit } from '@angular/core';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessService } from 'app/@theme/services/process.service';
import { QualityService } from 'app/@theme/services/quality.service';
import { DialogNamePromptComponent } from 'app/pages/modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { AddStepComponent } from '../add-step/add-step.component';

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
  stepList: [
    {
      stepName: null,
      stepNo: null,
    }
  ]
  stepsName: string[] = [];
  qualityList;
  formSubmitted = false;

  constructor(private qualityService: QualityService, private processService: ProcessService,
    private _modalService: NgbModal) { }

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
        //error
      }
    )
  }

  onAddStep() {
    const modalRef = this._modalService.open(AddStepComponent);
    // modalRef.componentInstance.position = this.stepList.length + 1;
    // modalRef.componentInstance.stepList = this.stepList;
    // modalRef.componentInstance.editStep = false;
    // modalRef.result
    //   .then((result) => {
    //     if (result) {
    //       let step = new Step();
    //       step.stepName = result.name;
    //       // step.stepPosition = result.position;
    //       step.functionList = [];
    //       if (!this.stepList.length || result.position == this.stepList.length + 1) {
    //         this.stepList.push(step);
    //       } else {
    //         this.stepList.splice(result.position - 1, 0, step);
    //       }
    //     }
    //   });
  }

  onSubmit(myForm) {
    this.formSubmitted = true;
  }
}
