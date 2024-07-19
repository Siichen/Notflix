import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../../services/validators/register.service';
import {
  catchError,
  debounceTime,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { AuthDto } from '../../../../interfaces/User/authDto.interface';
import { HttpClient } from '@angular/common/http';
import { AUTHSERVER } from '../../../../core/core.module';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent {
  regForm!: FormGroup;
  isLoading = false;

  get email() {
    return this.regForm.get('email');
  }
  get password() {
    return this.regForm.get('password');
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}
  ngOnInit(): void {
    const initemailVal = this.authService.appNewUser.email
      ? this.authService.appNewUser.email
      : '';

    this.regForm = this.fb.group({
      email: [initemailVal, [Validators.email], [this.hasEmail()]],
      password: [''],
    });
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit() {
    this.authService.addUserInfo(this.regForm.value);
    this.router.navigate(['register2'], { relativeTo: this.route });
  }

  /* customValidator */
  hasEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return control.valueChanges.pipe(
        tap((_) => {
          this.isLoading = true;
        }),
        debounceTime(500),
        switchMap((_) => {
          return this.http.post(
            [this.authServerPath, 'auth', 'check-email'].join('/'),
            { email }
          );
        }),
        map((result: any) => {
          this.isLoading = false;
          return result ? { hasemail: true } : null;
        }),
        take(1)
      );
    };
  }
}

//   constructor(
//     private fb: FormBuilder,
//     private rs: RegisterService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private authService: AuthService
//   ) {
//     this.regForm = this.fb.group({
//       email: [
//         '',
//         [Validators.required, Validators.email, Validators.minLength(5)],
//         [this.emailValidator()],
//       ],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//     });
//   }

//   emailValidator(): AsyncValidatorFn {
//     return (control: AbstractControl): Observable<ValidationErrors | null> => {
//       return this.rs.checkEmail(control.value).pipe(
//         map((exists) => (exists ? { emailExists: true } : null)),
//         catchError(() => of(null))
//       );
//     };
//   }

//   onSubmit() {
//     console.log('Form submit attempt');
//     if (this.regForm.valid) {
//       const formValue = this.regForm.value;
//       const username = 'Sichen';
//       const tmdb_key = 'abcdefjhijklmnopqrstuvwxyz';

//       const registrationData = {
//         ...formValue,
//         username,
//         tmdb_key,
//       };
//       console.log('Form is valid, submitting:', registrationData);
//       this.authService.signup(registrationData).subscribe(
//         (response: string | AuthDto) => {
//           console.log('User registered successfully', response);
//           if (typeof response !== 'string' && response.accessToken) {
//             this.router.navigate(['register2'], { relativeTo: this.route });
//             console.log('Received accessToken:', response.accessToken);
//           } else {
//             console.error('No accessToken received or response is a string');
//           }
//         },
//         (error) => {
//           console.error('Error registering user', error);
//         }
//       );
//     } else {
//       console.log('Form is invalid');
//       this.router.navigate(['register2'], { relativeTo: this.route });
//     }
//   }
// }
