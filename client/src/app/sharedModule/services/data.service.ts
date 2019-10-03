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

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  users(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/users/' GET
         * Takes no body
         */
        this.http
          .get(`${environment.serverUrl}${environment.apiUrl}/users`)
          .subscribe(response => {
            console.log(response);
          });
        break;
      case 'search':
        /**
         * Make http request to 'api/v1/users/search/:searchText' GET
         * Takes the searchText as param
         */
        this.http
          .get(`${environment.serverUrl}${environment.apiUrl}`)
          .subscribe(response => {
            console.log(response);
          });
        break;
      default:
        /* Return/Dont make a request */
        break;
    }
  }

  friends(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/friends/ GET
         * Takes current userID in req.body
         */
        this.http
          .get(`${environment.serverUrl}${environment.apiUrl}/friends`)
          .subscribe(response => {
            console.log(response);
          });
        break;
      case 'add':
        /**
         * Make http request to 'api/v1/friends/add' POST
         * Takes fromUser, toUser in req.body
         */
        this.http
          .post(
            `${environment.serverUrl}${environment.apiUrl}`,
            {} /* , payload */
          )
          .subscribe(response => {
            console.log(response);
          });
      default:
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
          .get(`${environment.serverUrl}${environment.apiUrl}`)
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
            `${environment.serverUrl}${environment.apiUrl}`,
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
