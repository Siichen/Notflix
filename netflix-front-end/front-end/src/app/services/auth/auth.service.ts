import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TmbdService } from '../tmbd/tmbd.service';
import { AppUser } from '../../interfaces/User/user-login.interface';
import { loginDto } from '../../interfaces/User/authDto.interface';
import { AUTHSERVER } from '../../core/core.module';
import { UserRegister } from '../../interfaces/User/user-signup.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // dependency injection
  constructor(
    private router: Router,
    private http: HttpClient,
    private tmdbService: TmbdService,
    @Inject(AUTHSERVER) private readonly _baseUrl: string
  ) {}

  // data stream
  private users$ = new BehaviorSubject<loginDto | null>(null);
  user$ = this.users$.asObservable();

  private usernamesubject$ = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );
  username$ = this.usernamesubject$.asObservable();

  private isLoggedInSubject$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('access_token')
  );
  isLoggedIn$ = this.isLoggedInSubject$.asObservable();

  loading$ = new BehaviorSubject<boolean>(false);

  // -------------------------------------------------------------
  // auth function
  // 1. signin
  login(userinfo: AppUser): Observable<any> {
    // console.log('Login userinfo:', userinfo);
    return this.http
      .post<loginDto>(`${this._baseUrl}/auth/signin`, userinfo)
      .pipe(
        map((data) => {
          // console.log('Response from server:', data);
          if (data.accessToken) {
            // store in local storage
            localStorage.setItem('access_token', data.accessToken);
            // add username
            localStorage.setItem('username', userinfo.email);
            // pass it to the user
            this.users$.next(data);
            // console.log('Updated users$ with data:', data);
            // get login status
            this.isLoggedInSubject$.next(true);
          }
          return data;
        })
      );
  }
  // -------------------------------------------------------------
  // 2. signup
  signup(userInfo: UserRegister): Observable<any> {
    return this.http
      .post<loginDto>(`${this._baseUrl}/auth/signup`, userInfo)
      .pipe(
        map((data) => {
          if (data.accessToken) {
            // store in local storage
            localStorage.setItem('access_token', data.accessToken);
            // add username
            localStorage.setItem('username', userInfo.email);
            // pass it to the user
            this.users$.next(data);
            // get login status
            this.isLoggedInSubject$.next(true);
          }
          return data;
        })
      );
  }
  // -------------------------------------------------------------
  // 3. signout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    this.users$.next(null);
    this.usernamesubject$.next(null);
    this.isLoggedInSubject$.next(false);
    this.router.navigate(['/login']);
  }
}
