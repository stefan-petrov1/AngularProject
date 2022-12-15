import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/common/auth.css'],
})
export class LoginComponent {
  @ViewChild('form') loginForm!: NgForm;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.loginForm.value;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate([returnUrl || Pages.Home]),
      error: () => (this.submitted = false),
    });
  }
}
