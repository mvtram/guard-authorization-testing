import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  api: string = 'http://localhost:3000';
  role:string='publisher';
  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }
  getDetail() {
    return this.role;
  }
}
