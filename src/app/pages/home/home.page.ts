import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { BusinessesService } from 'src/app/services/businesses.service';
import { OrderBy } from 'src/app/common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cityName: string = '';
  businesses: any[];
  categories: any[];
  private orderBy: OrderBy = OrderBy.title;

  constructor(
    private homeService: HomeService,
    private businessesService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cityName = this.homeService.getCityName();
    this.updateList();
  }

  ionViewWillEnter() {
    Promise.all([this.loadCategories()])
      .then(() => this.updateList());
  }

  updateList() {
    this.businessesService.fetchBusinesses('', false, '', this.orderBy)
      .then((businesses) => {
        this.businesses = businesses;
      });
  }

  goToBusinessDetail(business: any) {
    this.businessesService.setCurrent(business);
    this.router.navigate([`../categories/${business.category}/business-detail/${business.$key}`], {relativeTo: this.route});
  }

  itemTapped(category) {
    this.router.navigate([`../categories/${category.$key}`], {relativeTo: this.route});
  }

  private loadCategories() {
    return this.businessesService.getCategories().then((categories) => {
      this.categories = categories;
    });
  }
}
