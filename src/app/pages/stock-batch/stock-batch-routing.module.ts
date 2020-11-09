import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockBatchComponent } from './stock-batch.component';

const routes: Routes = [
  {
    path:'',
    component:StockBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockBatchRoutingModule { }
