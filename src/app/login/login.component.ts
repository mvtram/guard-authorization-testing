import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
       //   console.log(data.role);
          if (data.role === 'publisher') {
            this.router.navigate(['/dashboard']);
          } else if (data.role === 'admin'){
            this.router.navigate(['/admin']);
          }

        },
        err => {
          this.error = err.error.message || err.statusText;
          this.loading = false;
        });

    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) {
      console.log(this.authenticationService.currentUserValue.role, 'by login');
      this.router.navigate(['/']);
    }
    */

  }
}
