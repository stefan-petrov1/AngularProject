import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CART_STORAGE_KEY } from 'src/app/shared/constants';
import { IPost } from 'src/app/shared/interfaces';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private defaultValue = [];

  private cart$$ = new BehaviorSubject<IPost[]>(
    this.localStorageService.checkForValue(CART_STORAGE_KEY, true) ||
      this.defaultValue
  );

  public cart$ = this.cart$$.asObservable();
  public cart: IPost[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.cart$.subscribe((cart) => {
      this.cart = cart;
      this.localStorageService.setData(CART_STORAGE_KEY, cart);
    });
  }

  addToCart(item: IPost) {
    this.cart$$.next([...this.cart, item]);
  }

  removeFromCart(id: string) {
    const cart = this.cart.filter((x) => x._id !== id);
    this.cart$$.next(cart);
  }

  clearCart() {
    this.cart$$.next(this.defaultValue);
  }
}
