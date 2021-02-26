import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { StockBatchComponent } from './stock-batch.component';

const routes: Routes = [
  {
    path: '',
    component: AddEditStockBatchComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['add']}
  },
  {
    path: 'view',
    component: StockBatchComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
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
    data: { PermissionName: ['edit','edit group','edit all']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [StockBatchGuard]
})
export class StockBatchRoutingModule { }
