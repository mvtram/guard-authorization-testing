import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',

})
export class PublisherComponent implements OnInit {
  currentUser = {
    role: '',
    token: '',
    firstname: '',
    password: '',
  };


  constructor(

    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser.role = this.authenticationService.getUserDetail().role;


  }
}
