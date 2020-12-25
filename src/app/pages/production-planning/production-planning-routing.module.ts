import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductionPlanningComponent } from "./production-planning.component";

const routes: Routes = [
  {
    path: '',
  
    component: ProductionPlanningComponent,
  }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionPlanningRoutingModule { }
