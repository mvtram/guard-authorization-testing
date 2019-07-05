import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';
import { User } from '../_models/user';
import * as jwt_decode from "jwt-decode";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  userdetail = {
    role: '',
    token: '',
  };
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
  LoggedToken: string = '';
  loggedIn: boolean = false;


  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { username, password }).pipe(map(user => {
      if (user && user.token) {
        this.LoggedToken = user.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
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

    }else{
      return false;
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
    this.currentUserSubject.next(null);
  }
  removeToken() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  public get currentUserValue(): User {
    console.log('from auth',this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

}
