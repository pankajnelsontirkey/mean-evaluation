import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { NgModule } from '@angular/core';

const FileManagerRoutes: Routes = [
  { path: '', component: FileManagerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(FileManagerRoutes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule {}
