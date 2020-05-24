import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    resolve: {isCache: DataResolverService},
  },
  {
    path: ':id',
    component: NewsItemComponent,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  declarations: [
    NewsListComponent,
    NewsItemComponent,
  ],
})
export class NewsModule { }
