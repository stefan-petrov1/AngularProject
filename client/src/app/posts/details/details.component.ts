import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pages } from 'src/app/shared/enums';
import { IPost } from 'src/app/shared/interfaces';
import { CartService } from '../services/cart.service';
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
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const post$ = this.postsService.getPostById(id);

    combineLatest([this.cartService.cart$, post$]).subscribe({
      next: ([cart, post]) => {
        this.post = post;
        this.isOwner = this.authService.user?._id === post._id;
        this.isItemInCart = cart.some((x) => x._id === post._id);
        this.disabled = this.isOwner || this.isItemInCart;
      },
      error: () => this.exitPage(),
    });
  }

  onCartChange(cart: IPost[], post: IPost) {
    this.isOwner = this.authService.user?._id === post._id;
    this.isItemInCart = cart.some((x) => x._id === post._id);
    this.disabled = this.isOwner || this.isItemInCart;
  }

  exitPage() {
    this.router.navigate([Pages.Catalog]);
  }

  addToCart() {
    this.cartService.addToCart(this.post);
  }
}
