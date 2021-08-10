import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedPatchPanelReportComponent } from './detailed-patch-panel-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../shared/services/app-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
describe('DetailedPatchPanelReportComponent', () => {
  let component: DetailedPatchPanelReportComponent;
  let fixture: ComponentFixture<DetailedPatchPanelReportComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [DetailedPatchPanelReportComponent],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedPatchPanelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('Should check getTableHeader', () => {
  //   spyOn(component, 'getTableHeader').and.callThrough();
  //   component.showTable = true;
  //   const userresponse=
  //     [{
  //       child: [],
  //       childType: null,
  //       colour: null,
  //       columnWidth: "100px",
  //       dependendColumns: null,
  //       deviceModel: null,
  //       deviceType: null,
  //       field: "code1141",
  //       fixed: true,
  //       header: "Locality 1141",
  //       id: 401,
  //       link: null,
  //       pageName: "DPPR",
  //       productName: null,
  //       properties: {gpId: 401, gid: "401", sort: true, editable: false, filter: true, link: false, url: null},
  //       action: false,
  //      // colour: "#333",
  //     //  columnWidth: "100px",
  //       editable: false,
  //       fieldType: "text",
  //       filter: true,
  //       filterType: "text",
  //       gid: "401",
  //       gpId: 401,
  //      // link: false,
  //       sort: true,
  //       url: null,
  //       urlParameter: null,
  //       type: null,
  //       values: [],
  //       visible: true
  //     }];
  //   const dsrHeaderUrl = environment.base_url + 'generic-header/grid-detailPatchPanelReport-header';
  //   //this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
  //     component.headerData = userresponse;
  //     component.tableSettings.headers = component.headerData;
   
  // });
  it('Should check getTable', () => {
    component.noRecordError = false;
    spyOn(component, 'getTable').and.callThrough();
    component.pageDataPatch = {
      orderId : [],
      orderItemId : [],
      exchange1141Code : [],
      trsArea1141Code : [],
      shortfallType : [],
      shortfallSubType : [],
      windowsType : [],
      isInflightIdentified : [],
      sneIdentified : [],
      slotIdentified : [],
      cpNumberIdentified : [],
      wfmtProjectIdIdentified : [],
      isNewCapacityPlanned : [],
      capacityPlanningNumber : [],
      wfmtProjectId : [],
      SNEId : [],
      currentStatus : [],
      capacityAvailableDate : [],
      shortfallReceivedDate : [],
      sortByField : 'shortfallReceivedDate',
      sortOrder : 'DESC',
      pageNo : 1,
      pageSize : 100,
    };
    const reqdata = {
      "siteName": "FROME"
    }
    const url = environment.base_url + 'shortfallReport/fetch-detailPatchPanelReport-dataGrid-details';
    const userresponse = {
      res: [{
        code1141: "FEJ",
        portName: "B/Mgt/2",
        portType: "FastE",
        ppPort: "",
        ppSsneid: "",
        ppTRS: "",
        serviceExists: "",
        slotFreeCapacityUsage: "MDA Broadband",
        sneId7750: "20996753",
        trsArea7750: "FEJ/K",
        windowType: ""
      }]
    };
    
 
      if (userresponse.res.length > 0) {
        component.tableSettings.data = userresponse.res;
      } else {
        component.tableSettings.data = [];
        component.noRecordError = true;
      }  
    component.tableSettings.data = [];
    spyOn(service, 'post').and.returnValue(of(userresponse));
    component.getTable('Frome');
    expect(component.getTable).toHaveBeenCalled();
    expect(component.getTable).toBeDefined();
  }); 

  it('should check function getSelectedPageNo', () => {
    spyOn(component, 'getSelectedPageNo').and.callThrough();
    const event = { page: 0 };
    component.getSelectedPageNo('a');
    expect(component.getSelectedPageNo).toBeDefined();
  });
  it('should check function getlistRowSelect', () => {
    spyOn(component, 'getlistRowSelect').and.callThrough();    
    const event = { target: { value: 100 } };
    component.tableSettings.refreshPagination = true;
    component.tableJsonFormat.pageNo = 1;
    component.tableJsonFormat.pageSize = event.target.value;
    component.getlistRowSelect(event);
    expect(component.getlistRowSelect).toBeDefined();
  });

  it('should check function getFilterData', () => {
    spyOn(component, 'getFilterData').and.callThrough();
    const data = {
      cardModel: [],
      code1141: [],
      expiryDate: [],
      globalSearchData: [],
      pageNo: -1,
      pageSize: 100,
      portId: [],
      portSpeed: [],
      reservationDate: [],
      reservationProjectType: ['s'],
      reservedBy: [],
      siteName: [],
      sneId: [],
      sortByField: 'siteName',
      sortOrder: 'asc'
    }
   
    component.searchVisible = true;
    component.getTable('Frome');
    component.pageDataPatch.orderId = [];
    component.pageDataPatch.orderItemId = [];
    component.pageDataPatch.exchange1141Code = [];
    component.pageDataPatch.trsArea1141Code = [];
    component.pageDataPatch.shortfallType = [];
    component.pageDataPatch.shortfallSubType = [];
    component.pageDataPatch.windowsType = [];
    component.pageDataPatch.isInflightIdentified = [];
    component.pageDataPatch.sneIdentified = [];
    component.pageDataPatch.slotIdentified = [];
    component.pageDataPatch.cpNumberIdentified = [];
    component.pageDataPatch.wfmtProjectIdIdentified = [];
    component.pageDataPatch.isNewCapacityPlanned = [];
    component.pageDataPatch.capacityPlanningNumber = [];
    component.pageDataPatch.wfmtProjectId = [];
    component.pageDataPatch.SNEId = [];
    component.pageDataPatch.currentStatus = [];
    component.pageDataPatch.capacityAvailableDate = [];
    component.pageDataPatch.shortfallReceivedDate = [];
    component.pageDataPatch.sortByField = 'shortfallReceivedDate';
    component.pageDataPatch.sortOrder = 'DESC';
    component.pageDataPatch.pageNo = 1;
    component.pageDataPatch.pageSize = 100;
    component.getFilterData(data);
    expect(component.getFilterData).toHaveBeenCalled();
    expect(component.getFilterData).toBeDefined();
  
 
});

  it('should exportData', () => {
    let rearrangeJson = [];  
    const colsToFile = component.tableSettings.headers.map((el) => {
      rearrangeJson.push(el.header);
      return el.header;
    });

    if(component.exportTableData.length > 0)
    {
      const rearrange = JSON.parse(JSON.stringify(component.exportTableData));
      const rowsToFile = rearrange as object[];
      const options = {
        showLabels: true,
        showTitle: true,
        title: 'Detailed Patch Panel Report - ' + component.siteNameExport,
        headers: colsToFile
      };   
    //  new ngxCsv(rowsToFile, 'DetailedADVAChassisReport', options);
    }
    else
    {     
    const rearrange = JSON.parse(JSON.stringify(component.tableSettings.data));
    const rowsToFile = rearrange as object[];
    let header = 'Selected Filter -';
    const options = {
      showLabels: true,
      showTitle: true,
      title: 'Detailed Patch Panel Report - ' + component.siteNameExport,
      headers: colsToFile
    };   
   // new ngxCsv(rowsToFile, 'DetailedADVAChassisReport', options);
  }
    component.exportData();
    expect(component.exportData).toBeDefined();
  });
  it('should be check function cancelSearch', () => {
    spyOn(component, 'cancelSearch').and.callThrough();
    component.searchVisible = false;
    component.clearfilterData = true;
    component.pageDataPatch.pageNo = 1;
    component.pageDataPatch.pageSize = 100;
    component.exportTableData = [];
    component.disableExportButton = false
    component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
    //component.getTableHeader();
    component.cancelSearch();
    expect(component.cancelSearch).toHaveBeenCalled();
    expect(component.cancelSearch).toBeDefined();
  });

  it('should check function onkeyPressSearch with success response', () => {
    spyOn(component, 'onkeyPressSearch').and.callThrough();
    const event = {
      target: {
        value: 'AA'
      }
    };
    const filterData = ['ABERDARE'];
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(filterData));
    component.onkeyPressSearch(event);
    fixture.detectChanges();
    expect(component.onkeyPressSearch).toHaveBeenCalled();
    expect(component.filterData).toEqual(filterData);
  });
  it('should check function onkeyPressSearch with error response', () => {
    spyOn(component, 'onkeyPressSearch').and.callThrough();
    const event = {
      target: {
        value: 'AA'
      }
    };
    const filterData = [];
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(component.filterData));
    component.onkeyPressSearch(event);
    fixture.detectChanges();
    expect(component.onkeyPressSearch).toHaveBeenCalled();
    expect(component.filterData).toEqual(filterData);
  });

  it('should check function customSort with order 1', () => {
    spyOn(component, 'customSort').and.callThrough();
    const event = {
      field: 'reservedByName',
      mode: 'single',
      order: 1
    }
    component.pageDataPatch.sortOrder = 'ASC';
    component.pageDataPatch.sortByField = event.field;
    component.getTable('Frome');
    component.customSort(event);
    expect(component.customSort).toHaveBeenCalled();
    expect(component.customSort).toBeDefined();
  });
  it('should check function customSort with order -1', () => {
    spyOn(component, 'customSort').and.callThrough();
    const event = {
      field: 'reservedByName',
      mode: 'single',
      order: -1
    }
    component.pageDataPatch.sortOrder = 'DESC';
    component.pageDataPatch.sortByField = event.field;
    component.getTable('Frome');
    component.customSort(event);
    expect(component.customSort).toHaveBeenCalled();
    expect(component.customSort).toBeDefined();
  });
  
  it('should check function onselectSearch', () => {
    spyOn(component, 'onselectSearch').and.callThrough();
    const event = { target: { value: '100' } };
    component.onselectSearch(event);
    expect(component.onselectSearch).toBeDefined();
  });
  
  
});
