import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isLoggedIn: boolean = false;
  currentUserName: string = '';

  currentUserSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        if (currentUser) {
          this.currentUserName = currentUser.email;
          this.isLoggedIn = true;
        } else {
          this.currentUserName = null;
          this.isLoggedIn = false;
        }
      }
    );
  }

  onLogout() {
    this.collapsed = true;
    this.authService.logout();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
