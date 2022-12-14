import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CART_STORAGE_KEY } from 'src/app/shared/constants';
import { IPost } from 'src/app/shared/interfaces';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart$$ = new BehaviorSubject<IPost[]>(
    this.localStorageService.checkForValue(CART_STORAGE_KEY, true) || []
  );

  public cart$ = this.cart$$.asObservable();
  private cart: IPost[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.cart$.subscribe((cart) => {
      console.log(cart);
      this.localStorageService.setData(CART_STORAGE_KEY, cart);
    });
  }

  addToCart(item: IPost) {
    if (this.cart.some((x) => x._id === item._id)) {
      return;
    }

    this.cart.push(item);
    this.cart$$.next(this.cart);
  }
}
