import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualityComponent } from './quality.component';
import { AddEditQualityComponent } from './add-edit-quality/add-edit-quality.component';
import { QualityService } from '../../@theme/services/quality.service';
import { QualityGuard } from 'app/@theme/guards/quality.guard';

const routes: Routes = [
  {
    path: '',
    component: QualityComponent,
    canActivate: [QualityGuard],
    canLoad: [QualityGuard],
    data: { PermissionName: ['view','view group','view all'] }
  },
  {
    path: 'add',
    component: AddEditQualityComponent,
    canActivate: [QualityGuard],
    //canLoad: [QualityGuard],
    data: { PermissionName: ['add'] }
  }, {
    path: 'edit/:id',
    component: AddEditQualityComponent,
    canActivate: [QualityGuard],
    canLoad: [QualityGuard],
    data: { PermissionName: ['edit','edit group','edit all'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QualityGuard]
})
export class QualityRoutingModule { }
