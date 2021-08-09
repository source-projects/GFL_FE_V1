import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';

const routes: Routes = [
  { 
    path:'',
    component:AddEditPartyComponent,
  },
  
  { 
    path:'view',
    component:PartyComponent,
  },
  
 
  {
    path:'edit/:id',
    component:AddEditPartyComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class PartyRoutingModule { }
