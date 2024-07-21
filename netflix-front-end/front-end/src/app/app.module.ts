import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TmbdService } from './services/tmbd/tmbd.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    RouterModule.forRoot([]),
    // RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CoreModule.forRoot(),
  ],
  providers: [TmbdService],

  bootstrap: [AppComponent],
})
export class AppModule {}
