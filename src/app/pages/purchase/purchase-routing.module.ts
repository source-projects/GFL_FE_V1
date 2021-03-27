import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditPurchaseComponent } from './add-edit-purchase/add-edit-purchase.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditPurchaseComponent,
    // canActivate:[ProductionPlanningGuard],
    // canLoad:[ProductionPlanningGuard],
    // data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'view',
    component:PurchaseComponent,
    // canActivate:[EmployeeRegistrationGuard],
    // canLoad:[EmployeeRegistrationGuard],
    // data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'edit/:id',
    component: AddEditPurchaseComponent,
    // canActivate:[EmployeeRegistrationGuard],
    // canLoad:[EmployeeRegistrationGuard],
    // data: { PermissionName: ['edit','edit group','edit all']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
