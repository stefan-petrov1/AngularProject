import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostItemComponent } from './components/post-item/post-item.component';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [EmailValidatorDirective, ShortenPipe, PostItemComponent],
  imports: [CommonModule],
  exports: [EmailValidatorDirective, ShortenPipe, PostItemComponent],
})
export class SharedModule {}
