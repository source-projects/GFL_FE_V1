import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseRequestComponent
  },
  {
    path: 'purchaseRequest',
    component: PurchaseRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseItemRoutingModule { }
