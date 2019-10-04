import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './sharedModule/services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hasErrors: boolean = false;
  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.errorHandlerService.errorsChanged.subscribe(errors => {
      if (errors.length > 0) {
        this.hasErrors = true;
      } else {
        this.hasErrors = false;
      }
    });
  }
}
