import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import AuthedUser from '../_models/authedUser';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private AuthenticatedUser: AuthedUser;
    public isAuthenticated = false;

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`http://localhost:3000/api/v1/auth/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.AuthenticatedUser = {
                      email: user.email,
                      name: user.name,
                      token: user.token
                    }
                    this.isAuthenticated = true;
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.AuthenticatedUser = undefined;
        this.isAuthenticated = false;
    }

    getLoggedInUser() {
      return this.AuthenticatedUser;
    }
}