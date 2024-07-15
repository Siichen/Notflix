import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AppUserAuth } from '../../interfaces/User/user-auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible: boolean = false;
  signinForm: FormGroup;
  login_msg = { msg: '' };
  userSignal!: Signal<AppUserAuth>;

  constructor(
    private fb: FormBuilder, // private readonly authService: AuthService
    private authService: AuthService
  ) {
    this.signinForm = this.fb.group({
      emailOrphone: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  // onSubmit() {
  //   if (this.signinForm.valid) {
  //     console.log('Form Submitted', this.signinForm.value);
  //   }
  // }
  onSubmit() {
    const credencialSignIn = {
      email: this.signinForm.get('emailOrphone')?.value,
      password: this.signinForm.get('password')?.value,
    };
    this.authService.login(credencialSignIn).subscribe(
      (_: any) => {
        this.login_msg.msg = '';
      },
      (err: any) => {
        console.log(err);
        this.login_msg.msg = 'Please check your login credentials';
      }
    );
  }
}
