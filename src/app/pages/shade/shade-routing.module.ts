import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';
import { PendingApcComponent } from './pending-apc/pending-apc.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditShadeComponent,
    canActivate:[ShadeGuard],
    canLoad:[ShadeGuard],
    data: { PermissionName: ['add']}
  },
  {
    path:'view',
    component:ShadeComponent,
    canActivate:[ShadeGuard],
    canLoad:[ShadeGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path:'edit/:id',
    component:AddEditShadeComponent,
    canActivate:[ShadeGuard],
    canLoad:[ShadeGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  },
  {
    path:'pending-apc',
    component:PendingApcComponent,
    canActivate:[ShadeGuard],
    canLoad:[ShadeGuard],
    data: { PermissionName: ['view','view group','view all']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ShadeGuard]
})
export class ShadeRoutingModule { }
