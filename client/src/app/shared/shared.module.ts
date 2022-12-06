import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';

@NgModule({
  declarations: [SpinnerComponent, ErrorComponent, EmailValidatorDirective],
  imports: [CommonModule],
  exports: [SpinnerComponent, ErrorComponent, EmailValidatorDirective],
})
export class SharedModule {}
