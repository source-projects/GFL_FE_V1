import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch.component';
import { AddEditBatchComponent } from './add-edit-batch/add-edit-batch.component';

const routes: Routes = [
  {
    path:'',
    component:BatchComponent
  },
  {
    path:'add',
    component:AddEditBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
