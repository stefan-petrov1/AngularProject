import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorBoundaryComponent } from './error-boundary/error-boundary.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';
import { ManageHttpInterceptorProvider } from './interceptors/manage-http.interceptor';
import { RequestInterceptorProvider } from './interceptors/request.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    ErrorBoundaryComponent,
    ErrorComponent,
    SpinnerComponent,
    AuthenticateComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [
    RequestInterceptorProvider,
    ErrorInterceptorProvider,
    ManageHttpInterceptorProvider,
  ],
  exports: [
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    ErrorBoundaryComponent,
    ErrorComponent,
    SpinnerComponent,
    AuthenticateComponent,
  ],
})
export class CoreModule {}
