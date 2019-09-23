import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ILogin,
  IRegister,
  ICurrentUser
} from '../shared/interfaces/userInterface';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { IResponseLogin } from '../shared/interfaces/apiResponseInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = environment.serverUri;

  isLoggedIn: boolean = false;
  currentUser: ICurrentUser = null;
  currentUserChanged = new BehaviorSubject<ICurrentUser>(null);

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
      this.http
        .post<IResponseLogin>(`${this.serverUrl}/login`, loginData)
        .subscribe(res => {
          if (res.error) {
            console.log(res.error);
          } else {
            const userData: ICurrentUser = {
              userId: res.body.userId,
              loginToken: res.body.loginToken,
              role: res.body.role
            };
            this.handleLogin(userData);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  handleLogin(userData: ICurrentUser) {
    const currUser: ICurrentUser = {
      ...userData
    };
    const localUser: ICurrentUser = {
      userId: userData.userId,
      loginToken: userData.loginToken
    };

    this.isLoggedIn = true;
    this.currentUser = currUser;
    this.currentUserChanged.next({ ...this.currentUser });

    /* Save current user to local storage */
    localStorage.setItem('user', JSON.stringify(localUser));
  }

  logout() {
    try {
      this.http
        .get(`${this.serverUrl}/logout/${this.currentUser.userId}`)
        .subscribe(response => {
          console.log(response);
        });
      this.currentUser = null;
      this.currentUserChanged.next(null);
    } catch (e) {
      console.log(e);
    }
  }

  autoLogin() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (!localUser) {
      return;
    } else {
      console.log(localUser);

      const { loginToken } = localUser;
      try {
        this.http
          .get<ICurrentUser>(`${this.serverUrl}/login/${loginToken}`)
          .subscribe(response => {
            this.currentUser = { ...response };
            this.currentUserChanged.next({ ...this.currentUser });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
