import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { getDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {

  constructor(
    private geolocation: Geolocation,
  ) { }

  getDistancesToOrigins(origins: string[]) {
    return this.getCurrentPosition()
      .then((position) => {
        return _.map(origins, (origin) => {
          if (!origin) {
            return null;
          }
          return this.getDistance(origin, position);
        });
      });
  }

  getDistance(origin: string, position) {
    const origins = origin.split(',');
    const coord: GeolibInputCoordinates = {
      longitude: origins[1],
      latitude: origins[0],
    };

    const distance = getDistance({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }, coord);

    /*
    if (distance < 1000) {
      distance = distance + ' m';
    } else {
      distance = convert(distance, 'meters', {
        precision: 2
      }).toKilometers() + ' km';
    }
    */
    return distance;
  }

  getCurrentPosition() {
    const posOptions = {
      enableHighAccuracy: true,
    };

    return this.geolocation.getCurrentPosition(posOptions);
  }
}
