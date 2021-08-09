import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShuffleComponent } from "./shuffle/shuffle.component";
const routes: Routes = [
  {
    path:'',
    component:ShuffleComponent,
   },
   {
    path:'shuffle',
    component:ShuffleComponent,
   },
   

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchShuffleRoutingModule { }
