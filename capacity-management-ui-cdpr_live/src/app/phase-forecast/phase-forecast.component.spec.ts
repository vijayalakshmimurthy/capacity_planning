// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { PhaseForecastComponent } from './phase-forecast.component';
// import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { SharedModule } from '../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { TabViewModule } from 'primeng-lts/tabview';
// import { AppService } from '../shared/services/app-service';
// import { RouterTestingModule } from '@angular/router/testing';
// import { environment } from '../../environments/environment';
// import { Observable, of, throwError } from 'rxjs';
// import { editColumn, staticTable } from './phase-forecast-header.constant';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// describe('PhaseForecastComponent', () => {
//   let component: PhaseForecastComponent;
//   let fixture: ComponentFixture<PhaseForecastComponent>;
//   // tslint:disable-next-line:prefer-const
//   let service: AppService;
//   // tslint:disable-next-line:prefer-const
//   let httpTestingController: HttpTestingController;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [PhaseForecastComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       imports: [FormsModule, SharedModule, TabViewModule, HttpClientTestingModule, BrowserAnimationsModule,
//         RouterTestingModule.withRoutes([])],
//       providers: [AppService
//       ]
//     })
//       .compileComponents();
//     service = TestBed.get(AppService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(PhaseForecastComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should run #ngOnInit()', async () => {
//   //   component.ngOnInit();
//   // });
//   // it('should check function tabChange', () => {
//   //   spyOn(component, 'tabChange').and.callThrough();
//   //   const event = {
//   //     originalEvent: {
//   //       target: {
//   //         innerText: 'Phase Forecast Upload'
//   //       }
//   //     }
//   //   };
//   //   component.rows = [];
//   //   component.tableSettings.data = [];
//   //   component.tabChange(event);
//   //   expect(component.tabChange).toBeDefined();
//   // });
//   // it('should check function tabChange', () => {
//   //   spyOn(component, 'tabChange').and.callThrough();
//   //   const event = {
//   //     originalEvent: {
//   //       target: {
//   //         innerText: 'Manage Phase Forecast'
//   //       }
//   //     }
//   //   };
//   //   component.tabChange(event);
//   //   expect(component.tabChange).toBeDefined();
//   // });
//   // it('should check function uploadFileHeader', () => {
//   //   spyOn(component, 'uploadFileHeader').and.callThrough();
//   //   const url = environment.base_url + 'generic-header/grid-phascancel-header';
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   fixture.detectChanges();
//   //   spyOn(service, 'get').and.returnValue(of(component));
//   //   component.uploadFileHeader();
//   //   expect(component.uploadFileHeader).toHaveBeenCalled();
//   //   expect(component.uploadFileHeader).toBeDefined();
//   // });
//   // it('shoud check function modelOk', () => {
//   //   spyOn(component, 'modelOk').and.callThrough();
//   //   component.tableSettings.data.length = 0;
//   //   component.alertCancel = false;
//   //   component.uploadFileHeader();
//   //   component.showbutnRows = false;
//   //   component.addMode = true;
//   //   component.searchSite = true;
//   //   component.modelOk();
//   //   expect(component.modelOk).toBeDefined();
//   // });
//   // it('shoud check function closepopup', () => {
//   //   spyOn(component, 'closepopup').and.callThrough();
//   //   component.displayAddreport = false;
//   //   component.closepopup();
//   //   expect(component.closepopup).toHaveBeenCalled();
//   //   expect(component.closepopup).toBeDefined();
//   // });
//   // it('shoud check function modelCancel', () => {
//   //   spyOn(component, 'modelCancel').and.callThrough();
//   //   component.alertCancel = false;
//   //   component.modelCancel();
//   //   expect(component.modelCancel).toHaveBeenCalled();
//   //   expect(component.modelCancel).toBeDefined();
//   // });
//   // it('should check function addData', () => {
//   //   spyOn(component, 'addData').and.callThrough();
//   //   const headerValue = [{
//   //     child: [],
//   //     childType: true,
//   //     colour: '#333',
//   //     columnWidth: null,
//   //     dependendColumns: null,
//   //     deviceModel: null,
//   //     field: 'phasePlannedDate',
//   //     fixed: true,
//   //     header: 'Phase Planned Date',
//   //     id: 223,
//   //     link: null,
//   //     pageName: 'PHASEADD',
//   //     productName: null,
//   //     type: null,
//   //     values: [],
//   //     visible: true
//   //   }]
//   //   component.headerpush = headerValue;
//   //   component.tableSettings.headers = component.headerpush;
//   //   const event = {
//   //     id: component.increment,
//   //     code1141: '',
//   //     phaseForecastDate: '',
//   //     phasePlannedDate: '',
//   //     phaseStatus: '',
//   //     sauId: ' ',
//   //     siteName: '',
//   //     sneId: '',
//   //   };
//   //   component.tableSettings.data.push(event);
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.headers));
//   //   expect(component.addData).toBeDefined();
//   // });
//   // it('should check function addRows', () => {
//   //   spyOn(component, 'addRows').and.callThrough();
//   //   const event = [{
//   //     code1141: 'test',
//   //     id: 0,
//   //     phaseForecastDate: '27/11/2020',
//   //     phasePlannedDate: '27/11/2020',
//   //     phaseStatus: 'test',
//   //     sauId: 'test',
//   //     siteName: 'test',
//   //     sneId: 'test'
//   //   }];
//   //   component.checkedArray = event;
//   //   component.submitValue = true;
//   //   expect(component.addRows).toBeDefined();
//   // });
//   // it('should check function onkeyPressSearchBox with success response', () => {
//   //   spyOn(component, 'onKeyPressSearchBox').and.callThrough();
//   //   const event = {
//   //     target: {
//   //       value: 'AA'
//   //     }
//   //   };
//   //   const filterData = ['ABERDARE'];
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   spyOn(service, 'get').and.returnValue(of(filterData));
//   //   component.onKeyPressSearchBox(event);
//   //   fixture.detectChanges();
//   //   expect(component.onKeyPressSearchBox).toHaveBeenCalled();
//   //   expect(component.filterData).toEqual(filterData);
//   // });
//   // it('should check function onkeyPressSearchBox with error response', () => {
//   //   spyOn(component, 'onKeyPressSearchBox').and.callThrough();
//   //   const event = null;
//   //   component.tableSettings.data = [];
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
//   //   component.onKeyPressSearchBox(event);
//   //   fixture.detectChanges();
//   //   expect(component.onKeyPressSearchBox).toHaveBeenCalled();
//   //   expect(component.tableSettings.data).toEqual(component.tableSettings.data);
//   // });
//   // it('should check function submitRecord', () => {
//   //   spyOn(component, 'submitRecord').and.callThrough();
//   //   component.successsfullysubmitted = true;
//   //   component.displayAddreport = true;
//   //   component.successsfullysubmitted = true;
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   component.updatedRowObj = [];
//   //   spyOn(service, 'post').and.returnValue(of(component.successsfullysubmitted));
//   //   component.submitRecord();
//   //   expect(component.submitRecord).toHaveBeenCalled();
//   //   expect(component.submitRecord).toBeDefined();
//   // });
//   // it('should check function submitRecord', () => {
//   //   spyOn(component, 'submitRecord').and.callThrough();
//   //   component.tableSettings.data = [];
//   //   component.addMessage = 'Successfully Added';
//   //   spyOn(service, 'post').and.returnValue(of(component));
//   //   component.submitRecord();
//   //   expect(component.submitRecord).toHaveBeenCalled();
//   //   expect(component.submitRecord).toBeDefined();
//   // });
//   // it('should check function submitRecord', () => {
//   //   spyOn(component, 'submitRecord').and.callThrough();
//   //   const userResponse1 = [{
//   //     code1141: 's',
//   //     id: 1,
//   //     message: 'Invalid SNE_ID',
//   //     phaseForecastDate: '27/11/2020',
//   //     phasePlannedDate: '27/11/2020',
//   //     phaseStatus: 's',
//   //     sauId: 's',
//   //     siteName: 's',
//   //     sneId: 's'
//   //   }];
//   //   component.tableSettings.data = [];
//   //   component.tableSettings.data = userResponse1;
//   //   component.submitValue = true;
//   //   spyOn(service, 'post').and.returnValue(of(component.tableSettings.data));
//   //   component.submitRecord();
//   //   expect(component.submitRecord).toHaveBeenCalled();
//   //   expect(component.submitRecord).toBeDefined();
//   // });
//   // it('should check function submitMessage', () => {
//   //   spyOn(component, 'submitMessage').and.callThrough();
//   //   const headerData = [{
//   //     child: [],
//   //     childType: true,
//   //     colour: '#333',
//   //     columnWidth: '50px',
//   //     dependendColumns: null,
//   //     deviceModel: null,
//   //     field: 'all',
//   //     fixed: false,
//   //     header: 'ALL',
//   //     id: 217,
//   //     link: null,
//   //     pageName: 'PHASEADD',
//   //     productName: null,
//   //     type: 'text',
//   //     values: [],
//   //     visible: true
//   //   }];
//   //   component.tableSettings.headers = [];
//   //   component.rows = headerData;
//   //   component.tableSettings.headers = JSON.parse(JSON.stringify(component.rows));
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.headers));
//   //   component.submitMessage();
//   //   expect(component.submitMessage).toHaveBeenCalled();
//   //   expect(component.submitMessage).toBeDefined();
//   // });
//   // it('should check function onSelectSearch', () => {
//   //   spyOn(component, 'onSelectSearch').and.callThrough();
//   //   component.updateColumnsOfTable('static');
//   //   const event = 'YAIOF';
//   //   const userresponse = [{
//   //     code1141: 'AA',
//   //     creationDate: '21/10/2020',
//   //     id: 62456,
//   //     phaseForecastDate: '22/01/2021',
//   //     phasePlannedDate: '14/08/2020',
//   //     phaseStatus: 'status',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: 'cdsdfh'
//   //   }];
//   //   component.tableSettings.data = userresponse;
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   spyOn(service, 'get').and.returnValue(of(userresponse));
//   //   component.onSelectSearch(userresponse);
//   //   expect(component.onSelectSearch).toHaveBeenCalled();
//   //   expect(component.onSelectSearch).toBeDefined();
//   // });
//   // it('should check function onSelectSearch', () => {
//   //   spyOn(component, 'onSelectSearch').and.callThrough();
//   //   component.tableSettings.data = [];
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
//   //   component.onSelectSearch(component.tableSettings.data);
//   //   expect(component.onSelectSearch).toHaveBeenCalled();
//   //   expect(component.onSelectSearch).toBeDefined();
//   // });
//   // it('should check function deleteRow Popup', () => {
//   //   spyOn(component, 'deleteRow').and.callThrough();
//   //   component.displayBasic = true;
//   //   component.popupType = '30vw';
//   //   const deleteobj = 412856;
//   //   component.deleteRow(deleteobj);
//   //   expect(component.deleteRow).toBeDefined();
//   // });
//   // it('should check function modelCancel', () => {
//   //   spyOn(component, 'modelCancel').and.callThrough();
//   //   const event = '';
//   //   component.popupType = '';
//   //   component.displayBasic = false;
//   //   component.rowForDelete = null;
//   //   component.modelCancel();
//   //   expect(component.modelCancel).toBeDefined();
//   // });
//   // it('should check function deleteCancel', () => {
//   //   spyOn(component, 'deleteCancel').and.callThrough();
//   //   component.deletePopup = false;
//   //   component.deleteCancel();
//   //   expect(component.deleteCancel).toHaveBeenCalled();
//   //   expect(component.deleteCancel).toBeDefined();
//   // });
//   // it('should check function updateColumnsOfTable', () => {
//   //   spyOn(component, 'updateColumnsOfTable').and.callThrough();
//   //   if (component.type === 'edit') {
//   //     component.columns = editColumn;
//   //   } else if (component.type === 'static') {
//   //     component.columns = staticTable;
//   //   }
//   //   component.bindTableProperties(component.type);
//   //   expect(component.updateColumnsOfTable).toBeDefined();
//   // });
//   // it('should check function uploadCancelModel', () => {
//   //   spyOn(component, 'uploadCancelModel').and.callThrough();
//   //   component.displayBasic = false;
//   //   component.uploadCancelModel();
//   //   expect(component.uploadCancelModel).toHaveBeenCalled();
//   //   expect(component.uploadCancelModel).toBeDefined();
//   // });
//   // it('should check function OnResetSearchInput', () => {
//   //   spyOn(component, 'OnResetSearchInput').and.callThrough();
//   //   const event = '';
//   //   component.OnResetSearchInput(event);
//   //   component.tableSettings.data = [];
//   //   component.addMode = true;
//   //   expect(component.OnResetSearchInput).toBeDefined();
//   // });
//   // it('should check function deleteOk', () => {
//   //   spyOn(component, 'deleteOk').and.callThrough();
//   //   component.displayBasic = false;
//   //   component.popupType = '';
//   //   component.rowForDelete = 93917;
//   //   const url = environment.base_url + 'phase-forecast/delete-info?id=' + component.rowForDelete;
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   fixture.detectChanges();
//   //   spyOn(service, 'delete').and.returnValue(of(''));
//   //   component.deleteOk();
//   //   expect(component.deleteOk).toBeDefined();
//   // });
//   // it('should check function deleteRow', () => {
//   //   spyOn(component, 'deleteRow').and.callThrough();
//   //   const event = 158666;
//   //   component.deleteRow(event);
//   //   component.deletePopup = true;
//   //   expect(component.deleteRow).toBeDefined();
//   // });
//   // it('should check function updateRow', () => {
//   //   spyOn(component, 'updateRow').and.callThrough();
//   //   const event = null;
//   //   component.displayBasic = false;
//   //   component.popupType = '';
//   //   component.updateRow(event);
//   //   expect(component.updateRow).toHaveBeenCalled();
//   //   expect(component.updateRow).toBeDefined();
//   // });
//   // it('should check function updateRow', () => {
//   //   spyOn(component, 'updateRow').and.callThrough();
//   //   const event = [{
//   //     code1141: 'AA',
//   //     creationDate: '16/10/2020',
//   //     id: 130399,
//   //     phaseForecastDate: '30/10/2020',
//   //     phasePlannedDate: '',
//   //     phaseStatus: '',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: '20391115'
//   //   }];
//   //   component.updateRow(event);
//   //   component.updatedRowObj = event;
//   //   component.updatedRowObj.push(component.updatedRowObj);
//   //   expect(component.updateRow).toBeDefined();
//   // });
//   // it('should check function updateRow', () => {
//   //   spyOn(component, 'updateRow').and.callThrough();
//   //   const event = [{
//   //     code1141: 'AA',
//   //     creationDate: '16/10/2020',
//   //     id: 130399,
//   //     phaseForecastDate: '30/10/2020',
//   //     phasePlannedDate: '',
//   //     phaseStatus: '',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: '20391115'
//   //   }];
//   //   component.showbutnRows = true;
//   //   component.updateRow(event);
//   //   component.updateBoolean = false;
//   //   component.cancelBoolean = false;
//   //   expect(component.updateRow).toHaveBeenCalled();
//   //   expect(component.updateRow).toBeDefined();
//   // });
//   // it('should check function updateRecord with error message', () => {
//   //   spyOn(component, 'updateRecord').and.callThrough();
//   //   const event = [{
//   //     code1141: 'AA',
//   //     creationDate: '16/10/2020',
//   //     id: 130399,
//   //     phaseForecastDate: '30/10/2020',
//   //     phasePlannedDate: '',
//   //     phaseStatus: '',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: '20391115'
//   //   }];
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   component.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(component.rowUpdatedSuccessfully));
//   //   spyOn(service, 'post').and.returnValue(of(event));
//   //   fixture.detectChanges();
//   //   expect(component.updateRecord).toBeDefined();
//   // });
//   // it('should check function updateRecord', () => {
//   //   spyOn(component, 'updateRecord').and.callThrough();
//   //   component.updatedRowObj = [{
//   //     code1141: 'AA',
//   //     creationDate: '16/10/2020',
//   //     id: 130399,
//   //     phaseForecastDate: '30/10/2020',
//   //     phasePlannedDate: '',
//   //     phaseStatus: '',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: '20391115'
//   //   }];
//   //   const url = environment.base_url + 'phase-forecast/update-info';
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   fixture.detectChanges();
//   //   spyOn(service, 'post').and.returnValue(of(component.updatedRowObj));
//   //   component.displayBasic = false;
//   //   component.popupType = '';
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   component.updateRecord();
//   //   expect(component.updateRecord).toBeDefined();
//   // });
//   // it('should check function onManageSearchData', () => {
//   //   spyOn(component, 'onManageSearchData').and.callThrough();
//   //   const userresponse = [{
//   //     code1141: 'AA',
//   //     creationDate: '14/10/2020',
//   //     id: 62456,
//   //     phaseForecastDate: '26/01/2021',
//   //     phasePlannedDate: '14/08/2020',
//   //     phaseStatus: 'status',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: 'cdsdfh'
//   //   }];
//   //   component.tableSettings.data = userresponse;
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
//   //   component.onManageSearchData(component.tableSettings.data);
//   //   expect(component.onManageSearchData).toHaveBeenCalled();
//   //   expect(component.onManageSearchData).toBeDefined();
//   // });
//   // it('should check function onManageSearchData', () => {
//   //   spyOn(component, 'onManageSearchData').and.callThrough();
//   //   component.tableSettings.data = [];
//   //   component.noRecordError = true;
//   //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
//   //   component.onManageSearchData(component.tableSettings.data);
//   //   expect(component.onManageSearchData).toHaveBeenCalled();
//   //   expect(component.onManageSearchData).toBeDefined();
//   // });
//   // it('should check function cancelRows', () => {
//   //   spyOn(component, 'cancelRows').and.callThrough();
//   //   component.alertCancel = true;
//   //   component.cancelRows();
//   //   expect(component.cancelRows).toHaveBeenCalled();
//   //   expect(component.cancelRows).toBeDefined();
//   // });
//   // it('should check function cancelRecord', () => {
//   //   spyOn(component, 'cancelRecord').and.callThrough();
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   component.updateBoolean = false;
//   //   component.cancelBoolean = false;
//   //   component.tableSettings.data = component.singleselectjson;
//   //   component.rowUpdatedSuccessfully.updated = true;
//   //   component.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(component.rowUpdatedSuccessfully));
//   //   component.cancelRecord();
//   //   expect(component.cancelRecord).toHaveBeenCalled();
//   //   expect(component.cancelRecord).toBeDefined();
//   // });
//   // it('should check function uploadFileHeaderMessage', () => {
//   //   spyOn(component, 'uploadFileHeaderMessage').and.callThrough();
//   //   const userresponse = {
//   //     code1141: 'AA',
//   //     creationDate: '14/10/2020',
//   //     id: 62456,
//   //     phaseForecastDate: '26/01/2021',
//   //     phasePlannedDate: '14/08/2020',
//   //     phaseStatus: 'status',
//   //     sauId: 'NSLNG',
//   //     siteName: 'ABERDEEN CENTRAL TE',
//   //     sneId: 'cdsdfh'
//   //   };
//   //   spyOn(service, 'get').and.returnValue(of(userresponse));
//   //   component.uploadFileHeaderMessage();
//   //   expect(component.uploadFileHeaderMessage).toHaveBeenCalled();
//   //   expect(component.uploadFileHeaderMessage).toBeDefined();
//   // });
//   // it('should check function submitfile', () => {
//   //   spyOn(component, 'submitfile').and.callThrough();
//   //   // tslint:disable-next-line:max-line-length
//   //   const event = {
//   //     name: 'Phaseforecast.xlsx',
//   //     lastModified: 1597066975868,
//   //     lastModifiedDate: 'Mon Aug 10 2020 19:12:55 GMT+0530 (India Standard Time)',
//   //     size: 80140,
//   //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   //   };
//   //   const userresponse = {
//   //     status: true,
//   //     invalidPhaseForecastRecords: [{
//   //       code1141: 'SDCHCHS',
//   //       id: 1,
//   //       message: 'Invalid SNE_ID/PhaseForecastDate',
//   //       phaseForecastDate: null,
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'CHA',
//   //       siteName: 'CHICHESTER',
//   //       sneId: null
//   //     }],
//   //     validPhaseForecastRecords: [{
//   //       code1141: 'OM/K',
//   //       id: null,
//   //       message: null,
//   //       phaseForecastDate: '31/07/2020',
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'azsxdc',
//   //       siteName: 'CVBNMX',
//   //       sneId: '613175'
//   //     }]
//   //   };
//   //   component.displayBasic = true;
//   //   component.popupType = '50vw';
//   //   spyOn(service, 'postFile').and.returnValue(of(userresponse));
//   //   component.submitfile(event);
//   //   expect(component.submitfile).toHaveBeenCalled();
//   //   expect(component.submitfile).toBeDefined();
//   // });
//   // it('should check function submitfile', () => {
//   //   spyOn(component, 'submitfile').and.callThrough();
//   //   // tslint:disable-next-line:max-line-length
//   //   const event = {
//   //     name: 'Phaseforecast.xlsx',
//   //     lastModified: 1597066975868,
//   //     lastModifiedDate: 'Mon Aug 10 2020 19:12:55 GMT+0530 (India Standard Time)',
//   //     size: 80140,
//   //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   //   };
//   //   const userresponse = {
//   //     status: true,
//   //     invalidPhaseForecastRecords: [{
//   //       code1141: 'SDCHCHS',
//   //       id: 1,
//   //       message: 'Invalid SNE_ID/PhaseForecastDate',
//   //       phaseForecastDate: null,
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'CHA',
//   //       siteName: 'CHICHESTER',
//   //       sneId: null
//   //     }],
//   //     validPhaseForecastRecords: [{
//   //       code1141: 'OM/K',
//   //       id: null,
//   //       message: null,
//   //       phaseForecastDate: '31/07/2020',
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'azsxdc',
//   //       siteName: 'CVBNMX',
//   //       sneId: '613175'
//   //     }]
//   //   };
//   //   component.exceptionboolean = true;
//   //   component.exceptionmsg = 'Failed to uploaded';
//   //   component.fileMessage = '';
//   //   spyOn(service, 'postFile').and.returnValue(of(userresponse));
//   //   component.submitfile(event);
//   //   expect(component.submitfile).toHaveBeenCalled();
//   //   expect(component.submitfile).toBeDefined();
//   // });
//   // it('should check function submitfile', () => {
//   //   spyOn(component, 'submitfile').and.callThrough();
//   //   // tslint:disable-next-line:max-line-length
//   //   const event = {
//   //     name: 'Phaseforecast.xlsx',
//   //     lastModified: 1597066975868,
//   //     lastModifiedDate: 'Mon Aug 10 2020 19:12:55 GMT+0530 (India Standard Time)',
//   //     size: 80140,
//   //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   //   };
//   //   const userresponse = {
//   //     status: true,
//   //     invalidPhaseForecastRecords: [{
//   //       code1141: 'SDCHCHS',
//   //       id: 1,
//   //       message: 'Invalid SNE_ID/PhaseForecastDate',
//   //       phaseForecastDate: null,
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'CHA',
//   //       siteName: 'CHICHESTER',
//   //       sneId: null
//   //     }],
//   //     validPhaseForecastRecords: [{
//   //       code1141: 'OM/K',
//   //       id: null,
//   //       message: null,
//   //       phaseForecastDate: '31/07/2020',
//   //       phasePlannedDate: null,
//   //       phaseStatus: null,
//   //       sauId: 'azsxdc',
//   //       siteName: 'CVBNMX',
//   //       sneId: '613175'
//   //     }]
//   //   };
//   //   component.errorRecord = 48;
//   //   component.fileMessage = '';
//   //   spyOn(service, 'postFile').and.returnValue(of(userresponse));
//   //   component.submitfile(event);
//   //   expect(component.submitfile).toBeDefined();
//   // });
//   // it('should check function fileUploadCancel', () => {
//   //   spyOn(component, 'fileUploadCancel').and.callThrough();
//   //   component.displayBasic = false;
//   //   component.tableSettings.data = [];
//   //   component.tableSettings.headers = [];
//   //   component.failedSiteName = false;
//   //   component.successSiteName = false;
//   //   component.fileCancel = 'file cancel';
//   //   expect(component.fileUploadCancel).toBeDefined();
//   // });
//   // it('should check function showSucessresult', () => {
//   //   spyOn(component, 'showSucessresult').and.callThrough();
//   //   component.failedSiteName = true;
//   //   component.successSiteName = false;
//   //   component.tableminheight = '';
//   //   component.displayBasic = false;
//   //   component.uploadFileHeader();
//   //   const userresponse = [{
//   //     code1141: 'SDCHCHS',
//   //     id: 1,
//   //     message: 'Invalid SNE_ID/PhaseForecastDate',
//   //     phaseForecastDate: null,
//   //     phasePlannedDate: null,
//   //     phaseStatus: null,
//   //     sauId: 'CHA',
//   //     siteName: 'CHICHESTER',
//   //     sneId: null
//   //   }];
//   //   component.rows = userresponse;
//   //   component.tableSettings.data = JSON.parse(JSON.stringify(component.rows));
//   //   expect(component.showSucessresult).toBeDefined();
//   // });
//   // it('should check function showFailedresult', () => {
//   //   spyOn(component, 'showFailedresult').and.callThrough();
//   //   component.successSiteName = true;
//   //   component.failedSiteName = false;
//   //   component.displayBasic = false;
//   //   const userresponse = [{
//   //     code1141: 'SDCHCHS',
//   //     id: 1,
//   //     message: 'Invalid SNE_ID/PhaseForecastDate',
//   //     phaseForecastDate: null,
//   //     phasePlannedDate: null,
//   //     phaseStatus: null,
//   //     sauId: 'CHA',
//   //     siteName: 'CHICHESTER',
//   //     sneId: null
//   //   }];
//   //   component.rows = userresponse;
//   //   component.tableSettings.data = JSON.parse(JSON.stringify(component.rows));
//   //   expect(component.showFailedresult).toBeDefined();
//   // });
//   // it('should check function submitUploadFile', () => {
//   //   spyOn(component, 'submitUploadFile').and.callThrough();
//   //   const userresponse = [{
//   //     code1141: 'BS/G',
//   //     id: null,
//   //     message: null,
//   //     phaseForecastDate: '28/07/2020',
//   //     phasePlannedDate: null,
//   //     phaseStatus: null,
//   //     sauId: 'SSNOR',
//   //     siteName: 'BRISTOL NORTH 1ST FLR',
//   //     sneId: '577732'
//   //     }];
//   //   component.failedSiteName = false;
//   //   component.successSiteName = false;
//   //   component.tableSettings.data = [];
//   //   component.tableSettings.headers = [];
//   //   component.fileCancel = 'file cancel';
//   //   spyOn(service, 'post').and.returnValue(of(userresponse));
//   //   expect(component.submitUploadFile).toBeDefined();
//   // });
// });
