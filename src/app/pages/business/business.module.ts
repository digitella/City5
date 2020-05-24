import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IonicRatingModule  } from 'ionic-rating';

import { BusinessComponent } from './business/business.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessesFilterComponent } from './businesses-filter/businesses-filter.component';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  { path: ':id', component: BusinessComponent, resolve: {isCache: DataResolverService} },
  {
    path: ':id/business-detail',
    children: [
      {
        path: ':id',
        children: [
          {
            path: '',
            component: BusinessDetailComponent,
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'products',
            loadChildren: () => import('../products/products.module').then((m) => m.ProductsModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'wordpress',
            loadChildren: () => import('../wordpress/wordpress.module').then((m) => m.WordpressModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'drupal',
            loadChildren: () => import('../drupal/drupal.module').then((m) => m.DrupalModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'news',
            loadChildren: () => import('../news/news.module').then((m) => m.NewsModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'services',
            loadChildren: () => import('../services/services.module').then((m) => m.ServicesModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'catalogs',
            loadChildren: () => import('../catalogs/catalogs.module').then((m) => m.CatalogsModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'reviews',
            loadChildren: () => import('../reviews/reviews.module').then((m) => m.ReviewsModule),
            resolve: {isCache: DataResolverService},
          },
          {
            path: 'contacts',
            loadChildren: () => import('../contacts/contacts.module').then((m) => m.ContactsModule),
            resolve: {isCache: DataResolverService},
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    IonicRatingModule ,
  ],
  declarations: [
    BusinessComponent,
    BusinessDetailComponent,
    BusinessesFilterComponent,
  ],
  entryComponents: [
    BusinessesFilterComponent,
  ],
})
export class BusinessPageModule {}
