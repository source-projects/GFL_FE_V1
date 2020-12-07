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
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view']}
  },
  {
    path: 'add',
    component: AddEditStockBatchComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['add']}
  },
  {
    path: 'edit/:id',
    component: AddEditStockBatchComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['edit']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StockBatchGuard]
})
export class StockBatchRoutingModule { }
