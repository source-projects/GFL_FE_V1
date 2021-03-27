import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { MergeBatchRoutingModule } from './merge-batch-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@theme/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [MergeBatchComponent],
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule,
    DragDropModule,
    MergeBatchRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ]
})
export class MergeBatchModule { }
