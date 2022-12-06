import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from '../shared/enums';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: Pages.Login,
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: Pages.SignUp,
    component: SignupComponent,
    data: {
      title: 'Sign Up',
    },
  },
  {
    path: Pages.Logout,
    component: LogoutComponent,
    data: {
      title: 'Logout',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
