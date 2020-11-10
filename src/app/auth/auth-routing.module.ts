import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NbAuthComponent } from '@nebular/auth';
import { AuthComponent } from './auth.component';
import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [{
      path: '',
      component: LoginComponent,
    },]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}