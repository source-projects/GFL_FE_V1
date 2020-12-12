import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualityComponent } from './quality.component';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';
import { QualityService } from '../../@theme/services/quality.service';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { PrintLayoutComponent } from 'app/@theme/components/print-Layout/print-layout.component';
import { InvoiceComponent } from 'app/@theme/components/invoice/invoice.component';
// import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: QualityComponent,
    canActivate: [QualityGuard],
    canLoad: [QualityGuard],
    data: { PermissionName: ['view'] }
  },
  {
    path: 'add',
    component: AddEditQualityComponent,
    canActivate: [QualityGuard],
    //canLoad: [QualityGuard],
    data: { PermissionName: ['add'] }
  }, {
    path: 'edit/:id',
    component: AddEditQualityComponent,
    canActivate: [QualityGuard],
    canLoad: [QualityGuard],
    data: { PermissionName: ['edit'] }
  },
  {
    path: 'export',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent }
    ]
  },
  {
    path: 'print',
    outlet: 'print',
    component: InvoiceComponent,
    
    children: [
      { path: 'invoice/:invoiceIds', component: InvoiceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QualityGuard]
})
export class QualityRoutingModule { }
