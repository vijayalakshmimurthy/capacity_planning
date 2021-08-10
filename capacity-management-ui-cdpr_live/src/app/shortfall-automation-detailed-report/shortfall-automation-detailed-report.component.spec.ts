import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortfallAutomationDetailedReportComponent } from './shortfall-automation-detailed-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../shared/services/app-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
describe('ShortfallAutomationDetailedReportComponent', () => {
  let component: ShortfallAutomationDetailedReportComponent;
  let fixture: ComponentFixture<ShortfallAutomationDetailedReportComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [ShortfallAutomationDetailedReportComponent],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortfallAutomationDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Should check getTableHeader', () => {
    spyOn(component, 'getTableHeader').and.callThrough();
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-shortfallReport-header';
    const userresponse=
      [{
        child: [],
        childType: false,
        colour: "#333",
        columnWidth: "270px",
        dependendColumns: null,
        deviceModel: "7750 SR-14s",
        deviceType: "Core Rt",
        field: "siteName",
        fixed: true,
        header: "Site",
        id: 810,
        link: false,
        pageName: "CDPR",
        productName: "Ethernet",
        properties: {gpId: 810, gid: "810", sort: true, editable: false, filter: false, link: false, url: null},
        action: false,
       // colour: "#333",
       // columnWidth: "180px",
        editable: false,
        fieldType: "text",
        filter: false,
        filterType: "text",
        gid: "810",
        gpId: 810,
       // link: false,
        sort: true,
        url: null,
        urlParameter: null,
        type: null,
        values: [],
        visible: true,
      }];
      
    //this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      component.headerData = userresponse;
      component.tableSettings.headers = component.headerData;
      component.headerData = userresponse;
      component.tableSettings.status = [
        { label: 'Select Inflight Identified', value: null },
        { label: 'No', value: 'No' },
        { label: 'Yes', value: 'Yes' }
      ];
      component.tableSettings.currentStatus = [
        { label: 'Select Status', value: null },
        { label: 'Completed', value: 'Completed' },
        { label: 'Errored', value: 'Errored' },
        { label: 'In Progress', value: 'In Progress' }
      ];
      component.tableSettings.shortfallType = [
        { label: 'Select Shortfall Type', value: null },
        { label: 'CardShortfall', value: 'CardShortfall' },
        { label: 'CableShortfall', value: 'CableShortfall' },
        { label: 'RackShortfall', value: 'RackShortfall' },
        { label: 'RestOfShortfall', value: 'RestOfShortfall' },
      ];
 
      component.tableSettings.isNewCapacityPlanned = [
        { label: 'Select Is New Capacity Planned', value: null },
        { label: 'No', value: 'No' },
        { label: 'Yes', value: 'Yes' }
      ];
 
      const len = component.headerData.length;
      component.tableSettings.headers = component.headerData;
   
  });
  // it('Should check getTable', () => {
  //   component.noRecordError = false;
  //   spyOn(component, 'getTable').and.callThrough();
  //   component.pageDataShort = {
  //     orderId : [],
  //     orderItemId : [],
  //     exchange1141Code : [],
  //     trsArea1141Code : [],
  //     shortfallType : [],
  //     shortfallSubType : [],
  //     windowsType : [],
  //     isInflightIdentified : [],
  //     sneIdentified : [],
  //     slotIdentified : [],
  //     cpNumberIdentified : [],
  //     wfmtProjectIdIdentified : [],
  //     isNewCapacityPlanned : [],
  //     capacityPlanningNumber : [],
  //     wfmtProjectId : [],
  //     SNEId : [],
  //     currentStatus : [],
  //     capacityAvailableDate : [],
  //     shortfallReceivedDate : [],
  //     sortByField : 'shortfallReceivedDate',
  //     sortOrder : 'DESC',
  //     pageNo : 1,
  //     pageSize : 100,
  //   };
  //   const url = environment.base_url + 'shortfallReport/fetch-details';
  //   const userresponse = {
  //     record: {
  //       totalPages: 144,
  //       totalRecords: 11302
  //     },
  //     shortfallReportDataList: [{
  //       capacityavailabledate: null,
  //       capacityplanningnumber: null,
  //       cpnumberidentified: null,
  //       currentstatus: 'Failed',
  //       exchangecode: null,
  //       id: 163357,
  //       isinflightidentified: '1',
  //       isnewcapacityplanned: null,
  //       orderid: null,
  //       orderitemid: null,
  //       shortfallreceiveddate: '2020-11-08T11:29:08.075+0000',
  //       shortfallsubtype: null,
  //       shortfalltype: null,
  //       slotidentified: null,
  //       sneid: null,
  //       sneidentified: null,
  //       trsarea1141code: null,
  //       wfmtprojectid: null,
  //       wfmtprojectididentified: null,
  //       windowstype: null
  //     }]
  //   };
  //   if (!userresponse.shortfallReportDataList) {
  //     component.disableExportButton = true;
  //   }
  //   if (userresponse.shortfallReportDataList.length > 0) {
  //     component.disableExportButton = false;
  //     component.tableSettings.data = userresponse.shortfallReportDataList;
  //     component.tableSettings.totalRecords = userresponse.record.totalRecords;
  //     component.orderiddata = [];
  //     component.tableSettings.data.forEach((currentValue, index) => {
  //       if (currentValue.id) {
  //         component.orderiddata.push({ id: currentValue.id });
  //       }
  //     });
  //     component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
  //   } else {
  //     component.tableSettings.data = [];
  //     component.noRecordError = true;
  //     component.disableExportButton = true;
  //   }
  //   spyOn(service, 'post').and.returnValue(of(userresponse.shortfallReportDataList));
  //   component.getTable();
  //   expect(component.getTable).toHaveBeenCalled();
  //   expect(component.getTable).toBeDefined();
  // });
  
  it('Should check getTable', () => {
    spyOn(component, 'getTable').and.callThrough();
    component.tableSettings.data = [];
    component.noRecordError = true;
    spyOn(service, 'post').and.returnValue(of(component.tableSettings.data));
    component.getTable();
    expect(component.getTable).toHaveBeenCalled();
    expect(component.getTable).toBeDefined();
  });

  it('should check function getSelectedPageNo', () => {
    spyOn(component, 'getSelectedPageNo').and.callThrough();
    const event = { page: 0 };
    component.tableSettings.refreshPagination = false;
    component.pageDataShort.pageNo = event.page + 1;
    component.getTable();
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

  it('should be check function cancelSearch', () => {
    spyOn(component, 'cancelSearch').and.callThrough();
    component.searchVisible = false;
    component.clearfilterData = true;
    component.pageDataShort.orderId = [];
    component.pageDataShort.orderItemId = [];
    component.pageDataShort.exchange1141Code = [];
    component.pageDataShort.trsArea1141Code = [];
    component.pageDataShort.shortfallType = [];
    component.pageDataShort.shortfallSubType = [];
    component.pageDataShort.windowsType = [];
    component.pageDataShort.isInflightIdentified = [];
    component.pageDataShort.sneIdentified = [];
    component.pageDataShort.slotIdentified = [];
    component.pageDataShort.cpNumberIdentified = [];
    component.pageDataShort.wfmtProjectIdIdentified = [];
    component.pageDataShort.isNewCapacityPlanned = [];
    component.pageDataShort.capacityPlanningNumber = [];
    component.pageDataShort.wfmtProjectId = [];
    component.pageDataShort.SNEId = [];
    component.pageDataShort.currentStatus = [];
    component.pageDataShort.capacityAvailableDate = [];
    component.pageDataShort.shortfallReceivedDate = [];
    component.pageDataShort.sortByField = 'shortfallReceivedDate';
    component.pageDataShort.sortOrder = 'DESC';
    component.pageDataShort.pageNo = 1;
    component.pageDataShort.pageSize = 100;
    component.tableSettings = JSON.parse(JSON.stringify(component.tableSettings));
    component.getTable();
    component.getTableHeader();
    component.cancelSearch();
    expect(component.cancelSearch).toHaveBeenCalled();
    expect(component.cancelSearch).toBeDefined();
  });
  it('should check function getFilterData', () => {
    spyOn(component, 'getFilterData').and.callThrough();
    const data = {
      globalSearchData: [],
      orderId: [],
      orderItemId: [],
      exchange1141Code: [],
      trsArea1141Code: [],
      shortfallType: [],
      shortfallSubType: [],
      windowsType: [],
      isInflightIdentified: [],
      sneIdentified: [],
      slotIdentified: [],
      cpNumberIdentified: [],
      wfmtProjectIdIdentified: [],
      isNewCapacityPlanned: [],
      capacityPlanningNumber: [],
      wfmtProjectId: [],
      SNEId: [],
      currentStatus: [],
      capacityAvailableDate: [],
      sortByField: 'orderId',
      sortOrder: 'ASC',
      pageNo: 1,
      pageSize: 100
    };
    //component.pageData = data;
    component.pageDataShort.pageNo = -1;
    component.searchVisible = true;
    component.getTable();
    component.pageDataShort.orderId = [];
    component.pageDataShort.orderItemId = [];
    component.pageDataShort.exchange1141Code = [];
    component.pageDataShort.pageNo = 1;
    component.pageDataShort.shortfallReceivedDate = [];
    component.pageDataShort.pageSize = 100;
    component.pageDataShort.trsArea1141Code = [];
    component.pageDataShort.shortfallType = [];
    component.pageDataShort.shortfallSubType = [];
    component.pageDataShort.isInflightIdentified = [];
    component.pageDataShort.sneIdentified = [];
    component.pageDataShort.slotIdentified = [];
    component.pageDataShort.cpNumberIdentified = [];
    component.pageDataShort.wfmtProjectIdIdentified = [];
    component.pageData.isNewCapacityPlanned = [];
    component.pageDataShort.capacityPlanningNumber = [];
    component.pageDataShort.wfmtProjectId = [];
    component.pageDataShort.SNEId = [];
    component.pageDataShort.currentStatus = [];
    component.pageDataShort.capacityAvailableDate = [];
    component.pageDataShort.sortByField = 'orderId';
    component.pageDataShort.sortOrder = 'ASC';
    component.getFilterData(data);
    expect(component.getFilterData).toHaveBeenCalled();
    expect(component.getFilterData).toBeDefined();
  });

  // it('should check function exportData', () => {

  //   spyOn(component, 'exportData').and.callThrough();
    
  //  // const blobData = component.convertBase64ToBlobData(component.resExport);
  //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //   //  window.navigator.msSaveOrOpenBlob(blobData, `ShortfallAutomationDtailedReport.xlsx`);
  //   } else {
  //    // const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
  //     // tslint:disable-next-line:no-shadowed-variable
  //   //  const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //   //  link.href = url;
  //     link.download = `ShortfallAutomationDtailedReport.xlsx`;
  //     link.click();
  //   }

  //   component.exportData();
  //   expect(component.exportData).toHaveBeenCalled();
  //   expect(component.exportData).toBeDefined();
  // });
  //  it('should exportData', () => {
  //   spyOn(component, 'exportData').and.callThrough();
    
  //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-download';
  //   // tslint:disable-next-line:max-line-length
  //   const userres  = '"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';
  //   const fileName = 'ShortfallAutomationDtailedReport.xlsx';
  //  const userresponse = {
  
  //    headers: {
  //      ContentType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  //      ContentDisposition: ['attachment;filename=Shortfall_Report.xlsx']
  //    },
  //    body: {
  //      FileName: fileName ,
  //      FileContent: userres
  //    },
  //    statusCode: 'OK',
  //    statusCodeValue: 200
  //  };
  //    component.exportData();
  //    expect(component.exportData).toBeDefined();
  //  });
  // it('should check function customSort with order 1', () => {
  //   spyOn(component, 'customSort').and.callThrough();
  //   const event = {
  //     field: 'reservedByName',
  //     mode: 'single',
  //     order: 1
  //   }
  //   component.pageDataShort.sortOrder = 'ASC';
  //   component.pageDataShort.sortByField = event.field;
  //   component.getTable();
  //   component.customSort(event);
  //   expect(component.customSort).toHaveBeenCalled();
  //   expect(component.customSort).toBeDefined();
  // });

  it('should check function customSort with order -1', () => {
    spyOn(component, 'customSort').and.callThrough();
    const event = {
      field: 'reservedByName',
      mode: 'single',
      order: -1
    }
    if (event.order === 1) {
      if (component.pageDataShort.sortOrder !== 'ASC' || component.pageDataShort.sortByField !== event.field) {
        component.pageDataShort.sortOrder = 'ASC';
        component.pageDataShort.sortByField = event.field;
        component.getTable();
      }
    } else if ((event.order === -1)) {
      if (component.pageDataShort.sortOrder !== 'DESC' || component.pageDataShort.sortByField !== event.field) {
        component.pageDataShort.sortOrder = 'DESC';
        component.pageDataShort.sortByField = event.field;
        component.getTable();
      }
    }
    component.pageDataShort.sortOrder = 'DESC';
    component.pageDataShort.sortByField = event.field;
    component.getTable();
    component.customSort(event);
    expect(component.customSort).toHaveBeenCalled();
    expect(component.customSort).toBeDefined();
  });

  // it('should convertBase64ToBlobData', () => {
  //   {
  //     let base64Data: { string: '' };
  //     let contentType: { string: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' };
  //     let sliceSize: 512;
  //   }
  //   component.convertBase64ToBlobData;
  //   expect(component.convertBase64ToBlobData).toBeDefined();
  // });
});
