// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ServiceTransparencyComponent } from './service-transparency.component';
// import { environment } from '../../environments/environment';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { AccordionModule } from 'primeng/accordion';
// import { FormsModule } from '@angular/forms';
// import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InfoModalComponent } from './info-modal/info-modal.component';
// import { AppService } from '../shared/services/app-service';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { SharedModule } from '../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { of } from 'rxjs';

// describe('ServiceTransparencyComponent', () => {
//   let component: ServiceTransparencyComponent;
//   let fixture: ComponentFixture<ServiceTransparencyComponent>;
//   let service: AppService;
//   let httpTestingController: HttpTestingController;
//   // tslint:disable-next-line:prefer-const
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [AccordionModule, FormsModule, AutoCompleteModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
//       declarations: [ServiceTransparencyComponent, InfoModalComponent],
//       providers: [AppService],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//       .compileComponents();
//     service = TestBed.get(AppService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ServiceTransparencyComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   // it('should create', () => {
//   //   component.csvData = '';
//   //   component.fileName = '';
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should check function getFilters', () => {
//   //   spyOn(component, 'getFilters').and.callThrough();
//   //   component.allFilters = [
//   //     {
//   //       name: 'serviceType',
//   //       displayName: 'Service Type',
//   //       type: 'select',
//   //       values: [
//   //         {
//   //           label: 'H.E',
//   //           value: 'H.E'
//   //         },
//   //         {
//   //           label: 'Mobile Backhaul',
//   //           value: 'Mobile Backhaul'
//   //         },
//   //         {
//   //           label: 'ALL Ethernet',
//   //           value: 'ALL Ethernet'
//   //         }
//   //       ]
//   //     },
//   //   ];
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.getFilters();
//   //   expect(component.getFilters).toBeDefined();
//   // });
//   // it('should check function getMarkerDataBasedOnFilters mobilebackhaul', () => {
//   //   spyOn(component, 'getMarkerDataBasedOnFilters').and.callThrough();
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: ['1,2,3'], nodeType: ['METRO'], todPhaseEnabled: false, serviceType: 'Mobile Backhaul', mainpin: { lat: '54.3421', lng: '-1.20' },
//   //     radius: [], searchFieldData: { searchType: 'av', searchString: 'abc', searchEnable: false },
//   //     ein: '61234751'
//   //   };
//   //   component.getMarkerDataBasedOnFilters('Mobile Backhaul');
//   //   component.requestObj.todPhaseEnabled = null;
//   //   expect(component.getMarkerDataBasedOnFilters).toBeDefined();
//   // });
//   // it('should check function getMarkerDataBasedOnFilters H.E', () => {
//   //   spyOn(component, 'getMarkerDataBasedOnFilters').and.callThrough();
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: [], nodeType: [], todPhaseEnabled: false, serviceType: '', mainpin: { lat: '', lng: '' },
//   //     radius: [], searchFieldData: { searchType: '', searchString: '', searchEnable: false },
//   //     ein: '61234751'
//   //   };
//   //   component.getMarkerDataBasedOnFilters('H.E');
//   //   component.requestObj.todPhaseEnabled = null;
//   //   expect(component.getMarkerDataBasedOnFilters).toBeDefined();
//   // });
//   // it('should check function getMarkerDataBasedOnFilters reset search', () => {
//   //   spyOn(component, 'getMarkerDataBasedOnFilters').and.callThrough();
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: ['4'], nodeType: ['TIER1'], todPhaseEnabled: false, serviceType: 'H.E', mainpin: { lat: '54.23', lng: '-1.20' },
//   //     radius: [30], searchFieldData: { searchType: '', searchString: '', searchEnable: false },
//   //     ein: '61234751'
//   //   };
//   //   component.getMarkerDataBasedOnFilters('resetSearch');
//   //   component.requestObj.searchFieldData.searchString = '';
//   //   component.requestObj.searchFieldData.searchType = '';
//   //   component.requestObj.searchFieldData.searchEnable = false;
//   //   expect(component.getMarkerDataBasedOnFilters).toBeDefined();
//   // });
//   // it('should check function exportCSV', () => {
//   //   spyOn(component, 'exportCSV').and.callThrough();
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: ['4'], nodeType: ['TIER1'], todPhaseEnabled: false, serviceType: 'H.E', mainpin: { lat: '54.23', lng: '-1.20' },
//   //     radius: [30], searchFieldData: { searchType: 'ab', searchString: 'data', searchEnable: true },
//   //     ein: '61234751'
//   //   };
//   //   component.csvData = '"UEsDBBQACAgIAMB111AAAAAAAAAAAAAAAANNTwIxEL3zKza9mm3BgzGGhYMfRyURf8DYzrIN/UpbEP690wVNREwwhFM7eW/eezNpx9ONNdUa';
//   //   component.fileName = 'STT_Report.xlsx';
//   //   const userresponse = {

//   //     headers: {
//   //       ContentType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
//   //       ContentDisposition: ['attachment;filename=STT_Report.xlsx']
//   //     },
//   //     body: {
//   //       FileName: component.fileName ,
//   //       FileContent: component.csvData
//   //     },
//   //     statusCode: 'OK',
//   //     statusCodeValue: 200
//   //   };
//   //   component.exportCSV(component.requestObj.searchFieldData.searchString, component.requestObj.searchFieldData.searchType);
//   //   spyOn(service, 'post').and.returnValue(of(userresponse));
//   //   expect(component.exportCSV).toBeDefined();
//   // });
//   // it('should check function popup', () => {
//   //   spyOn(component, 'showBasicDialog').and.callThrough();
//   //   component.displayBasic = true;
//   //   component.showBasicDialog();
//   //   expect(component.showBasicDialog).toBeDefined();
//   // });
//   // it('should check function filtercheck capacity', () => {
//   //   spyOn(component, 'filtercheck').and.callThrough();
//   //   component.savedFilters = [];
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: ['4'], nodeType: ['TIER1'], todPhaseEnabled: false, serviceType: 'H.E', mainpin: { lat: '54.23', lng: '-1.20' },
//   //     radius: [30], searchFieldData: { searchType: 'ab', searchString: 'data', searchEnable: true },
//   //     ein: '61234751'
//   //   };
//   //   component.requestObj.capacity.length = 4;
//   //   component.filtercheck();
//   //   expect(component.filtercheck).toBeDefined();
//   // });
//   // it('should check function filtercheck tophase', () => {
//   //   spyOn(component, 'filtercheck').and.callThrough();
//   //   component.requestObj = {
//   //     // tslint:disable-next-line:max-line-length
//   //     capacity: ['4'], nodeType: ['TIER1'], todPhaseEnabled: false, serviceType: 'H.E', mainpin: { lat: '54.23', lng: '-1.20' },
//   //     radius: [30], searchFieldData: { searchType: 'ab', searchString: 'data', searchEnable: true },
//   //     ein: '61234751'
//   //   };
//   //   component.requestObj.todPhaseEnabled = true;
//   //   component.savedFilters = [
//   //     { id: 1, filterName: 'todPhaseEnabled', filterValue: 'todPhaseEnabled' }
//   //   ];
//   //   component.filtercheck();
//   //   expect(component.filtercheck).toBeDefined();
//   // });
//   // it('should check function getCustomFilter OnClickOnMap', () => {
//   //   spyOn(component, 'getCustomFilter').and.callThrough();
//   //   component.mapClick = JSON.parse(JSON.stringify({ value: '', type: 'OnClickOnMap' }));
//   //   component.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '54.32', lng: '-1.20', radius: [30] }));
//   //   component.getCustomFilter('OnClickOnMap');
//   //   component.customLatLng.lat = '54.32';
//   //   component.customLatLng.lng = '-1.20';
//   //   component.isRemoveMarker = true;
//   //   expect(component.getCustomFilter).toBeDefined();
//   // });
//   // it('should check function getCustomFilter postcode', () => {
//   //   spyOn(component, 'getCustomFilter').and.callThrough();
//   //   component.mapClick = JSON.parse(JSON.stringify({ value: '', type: 'postcode' }));
//   //   component.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '54.32', lng: '-1.20', radius: [30] }));
//   //   component.getCustomFilter(component.mapClick);
//   //   component.getCustomLatLngBasedOnPostcode('AB101AB');
//   //   component.isRemoveMarker = false;
//   //   expect(component.getCustomFilter).toBeDefined();
//   // });
//   // it('should check function getCustomFilter latlng', () => {
//   //   spyOn(component, 'getCustomFilter').and.callThrough();
//   //   component.mapClick = JSON.parse(JSON.stringify({ value: '', type: 'latlng' }));
//   //   component.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '54.32', lng: '-1.20', radius: [30] }));
//   //   component.getCustomFilter(component.mapClick);
//   //   component.customLatLng.lat = '54.32';
//   //   component.customLatLng.lng = '-1.20';
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.renderRadiusfilter();
//   //   component.isRemoveMarker = false;
//   //   expect(component.getCustomFilter).toBeDefined();
//   // });
//   // it('should check function renderRadiusfilter', () => {
//   //   spyOn(component, 'renderRadiusfilter').and.callThrough();
//   //   component.mapOptions.lat = 54.32;
//   //   component.mapOptions.lng = -1.20;
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.renderRadiusfilter();
//   //   expect(component.renderRadiusfilter).toBeDefined();
//   // });
//   // it('should check function bindCircleObj', () => {
//   //   spyOn(component, 'bindCircleObj').and.callThrough();
//   //   const clr = component.allFilters = [{
//   //     name: 'radius',
//   //     values: [
//   //       {
//   //         value: 25,
//   //       },
//   //     ]
//   //   }];
//   //   component.radiusCircleObj.lat = '54.32';
//   //   component.radiusCircleObj.lng = '-1.20';
//   //   component.bindCircleObj(clr[0]);
//   //   expect(component.bindCircleObj).toBeDefined();
//   // });
//   // it('should check function resetFilter', () => {
//   //   spyOn(component, 'resetFilter').and.callThrough();
//   //   component.requestObj.serviceType = 'H.E';
//   //   component.requestObj.todPhaseEnabled = null;
//   //   component.requestObj.nodeType.length = 0;
//   //   component.requestObj.capacity.length = 0;
//   //   component.requestObj.radius.length = 0;
//   //   component.requestObj.mainpin.lng = '';
//   //   component.requestObj.mainpin.lat = '';
//   //   component.requestObj.searchFieldData.searchString = '';
//   //   component.requestObj.searchFieldData.searchType = '';
//   //   component.requestObj.searchFieldData.searchEnable = false;
//   //   component.removeMarkerOnchangeServiceType('H.E');
//   //   component.searchLatLng.lat = null;
//   //   component.searchLatLng.lat = null;
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.searchfield = { data: '', description: '', type: '' };
//   //   component.searchobj = { serviceType: '', searchString: '', searchEnable: false };
//   //   component.searchvalue = false;
//   //   component.resetFilter('H.E');
//   //   expect(component.resetFilter).toBeDefined();
//   // });
//   // it('should check function removeCircleFromMap Mobile Backhaul', () => {
//   //   spyOn(component, 'removeCircleFromMap').and.callThrough();
//   //   component.requestObj.serviceType = 'Mobile Backhaul';
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.removeCircleFromMap('Mobile Backhaul');
//   //   expect(component.removeCircleFromMap).toBeDefined();
//   // });
//   // it('should check function removeCustomMarker', () => {
//   //   spyOn(component, 'removeCustomMarker').and.callThrough();
//   //   component.removeCircleFromMap(event);
//   //   component.filtercheck();
//   //   const obj = { value: '', type: 'removeMarker' };
//   //   component.setMapDefaultOptions();
//   //   component.getMarkerDataBasedOnFilters(obj);
//   //   component.isRemoveMarker = false;
//   //   component.errorMsg = '';
//   //   component.removeCustomMarker('removeMarker');
//   //   expect(component.removeCustomMarker).toBeDefined();
//   // });
//   // it('should check function setMapDefaultOptions', () => {
//   //   spyOn(component, 'setMapDefaultOptions').and.callThrough();
//   //   component.mapOptions = {
//   //     lat: 54.369209,
//   //     lng: -1.299906,
//   //     mapZoom: 7,
//   //     imagePins: {
//   //       green: {
//   //         icon: 'assets/images/Ellipse112_green',
//   //         type: 'png'
//   //       },
//   //       red: {
//   //         icon: 'assets/images/Ellipse117_red',
//   //         type: 'png'
//   //       },
//   //       Amber: {
//   //         icon: 'assets/images/Ellipse113_amber',
//   //         type: 'png'
//   //       },
//   //       orange: {
//   //         icon: 'assets/images/Ellipse113_amber',
//   //         type: 'png'
//   //       },
//   //       purple: {
//   //         icon: 'assets/images/purple-dot',
//   //         type: 'png'
//   //       }
//   //     }
//   //   };
//   //   component.setMapDefaultOptions();
//   //   expect(component.setMapDefaultOptions).toBeDefined();
//   // });
//   // it('should check function onKeyPressSiteCode', () => {
//   //   spyOn(component, 'onKeyPressSiteCode').and.callThrough();
//   //   const url = environment.base_url + 'stt/service-transparency-tool/search-sitename';
//   //   component.filterSiteNameSearch = [{ type: 'SiteName', data: 'ABERDEEN CENTRAL TE', description: 'ABERDEEN CENTRAL TE', message: null }];
//   //   component.searchobj.serviceType = 'ALL Ethernet';
//   //   component.searchobj.searchString = '';
//   //   component.searchobj.searchEnable = true;
//   //   component.onKeyPressSiteCode(component.searchobj);
//   //   spyOn(service, 'post').and.returnValue(of(component.filterSiteNameSearch));
//   //   expect(component.onKeyPressSiteCode).toBeDefined();
//   // });
//   // it('should check function onFocusSiteName', () => {
//   //   spyOn(component, 'onFocusSiteName').and.callThrough();
//   //   const url = environment.base_url + 'stt/service-transparency-tool/search-sitename';
//   //   component.filterSiteNameSearch = [{ type: 'SiteName', data: 'ABERDEEN CENTRA', description: 'ABERDEEN CENT', message: null }];
//   //   component.requestObj.searchFieldData.searchType = 'H.E';
//   //   component.requestObj.searchFieldData.searchString = '';
//   //   component.requestObj.searchFieldData.searchEnable = false;
//   //   component.onFocusSiteName(component.requestObj);
//   //   spyOn(service, 'post').and.returnValue(of(component.filterSiteNameSearch));
//   //   expect(component.onFocusSiteName).toBeDefined();
//   // });
//   // it('should check function onSelect', () => {
//   //   const url = environment.base_url + 'stt/service-transparency-tool/search-sitename';
//   //   component.requestObj.searchFieldData.searchType = 'H.E';
//   //   component.requestObj.searchFieldData.searchString = '';
//   //   component.requestObj.searchFieldData.searchEnable = true;
//   //   component.onSelect(component.requestObj);
//   //   component.searchLatLng.lat = 54.32;
//   //   component.searchLatLng.lng = -1.20;
//   //   component.customLatLng.lat = null;
//   //   component.customLatLng.lng = null;
//   //   component.mapOptions.lat = 54.32;
//   //   component.mapOptions.lng = -1.20;
//   //   component.mapOptions = {
//   //     lat: 54.369209,
//   //     lng: -1.299906,
//   //     mapZoom: 7,
//   //     imagePins: {
//   //       green: {
//   //         icon: 'assets/images/Ellipse112_green',
//   //         type: 'png'
//   //       },
//   //       red: {
//   //         icon: 'assets/images/Ellipse117_red',
//   //         type: 'png'
//   //       },
//   //       Amber: {
//   //         icon: 'assets/images/Ellipse113_amber',
//   //         type: 'png'
//   //       },
//   //       orange: {
//   //         icon: 'assets/images/Ellipse113_amber',
//   //         type: 'png'
//   //       },
//   //       purple: {
//   //         icon: 'assets/images/purple-dot',
//   //         type: 'png'
//   //       }
//   //     }
//   //   };
//   //   component.mapViewData = [{
//   //     id: 555,
//   //     latitude: 56.81895,
//   //     longitude: -5.109859,
//   //     color: 'red',
//   //     nodeType: 'TIER1',
//   //     nearestExchange: false,
//   //     distance: 0.0,
//   //     toolTipInfo: {
//   //       sttTableData: [{
//   //         titleOne: 'FORT WILLIAM(FW)-TIER1  Total Ports:0 /  Phase Ports:0 /  In-Build:0',
//   //         titleTwo: null,
//   //         titleThree: null,
//   //         titleFour: 'The Data is indication only and will be validated at order submission. Diversity groups are not currently displayed.',
//   //         toolTipheaders: {
//   //           headerOne: 'Service Types',
//   //           headerTwo: 'Total Services',
//   //           headerThree: 'Phase Services'
//   //         },
//   //         data: [{
//   //           cellOneData: 'EAD',
//   //           cellTwoData: '0',
//   //           cellThreeData: '0'
//   //         }, {
//   //           cellOneData: 'OSA',
//   //           cellTwoData: '0',
//   //           cellThreeData: '0'
//   //         }, {
//   //           cellOneData: 'OSA-FC',
//   //           cellTwoData: '0',
//   //           cellThreeData: '0'
//   //         }, {
//   //           cellOneData: 'Small Cells Hotel',
//   //           cellTwoData: '0',
//   //           cellThreeData: '0'
//   //         }, {
//   //           cellOneData: 'Etherway Exchange Connect',
//   //           cellTwoData: '0',
//   //           cellThreeData: '0'
//   //         }]
//   //       }]
//   //     }
//   //   }];
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.searchData = 'ABE';
//   //   component.renderRadiusfilter();
//   //   component.isRemoveMarker = false;
//   //   component.exportCSV(component.requestObj.searchFieldData.searchType, component.requestObj.searchFieldData.searchString);
//   //   spyOn(service, 'post').and.returnValue(of(component.mapOptions));
//   //   expect(component.onSelect).toBeDefined();
//   // });
//   // it('should check function resetSearch', () => {
//   //   spyOn(component, 'resetSearch').and.callThrough();
//   //   component.setMapDefaultOptions();
//   //   component.requestObj.serviceType = 'Mobile Backhaul';
//   //   component.filtercheck();
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.searchvalue = false;
//   //   component.requestObj.radius.length = 0;
//   //   component.requestObj.mainpin.lng = '';
//   //   component.requestObj.mainpin.lat = '';
//   //   component.searchfield = { data: '', description: '', type: '' };
//   //   component.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '54.32', lng: '-1.20', radius: [30] }));
//   //   component.customLatLng = { lat: null, lng: null };
//   //   const obj = { value: '', type: 'resetSearch' };
//   //   component.getMarkerDataBasedOnFilters(obj);
//   //   component.resetSearch();
//   //   expect(component.resetSearch).toBeDefined();
//   // });
//   // it('should check function resetSearch HE', () => {
//   //   spyOn(component, 'resetSearch').and.callThrough();
//   //   component.setMapDefaultOptions();
//   //   component.requestObj.serviceType = 'H.E';
//   //   component.filtercheck();
//   //   // component.otherFilters = [{ name: 'todPhaseEnabled' }];
//   //   component.searchvalue = false;
//   //   component.requestObj.radius.length = 0;
//   //   component.requestObj.mainpin.lng = '';
//   //   component.requestObj.mainpin.lat = '';
//   //   component.searchfield = { data: '', description: '', type: '' };
//   //   component.radiusCircleObj = JSON.parse(JSON.stringify({ lat: '54.32', lng: '-1.20', radius: [30] }));
//   //   component.customLatLng = {
//   //     lat: 54.24,
//   //     lng: -1.20
//   //   };
//   //   const obj = { value: '', type: 'resetSearch' };
//   //   component.getMarkerDataBasedOnFilters(obj);
//   //   component.resetSearch();
//   //   expect(component.resetSearch).toBeDefined();
//   // });
//   // it('should check function onSavePreference', () => {
//   //   spyOn(component, 'onSavePreference').and.callThrough();
//   //   component.requestObj.ein = '61264718';
//   //   component.onSavePreference();
//   //   expect(component.onSavePreference).toBeDefined();
//   // });
//   // it('should check function getSavedPreference', () => {
//   //   spyOn(component, 'getSavedPreference').and.callThrough();
//   //   component.requestObj.ein = '61264718';
//   //   const url = environment.base_url + 'stt/service-transparency-tool/stt-preferences?ein=' + component.requestObj.ein;
//   //   // component.otherFilters = [{ name: 'radius' }];
//   //   component.savedFilters = [{
//   //     id: 1,
//   //     filterName: 'serviceType',
//   //     filterValue: 'H.E'
//   //   }];
//   //   const mapViewData = {
//   //     message: 'Success',
//   //     locationCount: 108,
//   //     data: {
//   //       locations: [{
//   //         id: 1,
//   //         latitude: 57.143638,
//   //         longitude: -2.105667,
//   //         color: 'green',
//   //         nodeType: 'METRO',
//   //         nearestExchange: false,
//   //         distance: 0.0,
//   //         toolTipInfo: {
//   //           sttTableData: [{
//   //             titleOne: 'ABERDEEN CENTRAL TE(AB)-METRO  Total Ports:26 /  Phase Ports:0 /  In-Build:0',
//   //             titleTwo: null,
//   //             titleThree: null,
//   //             // tslint:disable-next-line:max-line-length
//   //             titleFour: 'The Data is indication only and will be validated at order submission. Diversity groups are not currently displayed.',
//   //             toolTipheaders: {
//   //               headerOne: 'Service Types',
//   //               headerTwo: 'Total Services',
//   //               headerThree: 'Phase Services'
//   //             },
//   //             data: [{
//   //               cellOneData: 'EAD',
//   //               cellTwoData: '14',
//   //               cellThreeData: '0'
//   //             }]
//   //           }]
//   //         }
//   //       }]
//   //     }
//   //   };
//   //   component.accordianhandle = true;
//   //   component.exportCSV('', '');
//   //   spyOn(service, 'post').and.returnValue(of(component.mapViewData));
//   //   component.getSavedPreference();
//   //   expect(component.getSavedPreference).toBeDefined();
//   // });
// });
