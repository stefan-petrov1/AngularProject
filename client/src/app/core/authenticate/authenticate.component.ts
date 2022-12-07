import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authenticate().subscribe({
      next: () => (this.isAuthenticating = false),
      error: () => (this.isAuthenticating = false),
    });
  }
}
