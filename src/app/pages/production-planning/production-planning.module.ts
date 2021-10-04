import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionPlanningRoutingModule } from './production-planning-routing.module';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '@angular/forms';

import { ProductionPlanningComponent } from './production-planning.component';
import { AddShadeComponent } from './add-shade/add-shade.component';
import { JetPlanningModule } from '../jet-planning/jet-planning.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThemeModule } from 'app/@theme/theme.module';
import { ChangeJetComponent } from './change-jet/change-jet.component';



@NgModule({
  declarations: [ProductionPlanningComponent, AddShadeComponent, ChangeJetComponent],
  imports: [
    CommonModule,
    ProductionPlanningRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    JetPlanningModule,
    ThemeModule
  ]
})
export class ProductionPlanningModule { }
