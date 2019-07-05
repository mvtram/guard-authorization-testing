import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
//import { PermissionService } from 'angular2-permission';
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;
  title = 'authentication';
  isLoggedin: boolean;
  getrolematch: string;
  role: string;
  route: string;
  decodedToken;
  hideElement = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/dashboard') {
          this.hideElement = true;
        } else if (event.url === '/auth/login') {
          this.hideElement = true;
        } else if (event.url === '/publisher') {
          this.hideElement = true;
        } else {
          this.hideElement = false;
        }
      }
    });
  }

  isAuthenticated() {
    this.isLoggedin = this.authenticationService.isLoggedIn();
    return this.isLoggedin;
}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

}
