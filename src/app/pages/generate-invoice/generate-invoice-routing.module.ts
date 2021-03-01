import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceGuard } from 'app/@theme/guards/invoice.guard';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';

import { GenerateInvoiceComponent } from './generate-invoice.component';
import { InvoiceReportComponent } from './invoice-report/invoice-report.component';
import { PrintLayoutComponent } from './print-Layout/print-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: AddEditInvoiceComponent,
    canActivate:[InvoiceGuard],
    canLoad:[InvoiceGuard],
    data: { PermissionName: ['add']} 
  },
  {
      path:'view',
      component:GenerateInvoiceComponent,
      canActivate:[InvoiceGuard],
      canLoad:[InvoiceGuard],
      data: { PermissionName: ['view','view group','view all']} 
    },
  {
    path:'edit/:id',
    component:AddEditInvoiceComponent,
    canActivate:[InvoiceGuard],
    canLoad:[InvoiceGuard],
    data: { PermissionName: ['edit','edit group','edit all']} 
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
