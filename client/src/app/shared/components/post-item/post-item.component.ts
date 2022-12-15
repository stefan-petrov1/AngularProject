import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent {
  @Input() post!: IPost;

  constructor() {}
}
