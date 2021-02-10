import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditWaterJetComponent } from './add-edit-water-jet/add-edit-water-jet.component';
import { WaterJetGuard } from 'app/@theme/guards/water-jet.guard';
const routes: Routes = [
  {
    path:'',
    component:AddEditWaterJetComponent,
    // canActivate:[WaterJetGuard],
    // canLoad:[WaterJetGuard],
    // data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'waterjet',
    component:AddEditWaterJetComponent,
    // canActivate:[WaterJetGuard],
    // canLoad:[WaterJetGuard],
    // data: { PermissionName: ['view','view group','view all']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterJetRoutingModule { }
