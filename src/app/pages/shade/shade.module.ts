import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShadeRoutingModule } from './shade-routing.module';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { SharedModule } from '../../@theme/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { PendingApcComponent } from './pending-apc/pending-apc.component';


@NgModule({
  declarations: [ShadeComponent, AddEditShadeComponent, PendingApcComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ShadeRoutingModule,
    SharedModule
  ]
})
export class ShadeModule { }
