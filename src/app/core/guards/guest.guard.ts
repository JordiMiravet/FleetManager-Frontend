import { Auth, authState } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { map, take } from "rxjs";

export const guestGuard = () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return authState(auth).pipe(
        take(1),
        map(user => user ? router.createUrlTree(['']) : true)
    );
};