import { Component, OnDestroy, OnInit } from '@angular/core';
import { TmbdService } from '../../../../services/tmbd/tmbd.service';
import { DetailsCard } from '../../../../interfaces/Movie/detailsMovie.interace';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import { MoviedialogComponent } from './components/moviedialog/moviedialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss'],
})
export class MoviedetailsComponent implements OnInit, OnDestroy {
  movie!: DetailsCard;
  sbp: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private tmbdService: TmbdService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.sbp = this.tmbdService
        .getDetails(Number(movieId))
        .subscribe((details: DetailsCard) => {
          this.movie = details;
        });
    }
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe();
  }

  getBackground(): string {
    if (this.movie && this.movie.movieBackDrop) {
      return `url(${this.movie.movieBackDrop})`;
    }
    return '';
  }

  openDialog(): void {
    this.tmbdService.getVideos(this.movie.movieId).subscribe((data: any) => {
      const videoKeys = data.results.map((result: any) => result.key);
      if (videoKeys) {
        this.dialog.open(MoviedialogComponent, {
          data: { videoKeys: videoKeys },
        });
      }
    });
  }
}
