import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JetPlanningComponent } from '../../pages/jet-planning/jet-planning.component';

const routes: Routes = [
  {
    path:'',
    component:JetPlanningComponent,
    // canActivate:[JetPlanningGuard],
    // canLoad:[JetPlanningGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"jetPlanning"}
  },
  {
    path:':id',
    component:JetPlanningComponent,
    // canActivate:[JetPlanningGuard],
    // canLoad:[JetPlanningGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"jetPlanning"}

  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JetPlanningRoutingModule { }
