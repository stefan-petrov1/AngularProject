import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  getPreviousLocation() {
    return this.history[this.history.length - 2];
  }

  back(): void {
    this.history.pop();

    if (this.history.length > 0) {
      this.router.navigateByUrl(this.history[this.history.length - 1]);
    } else {
      this.router.navigate([Pages.Home]);
    }
  }
}
