import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';

const routes: Routes = [
  {
    path:'',
    component:PartyComponent
  },
  {
    path:'add',
    component:AddEditPartyComponent
  },
  {
    path:'edit/:id',
    component:AddEditPartyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartyRoutingModule { }
