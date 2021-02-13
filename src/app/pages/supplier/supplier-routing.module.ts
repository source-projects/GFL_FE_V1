import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { AddEditSupplierRateComponent } from './add-edit-supplier-rate/add-edit-supplier-rate.component';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';
import {SupplierRateGuard} from 'app/@theme/guards/supplier-rate.guard';
const routes: Routes = [
  {
    path:'',
    component:SupplierComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['view','view group','view all']}
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
    canActivate:[SupplierRateGuard],
    canLoad:[SupplierRateGuard],
    data: { PermissionName: ['add']}

  },
  {
    path:'editSupplierRate/:id',
    component:AddEditSupplierRateComponent,
    canActivate:[SupplierRateGuard],
    canLoad:[SupplierRateGuard],
    data: { PermissionName: ['edit','edit group','edit all']}

  },
  {
    path:'edit/:id',
    component:AddEditSupplierComponent,
    canActivate:[SupplierGuard],
    canLoad:[SupplierGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[SupplierGuard]
})
export class SupplierRoutingModule { }
