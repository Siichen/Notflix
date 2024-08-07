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
      this.authService.login(this.signinForm.value).subscribe(
        (response: any) => {
          this.login_msg.msg = '';
          this.errorMessage = null;
          console.log('Login successful:', response);
          this.router.navigate(['/movies']);
        },
        (err: any) => {
          console.log(err);
          this.login_msg.msg = 'Please check your email and password';
          this.errorMessage = 'Invalid login credentials';
        }
      );
    }
  }
}

//   onSubmit() {
//     if (this.signinForm.valid) {
//       const credencialSignIn = {
//         email: this.signinForm.get('email')?.value,
//         password: this.signinForm.get('password')?.value,
//         username: 'Sichen',
//       };
//       this.authService.login(credencialSignIn).subscribe(
//         (response: any) => {
//           this.login_msg.msg = '';
//           this.errorMessage = null;
//           console.log('Login successful:', response);
//           this.router.navigate(['/movies']);
//         },
//         (err: any) => {
//           console.log(err);
//           this.login_msg.msg = 'Please check your email and password';
//           this.errorMessage = 'Invalid login credentials';
//         }
//       );
//     }
//   }
// }
