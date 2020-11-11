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
    canLoad:[ColorGuard]
  },
  {
    path:'add',
    component:AddEditColorComponent
  },
  {
    path:'edit/:id',
    component:AddEditColorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[ColorGuard]
})
export class ColorRoutingModule { }
