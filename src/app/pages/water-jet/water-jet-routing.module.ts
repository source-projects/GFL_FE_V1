import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditWaterJetComponent } from './add-edit-water-jet/add-edit-water-jet.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditWaterJetComponent
  },
  {
    path:'waterjet',
    component:AddEditWaterJetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterJetRoutingModule { }
