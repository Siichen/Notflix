// export const appInitializer = (authService: AuthService) => {
//   console.log('this is Initialization');
//   return () =>
//     new Promise<void>((resolve) => {
//       authService.refreshToken().subscribe({
//         next: () => resolve(),
//         error: () => resolve(),
//       });
//     });
// };
import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve, reject) => {
      authService.refreshToken().subscribe({
        next: () => resolve(true),
        error: () => {
          console.error('Error during app initialization');
          resolve(true);
        },
      });
    });
}
