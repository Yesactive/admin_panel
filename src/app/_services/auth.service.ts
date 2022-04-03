import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const AUTH_API = 'http://localhost:2022/api/admin/';
const AUTH_API = 'http://yesActiveApi.navson.com/api/admin/';

/* const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods':'PUT, GET, POST, DELETE',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials':'true',
    'Access-Control-Allow-Origin':'*',
  })
}; */

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// let date: Date = new Date(); 

/* const interceptorHeaders = {
  time: 1642691121,
  timezone: -300//date.getTimezoneOffset()
}; */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }


  /* register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  } */
}