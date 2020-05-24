import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private cityName: string = 'London';

  constructor( ) { }

  getCityName() {
    return this.cityName || 'City';
  }
}
