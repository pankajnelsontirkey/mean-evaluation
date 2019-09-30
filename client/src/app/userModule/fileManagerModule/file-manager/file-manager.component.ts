import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  uploadMode: boolean = false;

  constructor() {}

  ngOnInit() {}

  onClickUpload() {
    this.uploadMode = true;
    console.log(`Let's upload some files.`);
  }

  onCloseUpload() {
    this.uploadMode = false;
  }
}
