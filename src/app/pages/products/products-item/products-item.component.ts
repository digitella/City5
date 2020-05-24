import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  product: any;
  defaultHref = '';

  constructor(
    private browser: InAppBrowserService,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.product = this.productsService.getCurrent();
    if (!this.product) {
      this.init();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  buyNow() {
    this.browser.open(this.product.url);
  }

  private init() {
    const lastIds = _.takeRight(this.router.url.split('/'), 3);
    this.productsService.getProducts(lastIds[0])
      .then((products) => {
        this.product = products.find((product) => {
          return product.$key === lastIds[2];
        });
      });
  }
}
