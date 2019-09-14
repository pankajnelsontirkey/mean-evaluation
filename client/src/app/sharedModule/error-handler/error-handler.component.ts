import { Component, OnInit } from '@angular/core';
import { IError } from 'src/app/shared/interfaces/errorInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit {
  hasErrors = false;
  errors: IError[] = null;
  errorsChanged = new BehaviorSubject(null);

  constructor() {}

  ngOnInit() {
    /* Call error handler service */
    this.errorsChanged.subscribe(errors => {
      errors ? (this.hasErrors = true) : (this.hasErrors = false);
    });
  }

  addError(error: IError) {
    this.errors.push(error);
    this.hasErrors = true;
    this.errorsChanged.next({ ...this.errors });
  }

  removeError(errorIndex: number) {
    this.errors.splice(errorIndex, 1);
    this.errorsChanged.next({ ...this.errors });
  }
}
