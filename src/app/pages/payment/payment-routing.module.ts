import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: 'bill-payment',
    component: BillPaymentComponent,
  },
  {
    path: 'advance-payment',
    component: AdvancePaymentComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
