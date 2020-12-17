import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintInvoiceService } from 'app/@theme/services/print-invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  constructor(route: ActivatedRoute,
    private printService: PrintInvoiceService) {
    // this.invoiceIds = route.snapshot.params['invoiceIds']
    //   .split(',');
  }

  ngOnInit() {
    this.invoiceDetails = [101, 102]
      .map(id => this.getInvoiceDetails(id));
    if (this.printService.isPrint) {
      Promise.all(this.invoiceDetails)
        .then(() => this.printService.onDataReady());
    }
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }


}
