import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '../../@theme/shared.module';
import { AdditionSlipRoutingModule } from './addition-slip-routing.module';
import { AdditionSlipComponent } from './addition-slip.component';


@NgModule({
  declarations: [AdditionSlipComponent],
  imports: [
    CommonModule,
    AdditionSlipRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AdditionSlipModule { }
