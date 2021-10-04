import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockBatchRoutingModule } from './stock-batch-routing.module';
import { StockBatchComponent } from './stock-batch.component';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { JobCardComponent } from './job-card/job-card.component';
import { InputBatchComponent } from './input-batch/input-batch.component';
import { AvailableBatchesComponent } from './available-batches/available-batches.component';
import { LotReturnComponent } from './lot-return/lot-return.component';
import { PrintLotReturnComponent } from './print-lot-return/print-lot-return.component';
import { LotReturnViewComponent } from './lot-return-view/lot-return-view.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { ReportComponent } from './report/report.component';
@NgModule({
  declarations: [StockBatchComponent, AddEditStockBatchComponent, JobCardComponent, InputBatchComponent, AvailableBatchesComponent, LotReturnComponent, PrintLotReturnComponent, LotReturnViewComponent, ReportComponent, StockInComponent],
  imports: [
    CommonModule,
    StockBatchRoutingModule,
    SharedModule,
    ThemeModule
  ]
})
export class StockBatchModule { }
