// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
// import { tap, catchError, map } from 'rxjs/operators';
// import { TmbdService } from '../tmbd/tmbd.service';
// import { AppUser } from '../../interfaces/User/user-login.interface';
// import { Token } from '../../interfaces/User/token.interface';
// import { AUTHSERVER } from '../../core/core.module';
// import { AppUserAuth } from '../../interfaces/User/user-auth.interface';
// import { UserRole } from '../../interfaces/User/user-auth.interface';
// import { AppUserRegister } from '../../interfaces/User/user-signup.interface';
// import { UserInfo } from '../../interfaces/User/user-signup.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private jwtHelper = new JwtHelperService();
//   userSubject = new BehaviorSubject<AppUserAuth | null>(null);
//   user$ = this.userSubject.asObservable();
//   // isLoggedIn: boolean = false;
//   isLoggedInSubject = new BehaviorSubject<boolean>(false);
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   loading$ = new BehaviorSubject<boolean>(false);
//   private refreshTokenTimeout!: ReturnType<typeof setTimeout>;
//   private appUserRegister = new AppUserRegister();

//   constructor(
//     private readonly router: Router,
//     private readonly http: HttpClient,
//     private readonly tmdbService: TmbdService,
//     @Inject(AUTHSERVER) public readonly authServerPath: string
//   ) {}

//   login(appUser: AppUser): Observable<Token> {
//     return this.http
//       .post<Token>(`${this.authServerPath}/auth/signin`, appUser)
//       .pipe(
//         tap(({ accessToken, role }: Token) => {
//           console.log('Received accessToken:', accessToken);
//           this.setUserValueByToken({ accessToken, role });
//           // this.isLoggedIn = true;
//           this.isLoggedInSubject.next(true);
//           this.router.navigate(['/movies']);
//           console.log('User logged in:', this.userSubject.getValue());
//         }),
//         catchError((error) => {
//           if (error.status === 401) {
//             this.isLoggedInSubject.next(false);
//             return throwError(() => new Error('Invalid credentials'));
//           }
//           return throwError(
//             () => new Error('Something went wrong during sign in!')
//           );
//         })
//       );
//   }

//   signup(
//     appUserRegister: AppUserRegister
//   ): Observable<{ user: UserInfo; accessToken: string }> {
//     console.log('Signing up with data:', appUserRegister);
//     return this.http
//       .post<{ user: UserInfo; accessToken: string }>(
//         `${this.authServerPath}/auth/signup`,
//         appUserRegister
//       )
//       .pipe(
//         tap(({ user, accessToken }) => {
//           console.log('Signup successful, received token:', {
//             user,
//             accessToken,
//           });
//           if (accessToken) {
//             const role = user?.role || UserRole.USER;
//             this.setUserValueByToken({ accessToken, role });
//             // this.isLoggedIn = true;
//             this.isLoggedInSubject.next(true);
//             this.router.navigate(['/register2']);
//           } else {
//             throw new Error('AccessToken is null');
//           }
//         }),
//         catchError((error) => {
//           console.error('Signup failed:', error);
//           if (error) {
//             return throwError(
//               () =>
//                 new Error(
//                   'Validation error: ' + JSON.stringify(error.error.message)
//                 )
//             );
//           }
//           return throwError(
//             () => new Error('Something went wrong during sign up!')
//           );
//         })
//       );
//   }

//   private setUserValueByToken = ({ accessToken, role }: Token) => {
//     const decodedToken = this.jwtHelper.decodeToken(accessToken);
//     console.log('Decoded token:', decodedToken);
//     if (!decodedToken) {
//       throw new Error('Invalid accessToken');
//     }
//     const { id, username, email, tmdb_key, exp } = decodedToken;

//     const user: AppUserAuth = {
//       id,
//       username,
//       email,
//       role,
//       tmdb_key,
//       jwtToken: accessToken,
//     };

//     console.log('User object before setting:', user); // success

//     localStorage.setItem('currentUser', JSON.stringify(user));
//     this.userSubject.next(user);
//     console.log(
//       'Current User in AuthService after set:',
//       this.userSubject.getValue()
//     );
//     this.startRefreshTokenTimer(exp);
//     // this.isLoggedIn = true;
//     this.isLoggedInSubject.next(true);
//     console.log(
//       'User set in userSubject:',
//       user,
//       'isLoggedIn:',
//       this.isLoggedInSubject.value
//     );
//   };

