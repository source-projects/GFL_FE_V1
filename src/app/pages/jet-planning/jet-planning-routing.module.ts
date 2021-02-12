import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JetPlanningGuard } from 'app/@theme/guards/jet-planning.guard';
import { JetPlanningComponent } from 'app/pages/jet-planning/jet-planning.component';

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
    data: { PermissionName: ['view','view group','view all','add','edit','edit all','edit group','delete','delete all', 'delete group']}

  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JetPlanningRoutingModule { }
