import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-input-invoice',
  templateUrl: './input-invoice.component.html',
  styleUrls: ['./input-invoice.component.scss']
})
export class InputInvoiceComponent implements OnInit {

  invoiceNo;
  finalcheckedrows = [];
  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(private activeModal: NgbActiveModal,private router:Router) { }

  ngOnInit(): void {
  }

  printInvoice() {
    if (this.invoiceNo) {
      this.finalcheckedrows.push(this.invoiceNo);
      const queryParams: any = {};
      const arrayOfValues = this.finalcheckedrows;
      if (arrayOfValues.length != 0) {
        queryParams.myArray = JSON.stringify(arrayOfValues);
        const navigationExtras: NavigationExtras = {
          queryParams,
        };

        this.activeModal.close();
        this.router.navigate(
          ["/pages/generate_invoice/print/"],
          navigationExtras
        );

        this.activeModal.close();
      }

    }
  }

  closeModal() {
    this.activeModal.close()
  }
}
