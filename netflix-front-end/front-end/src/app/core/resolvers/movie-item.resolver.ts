import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { TmbdService } from '../../services/tmbd/tmbd.service';
import { catchError, Observable, of, tap } from 'rxjs';

// export const movieItemResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root',
})
export class MovieItemResolver implements Resolve<boolean> {
  constructor(private tmbd: TmbdService, private auth: AuthService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.auth.loading$.next(true);

    const movie_id = route.paramMap.get('id');
    console.log('MovieItemResolver: movie_id is', movie_id);
    if (!movie_id) {
      console.log('MovieItemResolver: movie_id is missing!');
      this.auth.loading$.next(false);
      return of(false);
    }

    console.log('MovieItemResolver works.');
    return this.tmbd.getDetails(parseInt(movie_id)).pipe(
      tap({
        next: (details) => {
          console.log(
            'MovieItemResolver: successfully fetched movie details',
            details
          );
          this.auth.loading$.next(false);
        },
        error: (error) => {
          console.error(
            'MovieItemResolver: error while fetching movie details',
            error
          );
          this.auth.loading$.next(false);
        },
      })
    );
  }
}
