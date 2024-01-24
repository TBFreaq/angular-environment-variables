import {
  APP_CONFIGURATION_TOKEN,
  AppConfiguration,
} from '@angular-environment-variables/app-configuration';
import { CommonModule } from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIService } from '../api.service';
import { RandomDogApiResponse } from '../random-dog.model';

@Component({
  selector: 'angular-environment-variables-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Example.component.html',
  styleUrl: './Example.component.scss',
})
export class ExampleComponent {
  public readonly appConfig: AppConfiguration = inject(APP_CONFIGURATION_TOKEN);
  public readonly randomDog: Signal<RandomDogApiResponse | undefined> =
    toSignal(this.apiService.getRandomDog());

  constructor(private readonly apiService: APIService) {}
}
