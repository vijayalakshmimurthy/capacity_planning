import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
/** This component is having all map funtionality which is used in stt module */
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnChanges {
  /** Define variables before component initialization */
  @Input() mapViewData;
  @Input() mapOptions = {};
  @Input() customLatLng = { lat: null, lng: null };
  @Input() radiusCircleObj = { lat: '', lng: '', radius: [] };
  @Output() addCustomMarker = new EventEmitter<any>();
  lat = '';
  lng = '';
  mapZoom = '';
  serviceMarker: any;
  markerDt: any;
  /** latlng for line creation */
  latlng = [{ lat: '', lng: '' }, { lat: '', lng: '' }];

  /** calling ngonchanges method to get changed Input type decorator */
  /** to call all pins on map on change directive. */
  ngOnChanges() {
    if (this.mapViewData.hasOwnProperty('data')) {
      if (this.mapViewData['data'].locations.filter(x => Number(x.latitude) === Number(this.customLatLng.lat) &&
        Number(x.longitude) === Number(this.customLatLng.lng))) {
        this.mapViewData['data'].locations =
          this.mapViewData['data'].locations.filter(x => Number(x.latitude) !== Number(this.customLatLng.lat) &&
            Number(x.longitude) !== Number(this.customLatLng.lng));
      }
      this.setImage(this.mapViewData['data'].locations);
    }
    this.lat = this.mapOptions['lat'];
    this.lng = this.mapOptions['lng'];
    this.mapZoom = this.mapOptions['mapZoom'];
    /** render custom marker */
    if (this.customLatLng.lat != null && this.customLatLng.lng != null) {
      // tslint:disable-next-line:prefer-const
      let nearestLocation = this.mapViewData['data'].locations.filter(x => x.nearestExchange === true);
      if (nearestLocation.length > 0) {
        this.latlng[0].lat = this.customLatLng.lat;
        this.latlng[0].lng = this.customLatLng.lng;
        this.latlng[1].lat = nearestLocation[0].latitude;
        this.latlng[1].lng = nearestLocation[0].longitude;
      } else {
        this.resetPolygonLine();
      }
    } else {
      this.resetPolygonLine();
    }

  }

  /** to add the pins based on color binding by backend. */
  setImage(data) {
    this.serviceMarker = data.map((cur) => {
      let pin;
      if (cur.nearestExchange) {
        pin = this.mapOptions['imagePins']['purple'];
      } else {
        pin = this.mapOptions['imagePins'][cur.color];
      }
      cur['url'] = { url: pin.icon + '.' + pin.type };
      return cur;
    });
  }


  /** On hover show tooltip */
  OnmouseOver(tooltip, markers) {
    if (markers.lastOpen != null) {
      markers.lastOpen.close();
    }
    markers.toolTipInfo.sttTableData.forEach(element => {
      if ((markers.nodeType === 'TIER1' || markers.nodeType === 'METRO') && element.titleTwo != null) {
        element.titleTwo = element.titleTwo + ': ' + markers.distance + 'km';
      } else if (markers.nodeType === 'DATACENTRES' && element.titleThree != null) {
        element.titleThree = element.titleThree + ': ' + markers.distance + 'km';
      }
    });
    this.markerDt = markers;
    markers.lastOpen = tooltip;
    tooltip.open();
  }

  /** remove tooltip */
  OnmouseOut(tooltip, markers) {
    this.markerDt = null;
    markers.toolTipInfo.sttTableData.forEach(element => {
      if ((markers.nodeType === 'TIER1' || markers.nodeType === 'METRO') && element.titleTwo != null) {
        element.titleTwo = element.titleTwo.replace(': ' + markers.distance + 'km', '');
      } else if (markers.nodeType === 'DATACENTRES' && element.titleThree != null) {
        element.titleThree = element.titleThree.replace(': ' + markers.distance + 'km', '');
      }
    });
    markers.lastOpen.close();
  }

  /** On click of marker to zoom map */
  markerClickInfo(tooltip, markers) {
    this.lat = this.mapOptions['lat'];
    this.lng = this.mapOptions['lng'];
    this.mapZoom = this.mapZoom + 10;
    if (markers.lastOpen != null) {
      markers.lastOpen.close();
    }
    this.markerDt = markers;
    markers.lastOpen = tooltip;
    tooltip.open();
  }

  /** to add pins by click */
  mapClicked($event: MouseEvent) {
    if (this.serviceMarker !== undefined) {
      const obj = {
        customMode: 'OnClickOnMap',
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        postcode: ''
      };
      this.addCustomMarker.emit(obj);
    }
  }

  /** Reset Polygon Line */
  resetPolygonLine() {
    this.latlng = [
      {
        lat: '',
        lng: ''
      },
      {
        lat: '',
        lng: ''
      }
    ];
  }

}
