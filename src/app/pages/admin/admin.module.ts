import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'app/@theme/shared.module';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule, NbProgressBarModule,
  NbSelectModule, NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    FormsModule
  ]
})
export class AdminModule { }
