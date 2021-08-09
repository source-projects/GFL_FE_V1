import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { AvailableBatchesComponent } from './available-batches/available-batches.component';
import { LotReturnViewComponent } from './lot-return-view/lot-return-view.component';
import { LotReturnComponent } from './lot-return/lot-return.component';
import { PrintLotReturnComponent } from './print-lot-return/print-lot-return.component';
import { StockBatchComponent } from './stock-batch.component';
import { StockInComponent } from './stock-in/stock-in.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditStockBatchComponent,
 },
  {
    path: 'view',
    component: StockBatchComponent,
  },
  {
    path: 'pending',
    component: AvailableBatchesComponent,
  },
  {
    path: 'return-lot',
    component: LotReturnComponent,
  },
  {
    path: 'return-lot/view',
    component: LotReturnViewComponent,
  },
  {
    path: 'return-lot/print',
    component: PrintLotReturnComponent,
  },
  {
    path: 'edit/:id',
    component: AddEditStockBatchComponent,
 },
  {
    path: 'stock-in',
    component: StockInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StockBatchRoutingModule { }
