import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  APP_CONFIGURATION_TOKEN,
  AppConfiguration,
} from '@angular-environment-variables/app-configuration';

@Component({
  selector: 'angular-environment-variables-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Example.component.html',
  styleUrl: './Example.component.scss',
})
export class ExampleComponent {
  public readonly appConfig: AppConfiguration = inject(APP_CONFIGURATION_TOKEN);
}
