import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../@theme/shared.module';
import {
  NbButtonModule,
  NbCardModule,



  NbIconModule,

  NbListModule, NbProgressBarModule,



  NbSelectModule, NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [AdminComponent, PreviewComponent],
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
    FormsModule,
    ThemeModule
  ]
})
export class AdminModule { }
