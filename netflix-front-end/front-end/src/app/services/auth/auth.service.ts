import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TmbdService } from '../tmbd/tmbd.service';
import { AppUser } from '../../interfaces/User/user-login.interface';
import { AuthDto } from '../../interfaces/User/authDto.interface';
import { AUTHSERVER } from '../../core/core.module';
import { AppUserAuth } from '../../interfaces/User/user-auth.interface';
import { UserRole } from '../../interfaces/User/user-auth.interface';
import { AppUserRegister } from '../../interfaces/User/user-signup.interface';
import { UserInfo } from '../../interfaces/User/user-signup.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  userSubject = new BehaviorSubject<AppUserAuth | null>(null);
  user$ = this.userSubject.asObservable();
  // isLoggedIn: boolean = false;
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  loading$ = new BehaviorSubject<boolean>(false);
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;
  private appUserRegister = new AppUserRegister();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmbdService,
    @Inject(AUTHSERVER) public readonly authServerPath: string
  ) {}

  login(appUser: AppUser): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          console.log('Received accessToken:', accessToken);
          this.setUserValueByToken({ accessToken, role });
          // this.isLoggedIn = true;
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/movies']);
          console.log('User logged in:', this.userSubject.getValue());
        }),
        catchError((error) => {
          if (error.status === 401) {
            this.isLoggedInSubject.next(false);
            return throwError(() => new Error('Invalid credentials'));
          }
          return throwError(
            () => new Error('Something went wrong during sign in!')
          );
        })
      );
  }

  signup(
    appUserRegister: AppUserRegister
  ): Observable<{ user: UserInfo; accessToken: string }> {
    console.log('Signing up with data:', appUserRegister);
    return this.http
      .post<{ user: UserInfo; accessToken: string }>(
        `${this.authServerPath}/auth/signup`,
        appUserRegister
      )
      .pipe(
        tap(({ user, accessToken }) => {
          console.log('Signup successful, received token:', {
            user,
            accessToken,
          });
          if (accessToken) {
            const role = UserRole.USER;
            this.setUserValueByToken({ accessToken, role });
            // this.isLoggedIn = true;
            this.isLoggedInSubject.next(true);
            this.router.navigate(['/register2']);
          } else {
            throw new Error('AccessToken is null');
          }
        }),
        catchError((error) => {
          console.error('Signup failed:', error);
          if (error) {
            return throwError(
              () =>
                new Error(
                  'Validation error: ' + JSON.stringify(error.error.message)
                )
            );
          }
          return throwError(
            () => new Error('Something went wrong during sign up!')
          );
        })
      );
  }

  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log('Decoded token:', decodedToken);
    if (!decodedToken) {
      throw new Error('Invalid accessToken');
    }
    const { id, username, email, tmdb_key, exp } = decodedToken;

    const user = {
      id,
      username,
      email,
      role,
      tmdb_key,
      jwtToken: accessToken,
    };

    console.log('User object before setting:', user); // success

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
    console.log(
      'Current User in AuthService after set:',
      this.userSubject.getValue()
    );
    this.startRefreshTokenTimer(exp);
    // this.isLoggedIn = true;
    this.isLoggedInSubject.next(true);
    console.log(
      'User set in userSubject:',
      user,
      'isLoggedIn:',
      this.isLoggedInSubject.value
    );
  };

  refreshToken(): Observable<any> {
    const currentUser = this.userSubject.value;
    if (!currentUser || !currentUser.jwtToken) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${currentUser.jwtToken}`
    );

    const { id, username, email, role } = currentUser;

    // if (!id || !username || !email || !tmdb_key) {
    //   console.error('Required user information not found in user subject');
    //   return of('err');
    // }

    const refreshTokenDto = { id, username, email, role };
    return this.http
      .post<any>(`${this.authServerPath}/auth/refresh-token`, refreshTokenDto, {
        headers,
      })
      .pipe(
        tap((response: any) => {
          console.log('Refresh token response:', response);
          this.setUserValueByToken({
            accessToken: response.accessToken,
            role: response.role,
          });
        }),
        catchError((error) => {
          console.error('Something went wrong during token refresh!', error);
          return throwError(
            () => new Error('Something went wrong during token refresh!')
          );
        })
      );
  }

  isUserLoggedIn(): Observable<boolean> {
    const currentUser = this.userSubject.getValue();
    if (currentUser && currentUser.jwtToken) {
      const isTokenExpired = this.jwtHelper.isTokenExpired(
        currentUser.jwtToken
      );
      return of(!isTokenExpired);
    } else {
      return of(false);
    }
  }

  upgradePermission(permission: { role: UserRole }): Observable<any> {
    const currentUser = this.userSubject.getValue();
    if (!currentUser || !currentUser.jwtToken) {
      return throwError(() => new Error('User not logged in'));
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${currentUser.jwtToken}`
    );

    return this.http
      .post<any>(`${this.authServerPath}/auth/upgrade`, permission, {
        headers,
      })
      .pipe(
        tap((response: any) => {
          console.log('Permission upgrade response:', response);
          this.setUserValueByToken({
            accessToken: response.accessToken,
            role: response.role,
          });
        }),
        catchError((error) => {
          console.error(
            'Something went wrong during permission upgrade!',
            error
          );
          return throwError(
            () => new Error('Something went wrong during permission upgrade!')
          );
        })
      );
  }

  private startRefreshTokenTimer(exp: string) {
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userSubject.value?.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.stopRefreshTokenTimer();
    this.router.navigate(['/home']);
  }
}
