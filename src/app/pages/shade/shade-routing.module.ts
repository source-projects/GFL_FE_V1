import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { PendingApcComponent } from './pending-apc/pending-apc.component';
import { ShadeComponent } from './shade.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditShadeComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    data: { PermissionName: ['add'],compName:"shade"}
  },
  {
    path:'view',
    component:ShadeComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"shade"}
  },
  {
    path:'edit/:id',
    component:AddEditShadeComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"shade"}
  },
  {
    path:'pending-apc',
    component:PendingApcComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"shade"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class ShadeRoutingModule { }
