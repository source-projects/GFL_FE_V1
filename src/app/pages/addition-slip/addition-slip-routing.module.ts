import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionSlipComponent } from './addition-slip.component';
import { DyeingSlipComponent } from './dyeing-slip/dyeing-slip.component';
const routes: Routes = [
  {
    path:'',
    component:AdditionSlipComponent,
    },
  {
    path:'dyeingSlip',
    component:DyeingSlipComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionSlipRoutingModule { }
