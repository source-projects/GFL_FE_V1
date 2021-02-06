import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';

import { GenerateInvoiceComponent } from './generate-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { PrintLayoutComponent } from './print-Layout/print-layout.component';

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
  },{
    path: 'print',
    component:PrintLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateInvoiceRoutingModule { }
