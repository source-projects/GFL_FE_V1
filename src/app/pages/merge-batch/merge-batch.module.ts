import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeBatchComponent } from './merge-batch/merge-batch.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { MergeBatchRoutingModule } from './merge-batch-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../@theme/shared.module';



@NgModule({
  declarations: [MergeBatchComponent],
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule,
    MergeBatchRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
  ]
})
export class MergeBatchModule { }
