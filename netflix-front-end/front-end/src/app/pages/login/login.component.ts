import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible: boolean = false;
  signinForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      emailOrphone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log('Form Submitted', this.signinForm.value);
    }
  }
}
