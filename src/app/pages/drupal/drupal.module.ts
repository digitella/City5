import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../../pipes/pipes.module';
import { DrupalItemPage } from './item/drupal.item.page';
import { DrupalListPage } from './list/drupal.list.page';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DrupalListPage,
    resolve: {isCache: DataResolverService},
  },
  {
    path: ':id',
    component: DrupalItemPage,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    CommonModule,
  ],
  declarations: [
    DrupalItemPage,
    DrupalListPage,
  ],
})
export class DrupalModule {}
