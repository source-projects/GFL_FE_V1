import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttndanceGuard } from '../../@theme/guards/attendance.guard';
import { ScanQRComponent } from './scan-qr/scan-qr.component';
import { AttendanceComponent } from './attendance.component';

const routes: Routes = [
  {
    path:':id',
    component:AttendanceComponent,
    canActivate:[AttndanceGuard],
    canLoad:[AttndanceGuard],
    data: { PermissionName: ['view','view all','view group']}
  },
  {
    path:'',
    component:ScanQRComponent,
    canActivate:[AttndanceGuard],
    canLoad:[AttndanceGuard],
    data: { PermissionName: ['view','view all','view group']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
