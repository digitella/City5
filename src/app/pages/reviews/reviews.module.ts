import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule  } from 'ionic-rating';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DataResolverService } from 'src/app/services/common/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ReviewsComponent,
    resolve: {isCache: DataResolverService},
  },
  {
    path: ':id',
    component: AddReviewsComponent,
    resolve: {isCache: DataResolverService},
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    IonicRatingModule ,
    PipesModule,
    FormsModule,
  ],
  declarations: [
    ReviewsComponent,
    AddReviewsComponent,
  ],
})
export class ReviewsModule { }
