import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { PendingApcComponent } from './pending-apc/pending-apc.component';
import { ShadeComponent } from './shade.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditShadeComponent,
 },
  {
    path:'view',
    component:ShadeComponent,
 },
  {
    path:'edit/:id',
    component:AddEditShadeComponent,
 },
  {
    path:'pending-apc',
    component:PendingApcComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class ShadeRoutingModule { }
