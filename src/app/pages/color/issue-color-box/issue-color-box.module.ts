import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueColorBoxRoutingModule } from './issue-color-box-routing.module';
import { IssueColorBoxComponent } from './issue-color-box.component';
import { SharedModule } from '../../../@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../..//@theme/theme.module';


@NgModule({
  declarations: [IssueColorBoxComponent],
  imports: [
    CommonModule,
    IssueColorBoxRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule,
  ]
})
export class IssueColorBoxModule { }
