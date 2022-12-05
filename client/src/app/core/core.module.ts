import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';

@NgModule({
  declarations: [NavbarComponent, SearchbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, SearchbarComponent, FooterComponent],
})
export class CoreModule {}
