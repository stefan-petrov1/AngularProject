import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CatalogPaginationButtonsComponent } from './components/catalog-pagination-buttons/catalog-pagination-buttons.component';
import { CatalogPostComponent } from './components/catalog-post/catalog-post.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogPostComponent,
    CatalogPaginationButtonsComponent,
    DetailsComponent,
    CartComponent,
    CartItemComponent,
    CreateEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
})
export class PostsModule {}
