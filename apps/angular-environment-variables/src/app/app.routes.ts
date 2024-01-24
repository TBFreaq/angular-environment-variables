import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./example/Example.component').then((m) => m.ExampleComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];