import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductionPlanningGuard } from 'app/@theme/guards/production-planning.guard';
import { ProductionPlanningComponent } from "./production-planning.component";

const routes: Routes = [
  {
    path: '',
    component: ProductionPlanningComponent,
    canActivate:[ProductionPlanningGuard],
    canLoad:[ProductionPlanningGuard],
    data: { PermissionName: ['view','view group','view all']}
  }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionPlanningRoutingModule { }
