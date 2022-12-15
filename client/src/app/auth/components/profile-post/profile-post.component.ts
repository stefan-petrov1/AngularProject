import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/posts/services/posts.service';
import { Pages } from 'src/app/shared/enums';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css'],
})
export class ProfilePostComponent {
  @Input() post!: IPost;
  @Output() onDelete = new EventEmitter<ElementRef>();
  submitted = false;

  constructor(
    private renderer: Renderer2,
    private postsService: PostsService,
    private router: Router,
    private el: ElementRef
  ) {}

  handleEdit() {
    this.router.navigate([Pages.Edit.replace(':id', this.post._id)]);
  }

  handleDelete() {
    this.submitted = true;

    if (confirm('Are you use you want to delete this post?')) {
      this.postsService.deletePost(this.post._id).subscribe(() => {
        this.onDelete.emit(this.el);
      });
    } else {
      this.submitted = false;
    }
  }
}
