import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicProcessComponent } from './dynamic-process/dynamic-process.component';
import { ProcessComponent } from "./process.component";


const routes: Routes = [
  {
    path: "",
    component: ProcessComponent,
 },
  {
    path: 'edit/:id',
    component: DynamicProcessComponent,
 },
  {
    path: 'add-dynamic-process',
    component: DynamicProcessComponent,
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProcessRoutingModule { }
