import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-catalog-post',
  templateUrl: './catalog-post.component.html',
  styleUrls: ['./catalog-post.component.css'],
})
export class CatalogPostComponent {
  protected readonly titleThreshold = 20;

  @Input() post!: IPost;

  constructor() {}
}
