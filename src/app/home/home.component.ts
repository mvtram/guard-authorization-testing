import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  currentUser = {
    role: '',
    token: '',
    firstname: '',
    password:'',
  };


  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
  /*  this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });*/
  this.currentUser.role = this.authenticationService.getUserDetail().role;
  }
}
