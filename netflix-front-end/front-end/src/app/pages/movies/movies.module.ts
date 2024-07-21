import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MovieitemComponent } from './components/movieitem/movieitem.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { MovielistComponent } from './components/movielist/movielist.component';
import { MoviesComponent } from './movies.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  YOUTUBE_PLAYER_CONFIG,
  YouTubePlayer,
  YouTubePlayerModule,
} from '@angular/youtube-player';
import { MoviedialogComponent } from './components/moviedetails/components/moviedialog/moviedialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SharedModule } from '../../shared/shared.module';
import { MovieItemResolver } from '../../core/resolvers/movie-item.resolver';
import { AuthService } from '../../services/auth/auth.service';
// import { LoginGuard } from '../../core/guards/login.guard';

// const routes: Routes = [
//   {
//     path: '',
//     component: MoviesComponent,
//     children: [
//       { path: '', component: MovielistComponent },
//       { path: 'details/:id', component: MoviedetailsComponent },
//     ],
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: MovielistComponent,
  },
  {
    path: 'details/:id',
    component: MoviedetailsComponent,
    resolve: { movie: MovieItemResolver },
  },
];

@NgModule({
  declarations: [
    MoviesComponent,
    MoviedetailsComponent,
    MovielistComponent,
    MovieitemComponent,
    MoviedialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    YouTubePlayerModule,
    YouTubePlayer,
    ScrollingModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    {
      provide: YOUTUBE_PLAYER_CONFIG,
      useValue: {
        loadApi: true,
      },
    },
  ],
  exports: [RouterModule],
})
export class MoviesModule {}
