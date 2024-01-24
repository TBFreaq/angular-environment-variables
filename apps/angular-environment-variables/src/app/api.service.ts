import {
  APP_CONFIGURATION_TOKEN,
  AppConfiguration,
} from '@angular-environment-variables/app-configuration';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly apiUrl: string;
  constructor(
    @Inject(APP_CONFIGURATION_TOKEN) appConfig: AppConfiguration,
    private readonly http: HttpClient
  ) {
    if (appConfig.apiUrl !== null) {
      // Ensure that the API URL ends with a trailing slash
      this.apiUrl = appConfig.apiUrl.endsWith('/')
        ? appConfig.apiUrl
        : `${appConfig.apiUrl}/`;
    } else {
      this.apiUrl = '';
      console.error('Provided API URL was null. Please check configuration.')
    }
  }
}
