import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchGuard } from 'app/@theme/guards/batch.guard';
import { AddEditStockBatchComponent } from './add-edit-stock-batch/add-edit-stock-batch.component';
import { StockBatchComponent } from './stock-batch.component';

const routes: Routes = [
  {
    path:'',
    component:StockBatchComponent,
    canActivate:[BatchGuard],
    canLoad:[BatchGuard]
  },
  {
    path:'add',
    component:AddEditStockBatchComponent
  },
  {
    path:'edit',
    component:AddEditStockBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BatchGuard]
})
export class StockBatchRoutingModule { }
