import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualityComponent } from './quality.component';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';

const routes: Routes = [
  {
    path:'',
    component:QualityComponent
  },
  {
    path:'add',
    component:AddEditQualityComponent
  },{
    path:'edit/:id',
    component:AddEditQualityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule { }
