import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditRegistrationComponent,
    // canActivate:[EmployeeRegistrationGuard],
    // canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['add'],compName:"employee"}
  },
  {
    path:'view',
    component:RegistrationComponent,
    // canActivate:[EmployeeRegistrationGuard],
    // canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"employee"}
  },
  {
    path:'edit/:id',
    component:AddEditRegistrationComponent,
    // canActivate:[EmployeeRegistrationGuard],
    // canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"employee"}
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
