import { Routes } from '@angular/router';

export const VEHICLE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/vehicle/vehicle-page').then(m => m.VehiclePageComponent)
    },
];