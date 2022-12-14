import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pages } from 'src/app/shared/enums';
import { IPost } from 'src/app/shared/interfaces';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  post!: IPost;
  isOwner: undefined | boolean;
  isItemInCart: undefined | boolean;
  disabled = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.postsService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;

        this.isOwner = this.authService.user?._id === post._id;
        // Add later
        this.isItemInCart = false;
        this.disabled = this.isOwner || this.isItemInCart;
      },
      error: (_) => {
        this.exitPage();
      },
    });
  }

  exitPage() {
    this.router.navigate([Pages.Catalog]);
  }
}
