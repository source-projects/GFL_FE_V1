import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueColorBoxComponent } from './issue-color-box.component';

const routes: Routes = [
  { 
    path:'',
    component:IssueColorBoxComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueColorBoxRoutingModule { }
