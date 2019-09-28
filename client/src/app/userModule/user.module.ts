import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FileManagerModule } from './fileManagerModule/file-manager.module';
import { FileSharingModule } from './fileSharingModule/file-sharing.module';
import { FriendManagerModule } from './friendManagerModule/friend-manager.module';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../sharedModule/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [DashboardComponent, ProfileComponent, SideMenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
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
