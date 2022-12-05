import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorBoundaryComponent } from './error-boundary/error-boundary.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
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
  exports: [
    NavbarComponent,
    SearchbarComponent,
    FooterComponent,
    ErrorBoundaryComponent,
  ],
})
export class CoreModule {}
