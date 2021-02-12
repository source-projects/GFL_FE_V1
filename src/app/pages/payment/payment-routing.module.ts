import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentGuard } from 'app/@theme/guards/payment.guard';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';

const routes: Routes = [
  {
    path: 'bill-payment',
    component: BillPaymentComponent,
    canActivate:[PaymentGuard],
    canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all']}
    
  },
  {
    path: 'advance-payment',
    component: AdvancePaymentComponent,
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
