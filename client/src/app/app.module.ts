import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomErrorHandler } from './custom-error-handler';
import { INTERNAL_ERROR_KEY } from './shared/constants';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    {
      provide: INTERNAL_ERROR_KEY,
      useValue: new BehaviorSubject(null),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
