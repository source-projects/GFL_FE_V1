import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentGuard } from '../../@theme/guards/payment.guard';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'bill-payment',
    component: BillPaymentComponent,
    canActivate:[PaymentGuard],
    canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all']}
    
  },
  {
    path: 'edit/:id',
    component: BillPaymentComponent,
    canActivate: [PaymentGuard],
    canLoad: [PaymentGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  },
  {
    path: 'advance-payment',
    component: AdvancePaymentComponent,
    canActivate:[PaymentGuard],
    canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all']}
    
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate:[PaymentGuard],
    canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all']}
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
