import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorComponent } from './color.component';
import { AddEditColorComponent } from './add-edit-color/add-edit-color.component';

const routes: Routes = [
  {
    path:'',
    component:ColorComponent
  },
  {
    path:'add',
    component:AddEditColorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorRoutingModule { }
