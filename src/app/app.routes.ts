import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['/auth']);

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    ...canActivate(redirectUnauthorizedToAuth),
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
        loadChildren: () =>
          import('./features/graphics/graphics.routes').then(m => m.GRAPHICS_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
