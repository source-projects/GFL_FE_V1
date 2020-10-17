import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShadeRoutingModule } from './shade-routing.module';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { SharedModule } from '../../@theme/shared.module';


@NgModule({
  declarations: [ShadeComponent, AddEditShadeComponent],
  imports: [
    CommonModule,
    ShadeRoutingModule,
    SharedModule
  ]
})
export class ShadeModule { }
