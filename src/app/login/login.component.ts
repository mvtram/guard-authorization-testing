import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent { }

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  durationInSeconds = 2;
  message:''
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar

  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }
  getToken() {
    if (this.authenticationService.getToken()) {
      this.router.navigate(['/auth/login']);
    }
  }



  openSnackBar() {
    return this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
         // console.log(data.role);
          if (data.role === 'publisher') {

            this.router.navigate(['/dashboard']);
          } else if (data.role === 'admin') {
            this.router.navigate(['/admin']);
          }

        },
        err => {
         this.error = err.error.message || err.statusText;
          this.loading = false;
        })

        ;



  }
}

