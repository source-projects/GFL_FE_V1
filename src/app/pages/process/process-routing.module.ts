import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProcessGuard } from 'app/@theme/guards/process.guard';
import { AddEditProcessComponent } from './add-edit-process/add-edit-process.component';
import { DynamicProcessComponent } from './dynamic-process/dynamic-process.component';

import { ProcessComponent } from "./process.component";

const routes: Routes = [
  {
    path: "",
    component: ProcessComponent,
    canActivate: [ProcessGuard],
    canLoad: [ProcessGuard],
    data: { PermissionName: ['view']}
  },
  {
    path: "add",
    component: AddEditProcessComponent,
    canActivate: [ProcessGuard],
    canLoad: [ProcessGuard],
    data: { PermissionName: ['add']}
  },
  {
    path: 'edit/:id',
    component: AddEditProcessComponent,
    canActivate: [ProcessGuard],
    canLoad: [ProcessGuard],
    data: { PermissionName: ['edit']}
  },
  {
    path: 'add-dynamic-process',
    component: DynamicProcessComponent,
    // canActivate: [ProcessGuard],
    // canLoad: [ProcessGuard],
    // data: { PermissionName: ['add-dynamic-process']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProcessGuard]
})
export class ProcessRoutingModule { }
