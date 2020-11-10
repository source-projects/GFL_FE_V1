import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { AddEditSupplierRateComponent } from './add-edit-supplier-rate/add-edit-supplier-rate.component';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';

const routes: Routes = [
  {
    path:'',
    component:SupplierComponent,
    canLoad:[SupplierGuard]
  },
  {
    path:'add',
    component:AddEditSupplierComponent
  },
  {
    path:'addSupplierRate',
    component:AddEditSupplierRateComponent
  },
  {
    path:'editSupplierRate/:id',
    component:AddEditSupplierRateComponent
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
