import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FileManagerRoutingModule } from './fileManager-routing.module';
import { FileManagerComponent } from './file-manager/file-manager.component';

@NgModule({
  declarations: [FileManagerComponent],
  imports: [CommonModule, RouterModule, FileManagerRoutingModule],
  exports: [FileManagerComponent]
})
export class FileManagerModule {}
