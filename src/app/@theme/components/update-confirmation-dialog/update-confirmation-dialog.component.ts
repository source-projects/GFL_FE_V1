import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-update-confirmation-dialog',
  templateUrl: './update-confirmation-dialog.component.html',
  styleUrls: ['./update-confirmation-dialog.component.scss']
})
export class UpdateConfirmationDialogComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { }
  ngOnInit(): void {} 
  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }   
  

}
