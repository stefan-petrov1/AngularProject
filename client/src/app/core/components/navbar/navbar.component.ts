import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/posts/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cartLength = 0;

  constructor(protected authService: AuthService, cartService: CartService) {
    cartService.cart$.subscribe((cart) => {
      this.cartLength = cart.length;
    });
  }
}
