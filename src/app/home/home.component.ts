import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { HomeService } from "./home.service";
import { Router } from '@angular/router'
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  currentUser = {
    role: '',
    token: '',
    firstname: '',
    password:'',
  };


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private homeService: HomeService

  ) {
  }

  ngOnInit() {

    this.currentUser.role = this.authenticationService.getUserDetail().role;
  }

role:string='';
  getDetail() {
    this.role = this.homeService.getDetail();
    console.log(this.role);
      /*
      .subscribe(
        (role) => {
        console.log(role);
        },

        (err) => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/auth/login']);
        }
      )
      */
  }
}
