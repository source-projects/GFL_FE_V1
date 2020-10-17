import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FabricInComponent } from './fabric-in.component';
import { AddEditFabricInComponent } from './add-edit-fabric-in/add-edit-fabric-in.component';

const routes: Routes = [
  {
    path:'',
    component:FabricInComponent
  },
  {
    path:'add',
    component:AddEditFabricInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricInRoutingModule { }
