import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';
import { QualityComponent } from './quality.component';

const routes: Routes = [
  { 
    path:'',
    component:AddEditQualityComponent,
  },
  { 
    path:'view',
    component:QualityComponent,
 },
  {
    path: 'edit/:id',
    component: AddEditQualityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class QualityRoutingModule { }
