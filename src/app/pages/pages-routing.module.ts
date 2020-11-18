import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { UserGuard } from 'app/@theme/guards/user.guard';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';
import { ColorGuard } from 'app/@theme/guards/color.guard';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';

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
        canActivate:[PartyGuard]
    },
    {
      path: 'quality',
      loadChildren: () => import('./quality/quality.module')
        .then(m => m.QualityModule),
        canActivate:[QualityGuard],
        canLoad: [QualityGuard]
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
        canActivate:[UserGuard]
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
        canActivate:[ColorGuard]
    },
    {
      path: 'program',
      loadChildren: () => import('./program/program.module')
        .then(m => m.ProgramModule),
        canActivate:[ProgramGuard]
    },
    {
      path: 'shade',
      loadChildren: () => import('./shade/shade.module')
        .then(m => m.ShadeModule),
        canActivate:[ShadeGuard]
    },
    {
      path: 'supplier',
      loadChildren: () => import('./supplier/supplier.module')
        .then(m => m.SupplierModule),
        canActivate:[SupplierGuard]
    },
    {
      path: 'stock-batch',
      loadChildren: () => import('./stock-batch/stock-batch.module')
        .then(m => m.StockBatchModule),
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
