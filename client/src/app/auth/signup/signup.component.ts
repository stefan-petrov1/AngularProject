import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  appEmailValidator,
  sameValueGroupValidator,
} from 'src/app/shared/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../common/auth.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = fb.group({
      username: fb.control('', [Validators.required, Validators.minLength(5)]),
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.controls['ageCheck'].markAsDirty();
      return this.signupForm.markAllAsTouched();
    }
  }
}
