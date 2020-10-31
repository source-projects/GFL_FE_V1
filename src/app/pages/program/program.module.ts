import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramRoutingModule } from './program-routing.module';
import { ProgramComponent } from './program.component';
import { AddEditProgramComponent } from './add-edit-program/add-edit-program.component';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '../forms/forms.module';


@NgModule({
  declarations: [ProgramComponent, AddEditProgramComponent],
  imports: [
    CommonModule,
    ProgramRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProgramModule { }
