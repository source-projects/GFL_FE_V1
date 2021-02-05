import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShadeRoutingModule } from './shade-routing.module';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from 'app/@theme/theme.module';


@NgModule({
  declarations: [ShadeComponent, AddEditShadeComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ShadeRoutingModule,
    SharedModule
  ]
})
export class ShadeModule { }
