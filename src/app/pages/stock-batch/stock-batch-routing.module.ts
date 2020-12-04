import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchGuard } from 'app/@theme/guards/batch.guard';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { StockBatchComponent } from './stock-batch.component';

const routes: Routes = [
  {
    path: '',
    component: StockBatchComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard]
  },
  {
    path: 'add',
    component: AddEditStockBatchComponent
  },
  {
    path: 'edit/:id',
    component: AddEditStockBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StockBatchGuard]
})
export class StockBatchRoutingModule { }
