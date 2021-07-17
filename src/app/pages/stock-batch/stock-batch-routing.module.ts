import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockBatchGuard } from '../../@theme/guards/stock-batch.guard';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { AvailableBatchesComponent } from './available-batches/available-batches.component';
import { LotReturnViewComponent } from './lot-return-view/lot-return-view.component';
import { LotReturnComponent } from './lot-return/lot-return.component';
import { PrintLotReturnComponent } from './print-lot-return/print-lot-return.component';
import { ReportComponent } from './report/report.component';
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
    path: 'pending',
    component: AvailableBatchesComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path: 'return-lot',
    component: LotReturnComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path: 'return-lot/view',
    component: LotReturnViewComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path: 'return-lot/print',
    component: PrintLotReturnComponent,
    canActivate: [StockBatchGuard],
    canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all']}
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
