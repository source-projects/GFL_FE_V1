import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SharedModule } from '../../@theme/shared.module';
import { SalesReportRoutingModule } from './sales-report.routing.module';



@NgModule({
  declarations: [SalesReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    SalesReportRoutingModule
  ]
})
export class SalesReportModule { }
