import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogsService } from '../catalogs.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-catalogs-list',
  templateUrl: './catalogs-list.component.html',
  styleUrls: ['./catalogs-list.component.scss'],
})
export class CatalogsListComponent implements OnInit {
  catalogs: any[];
  defaultHref = '';
  private business: any;

  constructor(
    private businessService: BusinessesService,
    private router: Router,
    private catalogsService: CatalogsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.business = this.businessService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.getCatalogs();
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  itemTapped(catalog) {
    this.catalogsService.setCurrent(catalog);
    this.router.navigate([`${catalog.$key}`], {relativeTo: this.route});
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.getCatalogs();
      });
    });
  }

  private getCatalogs() {
    this.catalogsService.getCatalogs(this.business.$key)
      .then((catalogs) => this.catalogs = catalogs);
  }
}
