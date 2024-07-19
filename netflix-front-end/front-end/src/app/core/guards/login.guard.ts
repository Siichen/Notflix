import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginFnGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const { jwtToken } = authService.userSignal();
  if (!jwtToken) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

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
