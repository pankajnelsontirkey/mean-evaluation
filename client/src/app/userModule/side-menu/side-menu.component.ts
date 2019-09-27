import { Component, OnInit } from '@angular/core';

import {
  faUserFriends,
  faFile,
  faUser,
  faShare,
  faHome
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  icons = { faUser, faFile, faUserFriends, faShare, faHome };
  constructor() {}

  ngOnInit() {}
}
