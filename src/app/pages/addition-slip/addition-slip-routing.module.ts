import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionSlipComponent } from './addition-slip.component';
const routes: Routes = [
  {
    path:'',
    component:AdditionSlipComponent,
    // canActivate:[JetPlanningGuard],
    // canLoad:[JetPlanningGuard],
    // data: { PermissionName: ['view','view group','view all',]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionSlipRoutingModule { }
