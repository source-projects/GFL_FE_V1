import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DyeingProcessRoutingModule } from './dyeing-process-routing.module';
import { DyeingProcessComponent } from './dyeing-process.component';
import { AddEditDyeingProcessComponent } from './add-edit-dyeing-process/add-edit-dyeing-process.component';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { AddDyeingProcessStepComponent } from './add-dyeing-process-step/add-dyeing-process-step.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [DyeingProcessComponent, AddEditDyeingProcessComponent, AddDyeingProcessStepComponent],
  imports: [
    CommonModule,
    DyeingProcessRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule
  ]
})
export class DyeingProcessModule { }
