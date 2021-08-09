import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditFinishedMeterComponent } from './add-edit-finished-meter/add-edit-finished-meter.component';


const routes: Routes = [
  {
    path:'',
    component:AddEditFinishedMeterComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  //providers: [FinishedMeterGuard]
})
export class FinishedMeterRoutingModule { }
