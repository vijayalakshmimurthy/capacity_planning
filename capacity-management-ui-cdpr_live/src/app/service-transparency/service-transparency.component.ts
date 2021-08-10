import { MapService } from './../shared/services/map-service';
import { environment } from './../../environments/environment';
import { AppService } from './../shared/services/app-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
import { mapOptions } from '../shared/constants/app.constant';
import { AlertService } from '../shared/services/alert.service';
/** This is the parent component for the STT page. */
@Component({
  selector: 'app-service-transparency',
  templateUrl: './service-transparency.component.html',
  styleUrls: ['./service-transparency.component.scss'],
})

export class ServiceTransparencyComponent implements OnInit {
  /** All Local variable has defined here and viewChild statments are here. */
  allFilters = [];
  accordianhandle: true;
  csvData: string;
  fileName = '';
  /** Map response array */
  mapViewData = [];
  /** filters Array is Radius Filter */
  filters = [];
  mapOptions = mapOptions;
  /** to bind the search responsesearchData */
  searchData = {};
  /** Request object to call post api */
  requestObj = {
    capacity: [], nodeType: [], todPhaseEnabled: false, serviceType: '', mainpin: { lat: '', lng: '' },
    radius: [], searchFieldData: { searchType: '', searchString: '', searchEnable: false },
    ein: ''
  };
  /** Searcobj to search */
  searchobj = { serviceType: '', searchString: '', searchEnable: false };
  customLocationDrp = [
    { label: 'Post Code', value: 'postcode' },
    { label: 'Latitude & Longitude', value: 'latlng' }
  ];
  /** customLatLng is object for custom marker lat long */
  customLatLng = { lat: null, lng: null };
  /** searchLatLng is object for search box searched lat long */
  searchLatLng = { lat: null, lng: null };
  /** radiusCircleObj is object for circle lat long and radius */
  radiusCircleObj = { lat: '', lng: '', radius: [] };
  displayBasic = false;
  errorMsg = '';
  isRemoveMarker = false;
 /** mapClick object  */
  mapClick = { value: '', type: '' };
  /** Save filter to save the filters for save preference  */
  savedFilters = [];
  /** filterSiteNameSearch is a object which is having list of dropdown items */
  filterSiteNameSearch = [];
  /** success subject for success message into save preference */
  public success = new Subject<string>();
  /** danger subject for danger message save preference */
  public danger = new Subject<string>();
  successMessage: string;
  dangerMessage: string;
  /** Search Field Variable */
  searchfield = {
    data: '',
    description: '',
    type: ''
  };
  searchvalue = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};
  /**  Viewchild of autocomplete */
  @ViewChild(AutoComplete, { static: false })
  private autoComplete: AutoComplete;

  viewType = 'leftPanel';
  /** constructor to provide the AppService & MapService */
  constructor(private appService: AppService, private mapService: MapService, private alertService: AlertService) {
  }

  /** on init lifecycle to call get filters */
  ngOnInit() {
    this.getFilters();
  }

  /** Get filter Json */
  getFilters() {
    const url = './assets/json/filters.json';
    this.appService.get(url).subscribe(res => {
      this.allFilters = res['filters'];
      this.getSavedPreference();
    });
  }

  /** getting all marker data based on filter selection */
  getMarkerDataBasedOnFilters(event) {
    this.errorMsg = '';
       /** condition to check the servicetype */
    if (this.requestObj.serviceType !== 'Mobile Backhaul') {
      this.requestObj.todPhaseEnabled = null;
    }
    if (event.type === 'resetSearch') {
      this.requestObj.searchFieldData.searchString = '';
      this.requestObj.searchFieldData.searchType = '';
      this.requestObj.searchFieldData.searchEnable = false;
    } else if (event.type === 'markerChange') {
      this.requestObj.radius = [];
      this.requestObj.mainpin = this.customLatLng;
    } else if (event.type === 'removeMarker') {
      this.requestObj.radius = [];
      this.requestObj.mainpin = this.customLatLng;
    } else if (event.type === 'serviceType') {
      this.resetFilter(event);
    } else if (event.type === 'todPhaseEnabled') {
      if (!this.requestObj.todPhaseEnabled && this.requestObj.todPhaseEnabled == null) {
        this.requestObj.todPhaseEnabled = true;
      } else {
        this.requestObj.todPhaseEnabled = null;
      }
    } else if (event.type === 'nodeType') {
      if (this.requestObj.nodeType.indexOf(event.value) > -1) {
        this.requestObj.nodeType.splice(this.requestObj.nodeType.indexOf(event.value), 1);
      } else {
        this.requestObj.nodeType.push(event.value);
      }
    } else if (event.type === 'capacity') {
      if (this.requestObj.capacity.indexOf(event.value) > -1) {
        this.requestObj.capacity.splice(this.requestObj.capacity.indexOf(event.value), 1);
      } else {
        this.requestObj.capacity.push(event.value);
      }
    } else if (event.type === 'radius') {
      if (this.requestObj.radius.indexOf(event.value) > -1) {
        this.requestObj.radius.splice(this.requestObj.radius.indexOf(event.value), 1);
      } else {
        this.requestObj.radius.push(event.value);
      }
      this.bindCircleObj(event);
      if (this.searchvalue) {
        this.requestObj.mainpin = this.searchLatLng;
        this.requestObj.searchFieldData.searchEnable = true;
      } else {
        this.requestObj.mainpin = this.customLatLng;
      }
      this.requestObj.searchFieldData.searchString = '';
      this.requestObj.searchFieldData.searchType = '';
      this.mapOptions.mapZoom = 9;
    }
    if (this.requestObj.serviceType !== '') {

    }
    this.requestObj.ein = this.appService.getEIN();
    const url = environment.base_url + 'stt/service-transparency-tool/fetch-stt-tool-tip-data';
    this.appService.post(url, this.requestObj).subscribe(res => {
      if (this.searchvalue) {
        res['data'].locations.unshift(this.searchData['data'].locations[0]);
      }
      this.mapViewData = res;
      this.exportCSV('', '');
    });
  }

  /** export CSV file */
  exportCSV(searchString, searchType) {
    if (searchType !== '') {
      this.requestObj.searchFieldData.searchString = searchString;
      this.requestObj.searchFieldData.searchType = searchType;
      this.requestObj.searchFieldData.searchEnable = true;
    }
    const url = environment.base_url + 'stt/service-transparency-tool/export-stt-data';
    this.appService.post(url, this.requestObj).subscribe(res => {
      this.csvData = res.body.FileContent;
      this.fileName = res.body.FileName;
    });
  }

  /** info popup container */
  showBasicDialog() {
    this.displayBasic = true;
  }
  /** on event passing funtion for popup container */
  onDialogClose(event) {
    this.displayBasic = event;
 }
 /** to check the filter */
  filtercheck() {
    this.savedFilters = [];
    Object.keys(this.requestObj).forEach((key) => {
      if ((key === 'capacity' && this.requestObj[key].length > 0) || (key === 'nodeType' && this.requestObj[key].length > 0)) {
        this.requestObj[key].forEach(element => {
          this.savedFilters.push({ id: 1, filterName: key, filterValue: element });
        });
      } else if (key === 'todPhaseEnabled' && this.requestObj[key] === true) {
        this.savedFilters.push({ id: 1, filterName: key, filterValue: this.requestObj[key].toString() });
      } else if (key === 'serviceType') {
        this.savedFilters.push({ id: 1, filterName: key, filterValue: this.requestObj[key].toString() });
      }
    });
    this.savedFilters = JSON.parse(JSON.stringify(this.savedFilters));
  }


  /** Get Custom Filters */
  getCustomFilter(event) {
    this.filtercheck();
    this.mapClick = JSON.parse(JSON.stringify({ value: '', type: event.customMode }));
    this.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '', lng: '', radius: [] }));
    const obj = { value: '', type: 'markerChange' };
    this.getMarkerDataBasedOnFilters(obj);
    this.resetSearch();
    if (event.customMode === 'OnClickOnMap') {
      this.customLatLng.lat = event.lat;
      this.customLatLng.lng = event.lng;
      this.renderRadiusfilter();
      this.isRemoveMarker = true;
    }
    if (event.customMode === 'postcode') {
      this.getCustomLatLngBasedOnPostcode(event.postcode);
      this.isRemoveMarker = false;
    } else if (event.customMode === 'latlng') {
      this.customLatLng.lat = Number(event.lat);
      this.customLatLng.lng = Number(event.lng);
      this.renderRadiusfilter();
      this.isRemoveMarker = false;
    }
    this.mapOptions.mapZoom = 9;
  }

  /** get lat long based on postcode */
  getCustomLatLngBasedOnPostcode(postcode) {
    this.mapService.getLatLan(postcode).subscribe(data => {
      if (data.hasOwnProperty('lat') && data.hasOwnProperty('lng')) {
        this.errorMsg = '';
        this.customLatLng.lat = Number(data.lat);
        this.customLatLng.lng = Number(data.lng);
        this.renderRadiusfilter();
        this.mapOptions.mapZoom = 10;
      } else {
        this.errorMsg = 'Location not found';
      }
    });
  }



  /** render Radius filter */
  renderRadiusfilter() {
    if (!this.searchvalue) {
      this.mapOptions.mapZoom = 9;
      this.mapOptions.lat = Number(this.customLatLng.lat);
      this.mapOptions.lng = Number(this.customLatLng.lng);
      this.mapOptions = JSON.parse(JSON.stringify(this.mapOptions));
    }
    if (this.filters.filter(x => x.filterKey === 'radius').length === 0) {
      this.filters.push(this.allFilters.filter(x => x.filterKey === 'radius')[0]);
    }
    if (this.requestObj.serviceType !== 'Mobile Backhaul') {
      this.filters = this.filters.filter(x => x.filterKey !== 'todPhaseEnabled');
    }
    this.filters = JSON.parse(JSON.stringify(this.filters));


  }

  /** Create Circle object to bind circle on map */
  bindCircleObj(event) {
    const clr = this.allFilters.filter(x => x.filterKey === 'radius')[0]['values'].filter(x => x.value === event.value);
    if (this.radiusCircleObj.radius.findIndex(x => x.value === event.value) > -1) {
      this.radiusCircleObj.radius.splice(this.radiusCircleObj.radius.findIndex(x => x.value === event.value), 1);
    } else {
      this.radiusCircleObj.radius.push(clr[0]);
    }
    if (!this.searchvalue) {
      this.radiusCircleObj.lng = this.customLatLng.lng;
      this.radiusCircleObj.lat = this.customLatLng.lat;
    } else {
      this.radiusCircleObj.lng = this.searchLatLng.lng;
      this.radiusCircleObj.lat = this.searchLatLng.lat;
    }

  }

  /** Reset Filter */
  resetFilter(event) {
    this.requestObj.serviceType = event.value;
    this.requestObj.todPhaseEnabled = null;
    this.requestObj.nodeType.length = 0;
    this.requestObj.capacity.length = 0;
    this.requestObj.radius.length = 0;
    this.requestObj.mainpin.lng = '';
    this.requestObj.mainpin.lat = '';
    this.requestObj.searchFieldData.searchString = '';
    this.requestObj.searchFieldData.searchType = '';
    this.requestObj.searchFieldData.searchEnable = false;
    this.removeMarkerOnchangeServiceType(event);
    this.searchLatLng.lat = null;
    this.searchLatLng.lat = null;
    this.searchfield = { data: '', description: '', type: '' };
    this.searchobj = { serviceType: '', searchString: '', searchEnable: false };
    this.searchvalue = false;
  }

  /** To remove the marker from the servicetype change */
  removeMarkerOnchangeServiceType(event) {
    this.setMapDefaultOptions();
    this.removeCircleFromMap(event);
    this.isRemoveMarker = false;
    this.errorMsg = '';

  }

  /** to remove the circle from map */
  removeCircleFromMap(event) {
    if (this.requestObj.serviceType !== 'Mobile Backhaul') {
      this.filters = this.allFilters.filter(x => x.filterKey !== 'todPhaseEnabled' && x.filterKey !== 'radius');
    } else {
      this.filters = this.allFilters.filter(x => x.filterKey !== 'radius' );
    }
    this.filters = JSON.parse(JSON.stringify(this.filters));
    this.radiusCircleObj = JSON.parse(JSON.stringify({ lat: null, lng: null, radius: [] }));
    this.customLatLng = JSON.parse(JSON.stringify({ lat: null, lng: null }));
  }

  /** Remove Custom Marker */
  removeCustomMarker(event) {
    this.removeCircleFromMap(event);
    this.filtercheck();
    const obj = { value: '', type: 'removeMarker' };
    this.setMapDefaultOptions();
    this.getMarkerDataBasedOnFilters(obj);
    this.isRemoveMarker = false;
    this.errorMsg = '';
  }

  /** set default values for map */
  setMapDefaultOptions() {
    this.mapOptions = JSON.parse(JSON.stringify(mapOptions));
  }

  /** on typing in search get the all site name from the service */
  onKeyPressSiteCode(event) {
    // this.autoComplete.cd.detectChanges();
    const url = environment.base_url + 'stt/service-transparency-tool/search-sitename';
    this.searchobj.serviceType = this.requestObj.serviceType;
    this.searchobj.searchString = event.target.value;
    this.searchobj.searchEnable = true;
    this.appService.post(url, this.searchobj).subscribe(res => {
      if (res.hasOwnProperty('message')) {
        this.errorMsg = 'Search Site Not Found';
      } else {
        this.errorMsg = '';
        this.filterSiteNameSearch = res;
      }
    });
  }

  /** on click of search box get all siteName/1141 code */
  onFocusSiteName(event) {
    // this.autoComplete.cd.detectChanges();
    const url = environment.base_url + 'stt/service-transparency-tool/get-exchange-details';
    this.requestObj.searchFieldData.searchEnable = false;
    this.requestObj.searchFieldData.searchString = '';
    this.requestObj.searchFieldData.searchType = this.requestObj.serviceType;
    this.appService.post(url, this.requestObj).subscribe(res => {
      this.filterSiteNameSearch = res;
      this.autoComplete.show();
    });
  }

  /** On select sitename or 1141 code from search box */
  onSelect(event) {
    this.errorMsg = '';
    const url = environment.base_url + 'stt/service-transparency-tool/fetch-stt-tool-tip-data';
    this.requestObj.searchFieldData.searchString = event.data;
    this.requestObj.searchFieldData.searchType = event.type;
    this.requestObj.searchFieldData.searchEnable = true;
    if (this.requestObj.serviceType !== 'Mobile Backhaul') {
      this.requestObj.todPhaseEnabled = null;
    }
    this.appService.post(url, this.requestObj).subscribe(res => {
      if (res['data'].locations.length > 0) {
        res['data'].locations[0].searchFlag = true;
        this.searchvalue = true;
        this.filtercheck();

        this.searchLatLng.lat = res['data'].locations[0].latitude;
        this.searchLatLng.lng = res['data'].locations[0].longitude;
        this.customLatLng.lat = null;
        this.customLatLng.lng = null;
        this.mapOptions.lat = this.searchLatLng.lat;
        this.mapOptions.lng = this.searchLatLng.lng;
        this.mapOptions = JSON.parse(JSON.stringify(this.mapOptions));
        this.mapViewData = res;
        this.searchData = res;
        this.renderRadiusfilter();
        this.isRemoveMarker = false;
        this.exportCSV(event.data, event.type);
        const ele = document.querySelector('.clickHeader') as HTMLElement;
        setTimeout(() => {
          ele.click();
        }, 1000);
        // this.autoComplete.cd.detach();
        this.mapClick = JSON.parse(JSON.stringify({ value: '', type: 'selectSite' }));
      } else {
        this.errorMsg = 'Location not found';
      }
    });
  }

  /** reset Search Box */
  resetSearch() {
    this.setMapDefaultOptions();
    this.searchData = {};
    if (this.requestObj.serviceType !== 'Mobile Backhaul') {
      this.filters = this.filters.filter(x => x.filterKey !== 'todPhaseEnabled');
    }
    this.filtercheck();
    this.filters = this.filters.filter(x => x.filterKey !== 'radius');
    this.filters = JSON.parse(JSON.stringify(this.filters));
    this.searchvalue = false;
    this.requestObj.radius.length = 0;
    this.requestObj.mainpin.lng = '';
    this.requestObj.mainpin.lat = '';
    this.searchfield = { data: '', description: '', type: '' };
    this.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '', lng: '', radius: [] }));
    this.customLatLng = JSON.parse(JSON.stringify({ lat: null, lng: null }));
    const obj = { value: '', type: 'resetSearch' };
    this.getMarkerDataBasedOnFilters(obj);
  }

  /** save preference */
  onSavePreference() {
    const url = environment.base_url + 'stt/service-transparency-tool/save-preference';
    this.requestObj.ein = this.appService.getEIN();
    this.appService.post(url, this.requestObj).subscribe(res => {
      this.alertService.success(`Preference Saved`, this.options);
    }, () => {
      this.alertService.error(`Preference Not Saved`, this.options);
    });
  }

  /** get save preference data on page load */
  getSavedPreference() {
    const url = environment.base_url + 'stt/service-transparency-tool/stt-preferences?ein=' + this.appService.getEIN();
    this.appService.get(url).subscribe(res => {
      if (res.message !== 'Data not found for EIN') {
        Object.keys(this.requestObj).forEach((key) => {
          if (res['filterMasterResponse'].filter(x => x.filterName === key).length > 0) {
            if (typeof this.requestObj[key] === 'object') {
              this.requestObj[key] = res['filterMasterResponse'].filter(x => x.filterName === key).map(y => y.filterValue);
            } else if (typeof this.requestObj[key] === 'boolean') {
              const val = res['filterMasterResponse'].filter(x => x.filterName === key).map(y => y.filterValue)[0];
              this.requestObj[key] = Boolean(val);
              this.filters.unshift(this.allFilters.filter(x => x.filterKey === key)[0]);
            } else {
              this.requestObj[key] = res['filterMasterResponse'].filter(x => x.filterName === key).map(y => y.filterValue)[0];
            }
          }
        });
        if (res['filterMasterResponse'].filter(x => x.filterName === 'serviceType' && x.filterValue !== 'Mobile Backhaul').length > 0) {
          this.filters = this.allFilters.filter(x => x.filterKey !== 'todPhaseEnabled'  && x.filterKey !== 'radius');
        } else {
          this.filters = this.allFilters.filter(x => x.filterKey !== 'radius');
        }
        this.filters = JSON.parse(JSON.stringify(this.filters));
        this.requestObj.ein = this.appService.getEIN();
        this.savedFilters = res['filterMasterResponse'];
        this.mapViewData = res['dataResponse'];
        this.accordianhandle = true;
        this.exportCSV('', '');
      } else {
        this.filters = this.allFilters.filter(x => x.filterKey === 'serviceType');
        this.accordianhandle = true;
      }
    });
  }
}
