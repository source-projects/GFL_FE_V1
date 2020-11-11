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
    canActivate:[QualityGuard],
    canLoad: [QualityGuard]
  },
  {
    path: 'add',
    component: AddEditQualityComponent
  }, {
    path: 'edit/:id',
    component: AddEditQualityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[QualityGuard]
})
export class QualityRoutingModule { }
