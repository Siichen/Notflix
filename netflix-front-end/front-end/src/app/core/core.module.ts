import {
  APP_INITIALIZER,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { TmbdService } from '../services/tmbd/tmbd.service';
import { WithCookieService } from '../services/auth/with-cookie.service';
import { AuthService } from '../services/auth/auth.service';

import { appInitializer } from './app.initializer';

//* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ injection token
export const TMDBAPIKEY = new InjectionToken<string>('TMDBAPIKEY');
export const AUTHSERVER = new InjectionToken<string>('AUTHSERVER');
export const ProdTitle = new InjectionToken<string>('ProdTitle');
const USECOOKIE = new InjectionToken<boolean>('USECOOKIE');

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reuse values
        {
          provide: AUTHSERVER,
          useValue: 'http://localhost:4231',
        },
        {
          provide: ProdTitle,
          useValue: 'Notflix',
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AuthService selector
        {
          provide: USECOOKIE,
          useValue: false,
        },
        {
          provide: AuthService,
          useFactory: (
            usecookie: boolean,
            router: Router,
            http: HttpClient,
            tmdbservice: TmbdService,
            authpath: string
          ) => {
            return usecookie
              ? new WithCookieService(router, http, authpath)
              : new AuthService(router, http, tmdbservice, authpath);
          },
          deps: [USECOOKIE, Router, HttpClient, TmbdService, AUTHSERVER],
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Angular initializer
        {
          provide: APP_INITIALIZER,
          useFactory: appInitializer,
          multi: true,
          deps: [AuthService],
        },
        //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page Title control
        Title,
      ],
    };
  }
}
// // }
// import {
//   APP_INITIALIZER,
//   InjectionToken,
//   ModuleWithProviders,
//   NgModule,
// } from '@angular/core';
// import { Router } from '@angular/router';
// import { Title } from '@angular/platform-browser';
// import { HttpClient } from '@angular/common/http';

// import { TmbdService } from '../services/tmbd/tmbd.service';
// import { WithCookieService } from '../services/auth/with-cookie.service';
// import { AuthService } from '../services/auth/auth.service';

// import { appInitializer } from './app.initializer';
// // import { LoginGuard } from './guards/login.guard';
// import { CommonModule } from '@angular/common';

// //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ injection token
// export const TMDBAPIKEY = new InjectionToken<string>('TMDBAPIKEY');
// export const AUTHSERVER = new InjectionToken<string>('AUTHSERVER');
// export const ProdTitle = new InjectionToken<string>('ProdTitle');
// const USECOOKIE = new InjectionToken<boolean>('USECOOKIE');

// @NgModule({
//   declarations: [],
//   imports: [CommonModule],
// })
// export class CoreModule {
//   public static forRoot(): ModuleWithProviders<CoreModule> {
//     return {
//       ngModule: CoreModule,
//       providers: [
//         //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Reuse values
//         {
//           provide: AUTHSERVER,
//           useValue: 'http://localhost:4231',
//         },
//         {
//           provide: ProdTitle,
//           useValue: 'Notflix',
//         },
//         //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ AuthService selector
//         {
//           provide: USECOOKIE,
//           useValue: false,
//         },
//         {
//           provide: AuthService,
//           useFactory: (
//             usecookie: boolean,
//             router: Router,
//             http: HttpClient,
//             tmdbservice: TmbdService,
//             authpath: string
//           ) => {
//             return usecookie
//               ? new WithCookieService(router, http, authpath)
//               : new AuthService(router, http, tmdbservice, authpath);
//           },
//           deps: [USECOOKIE, Router, HttpClient, TmbdService, AUTHSERVER],
//         },
//         //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Angular initializer
//         {
//           provide: APP_INITIALIZER,
//           useFactory: appInitializer,
//           multi: true,
//           deps: [AuthService],
//         },
//         //* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Page Title control
//         Title,
//       ],
//     };
//   }
// }
