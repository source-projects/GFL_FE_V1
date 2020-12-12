import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { ECommerceComponent } from './e-commerce.component';
import { ChartModule } from 'angular2-chartjs';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReportComponent } from './report/report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/@theme/shared.module';
import { ChartsModule } from 'ng2-charts';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


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
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    NgSelectModule,
    SharedModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule
  ],
  declarations: [
    ECommerceComponent,
    ReportComponent,
  ],
  providers: [
  ],
})
export class ECommerceModule { }
