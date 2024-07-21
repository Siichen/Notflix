import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

// export const routes: Routes = [
//   { path: '', component: HomeComponent }, // 这是一个Route
//   { path: 'login', component: LoginComponent },
//   { path: 'movies', component: MoviesComponent },
//   { path: 'register_1', component: PageOneComponent },
//   { path: 'register_2', component: PageTwoComponent },
//   { path: 'movie/:id', component: MoviedetailsComponent },
//   { path: '**', component: ErrorComponent },
// ];
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.module').then((m) => m.MoviesModule),
    // canActivate: [LoginGuard],
  },
  // {
  //   path: '**',
  //   loadChildren: () =>
  //     import('./shared/shared.module').then((m) => m.SharedModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
