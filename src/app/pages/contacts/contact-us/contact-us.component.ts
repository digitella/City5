import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessesService } from 'src/app/services/businesses.service';
import { OpenHoursService } from 'src/app/services/common/open-hours.service';
import { InAppBrowserService } from 'src/app/services/common/in-app-browser.service';
import { MapsService } from 'src/app/services/common/maps.service';
import { EmailService } from 'src/app/services/common/email.service';
import { CallService } from 'src/app/services/common/call.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  business: any;
  days: any[];
  defaultHref = '';

  constructor(
    private businessesService: BusinessesService,
    private openHoursService: OpenHoursService,
    private callService: CallService,
    private emailService: EmailService,
    private inBrowser: InAppBrowserService,
    private mapsService: MapsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.business = this.businessesService.getCurrent();
    if (!this.business) {
      this.init();
    } else {
      this.days = this.openHoursService.getOpenHours(this.business.openhours);
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `${this.router.url.split('/').slice(0, -1).join('/')}`;
  }

  call(phone: string) {
    this.callService.call(phone);
  }

  sendEmail(email: string) {
    this.emailService.sendEmail(email);
  }

  openUrl(url: string) {
    this.inBrowser.open(url);
  }

  getDirections(officeLocation: string) {
    this.mapsService.openMapsApp(officeLocation, this.business.name);
  }

  private init() {
    this.route.params.subscribe((params) => {
      this.businessesService.getBusinessById(params.id).then((business) => {
        this.business = business;
        this.setDays();
      });
    });
  }

  private setDays() {
    this.days = this.openHoursService.getOpenHours(this.business.openhours);
  }
}
