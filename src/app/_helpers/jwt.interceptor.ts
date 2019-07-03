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
/*     this.currentUser.role = this.authenticationService.userdetail.role;
    console.log(this.currentUser.role);
*/

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.currentUser.token}`
      }
    });


    return next.handle(request);
  }
}
