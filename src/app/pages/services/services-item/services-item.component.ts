import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-services-item',
  templateUrl: './services-item.component.html',
  styleUrls: ['./services-item.component.scss'],
})
export class ServicesItemComponent implements OnInit {
  service: any;
  defaultHref = '';

  constructor(
    private browser: InAppBrowserService,
    private servicesService: ServicesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service = this.servicesService.getCurrent();
    if (!this.service) {
      this.init();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  open() {
    this.browser.open(this.service.url);
  }

  private init() {
    const lastIds = _.takeRight(this.router.url.split('/'), 3);
    this.servicesService.getServices(lastIds[0])
      .then((services) => {
        this.service = services.find((service) => {
          return service.$key === lastIds[0];
        });
      });
  }
}
