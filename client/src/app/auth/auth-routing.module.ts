import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from '../shared/enums';
import { CanActivateAuth } from '../shared/guards/auth.activate';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: Pages.Login,
    component: LoginComponent,
    canActivate: [CanActivateAuth],
    data: {
      title: 'Login',
      reqAuth: false,
    },
  },
  {
    path: Pages.SignUp,
    component: SignupComponent,
    canActivate: [CanActivateAuth],
    data: {
      title: 'Sign Up',
      reqAuth: false,
    },
  },
  {
    path: Pages.Logout,
    component: LogoutComponent,
    canActivate: [CanActivateAuth],
    data: {
      title: 'Logout',
      reqAuth: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
