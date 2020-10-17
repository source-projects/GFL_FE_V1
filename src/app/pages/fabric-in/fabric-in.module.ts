import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricInRoutingModule } from './fabric-in-routing.module';
import { FabricInComponent } from './fabric-in.component';
import { AddEditFabricInComponent } from './add-edit-fabric-in/add-edit-fabric-in.component';
import { SharedModule } from '../../@theme/shared.module';


@NgModule({
  declarations: [FabricInComponent, AddEditFabricInComponent],
  imports: [
    CommonModule,
    FabricInRoutingModule,
    SharedModule
  ]
})
export class FabricInModule { }
