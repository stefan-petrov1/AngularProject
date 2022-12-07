import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';
import {
  appEmailValidator,
  sameValueGroupValidator,
} from 'src/app/shared/validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../common/auth.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = fb.group({
      email: fb.control('', [Validators.required, appEmailValidator]),
      ageCheck: fb.control('', [Validators.requiredTrue]),

      passwords: this.fb.group(
        {
          password: this.fb.control('', [
            Validators.required,
            Validators.minLength(5),
          ]),

          rePassword: this.fb.control(''),
        },
        { validators: [sameValueGroupValidator('password', 'rePassword')] }
      ),
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.controls['ageCheck'].markAsDirty();
      return this.signupForm.markAllAsTouched();
    }

    const { ageCheck, ...data } = this.signupForm.value;
    const {
      email,
      passwords: { password },
    } = data;

    this.submitted = true;
    this.authService.register(email, password).subscribe({
      next: () => this.router.navigate([Pages.Home]),
      error: () => (this.submitted = false),
    });
  }
}
