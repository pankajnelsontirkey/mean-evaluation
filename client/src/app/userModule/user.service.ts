import { Injectable } from '@angular/core';
import { ICurrentUser } from '../shared/interfaces/userInterface';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../sharedModule/services/data.service';
import { IServiceResponse } from '../shared/interfaces/serviceInterface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: ICurrentUser = null;

  constructor(private authService: AuthService) {}

  setUser() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      this.user = { ...currentUser };
    });
  }
}
