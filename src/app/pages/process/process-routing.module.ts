import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicProcessComponent } from './dynamic-process/dynamic-process.component';
import { ProcessComponent } from "./process.component";


const routes: Routes = [
  {
    path: "",
    component: ProcessComponent,
    // canActivate: [ProcessGuard],
    // canLoad: [ProcessGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"process"}
  },
  {
    path: 'edit/:id',
    component: DynamicProcessComponent,
    // canActivate: [ProcessGuard],
    // canLoad: [ProcessGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"process"}
  },
  {
    path: 'add-dynamic-process',
    component: DynamicProcessComponent,
    // canActivate: [ProcessGuard],
    // canLoad: [ProcessGuard],
    data: { PermissionName: ['add'],compName:"process"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProcessRoutingModule { }
