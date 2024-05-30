import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  UserURL = 'http://localhost:8090';
  usermsg: any;
  alert: boolean = true;
  constructor(private user: HttpClient) {}
  getToken():boolean| null {    
    return  sessionStorage.getItem('token') !== null;
  }
  isLoggIn(): boolean {    
    return this.getToken() === true;
  }
  PostSignup(data: any) {
    return this.user.post(`${this.UserURL}/signup`, data);
  }
  getLogin(data: any) {
    return this.user.post("http://localhost:8090/Logincheak",data);
  }
}
