import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseGuard } from '../../@theme/guards/purchase.guard';
import { AddEditPurchaseComponent } from './add-edit-purchase/add-edit-purchase.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditPurchaseComponent,
    canActivate:[PurchaseGuard],
    canLoad:[PurchaseGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'view',
    component:PurchaseComponent,
    canActivate:[PurchaseGuard],
    canLoad:[PurchaseGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'edit/:id',
    component: AddEditPurchaseComponent,
    canActivate:[PurchaseGuard],
    canLoad:[PurchaseGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
