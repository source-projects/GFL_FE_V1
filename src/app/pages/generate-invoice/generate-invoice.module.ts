import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateInvoiceRoutingModule } from './generate-invoice-routing.module';
import { GenerateInvoiceComponent } from './generate-invoice.component';
import { SharedModule } from '../../@theme/shared.module';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { PrintLayoutComponent } from './print-Layout/print-layout.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReceivedInvoiceComponent } from './received-invoice/received-invoice.component';
import { SignInvoiceComponent } from './sign-invoice/sign-invoice.component';

@NgModule({
  declarations: [GenerateInvoiceComponent, AddEditInvoiceComponent, PrintLayoutComponent, InvoiceReportComponent, ReceivedInvoiceComponent, SignInvoiceComponent],
  imports: [
    CommonModule,
    GenerateInvoiceRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [
    NgbActiveModal,
  ]

})
export class GenerateInvoiceModule { }
