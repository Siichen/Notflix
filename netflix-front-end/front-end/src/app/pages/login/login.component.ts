// import { Component, Signal } from '@angular/core';
// import { AuthService } from '../../services/auth/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AppUserAuth } from '../../interfaces/User/user-auth.interface';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   passwordVisible: boolean = false;
//   signinForm: FormGroup;
//   login_msg = { msg: '' };
//   userSignal!: Signal<AppUserAuth>;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.signinForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }

//   togglePassword() {
//     this.passwordVisible = !this.passwordVisible;
//   }

//   // onSubmit() {
//   //   if (this.signinForm.valid) {
//   //     console.log('Form Submitted', this.signinForm.value);
//   //   }
//   // }

//   onSubmit() {
//     if (this.signinForm.valid) {
//       const credencialSignIn = {
//         email: this.signinForm.get('email')?.value,
//         password: this.signinForm.get('password')?.value,
//       };
//       this.authService.login(credencialSignIn).subscribe(
//         (_: any) => {
//           this.login_msg.msg = '';
//         },
//         (err: any) => {
//           console.log(err);
//           this.login_msg.msg = 'Please check your login credentials';
//         }
//       );
//     }
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  passwordVisible: boolean = false;
  signinForm: FormGroup;
  login_msg = { msg: '' };
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const credencialSignIn = {
        email: this.signinForm.get('email')?.value,
        password: this.signinForm.get('password')?.value,
      };
      this.authService.login(credencialSignIn).subscribe(
        (response: any) => {
          this.login_msg.msg = '';
          this.errorMessage = null;
          console.log('Login successful:', response);
        },
        (err: any) => {
          console.log(err);
          this.login_msg.msg = 'Please check your login credentials';
          this.errorMessage = 'Invalid login credentials';
        }
      );
    }
  }
}
