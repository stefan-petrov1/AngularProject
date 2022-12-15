import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePostComponent } from './components/profile-post/profile-post.component';
import { ProfileEmailComponent } from './components/profile-email/profile-email.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, LogoutComponent, ProfileComponent, ProfilePostComponent, ProfileEmailComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    RouterModule,
  ],
})
export class AuthModule {}
