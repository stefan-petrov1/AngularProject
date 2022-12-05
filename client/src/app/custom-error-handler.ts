import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INTERNAL_ERROR_KEY } from './shared/constants';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    @Inject(INTERNAL_ERROR_KEY) private internalErrors$$: BehaviorSubject<any>
  ) {}

  handleError(err: any) {
    if (!(err instanceof HttpErrorResponse)) {
      this.internalErrors$$.next(err);
      return;
    }

    console.error(err);
  }
}
