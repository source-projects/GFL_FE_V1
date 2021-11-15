import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedMeterRoutingModule } from './finished-meter-routing.module';
import { FinishedMeterComponent } from './finished-meter.component';
import { AddEditFinishedMeterComponent } from './add-edit-finished-meter/add-edit-finished-meter.component';
import { SharedModule } from '../../@theme/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [FinishedMeterComponent, AddEditFinishedMeterComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NgxDatatableModule,
    FinishedMeterRoutingModule
  ]
})
export class FinishedMeterModule { }
