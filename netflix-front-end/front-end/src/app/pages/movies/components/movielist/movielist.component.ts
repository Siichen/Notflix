import { Component, OnDestroy, OnInit } from '@angular/core';
import { TmbdService } from '../../../../services/tmbd/tmbd.service';
import { Card } from '../../../../interfaces/Movie/discoverMovie.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit, OnDestroy {
  movies: Card[] = [];
  sbp: Subscription = new Subscription();
  // movielist$!: Observable<Card[]>;

  constructor(private tmbdService: TmbdService) {}

  ngOnInit(): void {
    this.sbp = this.tmbdService.getMovies().subscribe((data: Card[]) => {
      this.movies = data;
    });
  }
  ngOnDestroy(): void {
    this.sbp.unsubscribe();
  }
}
