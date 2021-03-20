import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { FormsModule } from '@angular/forms';
import { AttendanceComponent } from './attendance/attendance.component';
import { ScanQRComponent } from './scan-qr/scan-qr.component';
// import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [RegistrationComponent, AddEditRegistrationComponent, AttendanceComponent, ScanQRComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ThemeModule,
    SharedModule,
    FormsModule,
    // QRCodeModule
  ]
})
export class RegistrationModule { }
