import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';

const routes: Routes = [
  {
    path:'',
    component:SupplierComponent
  },
  {
    path:'add',
    component:AddEditSupplierComponent
  },
  {
    path:'cancel',
    component:SupplierComponent
  },
  {
    path:'edit/:id',
    component:AddEditSupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
