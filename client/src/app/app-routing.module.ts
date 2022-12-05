import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { Pages } from './shared/enums';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Pages.Home,
  },
  {
    path: Pages.Home,
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: Pages.NotFound,
    component: NotFoundComponent,
    data: {
      title: 'Not Found',
    },
  },
  {
    path: '**',
    redirectTo: Pages.NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
