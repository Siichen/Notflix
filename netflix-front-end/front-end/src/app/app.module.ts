import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TmbdService } from './services/tmbd/tmbd.service';
import { AppRoutingModule } from './app-routing.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
// import { LoginGuard } from './core/guards/login.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    // RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CoreModule.forRoot(),
  ],
  providers: [JwtHelperService, TmbdService],
  // LoginGuard,
  bootstrap: [AppComponent],
})
export class AppModule {}
