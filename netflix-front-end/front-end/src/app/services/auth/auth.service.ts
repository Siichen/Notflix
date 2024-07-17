import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TmbdService } from '../tmbd/tmbd.service';
import { AppUser } from '../../interfaces/User/user-login.interface';
import { Token } from '../../interfaces/User/token.interface';
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
  private userSubject = new BehaviorSubject<AppUserAuth | null>(null);
  user$ = this.userSubject.asObservable();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  private appUserRegister = new AppUserRegister();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmbdService,
    @Inject(AUTHSERVER) public readonly authServerPath: string
  ) {}

  login(appUser: AppUser): Observable<Token> {
    return this.http
      .post<Token>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: Token) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          if (error.status === 401) {
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
            const role = user?.role || UserRole.USER;
            this.setUserValueByToken({ accessToken, role });
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

  private setUserValueByToken = ({ accessToken, role }: Token) => {
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
    this.userSubject.next(user);
    this.startRefreshTokenTimer(exp);
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

    const { id, username, email, tmdb_key, role } = currentUser;

    if (!id || !username || !email || !tmdb_key) {
      console.error('Required user information not found in user subject');
      return of('err');
    }

    const refreshTokenDto = { id, username, email, role, tmdb_key };
    return this.http
      .post<any>(`${this.authServerPath}/auth/refresh-token`, refreshTokenDto, {
        headers,
      })
      .pipe(
        tap((response: any) => {
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

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>('/auth/check-login').pipe(
      map((response) => response),
      catchError(() => of(false))
    );
  }
}
// isLoggedIn(): Observable<boolean> {
//   return this.http
//     .get<{ loggedIn: boolean }>(`${this.authServerPath}/auth/check-login`)
//     .pipe(
//       map((response) => response.loggedIn),
//       catchError(() => of(false))
//     );
// }
