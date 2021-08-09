import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';
import { ViewMergeBatchComponent } from './view-merge-batch/view-merge-batch.component';

const routes: Routes = [
  { 
    path:'',
    component:MergeBatchComponent,
  },
  { 
    path:'view',
    component:ViewMergeBatchComponent,
  },
  { 
    path:'edit/:id',
    component:MergeBatchComponent,
 }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class MergeBatchRoutingModule { }
