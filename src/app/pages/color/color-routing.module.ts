import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorComponent } from './color.component';
import { AddEditColorComponent } from './add-edit-color/add-edit-color.component';
import { ColorGuard } from 'app/@theme/guards/color.guard';

const routes: Routes = [
  {
    path:'',
    component:ColorComponent,
    canActivate:[ColorGuard],
    canLoad:[ColorGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'add',
    component:AddEditColorComponent,
    canActivate:[ColorGuard],
    canLoad:[ColorGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'edit/:id',
    component:AddEditColorComponent,
    canActivate:[ColorGuard],
    canLoad:[ColorGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ColorGuard]
})
export class ColorRoutingModule { }
