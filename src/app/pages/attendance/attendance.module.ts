import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { SharedModule } from '../../@theme/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ]
})
export class AttendanceModule { }
