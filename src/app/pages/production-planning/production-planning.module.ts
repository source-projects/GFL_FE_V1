import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionPlanningRoutingModule } from './production-planning-routing.module';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '@angular/forms';

import { ProductionPlanningComponent } from './production-planning.component';
import { AddShadeComponent } from './add-shade/add-shade.component';



@NgModule({
  declarations: [ProductionPlanningComponent, AddShadeComponent],
  imports: [
    CommonModule,
    ProductionPlanningRoutingModule,
    SharedModule,
    FormsModule

  ]
})
export class ProductionPlanningModule { }
