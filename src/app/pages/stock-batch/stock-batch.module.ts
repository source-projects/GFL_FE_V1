import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockBatchRoutingModule } from './stock-batch-routing.module';
import { StockBatchComponent } from './stock-batch.component';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { SharedModule } from 'app/@theme/shared.module';

@NgModule({
  declarations: [StockBatchComponent, AddEditStockBatchComponent],
  imports: [
    CommonModule,
    StockBatchRoutingModule,
    SharedModule
  ]
})
export class StockBatchModule { }
