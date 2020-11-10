import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchGuard } from 'app/@theme/guards/batch.guard';
import { StockBatchComponent } from './stock-batch.component';

const routes: Routes = [
  {
    path:'',
    component:StockBatchComponent,
    canLoad:[BatchGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockBatchRoutingModule { }
