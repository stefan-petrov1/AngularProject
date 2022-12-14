import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pages } from 'src/app/shared/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  get link() {
    return (
      '/' + (this.authService.isUserAuthenticated ? Pages.Catalog : Pages.Login)
    );
  }

  constructor(private authService: AuthService) {}
}
