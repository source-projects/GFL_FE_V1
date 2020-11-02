import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'party',
      loadChildren: () => import('./party/party.module')
        .then(m => m.PartyModule),
    },
    {
      path: 'quality',
      loadChildren: () => import('./quality/quality.module')
        .then(m => m.QualityModule),
    },
    {
      path: 'fabric-in',
      loadChildren: () => import('./fabric-in/fabric-in.module')
        .then(m => m.FabricInModule),
    },
    {
      path: 'batch',
      loadChildren: () => import('./batch/batch.module')
        .then(m => m.BatchModule),
    },
    {
      path: 'color',
      loadChildren: () => import('./color/color.module')
        .then(m => m.ColorModule),
    },
    {
      path: 'shade',
      loadChildren: () => import('./shade/shade.module')
        .then(m => m.ShadeModule),
    },
    {
      path: 'supplier',
      loadChildren: () => import('./supplier/supplier.module')
        .then(m => m.SupplierModule),
    },
    {
      path: 'process',
      loadChildren: () => import('./process/process.module')
        .then(m => m.ProcessModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
