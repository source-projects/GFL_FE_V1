import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditFinishedMeterComponent } from './add-edit-finished-meter/add-edit-finished-meter.component';

import { FinishedMeterComponent } from './finished-meter.component';

const routes: Routes = [
  {
    path:'',
    component:FinishedMeterComponent,
    // canActivate:[FinishedMeterGuard],
    // canLoad:[FinishedMeterGuard],
    
  },
  {
    path:'add',
    component:AddEditFinishedMeterComponent
  },
  {
    path:'edit/:id',
    component:AddEditFinishedMeterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [FinishedMeterGuard]
})
export class FinishedMeterRoutingModule { }
