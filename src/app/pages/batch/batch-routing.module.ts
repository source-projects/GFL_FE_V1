import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch.component';
import { AddEditBatchComponent } from './add-edit-batch/add-edit-batch.component';
import { BatchGuard } from 'app/@theme/guards/batch.guard';

const routes: Routes = [
  {
    path:'',
    component:BatchComponent,
    canActivate:[BatchGuard],
    canLoad: [BatchGuard],
    data: { PermissionName: ['view']}
  },
  {
    path:'add',
    component:AddEditBatchComponent,
    canActivate:[BatchGuard],
    canLoad: [BatchGuard],
    data: { PermissionName: ['add']}
  },
  {
    path: 'edit',
    component:AddEditBatchComponent,
    canActivate:[BatchGuard],
    canLoad: [BatchGuard],
    data: { PermissionName: ['edit']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[BatchGuard]
})
export class BatchRoutingModule { }
