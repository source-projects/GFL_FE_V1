import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShadeComponent } from './shade.component';
import { AddEditShadeComponent } from './add-edit-shade/add-edit-shade.component';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';

const routes: Routes = [
  {
    path:'',
    component:ShadeComponent,
    canLoad:[ShadeGuard]
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
