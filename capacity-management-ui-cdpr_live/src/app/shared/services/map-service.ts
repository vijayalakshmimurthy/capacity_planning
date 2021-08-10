import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { Injectable, NgZone } from '@angular/core';
import { retry } from 'rxjs/operators';
/** google variable */
declare var google: any;
/** this is the service for taking postcode from google service */
@Injectable({
  providedIn: 'root'
})
export class MapService extends GoogleMapsAPIWrapper {
  /** Define variables before service initialization */
  geocoder: Promise<any>;
  /** Define latlong object for postcode */
  latlngObj = {
    lat: '',
    lng: ''
  };
  // tslint:disable-next-line:variable-name
  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
    this.geocoder = this.__loader.load().then(() => new google.maps.Geocoder());
  }

  /** to get lattitude and longitude based on postcode */
  getLatLan(address: string): Observable<any> {

    return Observable.create(observer => {
      this.geocoder.then((geocoder) => {
        // tslint:disable-next-line:object-literal-key-quotes
        geocoder.geocode({ 'address': address }, (results, status) => {
          // tslint:disable-next-line:prefer-const
          let obj;
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0].geometry.hasOwnProperty('bounds')) {
              this.latlngObj.lat = results[0].geometry.bounds.Ya.j;
              this.latlngObj.lng = results[0].geometry.bounds.Ua.j;
            } else {
              this.latlngObj.lat = results[0].geometry.viewport.Ya.j;
              this.latlngObj.lng = results[0].geometry.viewport.Ua.j;
            }
            observer.next(this.latlngObj);
            observer.complete();
          } else {
            observer.next(this.latlngObj);
            observer.complete();
          }
        });
      });
    });
  }
}
