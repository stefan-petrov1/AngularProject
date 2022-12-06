import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../common/auth.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') loginForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((user) => {
      if (user) {
        this.router.navigate([Pages.Home]);
      }
    });
  }
}
