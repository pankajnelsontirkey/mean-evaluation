import { Routes, RouterModule } from '@angular/router';
import { FileSharingComponent } from './file-sharing/file-sharing.component';
import { NgModule } from '@angular/core';

const FileSharingRoutes: Routes = [
  { path: '', component: FileSharingComponent }
];

@NgModule({
  imports: [RouterModule, RouterModule.forChild(FileSharingRoutes)],
  exports: [RouterModule]
})
export class FileSharingRoutingModule {}
