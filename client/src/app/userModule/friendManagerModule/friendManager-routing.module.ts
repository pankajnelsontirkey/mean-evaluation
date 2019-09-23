import { Routes, RouterModule } from '@angular/router';
import { FriendManagerComponent } from './friend-manager/friend-manager.component';
import { NgModule } from '@angular/core';

const FriendManagerRoutes: Routes = [
  { path: '', component: FriendManagerComponent }
];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(FriendManagerRoutes)],
  exports: [RouterModule]
})
export class FriendManagerRoutingModule {}
