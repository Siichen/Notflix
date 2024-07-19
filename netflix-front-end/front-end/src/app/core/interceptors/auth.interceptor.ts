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
    console.log('AuthInterceptor called');

    const currentUser = this.authService.userSubject.value;
    if (currentUser && currentUser.jwtToken) {
      console.log('User in interceptor:', currentUser.username);
      console.log('Is user logged in:', true);
      console.log('Adding Authorization header');

      // Clone the request and set the new header in one step
      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${currentUser.jwtToken}` },
      });

      console.log(
        'Authorization header added:',
        clonedReq.headers.get('Authorization')
      );

      return next.handle(clonedReq);
    } else {
      console.log('User does not exist.');
    }

    // If no user is logged in, just pass the original request
    return next.handle(req);
  }
}
//       }
//         const isLoggedIn = !!user;
//         const isApiUrl = req.url.startsWith(this.authService.authServerPath);

//         if (isLoggedIn && isApiUrl && user?.jwtToken) {
//           console.log('Adding Authorization header');
//           req = req.clone({
//             setHeaders: { Authorization: `Bearer ${user.jwtToken}` },
//           });
//           console.log(
//             'Authorization header added:',
//             req.headers.get('Authorization')
//           );
//         } else {
//           console.log(
//             'Authorization header not added. isApiUrl:',
//             isApiUrl,
//             'user.jwtToken:',
//             user?.jwtToken
//           );
//         }

//         return next.handle(req);
//       })
//     );
//   }
// }
