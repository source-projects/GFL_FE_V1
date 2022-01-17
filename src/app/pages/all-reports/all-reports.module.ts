import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../@theme/shared.module';
import { AllReportsRoutingModule } from './all-reports-routing.module';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { GenerateInvoiceModule } from '../generate-invoice/generate-invoice.module';
import { StockBatchModule } from '../stock-batch/stock-batch.module';
import { GreigeReportComponent } from './greige-report/greige-report.component';



@NgModule({
  declarations: [AllReportsComponent, GreigeReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    AllReportsRoutingModule,
    GenerateInvoiceModule,
    StockBatchModule
  ]
})
export class AllReportsModule { }
