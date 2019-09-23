import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FileSharingRoutingModule } from './fileSharing-routing.module';
import { FileSharingComponent } from './file-sharing/file-sharing.component';

@NgModule({
  declarations: [FileSharingComponent],
  imports: [CommonModule, RouterModule, FileSharingRoutingModule],
  exports: [FileSharingComponent]
})
export class FileSharingModule {}
