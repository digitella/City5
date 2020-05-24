import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { CatalogsService } from '../catalogs.service';

@Component({
  selector: 'app-catalogs-item',
  templateUrl: './catalogs-item.component.html',
  styleUrls: ['./catalogs-item.component.scss'],
})
export class CatalogsItemComponent implements OnInit {
  catalog: any;
  defaultHref = '';

  constructor(
    private browser: InAppBrowserService,
    private catalogsService: CatalogsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.catalog = this.catalogsService.getCurrent();
    if (!this.catalog) {
      this.init();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  open() {
    this.browser.open(this.catalog.url);
  }

  openPdf() {
    this.browser.open(this.catalog.pdf);
  }

  private init() {
    const lastIds = _.takeRight(this.router.url.split('/'), 3);
    this.catalogsService.getCatalogs(lastIds[0])
      .then((catalogs) => {
        this.catalog = catalogs.find((catalog) => {
          return catalog.$key === lastIds[2];
        });
      });
  }
}
