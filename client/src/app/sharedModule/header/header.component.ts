import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  isLoggedIn: boolean = false;
  currentUserName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserChanged.subscribe(currentUser => {
      if (currentUser) {
        this.currentUserName = currentUser.email;
        this.isLoggedIn = true;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
