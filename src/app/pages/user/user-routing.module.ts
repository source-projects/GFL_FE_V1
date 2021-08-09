import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditUserComponent,
    // canActivate: [UserGuard],
    // canLoad: [UserGuard],
    data: { PermissionName: ['add'],compName:"user"}
    
  },
  {
    path:'view',
    component:UserComponent,
    // canActivate: [UserGuard],
    // canLoad: [UserGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"user"}
    
  },
 
  {
    path:'edit/:id',
    component:AddEditUserComponent,
    // canActivate: [UserGuard],
    // canLoad: [UserGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"user"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
