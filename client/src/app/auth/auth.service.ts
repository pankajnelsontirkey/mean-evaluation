import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, IUser } from '../shared/interfaces/userInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = 'http://localhost:3000';
  isLoggedIn: boolean = false;
  currentUser: IUser = null;
  currentUserChanged = new BehaviorSubject<IUser>(null);

  constructor(private http: HttpClient) {}

  register(registerData: IRegister) {
    /* Make http request to backend */
    try {
      this.http
        .post(`${this.serverUrl}/register`, registerData)
        .subscribe(res => {
          console.log(res);
        });
    } catch (e) {
      console.log(e);
    }
  }

  login(loginData: ILogin) {
    /* Maket http request to backend */
    try {
      this.http.post(`${this.serverUrl}/login`, loginData).subscribe(res => {
        console.log(res);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
