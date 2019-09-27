/**
 * Centralized Data Service
 * primary service for making requests to the backend api
 * routes accessible are
 * {{url}}/api/v1
 * /users, /friends, /requests, /notifications, /uploads
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { request } from 'https';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  users(type: string) {
    switch (type) {
      case 'fetch':
        /**
         * Make http request to 'api/v1/users/' GET
         * Takes no body
         */
        break;
      case 'search':
        /**
         * Make http request to 'api/v1/users/search/:searchText' GET
         * Takes the searchText as param
         */
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
        break;
      case 'add':
      /**
       * Make http request to 'api/v1/friends/add' POST
       * Takes fromUser, toUser in req.body
       */
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
        break;
      case 'add':
        /**
         * Make http request to 'api/v1/requests/add' POST
         * Takes fromUser, toUser, type, data in req.body
         */
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
        break;
      case 'add':
        /**
         * Make http request to '/notifications/add'
         */
        break;
      default:
        break;
    }
  }
}
