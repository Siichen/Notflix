import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map, take } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginGuard implements CanActivate {
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
