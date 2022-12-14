import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from '../shared/enums';
import { CanActivateAuth } from '../shared/guards/auth.activate';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
