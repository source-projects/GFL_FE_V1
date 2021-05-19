import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'ngx-input-batch',
  templateUrl: './input-batch.component.html',
  styleUrls: ['./input-batch.component.scss']
})
export class InputBatchComponent implements OnInit, OnDestroy {
  batchId
  disableButton: boolean = false
  isDirectPrintFlag: boolean = false

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
