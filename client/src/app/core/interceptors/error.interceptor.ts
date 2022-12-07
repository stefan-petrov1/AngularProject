import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Inject, Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { API_ERROR_KEY } from 'src/app/shared/constants';
import { Pages } from 'src/app/shared/enums';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_ERROR_KEY) private apiError$$: BehaviorSubject<null | string>,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.initialAuthenticate) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) =>
        of(err).pipe(
          withLatestFrom(this.authService.user$),
          switchMap(([err, user]) => {
            if (err.status === 403) {
              if (user) {
                this.apiError$$.next(
                  'Not enough permissions to perform this action'
                );
              } else {
                if (!this.router.url.includes(Pages.Login)) {
                  this.apiError$$.next('Not authenticated!');
                } else {
                  this.apiError$$.next(err.error.message);
                }

                this.router.navigate([Pages.Login]);
              }
            } else {
              this.apiError$$.next(err.error.message);
            }

            return throwError(() => err);
          })
        )
      )
    );
  }
}

export const ErrorInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
