import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TmbdService } from './services/tmbd/tmbd.service';
import { AppRoutingModule } from './app-routing.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loginFnGuard } from './core/guards/login.guard';
import { AuthService } from './services/auth/auth.service';

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
  providers: [
    JwtHelperService,
    TmbdService,
    {
      provide: 'CanActivateFn',
      useValue: loginFnGuard,
    },
    CoreModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
