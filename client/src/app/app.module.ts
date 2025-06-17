import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './core/Interceptor/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { IdentityModule } from './identity/identity.module';
import { credentialsInterceptor } from './core/Interceptor/credentials.interceptor';
import { AboutModule } from './about/about.module';
import { RouterModule } from '@angular/router';
import { SearchModule } from './search/search.module';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AboutModule,
    SharedModule,
    RouterModule,
    SearchModule,




    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-top-right',
      countDuplicates: true,
      timeOut: 1500,
      progressBar: true,
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimations(),

    // { provide: HTTP_INTERCEPTORS, useClass: credentialsInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    provideHttpClient(
    withInterceptors([
      credentialsInterceptor,
      LoaderInterceptor
    ])
  )

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
