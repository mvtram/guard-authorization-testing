import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
import { User } from '../_models/user';
import * as jwt_decode from "jwt-decode";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  userdetail = {
    role: '',
    token: '',
  };
  constructor(private http: HttpClient) { }
  LoggedToken: string = '';
  loggedIn: boolean = false;


  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { username, password }).pipe(map(user => {
      if (user && user.token) {
        this.LoggedToken = user.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      console.log('by auth' + this.LoggedToken);
      this.userdetail = this.decodeToken();
      //console.log(this.userdetail);
      return this.userdetail;
    }));
  }




  register(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/register', { username, password });
  }

  getUserDetail() {
    this.userdetail = this.decodeToken();
    return this.userdetail;
  }

  decodeToken() {
    this.userdetail = jwt_decode(this.getToken());
   // console.log(this.userdetail);
    return this.userdetail;
  }
  getToken(): String {
    return localStorage.getItem('currentUser');
  }


  isLoggedIn() {
    if (this.getToken()) {
      return true;

    }
  }


  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    let expiryDate = new Date(0);
    const exp = decode(token).exp;
    expiryDate.setUTCSeconds(exp);
    return expiryDate.valueOf() > new Date().valueOf();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
  removeToken() {
    localStorage.removeItem('currentUser');
  }

}
