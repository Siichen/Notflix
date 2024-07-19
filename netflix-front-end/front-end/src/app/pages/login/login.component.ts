import { Component, Inject, OnInit, Signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ProdTitle } from '../../core/core.module';
import { AppUserAuth } from '../../interfaces/User/user-auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
// export class LoginComponent {
//   passwordVisible: boolean = false;
//   signinForm: FormGroup;
//   login_msg = { msg: '' };
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.signinForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(1)]],
//     });
//   }

//   togglePassword() {
//     this.passwordVisible = !this.passwordVisible;
//   }

//   onSubmit() {
//     if (this.signinForm.valid) {
//       const credencialSignIn = {
//         email: this.signinForm.get('email')?.value,
//         password: this.signinForm.get('password')?.value,
//       };
//       this.authService.login(credencialSignIn).subscribe(
//         (response: any) => {
//           this.login_msg.msg = '';
//           this.errorMessage = null;
//           console.log('Login successful:', response);
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
export class LoginComponent implements OnInit {
  hide = true;
  backgroundColor = 'rgba(0, 0, 0, 0.8)';
  passwordVisible = false;
  linkList = [
    'FAQ',
    'Help Center',
    'Terms of Use',
    'Privacy',
    'Cookie Preferences',
    'Corporate Information',
  ];
  signinForm!: UntypedFormGroup;
  login_msg = { msg: '' };
  userSignal!: Signal<AppUserAuth>;

  get email() {
    return this.signinForm.get('email');
  }
  get password() {
    return this.signinForm.get('password');
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly titleService: Title,
    // this.titleService.setTitle(`${this.prodTitle}-SignIn`);
    @Inject(ProdTitle) private readonly prodTitle: string
  ) {}
  ngOnInit(): void {
    this.titleService.setTitle(`${this.prodTitle}-SignIn`);
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      loginFacebook: [false],
    });
    this.userSignal = this.authService.userSignal;
  }

  onSubmit() {
    const credencialSignIn = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.authService.login(credencialSignIn).subscribe(
      (_) => {
        this.login_msg.msg = '';
      },
      (err) => {
        console.error('Error during login:', err);
        this.login_msg.msg = 'Please check your login credentials';
      }
    );
  }
  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
