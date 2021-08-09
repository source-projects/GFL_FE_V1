import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateReportComponent } from './generate-report.component';


const routes: Routes = [
  { 
  path: '', 
  component: GenerateReportComponent,
  // canActivate:[ReportGuard],
  // canLoad:[ReportGuard],
  data: { PermissionName: ['view','view group','view all'],compName:"report"}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateReportRoutingModule { }
