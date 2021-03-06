import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ILogin,
  IRegister,
  ICurrentUser
} from '../shared/interfaces/userInterface';
import { BehaviorSubject, Subscription } from 'rxjs';

import { environment } from '../../environments/environment';
import { IResponse } from '../shared/interfaces/responseInterface';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../sharedModule/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = environment.serverUrl;

  isLoggedIn: boolean = false;
  currentUser: ICurrentUser = null;
  currentUserChanged = new BehaviorSubject<ICurrentUser>(this.currentUser);
  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerSerice: ErrorHandlerService
  ) {}

  register(registerData: IRegister) {
    /* Make http request to backend */
    try {
      this.http
        .post<IResponse>(`${this.serverUrl}/register`, registerData)
        .subscribe(response => {
          if (!response.success) {
            console.log(response.error);
          } else {
            console.log(response.message);
            this.findHomePage();
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  login(loginData: ILogin) {
    /* Maket http request to backend */
    try {
      this.http
        .post<IResponse>(`${this.serverUrl}/login`, loginData)
        .subscribe(response => {
          if (!response.success) {
            console.log(response.error);
          } else {
            const userData: ICurrentUser = {
              userId: response.data.userId,
              loginToken: response.data.loginToken,
              role: response.data.role
            };
            this.handleLogin(userData);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    if (this.currentUser && this.currentUser.loginToken) {
      try {
        this.http
          .get<IResponse>(
            `${this.serverUrl}/logout/${this.currentUser.loginToken}`
          )
          .subscribe(response => {
            if (response.success) {
              console.log(response.message);
              localStorage.removeItem('login');
              this.currentUser = null;
              this.currentUserChanged.next(null);
              this.router.navigate(['/auth']);
            } else {
              console.log(response.error);
              this.router.navigate(['/auth']);
              throw Error(response.error);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
    this.router.navigate(['']);
  }

  autoLogin() {
    const localUser = JSON.parse(localStorage.getItem('login'));
    if (!localUser) {
      return;
    } else {
      this.currentUser = { ...localUser };
      if (!this.currentUser.loginToken) {
        console.log(`No login token was found.`);
        throw Error('No login token was found.');
      } else {
        try {
          this.http
            .get<IResponse>(
              `${this.serverUrl}/login/${this.currentUser.loginToken}`
            )
            .subscribe(response => {
              if (response.error) {
                console.log('[subscribe block]', response.error);
                this.errorHandlerSerice.addToErrors(response.error.error);
              } else {
                const { data } = { ...response };
                this.currentUser = { ...data };
                this.currentUserChanged.next({ ...this.currentUser });
                this.findHomePage();
              }
            });
        } catch (e) {
          console.log('catchBlock', e);
        }
      }
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

    /* Navigate to dashboard */
    this.router.navigate([`/${this.currentUser.role}`]);

    /* Save current user to local storage */
    localStorage.setItem('login', JSON.stringify(localUser));
  }

  findHomePage() {
    // this.subscription = this.currentUserChanged.subscribe(currentUser => {
    if (!this.currentUser) {
      this.router.navigate(['/']);
    } else {
      // if (this.currentUser && this.currentUser.role) {
      switch (this.currentUser.role) {
        case 'user':
          this.router.navigate(['/user']);
          break;
        case 'admin':
          this.router.navigate(['/admin']);
          break;
        default:
          this.router.navigate(['/auth']);
          break;
      }
      // }
    }
    // });
  }
}
