import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';
import { ViewMergeBatchComponent } from './view-merge-batch/view-merge-batch.component';

const routes: Routes = [
  { 
    path:'',
    component:MergeBatchComponent,
    //canActivate:[MergeBatchGuard],
    //canLoad:[MergeBatchGuard],
    data: { PermissionName: ['add']}
  },
  { 
    path:'view',
    component:ViewMergeBatchComponent,
    //canActivate:[MergeBatchGuard],
    //canLoad:[MergeBatchGuard],
    data: { PermissionName: ['add']}
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers:[MergeBatchGuard]
})
export class MergeBatchRoutingModule { }
