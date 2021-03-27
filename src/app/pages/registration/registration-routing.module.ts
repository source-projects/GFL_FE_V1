import { Attribute, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { AttendanceComponent } from '../attendance/attendance.component';
import { RegistrationComponent } from './registration.component';
import { ScanQRComponent } from '../attendance/scan-qr/scan-qr.component';
import { EmployeeRegistrationGuard } from '../../@theme/guards/employee-registration.guard';

const routes: Routes = [
  {
    path:'',
    component:AddEditRegistrationComponent,
    canActivate:[EmployeeRegistrationGuard],
    canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'view',
    component:RegistrationComponent,
    canActivate:[EmployeeRegistrationGuard],
    canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'edit/:id',
    component:AddEditRegistrationComponent,
    canActivate:[EmployeeRegistrationGuard],
    canLoad:[EmployeeRegistrationGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
