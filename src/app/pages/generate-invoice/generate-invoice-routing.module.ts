import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';

import { GenerateInvoiceComponent } from './generate-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';

const routes: Routes = [
  { 
    path: '', 
    component: GenerateInvoiceComponent 
  },
  {
    path:'add',
    component:AddEditInvoiceComponent
  },
  {
    path:'edit/:id',
    component:AddEditInvoiceComponent,
  },
  {
    path:'report',
    component:InvoiceReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateInvoiceRoutingModule { }
