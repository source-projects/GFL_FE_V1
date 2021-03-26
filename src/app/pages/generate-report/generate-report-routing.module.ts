import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateReportComponent } from './generate-report.component';

const routes: Routes = [{ path: '', component: GenerateReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateReportRoutingModule { }
