import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['/auth']);

export const authGuard = canActivate(redirectUnauthorizedToAuth);