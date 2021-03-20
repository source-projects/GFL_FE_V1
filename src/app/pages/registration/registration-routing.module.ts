import { Attribute, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { RegistrationComponent } from './registration.component';
import { ScanQRComponent } from './scan-qr/scan-qr.component';

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
  {
    path:'attendance/:id',
    component:AttendanceComponent,
  },
  // {
  //   path:'',
  //   component:ScanQRComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
