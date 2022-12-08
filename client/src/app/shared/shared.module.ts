import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [EmailValidatorDirective, ShortenPipe],
  imports: [CommonModule],
  exports: [EmailValidatorDirective, ShortenPipe],
})
export class SharedModule {}
