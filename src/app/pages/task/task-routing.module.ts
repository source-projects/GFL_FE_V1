import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';


const routes: Routes = [
  { 
  path: '', 
  component: TaskComponent,
  // canActivate: [TaskGuard],
  // canLoad: [TaskGuard],
  data: { PermissionName: ['view','view group','view all'],compName:"task"}
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
