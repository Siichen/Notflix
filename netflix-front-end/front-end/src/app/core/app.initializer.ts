import { AuthService } from '../services/auth/auth.service';

// export const appInitializer = (authService: AuthService) => {
//   return () => {
//     return new Promise<void>((resolve) => {
//       console.log('App Initialization started');
//       authService.refreshToken().subscribe({
//         next: () => {
//           authService.isLoggedInSubject.next(true);
//           resolve();
//         },
//       });
//     });
//   };
// };
// new Promise((resolve) => {authService.refreshToken().subscribe().add(resolve);})
// executed before initialization

export const appInitializer = (authService: AuthService) => {
  console.log('this is Initialization');
  return () =>
    new Promise<void>((resolve) => {
      authService.refreshToken().subscribe({
        next: () => {},
        error: () => resolve(),
        complete: () => resolve(),
      });
    });
};
