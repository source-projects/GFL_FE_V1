import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditWaterJetComponent } from './add-edit-water-jet/add-edit-water-jet.component';
const routes: Routes = [
  {
    path:'',
    component:AddEditWaterJetComponent,
    // canActivate:[WaterJetGuard],
    // canLoad:[WaterJetGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"waterJet"}
  },
  {
    path:'waterjet',
    component:AddEditWaterJetComponent,
    // canActivate:[WaterJetGuard],
    // canLoad:[WaterJetGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"waterJet"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterJetRoutingModule { }
