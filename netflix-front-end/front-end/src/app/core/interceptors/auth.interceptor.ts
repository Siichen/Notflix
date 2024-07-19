import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AUTHSERVER } from '../../core/core.module';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService.userSubject.value;
    console.log('Interceptor triggered.');
    console.log('Current User in AuthService:', currentUser);

    if (currentUser && currentUser.jwtToken) {
      // Clone the request and add the Authorization header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.jwtToken}`,
        },
      });
      console.log('Modified request with Authorization header:', clonedRequest);
      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
    }
    // If there's no token, just pass the request along without modification
    return next.handle(req);
  }
}
