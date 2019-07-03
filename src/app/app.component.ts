import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { Role } from './_models/role';
import { User } from './_models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  get isAdmin() {

    return this.authenticationService.isLoggedIn() && this.authenticationService.getUserDetail().role === 'admin';
  }
  get isPublisher() {
    console.log(this.currentUser);
    console.log(this.currentUser.role);

    return true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

}
