import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogPaginationButtonsComponent } from './components/catalog-pagination-buttons/catalog-pagination-buttons.component';
import { CatalogPostComponent } from './components/catalog-post/catalog-post.component';

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogPostComponent,
    CatalogPaginationButtonsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
})
export class PostsModule {}
