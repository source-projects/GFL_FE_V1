import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QualityRoutingModule } from './quality-routing.module';
import { SharedModule } from '../../@theme/shared.module';
import { QualityComponent } from './quality.component';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'app/@theme/theme.module';


@NgModule({
  declarations: [QualityComponent, AddEditQualityComponent],
  imports: [
    CommonModule,
    SharedModule,
    QualityRoutingModule,
    ReactiveFormsModule,
    ThemeModule
  ],
})
export class QualityModule{ }
