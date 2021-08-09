import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPurchaseComponent } from './add-edit-purchase/add-edit-purchase.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditPurchaseComponent,
    // canActivate:[PurchaseGuard],
    // canLoad:[PurchaseGuard],
    data: { PermissionName: ['add'],compName:"purchase"}
  },
  {
    path:'view',
    component:PurchaseComponent,
    // canActivate:[PurchaseGuard],
    // canLoad:[PurchaseGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"purchase"}
  },
  {
    path:'edit/:id',
    component: AddEditPurchaseComponent,
    // canActivate:[PurchaseGuard],
    // canLoad:[PurchaseGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"purchase"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
