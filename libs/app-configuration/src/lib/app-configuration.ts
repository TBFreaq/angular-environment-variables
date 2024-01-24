import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  apiUrl: string | null;
  backgroundColor: string | null;
  angularEnvironment: 'development' | 'production';
}

export const APP_CONFIGURATION_TOKEN = new InjectionToken<AppConfiguration>('AppConfiguration');