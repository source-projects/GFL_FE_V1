import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@theme/guards/auth.guard';
import { PrintLayoutComponent } from './@theme/components/print-Layout/print-layout.component';
import { InvoiceComponent } from './@theme/components/invoice/invoice.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
  {
    path: 'print',
    // outlet: 'print',
    component: PrintLayoutComponent,
    
    children: [
      { path: 'invoice/:invoiceIds', component: InvoiceComponent }
    ]
  },
  {
    path: 'export',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice', component: InvoiceComponent }
    ]
  },
  
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
