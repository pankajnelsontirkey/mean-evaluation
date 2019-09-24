import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerModule } from './fileManagerModule/file-manager.module';
import { FileSharingModule } from './fileSharingModule/file-sharing.module';
import { FriendManagerModule } from './friendManagerModule/friend-manager.module';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../sharedModule/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserRoutingModule,
    FileManagerModule,
    FileSharingModule,
    FriendManagerModule
  ],
  bootstrap: []
})
export class UserModule {}
