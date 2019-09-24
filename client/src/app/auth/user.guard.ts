import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.currentUser) {
      return this.router.createUrlTree(['']);
    } else if (
      this.authService.currentUser &&
      (!this.authService.currentUser.role ||
        this.authService.currentUser.role !== 'user')
    ) {
      return this.router.createUrlTree(['']);
    }
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.currentUser) {
      return this.router.createUrlTree(['']);
    } else if (
      this.authService.currentUser &&
      (!this.authService.currentUser.role ||
        this.authService.currentUser.role !== 'user')
    ) {
      return this.router.createUrlTree(['']);
    }
    return true;
  }
}
