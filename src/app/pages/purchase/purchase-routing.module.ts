import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPurchaseComponent } from './add-edit-purchase/add-edit-purchase.component';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditPurchaseComponent,
  },
  {
    path:'view',
    component:PurchaseComponent,
 },
  {
    path:'edit/:id',
    component: AddEditPurchaseComponent,
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
