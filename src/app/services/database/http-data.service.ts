import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Config, DataServiceType } from 'src/config';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

const reviews = [
  {
    author: 'John Snow',
    comment: 'Good business',
    rate: 4,
    date: 1,
  },
  {
    author: 'Tyrion Lanniste',
    comment: 'Not bad',
    rate: 2,
    date: 2,
  },
  {
    author: 'Daenerys Targaryen',
    comment: 'Wonderful',
    date: 3,
  },
];

@Injectable({
  providedIn: 'root',
})
export class HttpDataService extends DataService {

  private apiUrl = '';
  private commonEndpoint = `common.json`;
  private businessEndpoint = `businesses.json`;
  private categoriesEndpoint = `categories.json`;
  private cache: { businesses: any[], categories: any[] };

  constructor(
    private http: HttpClient,
  ) {
    super();
    if (Config.DATA_SERVICE === DataServiceType.remote) {
      this.apiUrl = Config.apiRemoteUrl;
    } else if (Config.DATA_SERVICE === DataServiceType.local) {
      this.apiUrl = Config.apiLocalUrl;
    }
  }

  getMapCommon(): Promise<any> {
    return this.http.get<any>(this.getApiUrl(this.commonEndpoint)).pipe(
      map((businesses) => {
        return businesses.result.map;
      }),
    ).toPromise();
  }

  getProducts(businessId: string): Promise<any[]> {
    const productsURL = this.cache.businesses.find((business) => {
      return business.$key === businessId;
    }).products;
    return this.http.get<any>(productsURL).pipe(
      map((businesses) => {
        return businesses.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  getCatalogs(businessId: string): Promise<any[]> {
    const catalogsURL = this.cache.businesses.find((business) => {
      return business.$key === businessId;
    }).catalogs;
    return this.http.get<any>(catalogsURL).pipe(
      map((businesses) => {
        return businesses.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  getServices(businessId: string): Promise<any[]> {
    const servicesURL = this.cache.businesses.find((business) => {
      return business.$key === businessId;
    }).services;
    return this.http.get<any>(servicesURL).pipe(
      map((businesses) => {
        return businesses.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  getPosts(businessId: string): Promise<any[]> {
    const postsURL = this.cache.businesses.find((business) => {
      return business.guid === businessId;
    }).news;
    return this.http.get<any>(postsURL).pipe(
      map((businesses) => {
        return businesses.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  addReview(businessId: string, review: any): Promise<void> {
    reviews.push(review);
    const business = this.cache.businesses.find((businessElement) => {
      return businessElement.$key === businessId;
    });
    business.rating = this.calcRating(business.rating, review.rate);

    return Promise.resolve();
  }

  getReviews(businessId: string): Promise<any[]> {
    return Promise.resolve(reviews);
  }

  getBusinesses(): Promise<any[]> {
    return this.http.get<any>(this.getApiUrl(this.businessEndpoint)).pipe(
      map((businesses) => {
        return businesses.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  getBusinessById(businessId: string): Promise<any> {
    return Promise.resolve(this.cache.businesses.find((business) => {
      return business.$key === businessId;
    }));
  }

  getCategories(): Promise<any[]> {
    return this.http.get<any>(this.getApiUrl(this.categoriesEndpoint)).pipe(
      map((categories) => {
        return categories.result.map((element) => this.renameKeyGuidToKey(element));
      }),
    ).toPromise();
  }

  init(): Promise<boolean> {
    if (this.cache) {
      return Promise.resolve(true);
    }

    return forkJoin([
      this.http.get<any>(this.getApiUrl(this.businessEndpoint)).pipe(
        map((businesses) => {
          return businesses.result;
        }),
      ),
      this.http.get<any>(this.getApiUrl(this.categoriesEndpoint)).pipe(
        map((categories) => {
          return categories.result;
        }),
      ),
    ]).toPromise()
    .then((response) => {
      this.cache = {
        businesses: response[0].map((element) => this.renameKeyGuidToKey(element)),
        categories: response[1].map((element) => this.renameKeyGuidToKey(element)),
      };
      return true;
    });
  }

  private renameKeyGuidToKey(element: any): any {
    return {$key: element.guid, ...element};
  }

  private getApiUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }
}
