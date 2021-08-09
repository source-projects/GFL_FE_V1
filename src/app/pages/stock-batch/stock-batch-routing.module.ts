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
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['add'],compName:"stockBatch"}
  },
  {
    path: 'view',
    component: StockBatchComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"stockBatch"}
  },
  {
    path: 'pending',
    component: AvailableBatchesComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"stockBatch"}
  },
  {
    path: 'return-lot',
    component: LotReturnComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"stockBatch"}
  },
  {
    path: 'return-lot/view',
    component: LotReturnViewComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"stockBatch"}
  },
  {
    path: 'return-lot/print',
    component: PrintLotReturnComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"stockBatch"}
  },
  {
    path: 'edit/:id',
    component: AddEditStockBatchComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"stockBatch"}
  },
  {
    path: 'stock-in',
    component: StockInComponent,
    // canActivate: [StockBatchGuard],
    // canLoad: [StockBatchGuard],
    data: { PermissionName: ['add'],compName:"stockBatch"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StockBatchRoutingModule { }
