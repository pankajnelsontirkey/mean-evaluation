import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const AuthRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
  // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
