import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { UserGuard } from 'app/@theme/guards/user.guard';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';
import { ColorGuard } from 'app/@theme/guards/color.guard';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';

import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import { ShuffleComponent } from './batch-shuffle/shuffle/shuffle.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    // {
    //   path: 'iot-dashboard',
    //   component: DashboardComponent,
    // },
    {
      path: 'party',
      loadChildren: () => import('./party/party.module')
        .then(m => m.PartyModule),
      canActivate: [PartyGuard],
      canLoad: [PartyGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'quality',
      loadChildren: () => import('./quality/quality.module')
        .then(m => m.QualityModule),
      canActivate: [QualityGuard],
      canLoad: [QualityGuard],
      data: { PermissionName: ['view'] }
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
      canActivate: [UserGuard],
      canLoad: [UserGuard],
      data: { PermissionName: ['view']}
    },
    // {
    //   path: 'fabric-in',
    //   loadChildren: () => import('./fabric-in/fabric-in.module')
    //     .then(m => m.FabricInModule),
    // },
    // {
    //   path: 'batch',
    //   loadChildren: () => import('./batch/batch.module')
    //     .then(m => m.BatchModule),
    // },
    {
      path: 'color',
      loadChildren: () => import('./color/color.module')
        .then(m => m.ColorModule),
      canActivate: [ColorGuard],
      canLoad: [ColorGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'program',
      loadChildren: () => import('./program/program.module')
        .then(m => m.ProgramModule),
      canActivate: [ProgramGuard],
      canLoad: [ProgramGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'process',
      loadChildren: () => import('./process/process.module')
        .then(m => m.ProcessModule),
      canActivate: [ProgramGuard],
      canLoad: [ProgramGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'shade',
      loadChildren: () => import('./shade/shade.module')
        .then(m => m.ShadeModule),
      canActivate: [ShadeGuard],
      canLoad: [ShadeGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'supplier',
      loadChildren: () => import('./supplier/supplier.module')
        .then(m => m.SupplierModule),
      canActivate: [SupplierGuard],
      canLoad: [SupplierGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'purchaseItem',
      loadChildren: () => import('./purchase-item/purchase-item.module')
        .then(m => m.PurchaseItemModule),
      // canActivate: [PurchaseGuard],
      // canLoad: [PurchaseGuard],
      // data: { PermissionName: ['view']}
    },
    {
      path: 'finishedMeter',
      loadChildren: () => import('./finished-meter/finished-meter.module')
        .then(m => m.FinishedMeterModule),
      // canActivate: [FinishedMeterGuard],
      // canLoad: [FinishedMeterGuard]
    },
    {
      path: 'batch-shuffle',
      loadChildren: () => import('./batch-shuffle/batch-shuffle.module')
        .then(m => m.BatchShuffleModule),
      canActivate: [SupplierGuard],
      canLoad: [SupplierGuard],
      data: { PermissionName: ['view']}
    },
    {
      path: 'stock-batch',
      loadChildren: () => import('./stock-batch/stock-batch.module')
        .then(m => m.StockBatchModule),
      canActivate: [StockBatchGuard],
      canLoad: [StockBatchGuard],
      data: { PermissionName: ['view']}
    },
    // {
    //   path: 'forms',
    //   loadChildren: () => import('./forms/forms.module')
    //     .then(m => m.FormsModule),
    // },
    // {
    //   path: 'ui-features',
    //   loadChildren: () => import('./ui-features/ui-features.module')
    //     .then(m => m.UiFeaturesModule),
    // },
    // {
    //   path: 'modal-overlays',
    //   loadChildren: () => import('./modal-overlays/modal-overlays.module')
    //     .then(m => m.ModalOverlaysModule),
    // },
    // {
    //   path: 'extra-components',
    //   loadChildren: () => import('./extra-components/extra-components.module')
    //     .then(m => m.ExtraComponentsModule),
    // },
    // {
    //   path: 'tables',
    //   loadChildren: () => import('./tables/tables.module')
    //     .then(m => m.TablesModule),
    // },
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
