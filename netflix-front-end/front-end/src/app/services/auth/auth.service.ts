import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TmbdService } from '../tmbd/tmbd.service';
import { AppUser } from '../../interfaces/User/user-login.interface';
import { AuthDto } from '../../interfaces/User/authDto.interface';
import { AUTHSERVER } from '../../core/core.module';
import { AppUserAuth } from '../../interfaces/User/user-auth.interface';
import { UserRole } from '../../interfaces/User/user-auth.interface';
import { AppUserRegister } from '../../interfaces/User/user-signup.interface';
import { UserInfo } from '../../interfaces/User/user-signup.interface';

@Injectable()
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

  login(appUser: AppUser): Observable<AuthDto> {
    return this.http
      .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
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

  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    localStorage.setItem('access_token', accessToken);

    const { id, username, email, tmdb_key, exp } =
      this.jwtHelper.decodeToken(accessToken);

    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('tmdb_key', tmdb_key);
    localStorage.setItem('role', role);

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
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const tmdb_key = localStorage.getItem('tmdb_key');
    const role = localStorage.getItem('role') as UserRole;

    if (!id || !username || !email || !tmdb_key) {
      console.error('Required user information not found in local storage');
      return of('err');
    }

    const refreshTokenDto = { id, username, email, role, tmdb_key }; // 创建 refreshTokenDto 对象
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
}
