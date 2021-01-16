import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: BillPaymentComponent,
  // },
  {
    path: "bill-payment",
    component: BillPaymentComponent,
  },
  {
    path: 'advance-payment',
    component: AdvancePaymentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
