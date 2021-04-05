import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportGuard } from '../../@theme/guards/report.guard';

import { GenerateReportComponent } from './generate-report.component';

const routes: Routes = [
  { 
  path: '', 
  component: GenerateReportComponent,
  canActivate:[ReportGuard],
  canLoad:[ReportGuard],
  data: { PermissionName: ['view','view group','view all']}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateReportRoutingModule { }
