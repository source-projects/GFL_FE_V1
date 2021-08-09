import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditColorComponent } from './add-edit-color/add-edit-color.component';
import { ColorComponent } from './color.component';
import { IssueColorBoxComponent } from './issue-color-box/issue-color-box.component';

const routes: Routes = [
  {
    path:'',
    component:AddEditColorComponent,
    },
  {
    path:'view',
    component:ColorComponent,
    },
 
  {
    path:'edit/:id',
    component:AddEditColorComponent,
  },
  {
    path:'issue-color-box',
    component:IssueColorBoxComponent,
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[]
})
export class ColorRoutingModule { }
