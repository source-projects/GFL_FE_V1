import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { AdvancePaymentComponent } from './advance-payment/advance-payment.component';
import { SharedModule } from '../../@theme/shared.module';
import { PaymentComponent } from './payment/payment.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [BillPaymentComponent, AdvancePaymentComponent, PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    ThemeModule
  ]
})
export class PaymentModule { }
