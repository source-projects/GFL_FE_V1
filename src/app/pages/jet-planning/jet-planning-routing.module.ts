import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JetPlanningGuard } from '../../@theme/guards/jet-planning.guard';
import { JetPlanningComponent } from '../../pages/jet-planning/jet-planning.component';

const routes: Routes = [
  {
    path:'',
    component:JetPlanningComponent,
    canActivate:[JetPlanningGuard],
    canLoad:[JetPlanningGuard],
    data: { PermissionName: ['view','view group','view all',]}
  },
  {
    path:':id',
    component:JetPlanningComponent,
    canActivate:[JetPlanningGuard],
    canLoad:[JetPlanningGuard],
    data: { PermissionName: ['view','view group','view all']}

  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JetPlanningRoutingModule { }
