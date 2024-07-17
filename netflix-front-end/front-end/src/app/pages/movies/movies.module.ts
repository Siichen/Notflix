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
// const routes: Routes = [
//   {
//     path: '',
//     component: MoviesComponent,
//     children: [
//       { path: '', component: MovielistComponent }, // 笨死，你写两个空的带不同组件不就撞了吗
//       { path: 'details/:id', component: MoviedetailsComponent },
//     ],
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: MovielistComponent,
    // canActivate: [LoginGuard],
    children: [
      // movies.component.html
      { path: 'details/:id', component: MoviedetailsComponent },
    ],
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
