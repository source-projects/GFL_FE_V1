import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskGuard } from '../../@theme/guards/task.guard';

import { TaskComponent } from './task.component';

const routes: Routes = [
  { 
  path: '', 
  component: TaskComponent,
  canActivate: [TaskGuard],
  canLoad: [TaskGuard],
  data: { PermissionName: ['view','view group','view all']}
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
