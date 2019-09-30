import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-friend-manager',
  templateUrl: './friend-manager.component.html',
  styleUrls: ['./friend-manager.component.scss']
})
export class FriendManagerComponent implements OnInit {
  friends = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getFriendsList;
  }
}
