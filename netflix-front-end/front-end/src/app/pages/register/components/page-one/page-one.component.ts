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

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
})
export class PageOneComponent {
  regForm: FormGroup;

  constructor(private fb: FormBuilder, private rs: RegisterService) {
    this.regForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(10)],
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
}
