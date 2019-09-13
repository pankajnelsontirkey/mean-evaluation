import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, IUser } from '../shared/interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server_url: string = 'http://localhost:3000';
  isLoggedIn: boolean = false;
  currentUser: IUser = null;

  constructor(private http: HttpClient) {}

  register(registerData: IRegister) {
    console.log(registerData);
    /* Make http request to backend */
    this.http
      .post(`${this.server_url}/register`, registerData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(loginData: ILogin) {
    console.log(loginData);
    /* Maket http request to backend */
    this.http
      .post<IUser>(`${this.server_url}/login`, loginData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
