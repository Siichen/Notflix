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

import { UserRole } from '../../../../interfaces/User/user-auth.interface';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent {
  regForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private rs: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.regForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
        [this.emailValidator()],
      ],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.rs.checkEmail(control.value).pipe(
        map((exists) => (exists ? { emailExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  onSubmit() {
    console.log('Form submit attempt');
    if (this.regForm.valid) {
      const formValue = this.regForm.value;
      const username = 'Sichen';
      const tmdb_key = 'abcdefjhijklmnopqrstuvwxyz';
      const role = UserRole.ADMIN;

      const registrationData = {
        ...formValue,
        username,
        tmdb_key,
        role,
      };

      console.log('Form is valid, submitting:', registrationData);
      this.authService.signup(registrationData).subscribe(
        (response: any) => {
          console.log('User registered successfully', response);
          if (response.accessToken) {
            this.router.navigate(['register2'], { relativeTo: this.route });
            console.log('Received accessToken:', response.accessToken);
          } else {
            console.error('No accessToken received');
          }
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
