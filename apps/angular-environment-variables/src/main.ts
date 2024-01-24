import {
  APP_CONFIGURATION_TOKEN,
  AppConfiguration,
} from '@angular-environment-variables/app-configuration';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';

// Fetch configuration from runtime-host
fetch('/config')
  .then((response: Response) => {
    if (response.ok) {
      // Get body
      return response.json();
    } else {
      // Fail startup
      return Promise.reject(response);
    }
  })
  .then((response: AppConfiguration | Response) => {
    // Check if configuration is valid
    if ('angularEnvironment' in response) {
      const appConfig = response as AppConfiguration;

      // Always assume production mode, if it's not explicitly set to development
      if (appConfig.angularEnvironment !== 'development') {
        enableProdMode();
      }

      bootstrapApplication(AppComponent, {
        providers: [
          {
            provide: APP_CONFIGURATION_TOKEN,
            useValue: appConfig,
          },
          importProvidersFrom(HttpClientModule),
          provideRouter(appRoutes),
        ],
      }).catch((err) => console.error(err));
    }
  });
