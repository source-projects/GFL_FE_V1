import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegistrationComponent, AddEditRegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ThemeModule,
    SharedModule,
    FormsModule
  ]
})
export class RegistrationModule { }
