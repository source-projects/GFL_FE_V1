import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JetPlanningComponent } from 'app/pages/jet-planning/jet-planning.component';

const routes: Routes = [
  {
    path:'',
    component:JetPlanningComponent,
  },
  {
    path:':id',
    component:JetPlanningComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JetPlanningRoutingModule { }
