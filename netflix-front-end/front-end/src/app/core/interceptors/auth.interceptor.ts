import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AUTHSERVER } from '../../core/core.module';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const currentUser = this.authService.userSubject.value;
//     console.log('Interceptor triggered.');
//     console.log('Current User in AuthService:', currentUser);

//     if (currentUser && currentUser.jwtToken) {
//       // Clone the request and add the Authorization header
//       const clonedRequest = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.jwtToken}`,
//         },
//       });
//       console.log('Modified request with Authorization header:', clonedRequest);
//       // Pass the cloned request to the next handler
//       return next.handle(clonedRequest);
//     }
//     // If there's no token, just pass the request along without modification
//     return next.handle(req);
//   }
// }
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authServerPath = inject(AUTHSERVER);

  const user = authService.userSignal();
  const isApiUrl = req.url.startsWith(`${authServerPath}/auth/sign`);

  if (user && user.jwtToken && !isApiUrl) {
    req = req.clone({
      setHeaders: { Authorization: user.jwtToken },
    });
  }

  return next(req);
};
