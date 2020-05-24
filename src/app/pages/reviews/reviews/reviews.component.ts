import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ReviewsService } from '../reviews.service';
import { BusinessesService } from 'src/app/services/businesses.service';
import { AddReviewsComponent } from '../add-reviews/add-reviews.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];
  loading = true;
  reviewsExist = true;
  defaultHref = '';
  private business: any;

  constructor(
    private service: ReviewsService,
    private modalCtrl: ModalController,
    private businessService: BusinessesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.loadReviews();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  async addReview() {
    const modal = await this.modalCtrl.create({
      component: AddReviewsComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.service.addReview(this.business.$key, data)
        .then(() => {
          this.loadReviews();
        });
    }
  }

  private loadReviews() {
    this.service.getReviews(this.business.$key)
      .then((reviews) => {
        this.reviews = reviews;
        this.loading = false;
      });
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.loadReviews();
      });
    });
  }
}
