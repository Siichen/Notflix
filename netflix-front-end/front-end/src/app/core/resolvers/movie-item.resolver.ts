import {
  ActivatedRouteSnapshot,
  Resolve,
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
  constructor(private tmbd: TmbdService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const movie_id = route.paramMap.get('id');
    if (!movie_id) {
      return of(null);
    }

    return this.tmbd.getDetails(parseInt(movie_id));
  }
}
