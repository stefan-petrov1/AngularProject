import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from '../shared/enums';
import { CanActivateAuth } from '../shared/guards/auth.activate';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: Pages.Catalog,
    component: CatalogComponent,
    canActivate: [CanActivateAuth],
    data: {
      reqAuth: true,
      title: 'Catalog',
    },
  },
  {
    path: Pages.Details,
    component: DetailsComponent,
    canActivate: [CanActivateAuth],
    data: {
      reqAuth: true,
      title: 'Details',
    },
  },
  {
    path: Pages.Cart,
    component: CartComponent,
    canActivate: [CanActivateAuth],
    data: {
      reqAuth: true,
      title: 'Cart',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
