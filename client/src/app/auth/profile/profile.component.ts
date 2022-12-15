import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/posts/services/posts.service';
import { IPost } from 'src/app/shared/interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('postContainer') postContainer!: ElementRef;

  posts$!: Observable<IPost[]>;
  deletedPostsCount = 0;

  get email() {
    return this.authService.user?.email as string;
  }

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const ownerId = this.authService.user?._id as string;
    this.posts$ = this.postsService.getPostsByOwnerId(ownerId);
  }

  handleDelete(el: ElementRef) {
    this.renderer.removeChild(
      this.postContainer.nativeElement,
      el.nativeElement
    );

    this.deletedPostsCount++;
  }
}
