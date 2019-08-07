import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AccountService } from '../_services';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AccountService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if router is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised sor redirect to login page
                this.router.navigate(['/']);
                return false;
            }

            // authorised
            return true;
        }

        // not logged in so redirect to login page with return url.
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
