import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockBatchRoutingModule } from './stock-batch-routing.module';
import { StockBatchComponent } from './stock-batch.component';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { SharedModule } from 'app/@theme/shared.module';
import { ThemeModule } from 'app/@theme/theme.module';
import { JobCardComponent } from './job-card/job-card.component';
@NgModule({
  declarations: [StockBatchComponent, AddEditStockBatchComponent, JobCardComponent],
  imports: [
    CommonModule,
    StockBatchRoutingModule,
    SharedModule,
    ThemeModule
  ]
})
export class StockBatchModule { }
