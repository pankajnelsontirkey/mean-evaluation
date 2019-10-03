import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-friend-manager',
  templateUrl: './friend-manager.component.html',
  styleUrls: ['./friend-manager.component.scss']
})
export class FriendManagerComponent implements OnInit {
  friends = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getFriendsList();

    this.initForm();
  }

  initForm() {}
}
