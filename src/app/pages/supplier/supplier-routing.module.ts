import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSupplierRateComponent } from './add-edit-supplier-rate/add-edit-supplier-rate.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { SupplierComponent } from './supplier.component';
const routes: Routes = [
  {
    path:'',
    component:AddEditSupplierComponent,
 },
  {
    path:'view',
    component:SupplierComponent,
  },
  
  {
    path:'addSupplierRate',
    component:AddEditSupplierRateComponent,
 },
  {
    path:'editSupplierRate/:id',
    component:AddEditSupplierRateComponent,
 },
  {
    path:'edit/:id',
    component:AddEditSupplierComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class SupplierRoutingModule { }
