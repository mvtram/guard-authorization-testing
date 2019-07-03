import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import {  Role } from './_models/role';
import { User} from './_models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isPublisher() {
    console.log(this.currentUser && this.currentUser.role === Role.Publisher);
    return this.currentUser && this.currentUser.role === Role.Publisher;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }

}
