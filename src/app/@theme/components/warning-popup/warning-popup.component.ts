import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.scss']
})
export class WarningPopupComponent implements OnInit {

  constructor(private _NgbActiveModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public accept() {
    this.activeModal.close(true);
  } 
}
