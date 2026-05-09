import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/vehicle/pages/vehicle/vehicle-page').then(m => m.VehicleComponent)
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./features/map/pages/map/map-page').then(m => m.MapComponent)
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/pages/calendar/calendar-page').then(m => m.CalendarComponent)
      },
      {
        path: 'graphics',
        loadComponent: () =>
          import('./features/graphics/pages/graphics/graphics-page').then(m => m.GraphicsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
