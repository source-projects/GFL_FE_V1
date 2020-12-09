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
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['view']}
  },
  {
    path:'add',
    component:AddEditSupplierComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'addSupplierRate',
    component:AddEditSupplierRateComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['addSupplierRate']}
  },
  {
    path:'editSupplierRate/:id',
    component:AddEditSupplierRateComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['editSupplierRate']}
  },
  {
    path:'edit/:id',
    component:AddEditSupplierComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['edit']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[SupplierGuard]
})
export class SupplierRoutingModule { }
