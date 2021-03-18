import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditRegistrationComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    // data: { PermissionName: ['add']}
  },
  {
    path:'view',
    component:RegistrationComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    // data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'edit/:id',
    component:AddEditRegistrationComponent,
    // canActivate:[ShadeGuard],
    // canLoad:[ShadeGuard],
    // data: { PermissionName: ['edit','edit group','edit all']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
