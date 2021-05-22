import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterJetRoutingModule } from './water-jet-routing.module';
import { AddEditWaterJetComponent } from './add-edit-water-jet/add-edit-water-jet.component';
import { SharedModule } from '../../@theme/shared.module';


@NgModule({
  declarations: [AddEditWaterJetComponent],
  imports: [
    CommonModule,
    WaterJetRoutingModule,
    SharedModule
  ]
})
export class WaterJetModule { }
