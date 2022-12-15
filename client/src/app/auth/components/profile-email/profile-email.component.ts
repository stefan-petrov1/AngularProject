import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.css'],
})
export class ProfileEmailComponent {
  @Input() email!: string;
  show = false;

  constructor() {}

  toggle() {
    this.show = !this.show;
  }
}