//   refreshToken(): Observable<any> {
//     const currentUser = this.userSubject.value;
//     if (!currentUser || !currentUser.jwtToken) {
//       this.router.navigate(['/']);
//       return of('err');
//     }
//     const headers = new HttpHeaders().set(
//       'Authorization',
//       `Bearer ${currentUser.jwtToken}`
//     );

//     const { id, username, email, tmdb_key, role } = currentUser;

//     // if (!id || !username || !email || !tmdb_key) {
//     //   console.error('Required user information not found in user subject');
//     //   return of('err');
//     // }

//     const refreshTokenDto = { id, username, email, role, tmdb_key };
//     return this.http
//       .post<any>(`${this.authServerPath}/auth/refresh-token`, refreshTokenDto, {
//         headers,
//       })
//       .pipe(
//         tap((response: any) => {
//           console.log('Refresh token response:', response);
//           this.setUserValueByToken({
//             accessToken: response.accessToken,
//             role: response.role,
//           });
//         }),
//         catchError((error) => {
//           console.error('Something went wrong during token refresh!', error);
//           return throwError(
//             () => new Error('Something went wrong during token refresh!')
//           );
//         })
//       );
//   }

//   private startRefreshTokenTimer(exp: string) {
//     const expires = new Date(+exp * 1000);
//     const timeout = expires.getTime() - Date.now();

//     this.refreshTokenTimeout = setTimeout(() => {
//       if (this.userSubject.value?.jwtToken) {
//         this.refreshToken().subscribe();
//       }
//     }, timeout);
//   }

//   private stopRefreshTokenTimer() {
//     clearTimeout(this.refreshTokenTimeout);
//   }

//   logout() {
//     localStorage.removeItem('currentUser');
//     this.stopRefreshTokenTimer();
//     this.router.navigate(['/home']);
//   }
// }

// // isLoggedIn(): Observable<boolean> {
// //   return this.http.get<boolean>('/auth/check-login').pipe(
// //     map((response) => response),
// //     catchError(() => of(false))
// //   );
// // }

// // isLoggedIn(): boolean {
// //   const token = localStorage.getItem('token');
// //   if (!token) {
// //     return false;
// //   } else {
// //     return true;
// //   }
// // // }

//
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import {
  AppUserAuth,
  UserRole,
} from '../../interfaces/User/user-auth.interface';
import { AppUser } from '../../interfaces/User/user-login.interface';

import { TmbdService } from '../tmbd/tmbd.service';
import {
  AppUserRegister,
  UserInfo,
} from '../../interfaces/User/user-signup.interface';

import { AUTHSERVER } from '../../core/core.module';
import { isPlatformBrowser } from '@angular/common';
import { AuthDto } from '../../interfaces/User/authDto.interface';

@Injectable()
export class AuthService {
  private jwtHelper = new JwtHelperService();
  userSignal = signal<AppUserAuth>({});
  loading$ = new BehaviorSubject<boolean>(false);

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  private isBrowser!: boolean;
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmbdService,
    @Inject(AUTHSERVER) public readonly authServerPath: string
  ) {
    this.isBrowser = isPlatformBrowser(this.platform);
  }

  /* SignIn */
  login(appUser: AppUser): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.loading$.next(false);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          this.loading$.next(false);
          return throwError('SomeThing Wrong during sign in!', error);
        })
      );
  }

  /* SignOut */
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      this.stopRefreshTokenTimer();

      this.userSignal.set({});
      this.router.navigate(['/home']);
    }
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }
  signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
    this.loading$.next(true);
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role } = this.appUserRegister;

    if (!username || !password || !email || !role) return of('Register failed');

    return this.http
      .post<AuthDto>(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.loading$.next(false);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          this.loading$.next(false);
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }): Observable<AuthDto> {
    this.stopRefreshTokenTimer();

    return this.http
      .patch<AuthDto>(
        [this.authServerPath, 'auth', 'userupdate'].join('/'),
        userRole
      )
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.loading$.next(true);
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          this.loading$.next(false);
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  //* helper methods;
  refreshToken(): Observable<AuthDto | string> {
    let token;
    if (this.isBrowser) {
      token = localStorage.getItem('access_token');
    }
    if (!token) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http
      .get<AuthDto>(`${this.authServerPath}/auth/refresh-token`, { headers })
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
        })
      );
  }
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userSignal().jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    if (this.isBrowser) {
      localStorage.setItem('access_token', accessToken);
    }

    const { id, username, email, exp } =
      this.jwtHelper.decodeToken(accessToken);

    const user = {
      ...{ id, username, email, role },
      jwtToken: accessToken,
    };
    this.userSignal.set(user);
    this.startRefreshTokenTimer(exp);
  };
}
