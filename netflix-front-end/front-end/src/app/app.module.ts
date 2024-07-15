import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { AppComponent } from './app.component';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { TmbdService } from './services/tmbd/tmbd.service';
import { AppRoutingModule, routes } from './app-routing.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
// import { AUTH_SERVER_PATH } from './services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    JwtHelperService,
    TmbdService,
    // { provide: AUTH_SERVER_PATH, useValue: 'http://localhost:4231' },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
