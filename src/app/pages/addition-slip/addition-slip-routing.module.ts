import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionSlipComponent } from './addition-slip.component';
import { DyeingSlipComponent } from './dyeing-slip/dyeing-slip.component';
const routes: Routes = [
  {
    path:'',
    component:AdditionSlipComponent,
    // canActivate:[DyeingSlipGuard],
    // canLoad:[DyeingSlipGuard],
    data: { PermissionName: ['view','view group','view all',],compName:"dyeingSlip"}
  },
  {
    path:'dyeingSlip',
    component:DyeingSlipComponent,
    // canActivate:[DyeingSlipGuard],
    // canLoad:[DyeingSlipGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"dyeingSlip"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionSlipRoutingModule { }
