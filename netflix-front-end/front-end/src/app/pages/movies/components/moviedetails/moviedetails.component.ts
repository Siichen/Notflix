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
  ) {
    this.movie = this.route.snapshot.data['movie']; // get from router
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.movie = data['movie'];
    });
  }

  // ngOnInit(): void {
  //   this.sbp.add(
  //     this.route.paramMap.subscribe((params) => {
  //       const movieId = params.get('id');
  //       if (movieId) {
  //         this.tmbdService
  //           .getDetails(Number(movieId))
  //           .subscribe((details: any) => {
  //             this.movie = details; // get from tmdb service/url
  //           });
  //       }
  //     })
  //   );
  // }

  //   const movieId = this.route.snapshot.paramMap.get('id');
  //   console.log(`Movie ID from route: ${movieId}`);
  // }

  getBackground(): string {
    if (this.movie && this.movie.movieBackDrop) {
      return `url(${this.movie.movieBackDrop})`;
    }
    return '';
  }

  openDialog(): void {
    this.sbp.add(
      this.tmbdService.getVideos(this.movie.movieId).subscribe((data: any) => {
        const videoKeys = data.results.map((result: any) => result.key);
        if (videoKeys) {
          this.dialog.open(MoviedialogComponent, {
            data: { videoKeys: videoKeys },
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.sbp.unsubscribe();
  }
}
