import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '../../@theme/shared.module';

import { AdditionSlipRoutingModule } from './addition-slip-routing.module';
import { AdditionSlipComponent } from './addition-slip.component';
import { SlipDialogComponent } from './slip-dialog/slip-dialog.component';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [AdditionSlipComponent, SlipDialogComponent],
  imports: [
    CommonModule,
    AdditionSlipRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule
  ]
})
export class AdditionSlipModule { }
