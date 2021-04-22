import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../@theme/shared.module';
import { AdminGuard } from '../../@theme/guards/admin.guard';
import { AdminComponent } from './admin.component';
const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    //  canActivate:[AdminGuard],
    // canLoad:[AdminGuard],
    // data: { PermissionName: ['view','view group','view all',]}
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
