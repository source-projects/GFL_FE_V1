import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditProgramComponent } from './add-edit-program/add-edit-program.component';
import { ProgramComponent } from './program.component';

const routes: Routes = [
  {
    path:'',
    component:ProgramComponent
  },
  {
    path:'add',
    component:AddEditProgramComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
