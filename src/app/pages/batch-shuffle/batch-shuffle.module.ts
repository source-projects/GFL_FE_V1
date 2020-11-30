import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchShuffleRoutingModule } from './batch-shuffle-routing.module';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { SharedModule } from 'app/@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [ShuffleComponent],
  imports: [
    CommonModule,
    BatchShuffleRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    DragDropModule,
    ReactiveFormsModule
    
  ]
})
export class BatchShuffleModule { }
