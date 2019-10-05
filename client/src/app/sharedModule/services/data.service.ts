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

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Make http request to 'api/v1/users/' GET
   * Takes no body
   */
  getUsers() {
    return this.http.get(`${environment.serverUrl}${environment.apiUrl}/users`);
  }

  /**
   * Make http request to 'api/v1/users/search/:searchText' GET
   * Takes the searchText as param
   */
  searchUsers(query: string) {
    return this.http.get<IResponse>(
      `${environment.serverUrl}${environment.apiUrl}/users/search/${query}`
    );
  }

  /**
   * Make http request to 'api/v1/friends/ GET
   * Takes current userID in req.params
   */
  getFriends() {
    return this.http.get<IResponse>(
      `${environment.serverUrl}${environment.apiUrl}/friends`
    );
  }

  /**
   * Make http request to 'api/v1/friends/add' POST
   * Takes fromUser, toUser in req.body
   */
  addFriends() {
    return this.http.post<IResponse>(
      `${environment.serverUrl}${environment.apiUrl}/friends/add`,
      {} /* , payload */
    );
  }

  /**
   * Make http request to 'api/v1/requests/' GET
   * Takes userId in req.body
   */
  getRequests() {
    this.http
      .get(`${environment.serverUrl}${environment.apiUrl}/requests`)
      .subscribe(response => {
        console.log(response);
      });
  }

  /**
   * Make http request to 'api/v1/requests/add' POST
   * Takes fromUser, toUser, type, data in req.body
   */
  addRequest() {
    this.http
      .post(
        `${environment.serverUrl}${environment.apiUrl}/requests/add`,
        {} /* , payload */
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  /**
   * Make http request to '/notifications'
   * Takes userId in req.body
   */
  getNotifications() {
    this.http
      .get(`${environment.serverUrl}${environment.apiUrl}`)
      .subscribe(response => {
        console.log(response);
      });
  }

  /**
   * Make http request to '/notifications/add'
   * Takes fromUser, toUser, type, data in req.body
   */
  addNotifications() {
    this.http
      .post(`${environment.serverUrl}${environment.apiUrl}`, {} /* , payload */)
      .subscribe(response => {
        console.log(response);
      });
  }
}
