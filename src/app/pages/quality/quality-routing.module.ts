import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';
import { QualityComponent } from './quality.component';

const routes: Routes = [
  { 
    path:'',
    component:AddEditQualityComponent,
    // canActivate:[QualityGuard],
    // canLoad:[QualityGuard],
    data: { PermissionName: ['add'],compName:"quality"}
  },
  { 
    path:'view',
    component:QualityComponent,
    // canActivate:[QualityGuard],
    // canLoad:[QualityGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"quality"}
  },
  {
    path: 'edit/:id',
    component: AddEditQualityComponent,
    // canActivate: [QualityGuard],
    // canLoad: [QualityGuard],
    data: { PermissionName: ['edit','edit group','edit all'] ,compName:"quality"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QualityRoutingModule { }
