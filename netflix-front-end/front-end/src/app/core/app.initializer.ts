import { AuthService } from '../services/auth/auth.service';

export function appInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve, reject) => {
      console.log('App Initialization started');
      authService.refreshToken().subscribe({
        next: (response) => {
          if (response) {
            resolve(true);
          } else {
            console.log('No valid token found during initialization');
            resolve(true);
          }
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
