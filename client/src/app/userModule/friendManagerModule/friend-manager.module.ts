import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FriendManagerRoutingModule } from './friendManager-routing.module';
import { FriendManagerComponent } from './friend-manager/friend-manager.component';

@NgModule({
  declarations: [FriendManagerComponent],
  imports: [CommonModule, RouterModule, FriendManagerRoutingModule],
  exports: [FriendManagerComponent]
})
export class FriendManagerModule {}
