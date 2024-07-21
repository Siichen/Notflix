import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TmbdService } from '../services/tmbd/tmbd.service';
import { AuthService } from '../services/auth/auth.service';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ injection token
export const TMDBAPIKEY = new InjectionToken<string>('');
export const AUTHSERVER = new InjectionToken<string>('');
export const ProdTitle = new InjectionToken<string>('');
const USECOOKIE = new InjectionToken<string>('');

@NgModule({})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reuse values
        {
          provide: AUTHSERVER,
          useValue: 'http://localhost:5566/api/v1',
        },
        {
          provide: ProdTitle,
          useValue: 'Notflix',
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AuthService selector
        {
          provide: AuthService,
          useClass: AuthService,
        },

        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Angular interceptor;
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page Title control
        Title,
      ],
    };
  }
}
