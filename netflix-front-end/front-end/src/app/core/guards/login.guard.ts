import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // canActivate(): Observable<boolean> | boolean {
  //   return this.authService.isUserLoggedIn().pipe(
  //     map((isLoggedIn) => {
  //       if (isLoggedIn) {
  //         return true;
  //       } else {
  //         this.router.navigate(['/login']);
  //         return false;
  //       }
  //     }),
  //     catchError((error) => {
  //       console.error('LoginGuard - Error checking login status', error);
  //       this.router.navigate(['/login']);
  //       return of(false);
  //     })
  //   );
  // }
  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.authService.user$.pipe(
      map((user) => {
        if (user && user.accessToken) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
