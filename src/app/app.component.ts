import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { Role } from './_models/role';
import { User } from './_models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;
  title = 'authentication';
  isLoggedin: boolean;
  getrolematch: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  isAuthenticated() {
    this.isLoggedin = this.authenticationService.isLoggedIn();
    this.getrolematch = this.authenticationService.userdetail.role;
    if (this.getrolematch === 'admin') {
      return !this.isLoggedin;
    }
    if (this.getrolematch === 'publisher') {
      return this.isLoggedin;
    }

    //console.log("AppComponent : " + this.isLoggedin);
  }



  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

}
