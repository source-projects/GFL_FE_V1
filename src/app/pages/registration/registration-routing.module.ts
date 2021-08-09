import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditRegistrationComponent } from './add-edit-registration/add-edit-registration.component';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditRegistrationComponent,
 },
  {
    path:'view',
    component:RegistrationComponent,
  },
  {
    path:'edit/:id',
    component:AddEditRegistrationComponent,
 },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
