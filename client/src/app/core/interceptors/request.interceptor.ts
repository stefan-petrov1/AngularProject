import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/shared/constants';
import { IUser } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../shared/services/local-storage.service';
const { apiUrl } = environment;

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private localService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('api')) {
      const user: Partial<IUser> = JSON.parse(
        this.localService.getData(USER_STORAGE_KEY) || '{}'
      );

      request = request.clone({
        url: request.url.replace('api', apiUrl),
        setHeaders: user.accessToken
          ? {
              'X-Authorization': user.accessToken,
            }
          : undefined,
      });
    }

    return next.handle(request);
  }
}

export const RequestInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: RequestInterceptor,
  multi: true,
};
