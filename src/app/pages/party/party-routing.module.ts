import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';

const routes: Routes = [
  { 
    path:'',
    component:AddEditPartyComponent,
    // canActivate:[PartyGuard],
    // canLoad:[PartyGuard],
    data: { PermissionName: ['add'],compName:"party"}
  },
  
  { 
    path:'view',
    component:PartyComponent,
    // canActivate:[PartyGuard],
    // canLoad:[PartyGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"party"}
  },
  
 
  {
    path:'edit/:id',
    component:AddEditPartyComponent,
    // canActivate: [PartyGuard],
    // canLoad: [PartyGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"party"} 
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class PartyRoutingModule { }
