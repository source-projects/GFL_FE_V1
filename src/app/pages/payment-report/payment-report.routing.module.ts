import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportGuard } from '../../@theme/guards/report.guard';
import { PaymentReportComponent } from './payment-report/payment-report.component';

const routes: Routes = [
  { 
  path: '', 
  component: PaymentReportComponent,
  canActivate:[ReportGuard],
  canLoad:[ReportGuard],
  data: { PermissionName: ['view','view group','view all']}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentReportRoutingModule { }
