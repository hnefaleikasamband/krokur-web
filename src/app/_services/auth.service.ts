import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import AuthedUser from '../_models/authedUser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private AuthenticatedUser: AuthedUser;
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.baseUrl}/auth/login`, { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.token));
            this.setUserInfo(user.user);
            this.isAuthenticated = true;
          }

          return this.AuthenticatedUser;
        })
      );
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

  getUserInfoFromJWT() {
    return this.http.get<any>(`${environment.baseUrl}/auth/user`).pipe(
      map(user => {
        if (!user) {
          return user;
        }

        if (user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        this.setUserInfo(user);
        this.isAuthenticated = true;

        return this.AuthenticatedUser;
      })
    );
  }

  private setUserInfo(user: any) {
    console.log('setUserInfo fn, we got user:', user);
    this.AuthenticatedUser = {
      email: user.email,
      name: user.name,
      token: user.token,
      roles: ['']
    };
  }
}
