import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() post!: IPost;
  @Input() ownerWarnings!: boolean;

  @Output() onOwnerAdd = new EventEmitter();
  @Output() onOwnerRemove = new EventEmitter();
  @Output() onRemove = new EventEmitter<IPost>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (this.ownerWarnings) {
      this.onOwnerAdd.emit();
    }
  }

  removeFromCart() {
    if (this.ownerWarnings) {
      this.onOwnerRemove.emit();
    }

    this.onRemove.emit(this.post);
    this.cartService.removeFromCart(this.post._id);
  }
}
