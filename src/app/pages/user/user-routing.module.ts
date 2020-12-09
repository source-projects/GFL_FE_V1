import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'app/@theme/guards/user.guard';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard],
    data: { PermissionName: ['view']}
    
  },
  {
    path:'add',
    component:AddEditUserComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'edit/:id',
    component:AddEditUserComponent,
    canActivate: [UserGuard],
    canLoad: [UserGuard],
    data: { PermissionName: ['edit']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class UserRoutingModule { }
