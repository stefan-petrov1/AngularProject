import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuth } from '../shared/guards/auth.activate';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  {
    path: 'catalog',
    canActivate: [CanActivateAuth],
    component: CatalogComponent,
    data: {
      reqAuth: true,
      title: 'Catalog',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
