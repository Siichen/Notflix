import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TmbdService } from '../../../../services/tmbd/tmbd.service';
import { Card } from '../../../../interfaces/Movie/discoverMovie.interface';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss'],
})
export class MovielistComponent implements OnInit, OnDestroy {
  movies: Card[] = [];
  private sbp: Subscription = new Subscription();
  page: number = 1;
  totalMoviesLoaded: number = 0;

  constructor(
    private router: Router,
    private tmbdService: TmbdService,
    private scrollService: ScrollService // private viewportScroller: ViewportScroller
  ) {}

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  ngOnInit(): void {
    this.loadMovies();
    // this.restoreScrollPosition();
  }

  ngAfterViewInit(): void {
    this.restoreScrollPosition();
  }

  onScroll(): void {
    if (this.totalMoviesLoaded % 20 === 0) {
      this.loadMovies();
    }
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

  saveScrollPosition(): void {
    const scrollPosition = this.viewport.measureScrollOffset();
    // console.log(`Saving scroll position: ${scrollPosition}`);
    this.scrollService.saveScrollPosition([scrollPosition, 0]);
  }

  restoreScrollPosition(): void {
    const scrollPosition = this.scrollService.getScrollPosition()[0];
    // console.log(`Restoring scroll position: ${scrollPosition}`);
    if (scrollPosition) {
      setTimeout(() => {
        this.viewport.scrollToOffset(scrollPosition);
      }, 1000); // must have settimeout or else it does not work
    }
  }

  // navigateToMovieDetail(movieId: string): void {
  //   this.saveScrollPosition();
  //   this.router.navigate(['/movie-detail', movieId]);
  // }
  viewDetails(id: number): void {
    this.saveScrollPosition();
    // console.log(`Navigating to movie details for ID: ${id}`);
    // this.router.navigate(['/movies/details', id]);
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe();
  }
}
