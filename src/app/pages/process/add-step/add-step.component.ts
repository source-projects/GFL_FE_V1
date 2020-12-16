import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-step',
  templateUrl: './add-step.component.html',
  styleUrls: ['./add-step.component.scss']
})
export class AddStepComponent implements OnInit {

  stepName = '';
  @Input() position;
  stepPosition = 1;
  positionValues = [];
  @Input() stepList = [];
  @Input() editStep: any;
  submitButton = "Add";
  modalSubmitted: boolean = false;
  public errorData: any = (errorData as any).default;

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService) {

  }

  ngOnInit() {
    if (!this.editStep) {
      if (this.position > 0) {
        this.stepPosition = this.position;
        for (let i = 1; i <= this.position; i++) {
          this.positionValues.push(i);
        }
      }
    } else {
      this.submitButton = "Update";
      if (this.position > 0) {
        this.stepPosition = this.position;
        this.stepName = this.stepList[this.position - 1].stepName;
        for (let i = 1; i <= this.stepList.length; i++) {
          this.positionValues.push(i);
        }
      }
    }

  }
  onCreate(myForm) {
    this.modalSubmitted = true
    if (myForm.valid) {
      let obj = { 'name': this.stepName, 'position': this.stepPosition };
      this.activeModal.close(obj);
    }
  }
}
