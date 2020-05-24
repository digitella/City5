import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  public products: any[];
  public defaultHref = '';
  private business: any;

  constructor(
    private productsService: ProductsService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.getProducts();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  itemTapped(product) {
    this.productsService.setCurrent(product);
    this.router.navigate([`${product.$key}`], {relativeTo: this.route});
  }

  private getProducts() {
    this.productsService.getProducts(this.business.$key)
      .then((products) => this.products = products);
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.getProducts();
      });
    });
  }
}
