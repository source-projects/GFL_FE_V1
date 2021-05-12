import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'ngx-input-batch',
  templateUrl: './input-batch.component.html',
  styleUrls: ['./input-batch.component.scss']
})
export class InputBatchComponent implements OnInit {
  batchId
  disableButton: boolean = false
  isDirectPrintFlag: boolean = false
  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  printJobCard() {
    console.log(this.batchId)
    if (this.batchId) {
      this.disableButton = true
      this.isDirectPrintFlag = true;
      const modalRef = this.modalService.open(JobCardComponent);
      modalRef.componentInstance.isDirectPrintFlag = this.isDirectPrintFlag;
      modalRef.componentInstance.batchId = this.batchId
      modalRef.result.then((result) => {
        this.activeModal.close()
        this.disableButton = false;
      });
    } else {
      return
    }
  }

  closeModal() {
    this.activeModal.close()
  }

}
