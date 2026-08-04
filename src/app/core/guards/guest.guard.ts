import { inject } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../features/auth/data-access/auth-service";

export const guestGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router)

    return authService.isLogged()
        ? router.createUrlTree([''])
        : true;
};