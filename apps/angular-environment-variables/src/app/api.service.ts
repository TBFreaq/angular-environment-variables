import {
  APP_CONFIGURATION_TOKEN,
  AppConfiguration,
} from '@angular-environment-variables/app-configuration';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RandomDogApiResponse } from './random-dog.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly apiUrl: string | null;

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
      this.apiUrl = null;
      console.error('Provided API URL was null. Please check configuration.');
    }
  }

  getRandomDog(): Observable<RandomDogApiResponse | undefined> {
    // Filter out mp4 and webm as they're not compatible with img tag
    return this.apiUrl
      ? this.http.get<RandomDogApiResponse>(
          `${this.apiUrl}woof.json?filter=mp4,webm`
        )
      : of(undefined);
  }
}
