import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor, ErrorHandler  {
  currentUser: User;
  constructor(private authenticationService: AuthenticationService, private injector: Injector, private router: Router,) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepted  by error',request);
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
          console.log(err.status);
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.authenticationService.logout();
      }
      if (err instanceof HttpErrorResponse && err.status == 404) {
        console.log(err.status);
        this.router.navigateByUrl('/not-found', { replaceUrl: true });

      }



      const error = err.error.message || err.statusText;
      return throwError(error);

    }));
  }

  handleError(error: Error | HttpErrorResponse) {
    const notificationService = this.injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        return notificationService.notify('No Internet Connection');
      } else {
        // Handle Http Error (error.status === 403, 404...)
        return notificationService.notify(`${error.status} - ${error.message}`);
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }


    // And log it to the console
    console.error('It happens: ', error);
  }






}
