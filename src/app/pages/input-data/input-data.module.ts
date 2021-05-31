import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDataComponent } from './input-data/input-data.component';
import {
  NbButtonModule,
  NbCardModule,



  NbIconModule,

  NbListModule, NbProgressBarModule,



  NbSelectModule, NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@theme/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [InputDataComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NgSelectModule,
    SharedModule,
    OwlDateTimeModule,
    FormsModule,
    OwlNativeDateTimeModule
  ]
})
export class InputDataModule { }
