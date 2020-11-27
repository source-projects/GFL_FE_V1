import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessComponent } from './process.component';
import { AddEditProcessComponent } from './add-edit-process/add-edit-process.component';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { DynamicProcessComponent } from './dynamic-process/dynamic-process.component';
import { AddStepComponent } from './add-step/add-step.component';


@NgModule({
  declarations: [ProcessComponent, AddEditProcessComponent, AddStepComponent, DynamicProcessComponent],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class ProcessModule { }
