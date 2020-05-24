import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsService } from 'src/app/services/common/maps.service';
import { BusinessesService } from 'src/app/services/businesses.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;

  constructor(
    private mapService: MapsService,
    private businessesService: BusinessesService,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.mapService.getMapData().then((map) => {
      this.map = map;
    });
  }

  showBusinessDetails(business) {
    this.businessesService.setCurrent(business);
    this.ngZone.run(() => this.router.navigate([`business-detail/${business.$key}`], {relativeTo: this.route}));
  }
}
