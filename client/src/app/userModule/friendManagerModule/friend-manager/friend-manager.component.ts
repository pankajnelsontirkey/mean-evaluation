import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { FriendManagerService } from '../friend-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-friend-manager',
  templateUrl: './friend-manager.component.html',
  styleUrls: ['./friend-manager.component.scss']
})
export class FriendManagerComponent implements OnInit, OnDestroy {
  friends: any = [];
  friendsChanged = new BehaviorSubject<any>([]);
  friendsSubscription: Subscription;
  searchUserForm: FormGroup;
  isFormValid: boolean = false;
  isFormValidSubscription: Subscription;

  constructor(private friendMangerService: FriendManagerService) {}

  ngOnInit() {
    this.friendsSubscription = this.friendMangerService
      .getFriendsList()
      .subscribe(serviceResponse => {
        if (serviceResponse && serviceResponse.error) {
          /* call errohandler service */
        } else if (serviceResponse) {
          this.friends = serviceResponse.data;
          this.friendsChanged.next(this.friends);
        }
      });

    this.initForm();

    this.isFormValidSubscription = this.searchUserForm.statusChanges.subscribe(
      status => {
        status === 'VALID'
          ? (this.isFormValid = true)
          : (this.isFormValid = false);
      }
    );
  }

  initForm() {
    this.searchUserForm = new FormGroup({
      searchText: new FormControl('', Validators.required)
    });
  }

  onSearchUser() {
    if (this.searchUserForm.valid) {
      console.log(this.searchUserForm.value.searchText);
    }
    const searchText = this.searchUserForm.value.searchText;
    this.friendMangerService.searchForFriends(searchText);
  }

  ngOnDestroy() {
    this.friendsSubscription.unsubscribe();
    this.isFormValidSubscription.unsubscribe();
  }
}
