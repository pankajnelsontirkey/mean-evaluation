import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { faShareSquare } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  icons = { faShareSquare };
  collapsed: boolean = true;
  isLoggedIn: boolean = false;
  currentUserName: string = '';

  currentUserSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSubscription = this.authService.currentUserChanged.subscribe(
      currentUser => {
        if (!currentUser) {
          this.currentUserName = null;
          this.isLoggedIn = false;
        } else {
          this.currentUserName = currentUser.email;
          this.isLoggedIn = true;
        }
      }
    );
  }

  onLogout() {
    this.collapsed = true;
    this.authService.logout();
  }

  onRedirectToHome() {
    this.authService.findHomePage();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
