import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
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
