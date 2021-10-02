import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { SharedModule } from '../../@theme/shared.module';
import { PaymentReportRoutingModule } from './payment-report.routing.module';



@NgModule({
  declarations: [PaymentReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaymentReportRoutingModule
  ]
})
export class PaymentReportModule { }
