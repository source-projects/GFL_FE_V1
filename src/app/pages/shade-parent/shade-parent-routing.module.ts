import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadeParentComponent } from './shade-parent.component';

const routes: Routes = [{ path: '', component: ShadeParentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShadeParentRoutingModule { }
