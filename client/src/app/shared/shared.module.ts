import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmailValidatorDirective } from './directives/email-validator.directive';

@NgModule({
  declarations: [EmailValidatorDirective],
  imports: [CommonModule],
  exports: [EmailValidatorDirective],
})
export class SharedModule {}
