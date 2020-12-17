import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@theme/guards/auth.guard';
import { ColorGuard } from './@theme/guards/color.guard';
import { PartyGuard } from './@theme/guards/party.guard';
import { ProgramGuard } from './@theme/guards/program.guard';
import { QualityGuard } from './@theme/guards/quality.guard';
import { ShadeGuard } from './@theme/guards/shade.guard';
import { StockBatchGuard } from './@theme/guards/stock-batch.guard';
import { StopAuthGuard } from './@theme/guards/stop-auth.guard';
import { SupplierGuard } from './@theme/guards/supplier.guard';
import { UserGuard } from './@theme/guards/user.guard';
import { ECommerceComponent } from './pages/e-commerce/e-commerce.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [StopAuthGuard]
  },
  {
    path: 'pages',
    component: PagesComponent,
    // loadChildren: () => import('./pages/pages.module')
    //   .then(m => m.PagesModule),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: ECommerceComponent,
      },
      {
        path: 'party',
        loadChildren: () => import('./pages/party/party.module')
          .then(m => m.PartyModule),
        canActivate: [PartyGuard],
        canLoad: [PartyGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'quality',
        loadChildren: () => import('./pages/quality/quality.module')
          .then(m => m.QualityModule),
        canActivate: [QualityGuard],
        canLoad: [QualityGuard],
        data: { PermissionName: ['view','view group','view all'] }
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module')
          .then(m => m.UserModule),
        canActivate: [UserGuard],
        canLoad: [UserGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'color',
        loadChildren: () => import('./pages/color/color.module')
          .then(m => m.ColorModule),
        canActivate: [ColorGuard],
        canLoad: [ColorGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'program',
        loadChildren: () => import('./pages/program/program.module')
          .then(m => m.ProgramModule),
        canActivate: [ProgramGuard],
        canLoad: [ProgramGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'process',
        loadChildren: () => import('./pages/process/process.module')
          .then(m => m.ProcessModule),
        canActivate: [ProgramGuard],
        canLoad: [ProgramGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'shade',
        loadChildren: () => import('./pages/shade/shade.module')
          .then(m => m.ShadeModule),
        canActivate: [ShadeGuard],
        canLoad: [ShadeGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'waterJet',
        loadChildren: () => import('./pages/water-jet/water-jet.module')
          .then(m => m.WaterJetModule),
        
      },
      {
        path: 'supplier',
        loadChildren: () => import('./pages/supplier/supplier.module')
          .then(m => m.SupplierModule),
        canActivate: [SupplierGuard],
        canLoad: [SupplierGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'purchaseItem',
        loadChildren: () => import('./pages/purchase-item/purchase-item.module')
          .then(m => m.PurchaseItemModule),
        // canActivate: [PurchaseGuard],
        // canLoad: [PurchaseGuard],
        // data: { PermissionName: ['view']}
      },
      {
        path: 'finishedMeter',
        loadChildren: () => import('./pages/finished-meter/finished-meter.module')
          .then(m => m.FinishedMeterModule),
        // canActivate: [FinishedMeterGuard],
        // canLoad: [FinishedMeterGuard]
      },
      {
        path: 'batch-shuffle',
        loadChildren: () => import('./pages/batch-shuffle/batch-shuffle.module')
          .then(m => m.BatchShuffleModule),
        canActivate: [SupplierGuard],
        canLoad: [SupplierGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'stock-batch',
        loadChildren: () => import('./pages/stock-batch/stock-batch.module')
          .then(m => m.StockBatchModule),
        canActivate: [StockBatchGuard],
        canLoad: [StockBatchGuard],
        data: { PermissionName: ['view','view group','view all']}
      },
      {
        path: 'miscellaneous',
        loadChildren: () => import('./pages/miscellaneous/miscellaneous.module')
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
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      useHash:false,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
