import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeRowOneComponent } from './pages/home/components/home-row-one/home-row-one.component';
import { HomeRowTwoComponent } from './pages/home/components/home-row-two/home-row-two.component';
import { HomeRowThreeComponent } from './pages/home/components/home-row-three/home-row-three.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageOneComponent } from './pages/register/components/page-one/page-one.component';
import { PageTwoComponent } from './pages/register/components/page-two/page-two.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovielistComponent } from './pages/movies/components/movielist/movielist.component';
import { TmbdService } from './services/tmbd/tmbd.service';
import { MovieitemComponent } from './pages/movies/components/movieitem/movieitem.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeRowOneComponent,
    HomeRowTwoComponent,
    HomeRowThreeComponent,
    LoginComponent,
    RegisterComponent,
    PageOneComponent,
    PageTwoComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MoviesComponent,
    MovieitemComponent,
    MovielistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync(), TmbdService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
