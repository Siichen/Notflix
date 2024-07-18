import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../../services/validators/register.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent {
  regForm: FormGroup;

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
      password: ['', [Validators.required, Validators.minLength(8)]],
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

      const registrationData = {
        ...formValue,
        username,
        tmdb_key,
      };
      console.log('Form is valid, submitting:', registrationData);
      this.authService.signup(registrationData).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          if (response && response.accessToken) {
            this.router.navigate(['register2'], { relativeTo: this.route });
            console.log('why????');
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
      this.router.navigate(['register2'], { relativeTo: this.route });
    }
  }

  // jumpto(): void {
  //   console.log('Navigating to register2');
  //   this.router.navigate(['register2']);
  // }

  // 我这不加guard他也跳不过去不是guard的锅
}
// navigateTo(route: string) {
//   this.router.navigate(['/register2']);
// }
// jumpto(): void {
//   this.router.navigate(['register2']);
// }
