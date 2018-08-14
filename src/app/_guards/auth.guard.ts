import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // If we have token, lets see if we have a user.
            if (!this.authService.isAuthenticated) {
                // this means that we have a token, but no user info, so letch 
                // fetch the user info
                //TODO: Create API path that is "/auth/access" or "auth/user" that
                // returns the user and roles/access from the user who owns the JWT
                console.log("--- We have token but missing User info ---");
            }
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}