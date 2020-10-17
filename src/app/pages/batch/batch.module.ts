import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './batch.component';
import { AddEditBatchComponent } from './add-edit-batch/add-edit-batch.component';
import { SharedModule } from '../../@theme/shared.module';


@NgModule({
  declarations: [BatchComponent, AddEditBatchComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule
  ]
})
export class BatchModule { }
