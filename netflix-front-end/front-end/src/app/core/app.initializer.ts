import { AuthService } from '../services/auth/auth.service';

export const appInitializer = (authService: AuthService) => {
  console.log('this is Initialization');
  return () =>
    new Promise<void>((resolve) => {
      authService.refreshToken().subscribe({
        next: () => resolve(),
        error: () => resolve(),
      });
    });
};
