import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          console.log('Pass guard successfully.');
          return true;
        } else {
          console.log('User not logged in, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Observable<boolean> {
//     return this.authService.user$.pipe(
//       map((user) => {
//         if (user) {
//           return true;
//         } else {
//           this.router.navigate(['/login']);
//           return false;
//         }
//       })
//     );
//   }
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): Promise<boolean> {
//     return this.authService.isUserLoggedIn().then((isLoggedIn) => {
//       console.log('LoginGuard - current user logged in:', isLoggedIn); // Check the current user login status
//       if (isLoggedIn) {
//         return true;
//       } else {
//         console.log('User not logged in, redirecting to login');
//         this.router.navigate(['/login']);
//         return false;
//       }
//     });
//   }
// }
