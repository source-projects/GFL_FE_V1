import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,



  NbIconModule,

  NbListModule, NbProgressBarModule,



  NbSelectModule, NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'app/@theme/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ChartsModule } from 'ng2-charts';
import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { LogSheetComponent } from './log-sheet/log-sheet.component';
import { ReportComponent } from './report/report.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartsModule,
    NbProgressBarModule,
    NgxChartsModule,
    NgSelectModule,
    SharedModule,
    OwlDateTimeModule,
    FormsModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    ECommerceComponent,
    ReportComponent,
    LogSheetComponent,
  ],
  providers: [
  ],
})
export class ECommerceModule { }
