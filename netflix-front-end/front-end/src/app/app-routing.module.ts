import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { MovieitemComponent } from './pages/movies/components/movieitem/movieitem.component';
import { MovielistComponent } from './pages/movies/components/movielist/movielist.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { PageOneComponent } from './pages/register/components/page-one/page-one.component';
import { PageTwoComponent } from './pages/register/components/page-two/page-two.component';
import { MoviedetailsComponent } from './pages/movies/components/moviedetails/moviedetails.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'register_1', component: PageOneComponent },
  { path: 'register_2', component: PageTwoComponent },
  { path: 'movie/:id', component: MoviedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
