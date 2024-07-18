import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AUTHSERVER } from '../../core/core.module';
import { Observable, switchMap, take } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTHSERVER) private authServerPath: string
  ) {}

  // export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //   const auth = inject(AuthService);
  //   const authServerPath = inject(AUTHSERVER);

  //   const user = auth.userSubject.value;

  //   const isLoggedIn = user && user.jwtToken;
  //   const isApiUrl = req.url.startsWith(authServerPath);

  //   if (isLoggedIn && isApiUrl) {
  //     console.log('Adding Authorization header');
  //     req = req.clone({
  //       setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
  //     });
  //   }

  //   return next(req);
  // };

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('AuthInterceptor called');

    return this.authService.isLoggedIn$.pipe(
      take(1),
      switchMap((isLoggedIn) => {
        console.log('Is user logged in:', isLoggedIn);

        const user = this.authService.userSubject.getValue();
        const isApiUrl = req.url.startsWith(this.authService.authServerPath);

        // console.log('User in interceptor:', user);

        if (isLoggedIn && isApiUrl && user?.jwtToken) {
          console.log('Adding Authorization header');
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
          });
          console.log(
            'Authorization header added:',
            req.headers.get('Authorization')
          );
        } else {
          // console.log(
          //   'Authorization header not added. isApiUrl:',
          //   isApiUrl,
          //   'user.jwtToken:',
          //   user?.jwtToken
          // );
        }

        return next.handle(req);
      })
    );
  }
}
