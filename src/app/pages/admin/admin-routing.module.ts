import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../@theme/shared.module';
import { AdminComponent } from './admin.component';
const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    //  canActivate:[AdminGuard],
    // canLoad:[AdminGuard],
    data: { PermissionName: ['view','view group','view all',],compName:"admin"}
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
