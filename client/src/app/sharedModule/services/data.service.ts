/**
 * Centralized Data Service
 * primary service for making requests to the backend api
 * routes accessible are
 * {{url}}/api/v1
 * /users, /friends, /requests, /notifications, /uploads
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IResponse } from 'src/app/shared/interfaces/responseInterface';
import { IServiceResponse } from 'src/app/shared/interfaces/serviceInterface';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  users(type: string, query?: any) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/users/' GET
         * Takes no body
         */
        return this.http.get(
          `${environment.serverUrl}${environment.apiUrl}/users`
        );
      case 'search':
        /**
         * Make http request to 'api/v1/users/search/:searchText' GET
         * Takes the searchText as param
         */
        return this.http.get<IResponse>(
          `${environment.serverUrl}${environment.apiUrl}/users/search/${query}`
        );
      default:
        /* Return/Dont make a request */
        return;
    }
  }

  friends(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/friends/ GET
         * Takes current userID in req.params
         */
        return this.http.get<IResponse>(
          `${environment.serverUrl}${environment.apiUrl}/friends`
        );
      case 'add':
        /**
         * Make http request to 'api/v1/friends/add' POST
         * Takes fromUser, toUser in req.body
         */
        return this.http.post<IResponse>(
          `${environment.serverUrl}${environment.apiUrl}/friends/add`,
          {} /* , payload */
        );
      default:
        return;
        /* Return/Don't make a request */
        break;
    }
  }

  requests(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/requests/' GET
         * Takes userId in req.body
         */
        this.http
          .get(`${environment.serverUrl}${environment.apiUrl}/requests`)
          .subscribe(response => {
            console.log(response);
          });
        break;
      case 'add':
        /**
         * Make http request to 'api/v1/requests/add' POST
         * Takes fromUser, toUser, type, data in req.body
         */
        this.http
          .post(
            `${environment.serverUrl}${environment.apiUrl}/requests/add`,
            {} /* , payload */
          )
          .subscribe(response => {
            console.log(response);
          });
        break;
      default:
        /* Return/Don't make a request */
        break;
    }
  }

  notifications(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to '/notifications'
         * Takes userId in req.body
         */
        this.http
          .get(`${environment.serverUrl}${environment.apiUrl}`)
          .subscribe(response => {
            console.log(response);
          });
        break;
      case 'add':
        /**
         * Make http request to '/notifications/add'
         * Takes fromUser, toUser, type, data in req.body
         */
        this.http
          .post(
            `${environment.serverUrl}${environment.apiUrl}`,
            {} /* , payload */
          )
          .subscribe(response => {
            console.log(response);
          });
        break;
      default:
        break;
    }
  }
}
