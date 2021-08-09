import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { ScanQRComponent } from './scan-qr/scan-qr.component';

const routes: Routes = [
  {
    path:':id',
    component:AttendanceComponent,
     },
  {
    path:'',
    component:ScanQRComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
