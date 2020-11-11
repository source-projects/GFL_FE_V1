import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';
import { PartyGuard } from 'app/@theme/guards/party.guard';

const routes: Routes = [
  {
    path:'',
    component:PartyComponent,
    canActivate:[PartyGuard],
    canLoad:[PartyGuard],
    
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
  exports: [RouterModule],
  providers:[PartyGuard]
})
export class PartyRoutingModule { }
