import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';

const routes: Routes = [
  { 
    path:'',
    component:MergeBatchComponent,
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
