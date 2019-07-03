import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
 userdetail= {
   role: '',
   token: '',
 };
  constructor(private http: HttpClient) {
  }


  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { username, password }).pipe(map(user => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      this.userdetail = user;
      //console.log('from auth service' + this.userdetail.role);
      //console.log('from auth service' + this.userdetail.token);

      return user;
    }));
  }

  register(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/register', { username, password });
  }

  getToken(): String {
    return localStorage.getItem('currentUser');
  }

  getUserDetail(){

    return this.userdetail;
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

}
