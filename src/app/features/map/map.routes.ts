import { Routes } from '@angular/router';

export const MAP_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/map/map-page').then(m => m.MapPageComponent)
    }
];