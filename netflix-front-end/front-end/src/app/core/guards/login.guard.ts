// src/app/pages/login/login.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { first, map } from 'rxjs/operators';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    first(),
    map((user) => {
      if (!user) {
        return true; // 如果用户未登录，允许访问登录页面
      } else {
        router.navigate(['/movies']); // 如果用户已登录，重定向到电影页面
        return false;
      }
    })
  );
};
