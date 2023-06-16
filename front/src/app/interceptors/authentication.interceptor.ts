import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const authToken = '123soleil';

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    console.log('request: ', request);
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken),
    });

    return next.handle(authReq);
  }
}
