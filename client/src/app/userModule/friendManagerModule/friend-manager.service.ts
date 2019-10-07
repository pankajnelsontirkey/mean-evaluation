import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { DataService } from 'src/app/sharedModule/services/data.service';
import { IServiceResponse } from 'src/app/shared/interfaces/serviceInterface';

@Injectable()
export class FriendManagerService {
  constructor(private dataService: DataService) {}

  getFriendsList() {
    let serviceResponse = {};
    return this.dataService.getFriends().pipe<IServiceResponse>(
      map(response => {
        if (response.error) {
          serviceResponse = {
            error: response.error,
            message: response.message
          };
        } else if (response.success) {
          serviceResponse = {
            data: response.data.friends,
            message: response.message
          };
        }
        return serviceResponse;
      })
    );
  }

  searchForFriends(searchText: string) {
    let serviceResponse = {};
    return this.dataService.searchUsers(searchText).pipe<IServiceResponse>(
      map(response => {
        if (response.error) {
          serviceResponse = {
            error: response.error,
            message: response.message
          };
        } else if (response.success) {
          serviceResponse = {
            data: response.data.users,
            message: response.message
          };
        }
        return serviceResponse;
      })
    );
  }
}
