import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith(environment.baseUrl)) {
      // add authorization header with jwt token if available
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // if (currentUser && currentUser.token) {
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `${currentUser}`
          }
        });
      }
    }

    // Catch the return and see if a token was returned
    return next.handle(request).pipe(
      map(event => {
        if (
          event instanceof HttpResponse &&
          event.url.startsWith(environment.baseUrl) &&
          event.body.token
        ) {
          /* used for debugging
              console.log("--- We found a token in the response ----");
              console.log(event);
              console.log("-- End of token found print --");
              */
        }
        return event;
      })
    );
  }
}
