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
import { Observable } from 'rxjs';

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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTHSERVER) private authServerPath: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.authService.userSubject.getValue();
    console.log('AuthInterceptor: intercept called');
    console.log('User:', user);

    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = req.url.startsWith(this.authServerPath);
    const isLoginRequest = req.url.endsWith('/auth/signin');

    console.log('isLoggedIn:', isLoggedIn);
    console.log('isApiUrl:', isApiUrl);
    console.log('Request URL:', req.url);
    console.log('AuthServerPath:', this.authServerPath);

    if (isLoggedIn && isApiUrl && !isLoginRequest) {
      console.log('Adding Authorization header');
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
      });
    }

    return next.handle(req);
  }
}
