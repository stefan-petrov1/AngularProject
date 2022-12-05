import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INTERNAL_ERROR_KEY } from 'src/app/shared/constants';

@Component({
  selector: 'app-error-boundary',
  templateUrl: './error-boundary.component.html',
  styleUrls: ['../common/error-page.css'],
})
export class ErrorBoundaryComponent implements OnInit {
  constructor(
    @Inject(INTERNAL_ERROR_KEY) private internalErrors$$: BehaviorSubject<any>
  ) {}

  error = false;

  ngOnInit() {
    this.internalErrors$$.subscribe((err: any) => {
      this.error = !!err;
    });
  }
}
