import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/services/businesses.service';
import { ModalController } from '@ionic/angular';
import { BusinessesFilterComponent } from '../businesses-filter/businesses-filter.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderBy } from 'src/app/common/constants';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  queryText = '';
  businesses: any[] = [];
  orderBy: OrderBy = OrderBy.title;
  categories: any[] = [];
  selectedCategory = {
    $key: null,
    title: '',
  };
  isBackButtonShow: boolean = true;

  get isFilterDirty(): boolean {
    return !!(this.selectedCategory && this.selectedCategory.$key);
  }

  constructor(
    private businessesService: BusinessesService,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id !== undefined) {
        if (this.selectedCategory.$key === null && this.selectedCategory.title !== 'All') {
          this.selectedCategory.$key = params.id;
        }
        this.isBackButtonShow = false;
      }
      this.updateList();
    });
  }

  ionViewWillEnter() {
    Promise.all([this.loadCategories()])
      .then(() => this.updateList());
  }

  updateList() {
    this.businessesService.fetchBusinesses(this.queryText, false, this.selectedCategory.$key, this.orderBy)
      .then((businesses) => {
        this.businesses = businesses;
      });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: BusinessesFilterComponent,
      componentProps: {
        categories: this.categories,
        orderBy: this.orderBy,
        selectedCategory: this.selectedCategory.$key,
      },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedCategory.$key = data.selectedCategory ? data.selectedCategory : null;
      this.selectedCategory.title = !data.selectedCategory ? 'All' : '';
      this.orderBy = data.orderBy;
      this.updateList();
    }
  }

  goToBusinessDetail(business: any) {
    this.businessesService.setCurrent(business);
    this.router.navigate([`business-detail/${business.$key}`], {relativeTo: this.route});
  }

  clearFilter() {
    this.selectedCategory.$key = null;
    this.selectedCategory.title = '';
    this.updateList();
  }

  selectCategory(event) {
    this.selectedCategory.$key = event.detail.value;
    this.updateList();
  }

  private loadCategories() {
    return this.businessesService.getCategories().then((categories) => {
      this.categories = [{ $key: null, title: 'All' }, ...categories];
    });
  }
}
