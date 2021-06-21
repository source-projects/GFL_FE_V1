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
@NgModule({
  declarations: [StockBatchComponent, AddEditStockBatchComponent, JobCardComponent, InputBatchComponent, AvailableBatchesComponent, LotReturnComponent],
  imports: [
    CommonModule,
    StockBatchRoutingModule,
    SharedModule,
    ThemeModule
  ]
})
export class StockBatchModule { }
