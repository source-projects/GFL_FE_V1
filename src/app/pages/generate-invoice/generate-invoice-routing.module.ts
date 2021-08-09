import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';
import { GenerateInvoiceComponent } from './generate-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { PrintLayoutComponent } from './print-Layout/print-layout.component';
import { ReceivedInvoiceComponent } from './received-invoice/received-invoice.component';
import { SignInvoiceComponent } from './sign-invoice/sign-invoice.component';


const routes: Routes = [
  { 
    path: '', 
    component: AddEditInvoiceComponent,
  },
  {
      path:'view',
      component:GenerateInvoiceComponent,
    },
    {
      path:'sign/view',
      component:ReceivedInvoiceComponent,
   },
  {
    path:'edit/:id',
    component:AddEditInvoiceComponent,
  },
  {
    path:'sign',
    component:SignInvoiceComponent,
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
