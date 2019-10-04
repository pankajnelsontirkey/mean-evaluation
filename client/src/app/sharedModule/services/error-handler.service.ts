import { Injectable } from '@angular/core';
import { IError } from 'src/app/shared/interfaces/errorInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  errors: IError[] = [];
  errorsChanged = new BehaviorSubject<IError[]>([]);

  constructor() {}

  fetchErrors(): IError[] {
    return [...this.errors];
  }

  addToErrors(error: IError) {
    this.errors.push(error);
    this.errorsChanged.next([...this.errors]);
  }

  removeFromErrors(index: number) {
    this.errors.splice(index, 1);
    this.errorsChanged.next([...this.errors]);
  }
}
