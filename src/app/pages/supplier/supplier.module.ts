import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SharedModule } from '../../@theme/shared.module';
import { SupplierComponent } from './supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddEditSupplierRateComponent } from './add-edit-supplier-rate/add-edit-supplier-rate.component';
import { ThemeModule } from '../../@theme/theme.module';



@NgModule({
  declarations: [SupplierComponent, AddEditSupplierComponent, AddEditSupplierRateComponent],
  imports: [
    CommonModule,
    SharedModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    ThemeModule
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA,
  //   NO_ERRORS_SCHEMA
  // ]
})
export class SupplierModule { }
