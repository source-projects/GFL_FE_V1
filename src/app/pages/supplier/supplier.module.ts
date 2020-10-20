import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SharedModule } from '../../@theme/shared.module';
import { SupplierComponent } from './supplier.component';
import { AddEditSupplierComponent } from './add-edit-supplier/add-edit-supplier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [SupplierComponent, AddEditSupplierComponent],
  imports: [
    CommonModule,
    SharedModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA,
  //   NO_ERRORS_SCHEMA
  // ]
})
export class SupplierModule { }
