import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSupplierRateComponent } from './add-edit-supplier-rate/add-edit-supplier-rate.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { SupplierComponent } from './supplier.component';
const routes: Routes = [
  {
    path:'',
    component:AddEditSupplierComponent,
    // canActivate:[SupplierGuard],
    // canLoad:[SupplierGuard],
    data: { PermissionName: ['add'],compName:"supplier"}
  },
  {
    path:'view',
    component:SupplierComponent,
    // canActivate:[SupplierGuard],
    // canLoad:[SupplierGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"supplier"}
  },
  
  {
    path:'addSupplierRate',
    component:AddEditSupplierRateComponent,
    // canActivate:[SupplierRateGuard],
    // canLoad:[SupplierRateGuard],
    data: { PermissionName: ['add'],compName:"supplier"}

  },
  {
    path:'editSupplierRate/:id',
    component:AddEditSupplierRateComponent,
    // canActivate:[SupplierRateGuard],
    // canLoad:[SupplierRateGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"supplier"}

  },
  {
    path:'edit/:id',
    component:AddEditSupplierComponent,
    // canActivate:[SupplierGuard],
    // canLoad:[SupplierGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"supplier"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class SupplierRoutingModule { }
