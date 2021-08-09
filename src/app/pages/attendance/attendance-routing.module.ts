import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { ScanQRComponent } from './scan-qr/scan-qr.component';

const routes: Routes = [
  {
    path:':id',
    component:AttendanceComponent,
    // canActivate:[AttndanceGuard],
    // canLoad:[AttndanceGuard],
    data: { PermissionName: ['view','view all','view group'],compName:"attendence"}
  },
  {
    path:'',
    component:ScanQRComponent,
    // canActivate:[AttndanceGuard],
    // canLoad:[AttndanceGuard],
    data: { PermissionName: ['view','view all','view group'],compName:"attendence"}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
