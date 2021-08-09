import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditColorComponent } from './add-edit-color/add-edit-color.component';
import { ColorComponent } from './color.component';
import { IssueColorBoxComponent } from './issue-color-box/issue-color-box.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditColorComponent,
    // canActivate:[ColorGuard],
    // canLoad:[ColorGuard],
    data: { PermissionName: ['add'],compName:"color"}
  },
  {
    path:'view',
    component:ColorComponent,
    // canActivate:[ColorGuard],
    // canLoad:[ColorGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"color"}
  },
 
  {
    path:'edit/:id',
    component:AddEditColorComponent,
    // canActivate:[ColorGuard],
    // canLoad:[ColorGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"color"}
  },
  {
    path:'issue-color-box',
    component:IssueColorBoxComponent,
    // canActivate:[ColorGuard],
    // canLoad:[ColorGuard],
    // data: { PermissionName: ['edit','edit group','edit all']}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class ColorRoutingModule { }
