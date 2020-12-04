import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditProcessComponent } from './add-edit-process/add-edit-process.component';
import { DynamicProcessComponent } from './dynamic-process/dynamic-process.component';

import { ProcessComponent } from "./process.component";

const routes: Routes = [
  { 
    path: "",
    component: ProcessComponent 
  },
  {
    path: "add",
    component: AddEditProcessComponent,
  },
  {
    path:'edit/:id',
    component:AddEditProcessComponent,
  },
  {
    path:'add-dynamic-process',
    component:DynamicProcessComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessRoutingModule {}
