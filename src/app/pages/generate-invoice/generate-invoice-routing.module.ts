import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';

import { GenerateInvoiceComponent } from './generate-invoice.component';

const routes: Routes = [
  { 
    path: '', 
    component: GenerateInvoiceComponent 
  },
  {
    path:'add',
    component:AddEditInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateInvoiceRoutingModule { }
