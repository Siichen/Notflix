import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import {
  Card,
  ResData,
  Movie,
} from '../../interfaces/Movie/discoverMovie.interface';

@Injectable({
  providedIn: 'root',
})
export class TmbdService {
  private readonly apiURL: string =
    'https://api.themoviedb.org/3/discover/movie';
  private readonly apiKey: string = 'a29be70620e3a67d99f5d9a42177561d';
  private readonly imageURL: string = 'https://image.tmdb.org/t/p/w500';

  // private movies$ = new Subject<Card[]>();
  // movielist$ = this.movies$.asObservable();

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Card[]> {
    return this.http.get<ResData>(`${this.apiURL}?api_key=${this.apiKey}`).pipe(
      map(({ results }: ResData): Card[] =>
        results!.map((movie: Movie) => ({
          posterImage: movie.poster_path
            ? `${this.imageURL}${movie.poster_path}`
            : '',
          movieName: movie.title,
          movieYear: movie.release_date,
          movieLanguage: movie.original_language,
          movieVote: movie.vote_average,
          movieOverview: movie.overview,
        }))
      ),
      tap((cards: Card[]) => {
        console.log('Transformed Cards:', cards);
      })
    );
  }
}
