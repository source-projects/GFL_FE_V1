import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'bill-payment',
    component: BillPaymentComponent,
    // canActivate:[PaymentGuard],
    // canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"payment"}
    
  },
  {
    path: 'advance-payment',
    component: AdvancePaymentComponent,
    // canActivate:[PaymentGuard],
    // canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"payment"}
    
  },
  {
    path: 'payment',
    component: PaymentComponent,
    // canActivate:[PaymentGuard],
    // canLoad:[PaymentGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"payment"}
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
