import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductionPlanningComponent } from "./production-planning.component";

const routes: Routes = [
  {
    path: '',
    component: ProductionPlanningComponent,
    // canActivate:[ProductionPlanningGuard],
    // canLoad:[ProductionPlanningGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"productionPlanning"}
  }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionPlanningRoutingModule { }
