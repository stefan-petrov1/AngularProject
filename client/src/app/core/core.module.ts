import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorBoundaryComponent } from './error-boundary/error-boundary.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    ErrorBoundaryComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  exports: [
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    ErrorBoundaryComponent,
  ],
})
export class CoreModule {}
