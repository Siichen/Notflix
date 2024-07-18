import { AuthService } from '../services/auth/auth.service';

// export function appInitializer(authService: AuthService) {
//   return () =>
//     new Promise((resolve) => {
//       console.log('App Initialization started');
//       authService.refreshToken().subscribe({
//         next: () => {
//           resolve(true);
//         },
//         error: (error) => {
//           console.error('Error during app initialization:', error);
//           resolve(true);
//         },
//       });
//     });
// }

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve) => {
      console.log('App Initialization started');
      authService.refreshToken().subscribe({
        next: () => {
          authService.isLoggedInSubject.next(true);
          resolve(true);
        },
        error: (error) => {
          console.error('Error during app initialization:', error);
          resolve(true);
        },
      });
    });
}

// new Promise((resolve) => {authService.refreshToken().subscribe().add(resolve);})
// executed before initialization
