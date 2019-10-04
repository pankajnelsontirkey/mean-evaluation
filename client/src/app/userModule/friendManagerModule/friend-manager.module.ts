import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FriendManagerRoutingModule } from './friend-manager-routing.module';
import { FriendManagerComponent } from './friend-manager/friend-manager.component';
import { FriendManagerService } from './friend-manager.service';

@NgModule({
  declarations: [FriendManagerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FriendManagerRoutingModule
  ],
  providers: [FriendManagerService],
  exports: [FriendManagerComponent]
})
export class FriendManagerModule {}
