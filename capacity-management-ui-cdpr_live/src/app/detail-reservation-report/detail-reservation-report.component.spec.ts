import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailReservationReportComponent } from './detail-reservation-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../shared/services/app-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
describe('DetailReservationReportComponent', () => {
  let component: DetailReservationReportComponent;
  let fixture: ComponentFixture<DetailReservationReportComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [DetailReservationReportComponent],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  // it('Should check getTableHeader', () => {
  //   spyOn(component, 'getTableHeader').and.callThrough();
  //   const dsrHeaderUrl = environment.base_url + 'generic-header/grid-drr-header';
  // });
  // it('Should check getTable', () => {
  //   component.noRecordError = false;
  //   spyOn(component, 'getTable').and.callThrough();
  //   component.pageData = {
  //     globalSearchData: [], siteName: [], code1141: [], sneId: [], portId: [], portSpeed: [], cardModel: [],
  //     reservationDate: [], reservedBy: [], expiryDate: [], sortByField: 'siteName', sortOrder: 'asc', pageNo: 1, pageSize: 100
  //   };
  //   //const urls = environment.base_url + 'detailed-reservation-report/reservation-report-data?ein=' + this.appService.getEIN();
  //   const userresponse = {
  //     record: {
  //       totalPages: 144,
  //       totalRecords: 11302
  //     },
  //     reservationDataList: [{
  //       actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=4/port=1',
  //       cardModel: 'HSQ',
  //       code: 'ABW',
  //       id: 0,
  //       notes: 'as',
  //       portId: '4/1/4/1',
  //       portSpeed: '10GigE',
  //       reservationDate: '06/04/2020',
  //       reservationExpiryDate: '22/10/2020',
  //       reservedBy: '609542383 ',
  //       siteName: 'ABERCONWY GWYNEDD',
  //       sneId: '20881233'

  //     }]
  //   };
  //   spyOn(service, 'post').and.returnValue(of(userresponse.reservationDataList));
  //   component.getTable();
  //   expect(component.getTable).toHaveBeenCalled();
  //   expect(component.getTable).toBeDefined();
  // });
  // it('Should check getTable', () => {
  //   spyOn(component, 'getTable').and.callThrough();
  //   component.tableSettings.data = [];
  //   component.noRecordError = true;
  //   spyOn(service, 'post').and.returnValue(of(component.tableSettings.data));
  //   component.getTable();
  //   expect(component.getTable).toHaveBeenCalled();
  //   expect(component.getTable).toBeDefined();
  // });
  // it('should check function getDataBySiteName', () => {
  //   spyOn(component, 'getDataBySiteName').and.callThrough();
  //   //const url = environment.base_url + 'detailed-reservation-report/reservation-report-data?ein=' + this.appService.getEIN();
  //   component.pageData = {
  //     globalSearchData: ['AA'], siteName: [], code1141: [], sneId: [], portId: [], portSpeed: [], cardModel: [],
  //     reservationDate: [], reservedBy: [], expiryDate: [], sortByField: 'siteName', sortOrder: 'asc', pageNo: 1, pageSize: 100
  //   };
  //   const userresponse = {
  //     record: {
  //       totalPages: 1,
  //       totalRecords: 20
  //     },
  //     reservationDataList: [{
  //       actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=4/port=1',
  //       cardModel: 'HSQ',
  //       code: 'ABW',
  //       id: 0,
  //       notes: 'as',
  //       portId: '4/1/4/1',
  //       portSpeed: '10GigE',
  //       reservationDate: '06/04/2020',
  //       reservationExpiryDate: '22/10/2020',
  //       reservedBy: '609542383 ',
  //       siteName: 'ABERCONWY GWYNEDD',
  //       sneId: '20881233'
  //     }]
  //   };
  //   component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  //   spyOn(service, 'post').and.returnValue(of(userresponse.reservationDataList));
  //   component.pageData.globalSearchData = [];
  //   expect(component.getDataBySiteName).toBeDefined();

  // });
  // it('should check function getSelectedPageNo', () => {
  //   spyOn(component, 'getSelectedPageNo').and.callThrough();
  //   const event = { page: 0 };
  //   component.getSelectedPageNo('a');
  //   expect(component.getSelectedPageNo).toBeDefined();
  // });
  // it('should check function getlistRowSelect', () => {
  //   spyOn(component, 'getlistRowSelect').and.callThrough();
  //   const event = { target: { value: 100 } };
  //   component.getlistRowSelect(event);
  //   expect(component.getlistRowSelect).toBeDefined();
  // });
  // it('should check function onkeyPressSearch with success response', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'AA'
  //     }
  //   };
  //   const filterData = ['ABERDARE'];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(filterData));
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  //   expect(component.filterData).toEqual(filterData);
  // });
  // it('should check function onkeyPressSearch with error response', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'AA'
  //     }
  //   };
  //   const filterData = [];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(component.filterData));
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  //   expect(component.filterData).toEqual(filterData);
  // });
  // it('should check function cancelOpenSearch', () => {
  //   spyOn(component, 'cancelOpenSearch').and.callThrough();
  //   const headerData = [{
  //     child: [],
  //     childType: true,
  //     colour: '#333',
  //     columnWidth: '237px',
  //     dependendColumns: null,
  //     deviceModel: null,
  //     field: 'expiryDate',
  //     fixed: true,
  //     header: 'Reservation Expiry Date',
  //     id: 270,
  //     link: null,
  //     pageName: 'DRR',
  //     productName: null,
  //     type: null,
  //     values: [],
  //     visible: true
  //   }]
  //   component.extendButton = true;
  //   component.tableSettings.editkey = 'no';
  //   const len = 14;
  //   component.headerpush = headerData;
  //   component.tableSettings.headers = headerData;
  //   component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  //   expect(component.cancelOpenSearch).toBeDefined();

  // });
  // it('should check function setExpiryDateColumnValue', () => {
  //   spyOn(component, 'setExpiryDateColumnValue').and.callThrough();
  //   component.expiryDateDetatils = ['23/10/2020'];
  //   const event = [{
  //     actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=10/port=1',
  //     cardModel: 'I/O Module',
  //     code1141: 'ABW',
  //     cuf: '',
  //     expiryDate: '26/11/2020',
  //     id: 0,
  //     lagId: '',
  //     muxId: '',
  //     notes: 'Direct Peering reservation type with end day of expiry date',
  //     portId: '4/1/10/1',
  //     portSpeed: '10GigE',
  //     reservationDate: '17/11/2020',
  //     reservationExpiryDate: '26/11/2020',
  //     reservationProjectType: 'Direct Peering',
  //     reservedBy: '609542383',
  //     reservedByName: '',
  //     rowCount: 8835,
  //     siteName: 'ABERCONWY GWYNEDD',
  //     sneId: '20881233'
  //   }];
  //   component.setExpiryDateColumnValue(event);
  //   expect(component.setExpiryDateColumnValue).toHaveBeenCalled();
  //   expect(component.setExpiryDateColumnValue).toBeDefined();
  // });
  // // it('should check function submitDataApi', () => {
  // //   spyOn(component, 'submitDataApi').and.callThrough();
  // //   component.pageData = {
  // //     globalSearchData: [], siteName: [], code1141: [], sneId: [], portId: [], portSpeed: [], cardModel: [],
  // //     reservationDate: [], reservedBy: [], expiryDate: [], sortByField: 'siteName', sortOrder: 'asc', pageNo: 1, pageSize: 100
  // //   };
  // //   const url = environment.base_url + 'detailed-reservation-report/update-expiry-date';
  // //   component.expiryDateAll = '23/10/2020';
  // //     component.tableJsonFormat.isEntireRecord = 'YES';
  // //     component.tableJsonFormat.expiryDateForAll = component.expiryDateAll;
  // //     const userresponse = {
  // //       reservationDataList: [{
  // //         actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=4/port=1',
  // //         cardModel: 'HSQ',
  // //         code: 'ABW',
  // //         id: 0,
  // //         notes: 'as',
  // //         portId: '4/1/4/1',
  // //         portSpeed: '10GigE',
  // //         reservationDate: '06/04/2020',
  // //         reservationExpiryDate: '23/10/2020',
  // //         reservedBy: '609542383 ',
  // //         siteName: 'ABERCONWY GWYNEDD',
  // //         sneId: '20881233'
  // //       }]
  // //     };
  // //     component.display = false;
  // //     component.getTable();
  // //     component.tableSettings.editkey = 'no';
  // //     component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  // //     component.extendButton = true;
  // //     spyOn(service, 'post').and.returnValue(of(userresponse.reservationDataList));
  // //     component.submitDataApi();
  // //     expect(component.submitDataApi).toHaveBeenCalled();
  // //     expect(component.submitDataApi).toBeDefined();
  // // });
  // // it('should check function submitDataApi with error', () => {
  // //   spyOn(component, 'submitDataApi').and.callThrough();
  // //   component.expiryDateDetatils = ['23/10/2020'];
  // //   component.pageData = {
  // //     globalSearchData: [], siteName: [], code1141: [], sneId: [], portId: [], portSpeed: [], cardModel: [],
  // //     reservationDate: [], reservedBy: [], expiryDate: [], sortByField: 'siteName', sortOrder: 'asc', pageNo: 1, pageSize: 100
  // //   };
  // //   component.tableJsonFormat.isEntireRecord = 'NO';
  // //   component.tableJsonFormat.expiryDateForAll = '';
  // //   component.tableJsonFormat.reservationData = component.expiryDateDetatils;
  // //   component.tableJsonFormat.reservationDetailsRequest = component.pageData;
  // //   component.submitDataApi();
  // //   expect(component.submitDataApi).toHaveBeenCalled();
  // //   expect(component.submitDataApi).toBeDefined();
  // // });
  // it('should be check function confirm', () => {
  //   spyOn(component, 'confirm').and.callThrough();
  //   component.display = true;
  //   const commonModelProperties = {
  //     bodyContent: 'Do you want to extend the expiry date',
  //     popupType: 'confirmationPopup',
  //     header: 'Confirmation',
  //     footerButtons: 'true',
  //     dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }]
  //   };
  //   expect(component.confirm).toBeDefined();
  // });
  // // it('should be check function cancelSearch', () => {
  // //   spyOn(component, 'cancelSearch').and.callThrough();
  // //   component.searchVisible = false;
  // //   component.clearfilterData = true;
  // //   component.pageData.pageNo = 1;
  // //   component.pageData.pageSize = 100;
  // //   component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  // //   component.getTableHeader();
  // //   component.cancelSearch();
  // //   expect(component.cancelSearch).toHaveBeenCalled();
  // //   expect(component.cancelSearch).toBeDefined();
  // // });
  // // it('should be check function cancelLayerdPopup', () => {
  // //   spyOn(component, 'cancelLayerdPopup').and.callThrough();
  // //   component.display = false;
  // //   expect(component.cancelLayerdPopup).toBeDefined();

  // // });
  // // it('should check function OnResetSearchInput', () => {
  // //   spyOn(component, 'OnResetSearchInput').and.callThrough();
  // //   const event = '';
  // //   component.getDataBySiteName(event);
  // //   component.OnResetSearchInput(event);
  // //   expect(component.OnResetSearchInput).toBeDefined();
  // // });
  // // it('should check function getFilterData', () => {
  // //   spyOn(component, 'getFilterData').and.callThrough();
  // //   const data = {
  // //     cardModel: [],
  // //     code1141: [],
  // //     expiryDate: [],
  // //     globalSearchData: [],
  // //     pageNo: -1,
  // //     pageSize: 100,
  // //     portId: [],
  // //     portSpeed: [],
  // //     reservationDate: [],
  // //     reservationProjectType: ['s'],
  // //     reservedBy: [],
  // //     siteName: [],
  // //     sneId: [],
  // //     sortByField: 'siteName',
  // //     sortOrder: 'asc'
  // //   }
  // //   component.pageData = data;
  // //   component.pageData.pageNo = -1;
  // //   component.searchVisible = true;
  // //   component.getTable();
  // //   component.pageData.cardModel = [];
  // //   component.pageData.code1141 = [];
  // //   component.pageData.expiryDate = [];
  // //   component.pageData.globalSearchData = [];
  // //   component.pageData.pageNo = 1;
  // //   component.pageData.pageSize = 100;
  // //   component.pageData.portId = [];
  // //   component.pageData.portSpeed = [];
  // //   component.pageData.reservationDate = [];
  // //   component.pageData.reservedBy = [];
  // //   component.pageData.siteName = [];
  // //   component.pageData.sneId = [];
  // //   component.pageData.sortByField = 'siteName';
  // //   component.pageData.sortOrder = 'ASC';
  // //   component.getFilterData(data);
  // //   expect(component.getFilterData).toHaveBeenCalled();
  // //   expect(component.getFilterData).toBeDefined();
  // // });
  // // it('should check function customSort with order 1', () => {
  // //   spyOn(component, 'customSort').and.callThrough();
  // //   const event = {
  // //     field: 'reservedByName',
  // //     mode: 'single',
  // //     order: 1
  // //   }
  // //   component.pageData.sortOrder = 'ASC';
  // //   component.pageData.sortByField = event.field;
  // //   component.getTable();
  // //   component.customSort(event);
  // //   expect(component.customSort).toHaveBeenCalled();
  // //   expect(component.customSort).toBeDefined();
  // // });
  // // it('should check function customSort with order -1', () => {
  // //   spyOn(component, 'customSort').and.callThrough();
  // //   const event = {
  // //     field: 'reservedByName',
  // //     mode: 'single',
  // //     order: -1
  // //   }
  // //   component.pageData.sortOrder = 'DESC';
  // //   component.pageData.sortByField = event.field;
  // //   component.getTable();
  // //   component.customSort(event);
  // //   expect(component.customSort).toHaveBeenCalled();
  // //   expect(component.customSort).toBeDefined();
  // // });
  // it('should check function onselectSearch', () => {
  //   spyOn(component, 'onselectSearch').and.callThrough();
  //   const event = { target: { value: '100' } };
  //   component.onselectSearch(event);
  //   expect(component.onselectSearch).toBeDefined();
  // });
  // // it('should confirm', () => {
  // //   component.confirm();
  // //   expect(component.confirm).toBeDefined();
  // // });
  // it('should cancelLayerdPopup', () => {
  //   component.cancelLayerdPopup();
  //   expect(component.cancelLayerdPopup).toBeDefined();
  // });
  // // it('should exportData', () => {
  // //   component.exportData();
  // //   expect(component.exportData).toBeDefined();
  // // });
  // it('should setExpiryDateColumnValue', () => {
  //   spyOn(component, 'setExpiryDateColumnValue').and.callThrough();
  //   const event = [{
  //     actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=10/port=1',
  //     cardModel: 'I/O Module',
  //     code1141: 'ABW',
  //     cuf: '',
  //     expiryDate: '26/11/2020',
  //     id: 0,
  //     lagId: '',
  //     muxId: '',
  //     notes: 'Direct Peering reservation type with end day of expiry date',
  //     portId: '4/1/10/1',
  //     portSpeed: '10GigE',
  //     reservationDate: '17/11/2020',
  //     reservationExpiryDate: '26/11/2020',
  //     reservationProjectType: 'Direct Peering',
  //     reservedBy: '609542383',
  //     reservedByName: '',
  //     rowCount: 8835,
  //     siteName: 'ABERCONWY GWYNEDD',
  //     sneId: '20881233'
  //   }];
  //   component.setExpiryDateColumnValue(event);
  //   expect(component.setExpiryDateColumnValue).toHaveBeenCalled();
  //   expect(component.setExpiryDateColumnValue).toBeDefined();
  // });
  // // it('should openSearch', () => {
  // //   spyOn(component, 'openSearch').and.callThrough();
  // //   expect(component.openSearch).toBeDefined();
  // // });
  // // it('should cancelOpenSearch', () => {
  // //   spyOn(component, 'cancelOpenSearch').and.callThrough();
  // //   expect(component.cancelOpenSearch).toBeDefined();
  // // });
  // // it('should setExpiryDateAllColumnValue', () => {
  // //   component.cancelOpenSearch();
  // //   expect(component.setExpiryDateAllColumnValue).toBeDefined();
  // // });
  // // it('should check function openSearch', () => {
  // //   spyOn(component, 'openSearch').and.callThrough();
  // //   component.extendButton = false;
  // //   component.tableSettings.editkey = 'yes';
  // //   component.tableSettings.headers = component.headerData;
  // //   component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  // //   expect(component.openSearch).toBeDefined();
  // // });
  // // it('should submitDataApi', () => {
  // //   let expiryDateAll: { expiryDateAll: '' };
  // //   component.submitDataApi();
  // //   expect(component.submitDataApi).toBeDefined();
  // // });
  // // it('should submitDataApi', () => {
  // //   let expiryDateAll: { expiryDateAll: '' };
  // //   component.submitDataApi();
  // //   expect(component.submitDataApi).toBeDefined();
  // // });
  // // it('should submitDataApi', () => {
  // //   let expiryDateAll: { expiryDateAll: 'test' };
  // //   component.submitDataApi();
  // //   expect(component.submitDataApi).toBeDefined();
  // // });
  // // it('should submitDataApi', () => {
  // //   component.tableJsonFormat.isEntireRecord = 'YES';
  // //   component.submitDataApi();
  // //   expect(component.submitDataApi).toBeDefined();
  // // });
  // it('should check function onManageSearchData', () => {
  //   spyOn(component, 'onManageSearchData').and.callThrough();
  //   const event = { target: { value: '100' } };
  //   component.onManageSearchData(event);
  //   expect(component.onManageSearchData).toBeDefined();
  // });
  // it('should check function onManageSearchData', () => {
  //   spyOn(component, 'onManageSearchData').and.callThrough();
  //   const userresponse = {
  //     record: {
  //       totalPages: 144,
  //       totalRecords: 11302
  //     },
  //     reservationDataList: [{
  //       actualPortId: '20881233:/shelf=1/slot=4/sub_slot=1/subsub_slot=4/port=1',
  //       cardModel: 'HSQ',
  //       code: 'ABW',
  //       id: 0,
  //       notes: 'as',
  //       portId: '4/1/4/1',
  //       portSpeed: '10GigE',
  //       reservationDate: '06/04/2020',
  //       reservationExpiryDate: '22/10/2020',
  //       reservedBy: '609542383 ',
  //       siteName: 'ABERCONWY GWYNEDD',
  //       sneId: '20881233'

  //     }]
  //   };
  //   component.tableSettings.data = userresponse.reservationDataList;
  //   component.tableSettings.totalRecords = userresponse.record.totalRecords;
  //   component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
  //   component.onManageSearchData(component.tableSettings.data);
  //   expect(component.onManageSearchData).toHaveBeenCalled();
  //   expect(component.onManageSearchData).toBeDefined();
  // });
  // it('should convertBase64ToBlobData', () => {
  //   {
  //     let base64Data: { string: '' };
  //     let contentType: { string: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' }
  //     let sliceSize: 512;
  //   }
  //   component.convertBase64ToBlobData;
  //   expect(component.convertBase64ToBlobData).toBeDefined();
  // });
});
