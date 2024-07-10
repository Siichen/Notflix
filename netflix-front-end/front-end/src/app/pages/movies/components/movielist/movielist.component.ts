import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TmbdService } from '../../../../services/tmbd/tmbd.service';
import { Card } from '../../../../interfaces/Movie/discoverMovie.interface';
import { Observable, Subscription } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit, OnDestroy {
  movies: Card[] = [];
  private sbp: Subscription = new Subscription();
  page: number = 1;
  totalMoviesLoaded: number = 0;

  constructor(private tmbdService: TmbdService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe();
  }

  loadMovies(): void {
    this.sbp.add(
      this.tmbdService.getMovies(this.page).subscribe((data: Card[]) => {
        this.movies = [...this.movies, ...data];
        this.totalMoviesLoaded += data.length;
        this.page++;
      })
    );
  }

  onScroll(): void {
    if (this.totalMoviesLoaded % 20 === 0) {
      this.loadMovies();
    }
  }
}
