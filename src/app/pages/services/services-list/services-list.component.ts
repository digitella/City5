import { Component, OnInit } from '@angular/core';
import { BusinessesService } from 'src/app/services/businesses.service';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  services: any[];
  defaultHref = '';
  private business: any;

  constructor(
    private servicesService: ServicesService,
    private businessService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.getServices();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  itemTapped(service) {
    this.servicesService.setCurrent(service);
    this.router.navigate([`${service.$key}`], {relativeTo: this.route});
  }

  private getServices() {
    this.servicesService.getServices(this.business.$key)
      .then((services) => this.services = services);
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.getServices();
      });
    });
  }
}
