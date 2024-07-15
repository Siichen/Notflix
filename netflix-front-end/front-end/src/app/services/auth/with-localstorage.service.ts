import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import {
  AppUserAuth,
  UserRole,
} from '../../interfaces/User/user-auth.interface';
import {
  AppUserRegister,
  UserInfo,
} from '../../interfaces/User/user-signup.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TmbdService } from '../tmbd/tmbd.service';
import { AUTHSERVER } from '../../core/core.module';
import { AppUser } from '../../interfaces/User/user-login.interface';

@Injectable({
  providedIn: 'root',
})
export class WithLocalstorageService {
  private jwtHelper = new JwtHelperService();
  private userSubject$!: BehaviorSubject<AppUserAuth>;
  user$!: Observable<AppUserAuth>;

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get userValue(): AppUserAuth {
    return this.userSubject$.value;
  }
  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tmdbService: TmbdService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {
    this.userSubject$ = new BehaviorSubject<AppUserAuth>({});
    this.user$ = this.userSubject$.asObservable();
  }

  /* SignIn */
  login(appUser: AppUser): Observable<{ accessToken: string }> {
    return this.http
      .post<{
        accessToken: string;
      }>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });

          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign in!', error);
        })
      );
  }

  /* SignOut */
  logout() {
    localStorage.removeItem('access_token');

    this.stopRefreshTokenTimer();

    this.userSubject$.next({});
    this.router.navigate(['/home']);
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }
  sighup(userRole: { role: UserRole }): Observable<any> {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userRole,
    };
    const { username, password, email, role } = this.appUserRegister;

    if (!username || !password || !email || !role) {
      return of('Register failed');
    }

    return this.http
      .post<{
        accessToken: string;
      }>(
        [this.authServerPath, 'auth', 'signup'].join('/'),
        this.appUserRegister
      )
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  /* upgrade Uer Permission */
  upgradePermission(userRole: { role: UserRole }) {
    console.log('Change permission class to: ', userRole.role);
    this.stopRefreshTokenTimer();

    return this.http
      .patch<{
        accessToken: string;
      }>([this.authServerPath, 'auth', 'userupdate'].join('/'), userRole)
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        })
      );
  }

  // helper methods;
  refreshToken(): Observable<any> {
    const currentToken = localStorage.getItem('access_token');
    if (!currentToken) {
      this.router.navigate(['/']);
      return of('err');
    }

    const { id, username, email, role } =
      this.jwtHelper.decodeToken(currentToken);
    const user = { id, username, email, role };

    return this.http
      .post<any>(`${this.authServerPath}/auth/refresh-token`, user)
      .pipe(
        tap(({ accessToken }: { accessToken: string }) => {
          this.setUserValueByToken({ accessToken });
        })
      );
  }
  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userValue.jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /* reuseable code in for signin, signup, refresh, update */
  private setUserValueByToken = ({ accessToken }: { accessToken: string }) => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, role, exp } =
      this.jwtHelper.decodeToken(accessToken);

    // this.tmdbService.setMyApiKey = tmdb_key;

    const user = {
      ...{ id, username, email, role },
      jwtToken: accessToken,
    };
    this.userSubject$.next(user);
    this.startRefreshTokenTimer(exp);
  };
}