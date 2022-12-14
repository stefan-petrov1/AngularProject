import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/shared/constants';
import { IUser } from 'src/app/shared/interfaces';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly users$$ = new BehaviorSubject<null | IUser>(
    this.localStorage.checkForValue(USER_STORAGE_KEY, true) || null
  );

  public isUserAuthenticated = false;
  public initialAuthenticate = false;
  // public user: null | IUser = null;
  public user$ = this.users$$.asObservable();

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.user$.subscribe((user) => {
      this.isUserAuthenticated = !!user;
      localStorage.setData(USER_STORAGE_KEY, user ? user : {});
    });
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<IUser>('api/users/login', {
        email,
        password,
      })
      .pipe(tap((user) => this.users$$.next(user)));
  }

  register(email: string, password: string) {
    return this.httpClient
      .post<IUser>('api/users/register', {
        email,
        password,
      })
      .pipe(tap((user) => this.users$$.next(user)));
  }

  logout() {
    return this.httpClient.get<undefined>('api/users/logout').pipe(
      catchError((e: any) => {
        this.clearUser();
        return throwError(() => e);
      }),
      tap(() => {
        this.clearUser();
      })
    );
  }

  userDetails() {
    return this.httpClient.get<IUser>('api/users/me').pipe(
      withLatestFrom(this.user$),
      tap(
        ([userFromReq, oldUser]: [
          Omit<IUser, 'accessToken'>,
          IUser | null
        ]) => {
          Object.assign(oldUser || {}, userFromReq);
          this.users$$.next(oldUser);
        }
      )
    );
  }

  authenticate() {
    return this.userDetails().pipe(
      catchError((e: any) => {
        this.clearUser();
        this.initialAuthenticate = true;

        return throwError(() => e);
      }),
      tap(() => {
        this.initialAuthenticate = true;
      })
    );
  }

  private clearUser() {
    this.users$$.next(null);
  }
}
