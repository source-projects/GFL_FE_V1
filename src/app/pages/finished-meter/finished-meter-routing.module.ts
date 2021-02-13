import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishedMeterGuard } from 'app/@theme/guards/finished-meter.guard';
import { AddEditFinishedMeterComponent } from './add-edit-finished-meter/add-edit-finished-meter.component';

import { FinishedMeterComponent } from './finished-meter.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditFinishedMeterComponent,
    canActivate:[FinishedMeterGuard],
    canLoad:[FinishedMeterGuard],
    data: { PermissionName: ['view','view group','view all']}

    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [FinishedMeterGuard]
})
export class FinishedMeterRoutingModule { }
