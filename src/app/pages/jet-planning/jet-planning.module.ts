import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JetPlanningComponent } from './jet-planning.component';
import { JetPlanningRoutingModule } from './jet-planning-routing.module';
import { FormsModule } from '@angular/forms';
import { ShadeWithBatchComponent } from '../production-planning/shade-with-batch/shade-with-batch.component';
import { ThemeModule } from '../../@theme/theme.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
 import { PlanningSlipComponent } from './planning-slip/planning-slip.component';
import { SharedModule } from '../../@theme/shared.module';
import { SlipFromJetComponent } from './slip-from-jet/slip-from-jet.component';



@NgModule({
  declarations: [JetPlanningComponent,ShadeWithBatchComponent, PlanningSlipComponent, SlipFromJetComponent ],
  imports: [
    CommonModule,
    JetPlanningRoutingModule,
    FormsModule,
    ThemeModule,
    DragDropModule,
    SharedModule
  ]
})
export class JetPlanningModule { }
