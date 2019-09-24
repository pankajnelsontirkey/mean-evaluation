import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { UserGuard } from '../auth/user.guard';
import { NotFoundComponent } from '../sharedModule/not-found/not-found.component';

const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [UserGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./fileManagerModule/file-manager.module').then(
        m => m.FileManagerModule
      )
  },
  {
    path: 'shares',
    loadChildren: () =>
      import('./fileSharingModule/file-sharing.module').then(
        m => m.FileSharingModule
      )
  },
  {
    path: 'friends',
    loadChildren: () =>
      import('./friendManagerModule/friend-manager.module').then(
        m => m.FriendManagerModule
      )
  },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
