import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessesService } from 'src/app/services/businesses.service';
import { OpenHoursService } from 'src/app/services/common/open-hours.service';
import { MapsService } from 'src/app/services/common/maps.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss'],
})
export class BusinessDetailComponent implements OnInit {

  business: any;
  tiles: any[][] = [
    [
      { title: 'News', icon: 'at-circle', path: 'news' },
      { title: 'Products', icon: 'cart', path: 'products' },
    ],
    [
      { title: 'Services', icon: 'cog', path: 'services' },
      { title: 'Catalogs', icon: 'book', path: 'catalogs' },
    ],
  ];
  isOpen: boolean;
  defaultHref = '';

  constructor(
    private businessesService: BusinessesService,
    private openHoursService: OpenHoursService,
    private mapsService: MapsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.business = this.businessesService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.setOpenHours();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -2).join('/')}`;
  }

  getDirections(officeLocation: string) {
    this.mapsService.openMapsApp(officeLocation, this.business.name);
  }

  isInFavorites(id) {
    return this.businessesService.isInFavorites(id);
  }

  toggleFavorites(id) {
    this.businessesService.toggleFavorites(id);
  }

  goToContactUs() {
    this.router.navigate(['contacts'], {relativeTo: this.route});
  }

  goToReviews() {
    this.router.navigate(['reviews'], {relativeTo: this.route});
  }

  navigateToWordpress() {
    this.router.navigate(['wordpress'], {relativeTo: this.route});
  }

  navigateToDrupal() {
    this.router.navigate(['drupal'], {relativeTo: this.route});
  }

  navigateTo(tile: any) {
    this.router.navigate([`${tile.path}`], {relativeTo: this.route});
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessesService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.setOpenHours();
      });
    });
  }

  private setOpenHours() {
    this.isOpen = this.business.openhours && this.openHoursService.isBusinessOpen(this.business.openhours);
  }
}
