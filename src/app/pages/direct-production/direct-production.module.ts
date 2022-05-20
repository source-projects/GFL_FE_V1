import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectProdComponent } from './direct-prod/direct-prod.component';
import { DirectProductionRoutingModule } from './direct-production.routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { JetPlanningModule } from '../jet-planning/jet-planning.module';



@NgModule({
  declarations: [DirectProdComponent],
  imports: [
    CommonModule,
    DirectProductionRoutingModule,
    SharedModule,
    FormsModule,
    JetPlanningModule,
    ThemeModule
  ]
})
export class DirectProductionModule { }
