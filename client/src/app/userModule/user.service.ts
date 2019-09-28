import { Injectable } from '@angular/core';
import { ICurrentUser } from '../shared/interfaces/userInterface';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../sharedModule/services/data.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: ICurrentUser = null;

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}

  setUser() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      this.user = { ...currentUser };
    });
  }

  getFriendsList() {
    this.dataService.friends('fetch');
  }
}
