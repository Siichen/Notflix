import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((loggedIn) => {
        if (loggedIn) {
          return true; // 用户已登录，允许访问
        } else {
          this.router.navigate(['login']); // 用户未登录，重定向到登录页面
          return false;
        }
      })
    );
  }
}
