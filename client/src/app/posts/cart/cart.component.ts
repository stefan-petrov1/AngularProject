import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IPost } from 'src/app/shared/interfaces';
import { CartService } from '../services/cart.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: IPost[] = [];

  totalPrice = 0;
  ownerCount = 0;
  hasCheckout = false;

  get disabled() {
    return !this.cart.length || this.ownerCount > 0;
  }

  constructor(
    private cartService: CartService,
    private postsService: PostsService,
    private changeDetectorRef: ChangeDetectorRef,
    protected authService: AuthService
  ) {
    changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.cartService.cart$.pipe(first()).subscribe((cart) => {
      if (!cart.length) {
        this.cart = [];
        this.changeDetectorRef.detectChanges();
      }

      for (const post of cart) {
        this.postsService.getPostById(post._id).subscribe({
          next: (post) => {
            this.cart.push(post);
            this.totalPrice += post.price;
            this.changeDetectorRef.detectChanges();
          },
        });
      }
    });
  }

  incrementOwnerCount() {
    this.ownerCount++;
    this.changeDetectorRef.detectChanges();
  }

  decrementOwnerCount() {
    this.ownerCount--;
    this.changeDetectorRef.detectChanges();
  }

  handleRemove(post: IPost) {
    const index = this.cart.findIndex((x) => x._id === post._id);
    this.cart.splice(index, 1);

    this.totalPrice -= post.price;
    this.changeDetectorRef.detectChanges();
  }

  checkoutHandler() {
    this.cartService.clearCart();

    this.cart = [];
    this.totalPrice = 0;
    this.ownerCount = 0;
    this.hasCheckout = true;

    this.changeDetectorRef.detectChanges();
  }
}
