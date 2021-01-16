import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';



@NgModule({
  declarations: [BillPaymentComponent, AdvancePaymentComponent],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
