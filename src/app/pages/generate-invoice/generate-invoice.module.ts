import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateInvoiceRoutingModule } from './generate-invoice-routing.module';
import { GenerateInvoiceComponent } from './generate-invoice.component';
import { SharedModule } from 'app/@theme/shared.module';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';


@NgModule({
  declarations: [GenerateInvoiceComponent, AddEditInvoiceComponent, InvoiceReportComponent],
  imports: [
    CommonModule,
    GenerateInvoiceRoutingModule,
   SharedModule
  ]
})
export class GenerateInvoiceModule { }
