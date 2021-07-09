import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ColorRoutingModule } from './color-routing.module';
import { ColorComponent } from './color.component';
import { AddEditColorComponent } from './add-edit-color/add-edit-color.component';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [ColorComponent, AddEditColorComponent],
  imports: [
    CommonModule,
    ColorRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule
  ]
})
export class ColorModule { }
