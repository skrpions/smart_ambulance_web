import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@shared/shared.module';
import { ThemeModule } from '@theme/theme.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { FormlyConfigModule } from './formly-config.module';

import { appInitializerProviders, BASE_URL, httpInterceptorProviders } from '@core';
import { environment } from '@env/environment';

import { InMemDataService } from '@shared/in-mem/in-mem-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthApplication } from './routes/auth/application/auth-application';
import { StorageApplication } from './routes/auth/application/storage-application';
import { AuthInfrastructure } from './routes/auth/infrastructure/auth-infrastructure';
import { StorageInfrastructure } from './routes/auth/infrastructure/storage-infrastructure';
import { DriverApplication } from './routes/drivers/application/driver-application';
import { DriverInfrastructure } from './routes/drivers/infrastructure/driver-infrastructure';
import { PlayerApplication } from './routes/players/application/player-application';
import { PlayerInfrastructure } from './routes/players/infrastructure/player-infrastructure';
import { RoutesModule } from './routes/routes.module';
import { StudentApplication } from './routes/students/application/student-application';
import { StudentInfrastructure } from './routes/students/infrastructure/student-infrastructure';

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Declaron constantes para los providers
const application = [
  DriverApplication,
  AuthApplication,
  StorageApplication,
  StudentApplication,
  PlayerApplication,
];
const infrastructure = [
  DriverInfrastructure,
  AuthInfrastructure,
  StorageInfrastructure,
  StudentInfrastructure,
  PlayerInfrastructure,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    RoutesModule,
    SharedModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // Demo purposes only for GitHub Pages
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
    }),
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl },
    httpInterceptorProviders,
    appInitializerProviders,
    ...application,
    ...infrastructure,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
