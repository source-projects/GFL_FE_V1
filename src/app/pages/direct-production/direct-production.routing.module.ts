import { DirectProdComponent } from './direct-prod/direct-prod.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductionPlanningGuard } from '../../@theme/guards/production-planning.guard';

const routes: Routes = [
  {
    path: '',
    component: DirectProdComponent,
    canActivate:[ProductionPlanningGuard],
    canLoad:[ProductionPlanningGuard],
    data: { PermissionName: ['view','view group','view all']}
  }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectProductionRoutingModule { }
