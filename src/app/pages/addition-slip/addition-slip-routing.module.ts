import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DyeingSlipGuard } from '../../@theme/guards/dyeing-slip.guard';
import { AdditionSlipComponent } from './addition-slip.component';
const routes: Routes = [
  {
    path:'',
    component:AdditionSlipComponent,
    canActivate:[DyeingSlipGuard],
    canLoad:[DyeingSlipGuard],
    data: { PermissionName: ['view','view group','view all',]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionSlipRoutingModule { }
