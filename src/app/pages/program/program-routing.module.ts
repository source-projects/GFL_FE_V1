import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import { AddEditProgramComponent } from './add-edit-program/add-edit-program.component';
import { ProgramComponent } from './program.component';

const routes: Routes = [
  {
    path: '',
    component: ProgramComponent,
    canActivate: [ProgramGuard],
    canLoad: [ProgramGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
  {
    path: 'add',
    component: AddEditProgramComponent,
    canActivate: [ProgramGuard],
    canLoad: [ProgramGuard],
    data: { PermissionName: ['add']}
  },
  {
    path: 'edit/:id',
    component: AddEditProgramComponent,
    canActivate: [ProgramGuard],
    canLoad: [ProgramGuard],
    data: { PermissionName: ['edit']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProgramGuard]
})
export class ProgramRoutingModule { }
