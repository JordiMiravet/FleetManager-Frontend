import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register').then(m => m.RegisterPageComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(m => m.LoginPageComponent)
  },
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/vehicle/vehicle.routes').then(m => m.VEHICLE_ROUTES)
      },
      {
        path: 'map',
        loadChildren: () =>
          import('./features/map/map.routes').then(m => m.MAP_ROUTES)
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./features/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES)
      },
      {
        path: 'graphics',
        loadComponent: () =>
          import('./features/graphics/pages/graphics/graphics-page').then(m => m.GraphicsPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
