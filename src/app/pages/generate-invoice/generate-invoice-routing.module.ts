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
    // canActivate:[InvoiceGuard],
    // canLoad:[InvoiceGuard],
    data: { PermissionName: ['add'],compName:"dispatch"} 
  },
  {
      path:'view',
      component:GenerateInvoiceComponent,
      // canActivate:[InvoiceGuard],
      // canLoad:[InvoiceGuard],
      data: { PermissionName: ['view','view group','view all'],compName:"dispatch"} 
    },
    {
      path:'sign/view',
      component:ReceivedInvoiceComponent,
      // canActivate:[InvoiceGuard],
      // canLoad:[InvoiceGuard],
      data: { PermissionName: ['view','view group','view all'],compName:"dispatch"} 
    },
  {
    path:'edit/:id',
    component:AddEditInvoiceComponent,
    // canActivate:[InvoiceGuard],
    // canLoad:[InvoiceGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"dispatch"} 
  },
  {
    path:'sign',
    component:SignInvoiceComponent,
    // canActivate:[InvoiceGuard],
    // canLoad:[InvoiceGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"dispatch"} 
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
