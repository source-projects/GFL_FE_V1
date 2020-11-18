import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch.component';
import { AddEditBatchComponent } from './add-edit-batch/add-edit-batch.component';
import { BatchGuard } from 'app/@theme/guards/batch.guard';

const routes: Routes = [
  {
    path:'',
    component:BatchComponent,
    canActivate:[BatchGuard]
  },
  {
    path:'add',
    component:AddEditBatchComponent
  },
  {
    path: 'edit',
    component:AddEditBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BatchGuard]
})
export class BatchRoutingModule { }
