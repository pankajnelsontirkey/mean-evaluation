import { Component, OnInit } from '@angular/core';
import { IError } from 'src/app/shared/interfaces/errorInterface';
import { BehaviorSubject } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit {
  hasErrors = false;
  errors: IError[] = null;
  // errorsChanged = new BehaviorSubject(null);

  constructor(private errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    /* Call error handler service */
    this.errorHandlerService.errorsChanged.subscribe(errors => {
      errors.length ? (this.hasErrors = true) : (this.hasErrors = false);
      this.errors = errors;
      // this.errorsChanged.next({ ...this.errors });
    });
  }

  addError(error: IError) {
    this.errorHandlerService.addToErrors(error);
  }

  removeError(errorIndex: number) {
    this.errorHandlerService.removeFromErrors(errorIndex);
  }

  closeErrorModal() {
    this.errorHandlerService.clearAllErrors();
  }
}
