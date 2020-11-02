import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public activeModal: NgbActiveModal) {

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
  onCreate() {
    let obj = { 'name': this.stepName, 'position': this.stepPosition };
    this.activeModal.close(obj);
  }
}
