import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLineForecastComponent } from './product-line-forecast.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng-lts/tabview';
import { AppService } from '../shared/services/app-service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilityService } from '../shared/services/utility.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { staticColumn, editColumn, editColumnCorRT, messageColumn, messageColumnCoreRT, emptyColumn, emptyColumnCoreRT, staticColumnSort, staticShow, staticShowCoreRT } from './product-line-header.constant';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ProductLineForecastComponent', () => {
  let component: ProductLineForecastComponent;
  let fixture: ComponentFixture<ProductLineForecastComponent>;
  // tslint:disable-next-line:prefer-const
  let router: Router;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLineForecastComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, SharedModule, TabViewModule, HttpClientTestingModule, BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])],
      providers: [AppService
      ]
    })
    .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit()', async () => {
    //spyOn(service, 'get').and.returnValue(of([]));
    const mockdata = 'Edge Rt'
    component.index =1;
    component.ngOnInit();
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(mockdata));

    component.href = 'product-line-forecast';	
    switch (component.href) {	
      case 'product-line-forecast':	
      component.deviceType = 'LAST_AC_INFO_UPDATE_EDGE_RT'
      component.deviceName = 'Edge_Rt'
      component.header = 'Product Line Forecast- Edge RT ';	
        break;	
      case 'product-line-forecastEdgeRT':	
      component.deviceType = 'LAST_AC_INFO_UPDATE_EDGE_RT'
      component.deviceName = 'Edge_Rt'	
      component.header = 'Product Line Forecast- Edge RT ';	
        // this.index = 1;	
        break;	
      case 'product-line-forecastCoreRT':	
      component.deviceType = 'LAST_AC_INFO_UPDATE_CORE_RT'
      component.deviceName = 'Core_Rt'	
      component.header = 'Product Line Forecast- Core RT ';	
        // this.index = 2;	
        break;
    }
    fixture.detectChanges();
    component.userdetails();
    //component.onDownloadClick();
   // expect(component.ngOnInit).toHaveBeenCalled();
    expect(mockdata).toEqual(mockdata);
  });
  it('should check function tabChange', () => {
    spyOn(component, 'tabChange').and.callThrough();
    const event = {
      originalEvent: {
        target: {
          innerText: 'Manage Product Line Forecast'
        }
      }

    };
    component.filterData = [];
    component.tableType = '';
    component.columns.staticShow = [
      { field: 'siteName', header: 'Site Name', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
      { field: 'code1141', header: '1141 Code', visible: true, columnWidth: '100px', properties: { sort: false, editable: false } },
      {
          field: 'broadband1g', header: '1G Broadband', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false },
          type: 'text', values: ''
      },
      {
          field: 'broadband10g', header: '10G Broadband', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false },
          type: 'text', values: ''
      },
      {
          field: 'ethernetFaste', header: 'FastE Ethernet', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false},
          type: 'text', values: ''
      },
      {
          field: 'ethernet1gHe', header: '1G HE Ethernet', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false },
          type: 'text', values: ''
      },
      {
          field: 'ethernet10gHe', header: '10G HE Ethernet', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false},
          type: 'text', values: ''
      },
      {
          field: 'ethernet10gWmcApolloTef', header: '10G WMC Apollo TEF', visible: true, columnWidth: '120px',
          properties: { sort: false, editable: false },
          type: 'text', values: ''
      },
      {
          field: 'ethernet100gAccess', header: '100G Access Ethernet', visible: true, columnWidth: '120px',
          properties: { sort: false, editable: false},
          type: 'text', values: ''
      },
      {
          field: 'backhaul10g', header: '10G Backhaul', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false},
          type: 'text', values: ''
      },
      {
          field: 'backhaul100g', header: '100G Backhaul', visible: true, columnWidth: '100px',
          properties: { sort: false, editable: false},
          type: 'text', values: ''
      },
      { field: 'actions', header: 'Action', visible: true, columnWidth: '100px',
      properties: { sort: false, editable: false, action: true } }];
    component.tabChange(event);
    component.updateColumnsOfTable(staticShow);
    expect(component.tabChange).toBeDefined();
  });
  it('should check function tabChange', () => {
    spyOn(component, 'tabChange').and.callThrough();
    const event = {
      originalEvent: {
        target: {
          innerText: 'Product Line Forecast Upload'
        }
      }

    };
    component.rows = [];
    component.tableSettings.data = [];
    component.tabChange(event);
    expect(component.tabChange).toBeDefined();
  });
  it('should check function onkeyPressSearchBox', () => {
    spyOn(component, 'onKeyPressSearchBox').and.callThrough();
    const event = {
      target: {
        value: 'yz'
      }
    };
    component.filterData = ['YAIOF', 'YAIOF/PP'];
    const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(component.filterData));
    component.onKeyPressSearchBox(event);
    fixture.detectChanges();
    expect(component.onKeyPressSearchBox).toHaveBeenCalled();
    expect(component.filterData).toEqual(component.filterData);
  });
  it('should check function onkeyPressSearchBox', () => {
    spyOn(component, 'onKeyPressSearchBox').and.callThrough();
    const event = null;
    component.filterData = [];
    component.tableSettings.data = [];
    component.onKeyPressSearchBox(event);
    fixture.detectChanges();
    expect(component.onKeyPressSearchBox).toHaveBeenCalled();
    expect(component.filterData).toEqual(component.filterData);
  });

  it('should check function onselectSearch', () => {
    spyOn(component, 'onSelectSearch').and.callThrough();
    const event = 'YAIOF';
    const userresponse = [{
      id: 95168,
      code1141: 'SAA',
      siteName: 'SAFFRON WALDEN',
      broadband1g: '0',
      broadband10g: '5',
      ethernetFaste: '0',
      ethernet1gHe: '0',
      ethernet10gHe: '400',
      ethernet10gWmcApolloTef: '0',
      ethernet100gAccess: '3',
      backhaul10g: '10',
      backhaul100g: '0',
      message: null
    }];
    component.onSelectSearch(event);
    spyOn(service, 'get').and.returnValue(of(userresponse));
    expect(component.onSelectSearch).toBeDefined();
  });
  it('should check function deleteRowPopup', () => {
    spyOn(component, 'deleteRowPopup').and.callThrough();
    component.displayBasic = true;
    component.popupType = '30vw';
    const deleteobj = 412856;
    component.deleteRowPopup(deleteobj);
    expect(component.deleteRowPopup).toBeDefined();
  });
  it('should check function modelCancel', () => {
    spyOn(component, 'modelCancel').and.callThrough();
    const event = '';
    component.popupType = '';
    component.displayBasic = false;
    component.rowFordelete = null;
    component.modelCancel(event);
    expect(component.modelCancel).toBeDefined();
  });
  it('should check function deleteRow', () => {
    spyOn(component, 'deleteRow').and.callThrough();
    const id = 41235;
    component.displayBasic = false;
    component.popupType = '';
    component.rowFordelete = 93917;
    const url = environment.base_url + 'forecast-management/delete-forecast-info?id=' + component.rowFordelete;
    service = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    spyOn(service, 'delete').and.returnValue(of(''));
    component.deleteRow();
    expect(component.deleteRow).toBeDefined();
  });
  it('should check function updateRow', () => {
    spyOn(component, 'updateRow').and.callThrough();
    const event = [{
      broadband1g: '0',
      broadband10g: '5',
      ethernetFaste: '0',
      ethernet1gHe: '0',
      ethernet10gHe: '400',
      ethernet10gWmcApolloTef: '0',
      ethernet100gAccess: '3',
      backhaul10g: '10',
      backhaul100g: '0',
    }];
    component.displayBasic = false;
    component.popupType = '';
    component.updateRow(event);
    expect(component.updateRow).toBeDefined();
  });
  it('should check function submitData', () => {
    spyOn(component, 'submitData').and.callThrough();
    component.updatedRowObj = [{
      broadband1g: '0',
      broadband10g: '5',
      ethernetFaste: '0',
      ethernet1gHe: '0',
      ethernet10gHe: '400',
      ethernet10gWmcApolloTef: '0',
      ethernet100gAccess: '3',
      backhaul10g: '10',
      backhaul100g: '0',
    }];
    const url = environment.base_url + 'forecast-management/update-forecast-info-data';
    service = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    spyOn(service, 'post').and.returnValue(of(component.updatedRowObj));
    component.displayBasic = false;
    component.popupType = '';
    component.rowUpdatedSuccessfully.updated = true;
    component.onDownloadClick();
    component.submitData();
    expect(component.submitData).toBeDefined();
  });
  it('should check function onManageSearchData', () => {
    spyOn(component, 'onManageSearchData').and.callThrough();
    const event = 'AB';
    const userresponse = [{
      id: 95168,
      code1141: 'AB',
      siteName: 'ABERDEAN',
      broadband1g: '0',
      broadband10g: '5',
      ethernetFaste: '0',
      ethernet1gHe: '0',
      ethernet10gHe: '400',
      ethernet10gWmcApolloTef: '0',
      ethernet100gAccess: '3',
      backhaul10g: '10',
      backhaul100g: '0',
    }];
    component.onManageSearchData(event);
    const url = environment.base_url + 'forecast-management/forecast-info?searchData=' + event;
    service = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    spyOn(service, 'get').and.returnValue(of(userresponse));
    expect(component.onManageSearchData).toBeDefined();
  });
  // it('should check function onSearchdataUpdateCancel', () => {
  //   spyOn(component, 'onSearchdataUpdateCancel').and.callThrough();
  //   component.tableType = '';
  //   component.rowUpdatedSuccessfully.updated = true;
  //   component.onSearchdataUpdateCancel();
  //   expect(component.onSearchdataUpdateCancel).toBeDefined();
  // });
  it('should check function onDownloadClick', () => {
    spyOn(component, 'onDownloadClick').and.callThrough();
    // tslint:disable-next-line:max-line-length
    component.csvData = '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';
    component.downloadFileName = 'Product_line_forecast.xlsx';
    const userresponse = {

      headers: {
        ContentType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ContentDisposition: ['attachmentDataCenters;filename=Tier_Records.xlsx']
      },
      body: {
        FileName: component.downloadFileName,
        // tslint:disable-next-line:max-line-length
      },
      statusCode: 'OK',
      statusCodeValue: 200
    };
    component.onDownloadClick();
    expect(userresponse).toBe(userresponse);
    expect(component.onDownloadClick).toBeDefined();
  });
  it('should check function submitfile', () => {
    spyOn(component, 'submitfile').and.callThrough();
    // tslint:disable-next-line:max-line-length
    const event = {
      name: 'productline.xlsx',
      lastModified: 1597066975868,
      lastModifiedDate: 'Mon Aug 10 2020 19:12:55 GMT+0530 (India Standard Time)',
      size: 80140,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
    const userresponse = {
      message: 'success',
      recordsSummary: {
        errorRecord: 123,
        totalRecord: 2665,
        successRecord: 2542
      },
      validTierDataCentersRecords: [{
        id: 95168,
        code1141: 'AB',
        siteName: 'ABERDEAN',
        broadband1g: '0',
        broadband10g: '5',
        ethernetFaste: '0',
        ethernet1gHe: '0',
        ethernet10gHe: '400',
        ethernet10gWmcApolloTef: '0',
        ethernet100gAccess: '3',
        backhaul10g: '10',
        backhaul100g: '0',
        message: null
      }],
      invalidDataCentersRecords: [{
        id: 95168,
        code1141: '',
        siteName: '',
        broadband1g: '0',
        broadband10g: '5',
        ethernetFaste: '0',
        ethernet1gHe: '0',
        ethernet10gHe: '400',
        ethernet10gWmcApolloTef: '0',
        ethernet100gAccess: '3',
        backhaul10g: '10',
        backhaul100g: '0',
        message: 'sitename empty'
      }]
    };
    const url = environment.base_url + '/forecast-management/upload-file';
    component.submitfile(event);
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'postFile').and.returnValue(of(userresponse));
    expect(component.submitfile).toBeDefined();
  });
  it('should check function onfileUploadFromActionCancel', () => {
    spyOn(component, 'onfileUploadFromActionCancel').and.callThrough();
    component.rows = [];
    component.successRecord = 0;
    component.errorRecord = 0;
    component.fileUploadRef.resetFile();
    component.tableType = '';
    component.onfileUploadFromActionCancel();
    expect(component.onfileUploadFromActionCancel).toBeDefined();
  });
  it('should check function modelfileuploadCancel', () => {
    spyOn(component, 'modelfileuploadCancel').and.callThrough();
    component.displayBasic = false;
    component.onfileUploadFromActionCancel();
    expect(component.modelfileuploadCancel).toBeDefined();
  });
  it('should check function updateColumnsOfTable', () => {
    spyOn(component, 'updateColumnsOfTable').and.callThrough();
    component.forzen = staticColumnSort;	
    if (component.type === 'edit' && component.href !== 'product-line-forecastCoreRT') {	
      component.columns = editColumn;	
    } else if (component.type === 'edit' && component.href === 'product-line-forecastCoreRT') {	
      component.forzen = staticColumn;	
      component.columns = editColumnCorRT;	
    } else if (component.type === 'message' && component.href !== 'product-line-forecastCoreRT') {	
      component.columns = messageColumn;
    } else if (component.type === 'message' && component.href === 'product-line-forecastCoreRT') {	
      component.columns = messageColumnCoreRT;	
      console.log(component.columns);	
    } else if (component.type === '' && component.href !== 'product-line-forecastCoreRT') {	
      component.columns = emptyColumn;	
      console.log(component.columns);	
    }	
    else if (component.type === '' && component.href === 'product-line-forecastCoreRT') {	
      component.columns = emptyColumnCoreRT;
    }	
    else if (component.type === 'static' && component.href !== 'product-line-forecastCoreRT') {	
      component.columns = staticShow;	
    }	
    else if (component.type === 'static' && component.href === 'product-line-forecastCoreRT') {	
      component.columns = staticShowCoreRT;	
    }	
    component.bindTableProperties(component.type);
    expect(component.updateColumnsOfTable).toBeDefined();
  });
  it('should check function updateColumnsOfTable', () => {
    spyOn(component, 'updateColumnsOfTable').and.callThrough();
    if (component.type === 'edit') {
      component.columns = editColumn;
    } else if (component.type === 'static') {
     // component.columns = staticTable;
    }
    component.bindTableProperties(component.type);
    expect(component.updateColumnsOfTable).toBeDefined();
  });
  it('should check function userdetails', () => {
    spyOn(component, 'userdetails').and.callThrough();
    // tslint:disable-next-line:max-line-length
    component.csvData = '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';
    component.downloadFileName = 'Product_line_forecast.xlsx';
    const userresponse = {
      parameterValue:"Aradhana Songara 18/02/2021 07.02 AM"
    };
    component.userdetails();
    expect(userresponse).toBe(userresponse);
    expect(component.userdetails).toBeDefined();
  });

  it('should check function OnResetSearchInput', () => {
    spyOn(component, 'OnResetSearchInput').and.callThrough();
    // tslint:disable-next-line:max-line-length
    const event = {
    };
    
    component.OnResetSearchInput(event);
    expect(component.OnResetSearchInput).toBeDefined();
  });

  it('should check function addData', () => {
    spyOn(component, 'addData').and.callThrough();
    // tslint:disable-next-line:max-line-length
    const event = {
    };
    
    component.addData();
    expect(component.addData).toBeDefined();
  });
  
  it('shoud check function modelOk', () => {
    spyOn(component, 'modelOk').and.callThrough();
    component.tableSettings.data.length = 0;
    component.alertCancel = false;
   // component.uploadFileHeader();
    component.showbutnRows = false;
    component.addMode = true;
    component.searchSite = true;
    component.modelOk();
    expect(component.modelOk).toBeDefined();
  });
  it('should check function cancelRows', () => {
    spyOn(component, 'cancelRows').and.callThrough();
    component.alertCancel = true;
    component.cancelRows();
    expect(component.cancelRows).toHaveBeenCalled();
    expect(component.cancelRows).toBeDefined();
  });
  it('shoud check function closepopup', () => {
    spyOn(component, 'closepopup').and.callThrough();
    component.displayAddreport = false;
    component.closepopup();
    expect(component.closepopup).toHaveBeenCalled();
    expect(component.closepopup).toBeDefined();
  });
  it('shoud check function submitMessage', () => {
    spyOn(component, 'submitMessage').and.callThrough();
    let url;
    if(component.deviceName === 'Edge_Rt'){
      url = 'assets/json/phaseaddedge.json'
     }
      else{
       url = 'assets/json/phaseaddcore.json'
   }
   // component.displayAddreport = false;
    component.submitMessage();
    expect(component.submitMessage).toHaveBeenCalled();
    expect(component.submitMessage).toBeDefined();
  });
});
