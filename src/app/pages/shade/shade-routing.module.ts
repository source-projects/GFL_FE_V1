import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';

const routes: Routes = [
  {
    path:'',
    component:ShadeComponent
  },
  {
    path:'add',
    component:AddEditShadeComponent
  },
  {
    path:'edit/:id',
    component:AddEditShadeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShadeRoutingModule { }
