import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockBatchRoutingModule } from './stock-batch-routing.module';
import { StockBatchComponent } from './stock-batch.component';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';


@NgModule({
  declarations: [StockBatchComponent, AddEditStockBatchComponent],
  imports: [
    CommonModule,
    StockBatchRoutingModule
  ]
})
export class StockBatchModule { }
