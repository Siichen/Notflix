import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import {
  Card,
  ResData,
  Movie,
} from '../../interfaces/Movie/discoverMovie.interface';
import {
  DetailsCard,
  Details,
} from '../../interfaces/Movie/detailsMovie.interace';
import { AUTHSERVER } from '../../core/core.module';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TmbdService {
  // dependency injection
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTHSERVER) public authServerPath: string
  ) {}

  private readonly _baseUrl: string = `${this.authServerPath}`;
  private readonly imageURL: string = 'https://image.tmdb.org/t/p/w500';

  // -------------------------------------------------------------
  // 1. movie item
  getMovies(page: number): Observable<Card[]> {
    return this.http
      .get<ResData>(`${this._baseUrl}/discover/movie?page=${page}`)
      .pipe(
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
            movieId: movie.id,
          }))
        ),
        tap((cards: Card[]) => {
          // console.log('Transformed Cards:', cards);
        })
      );
  }
  // -------------------------------------------------------------
  // 2. More details > Movie item
  getDetails(movie_id: number): Observable<DetailsCard> {
    return this.http.get<Details>(`${this._baseUrl}/movie/${movie_id}`).pipe(
      map(
        (detail: Details): DetailsCard => ({
          moviePoster: detail.poster_path
            ? `${this.imageURL}${detail.poster_path}`
            : '',
          movieBackDrop: detail.backdrop_path
            ? `${this.imageURL}${detail.backdrop_path}`
            : '',
          movieName: detail.title,
          movieVote: detail.vote_average,
          movieCount: detail.vote_count,
          movieRunTime: detail.runtime,
          movieGenres: detail.genres,
          movieDate: detail.release_date,
          movieOverview: detail.overview,
          movieHomePage: detail.homepage,
          movieId: detail.id,
        })
      ),
      tap((card: DetailsCard) => {
        // console.log('Transformed Card:', card);
      })
    );
  }
  // -------------------------------------------------------------
  // 3. Youtube trailers > More details
  getVideos(movie_id: number): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/movie/${movie_id}/videos`);
  }
}
// -------------------------------------------------------------
// export class TmbdService {
//   private readonly apiKey: string = 'a29be70620e3a67d99f5d9a42177561d';
//   private readonly apiURL: string =
//     'https://api.themoviedb.org/3/discover/movie';
//   private readonly detailURL: string = 'https://api.themoviedb.org/3/movie';
//   private readonly imageURL: string = 'https://image.tmdb.org/t/p/w500';
//   private readonly videoURL: string = 'https://api.themoviedb.org/3/movie';

//   // private movies$ = new Subject<Card[]>();
//   // movielist$ = this.movies$.asObservable();

//   constructor(private http: HttpClient) {}
