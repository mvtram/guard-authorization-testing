import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }
  decodedToken;
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggedIn()) {
      this.decodedToken = jwt_decode(localStorage.getItem('currentUser'));
      if (this.decodedToken.role === 'admin'){
        this.router.navigate(['/admin']);
        return true;
      }
      this.auth.removeToken();
      this.router.navigate(['/auth/login']);
      return false;
    }

  }
}
