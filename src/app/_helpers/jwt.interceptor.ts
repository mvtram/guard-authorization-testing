import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  currentUser = {
    role: '',
    token: '',
  };
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log('intercepted by jwt', request);
    const Token = this.authenticationService.getToken();
    console.log(Token);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${Token}`
      }
    });


    return next.handle(request);
  }
}
