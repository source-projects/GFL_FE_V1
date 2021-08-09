import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';
import { ViewMergeBatchComponent } from './view-merge-batch/view-merge-batch.component';

const routes: Routes = [
  { 
    path:'',
    component:MergeBatchComponent,
    // canActivate:[MergeBatchGuard],
    // canLoad:[MergeBatchGuard],
    data: { PermissionName: ['add'],compName:"mergeBatch"}
  },
  { 
    path:'view',
    component:ViewMergeBatchComponent,
    // canActivate:[MergeBatchGuard],
    // canLoad:[MergeBatchGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"mergeBatch"}
  },
  { 
    path:'edit/:id',
    component:MergeBatchComponent,
    // canActivate:[MergeBatchGuard],
    // canLoad:[MergeBatchGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"mergeBatch"}
    
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class MergeBatchRoutingModule { }
