import { Routes } from '@angular/router';

export const GRAPHICS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/graphics/graphics-page').then(m => m.GraphicsPageComponent)
    }
];