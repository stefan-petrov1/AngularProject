import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, withLatestFrom } from 'rxjs';
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

  logout(callback: Function) {
    return this.httpClient.get<undefined>('api/users/logout').subscribe({
      next: () => this.logoutAction(callback),
      error: () => this.logoutAction(callback),
    });
  }

  userDetails() {
    return this.httpClient.get<Partial<IUser>>('api/users/me').pipe(
      withLatestFrom(this.user$),
      tap(([userFromReq, oldUser]) => {
        // userFromReq doesn't have the accessToken property

        Object.assign(oldUser || {}, userFromReq);
        this.users$$.next(oldUser);
      })
    );
  }

  authenticate(callback: Function) {
    return this.userDetails().subscribe({
      next: () => this.authenticateAction(callback),
      error: () => {
        this.clearUser();
        this.authenticateAction(callback);
      },
    });
  }

  private clearUser() {
    this.users$$.next(null);
  }

  private authenticateAction(callback: Function) {
    callback();
    this.initialAuthenticate = true;
  }

  private logoutAction(callback: Function) {
    callback();
    this.clearUser();
  }
}
