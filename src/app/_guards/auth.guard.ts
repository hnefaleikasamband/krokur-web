import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { first, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // If we have token, lets see if we have a user.
            if (this.authService.isAuthenticated && this.hasAccess('')) { 
                // logged in & has access to that path
                return true;
            } else {
                // this means that we have a token, but no user info, so letch 
                // fetch the user info to see if the user has access.
                return this.authService.getUserInfoFromJWT()
                    .pipe(
                        first(),
                        map(
                            data => {
                                return this.hasAccess('');
                            },
                            error => {
                                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                                return false;
                          })
                    );
            }
        } else {
            // not logged in or does not have permission
            // so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }

        
    }

    private hasAccess(role: string): boolean {
        const user = this.authService.getLoggedInUser();
        return user.roles.includes(role);
    }
}