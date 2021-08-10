import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { WorkflowService } from '../shared/services/workflow.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/api';
import { RackPopupComponent } from './rack-popup/rack-popup.component';
import { CbpHeaderComponent } from './cbp-header/cbp-header.component';
import { OptimizationComponent } from './optimization/optimization.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { NavigationService } from '../shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { CbpReportComponent } from './cbp-report.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CbpReportComponent', () => {
  let component: CbpReportComponent;
  let fixture: ComponentFixture<CbpReportComponent>;
  let router: Router;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, RouterTestingModule.withRoutes([])],
      declarations: [ CbpReportComponent, RackPopupComponent, CbpHeaderComponent, OptimizationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Router, useValue: router }, AppService, WorkflowService, DialogService, UtilityService, NavigationService],
    })
    .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbpReportComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
   // const roleList: any = ['PROD_CE_ADMIN'];
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  //   const tableJsonFormat = {
  //     pageNo: 1,
  //     pageSize: 0,
  //     sortByField: '',
  //     isSortOrder: 'ASC',
  //     isDownload: false
  //   };
  //   component.tableSettings = {
  //     frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
  //     columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true, customSort: true, clientSorting: true,
  //     frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
  //     rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  //   };
  // });

  // it('should run #ngOnInit()', async () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.cbpCardheader = 'Capacity Build Plan Report - Card';
  //   component.rackHeader = 'Capacity Build Plan Report - Rack';
  //   component.optimizationHeader =  'Capacity Optimization Plan Report';
  //   const cbpHeaderrUrl = environment.base_url + 'generic-header/grid-cbpr-header/';
  //   component.headerData = [{
  //     id: 186,
  //     field: 'all',
  //     header: 'All',
  //     fixed: false,
  //     type: 'null',
  //     childType: true,
  //     pageName: 'CBPR',
  //     productName: null,
  //     deviceModel: null,
  //     columnWidth: '35px',
  //     link: null,
  //     colour: '#333',
  //     properties: {
  //       gpId: 186,
  //       gid: 186,
  //       sort: false,
  //       editable: false,
  //       filter: false,
  //       link: false,
  //       url: null,
  //       urlParameter: null,
  //       colour: '#333',
  //       filterType: 'text',
  //       fieldType: 'checkbox',
  //       action: false,
  //       columnWidth: null
  //     },
  //     values: [],
  //     child: [],
  //     dependendColumns: null,
  //     visible: true
  //   }];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'post').and.returnValue(of(component.headerData));
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   expect(component.ngOnInit).toBeDefined();
  //   if (component.roleName !== 'PROD_CE_ADMIN') {
  //     component.headerData.pop();
  //   }
  //   component.tableSettings.headers = component.headerData;
  //   component.optimizationGetTable();
  //   component.getTable();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   expect(component.ngOnInit).toBeDefined();
  //   const rackHeaderrUrl = environment.base_url + 'generic-header/grid-cbprack-header/';
  //   component.rackHeaderData = [{
  //     id: 199,
  //     field: 'all',
  //     header: 'All',
  //     fixed: false,
  //     type: 'null',
  //     childType: true,
  //     pageName: 'CBPRack',
  //     productName: null,
  //     deviceModel: null,
  //     columnWidth: '14px',
  //     link: null,
  //     colour: '#333',
  //     properties: {
  //       gpId: 199,
  //       gid: '199',
  //       sort: false,
  //       editable: false,
  //       filter: false,
  //       link: false,
  //       url: null,
  //       urlParameter: null,
  //       colour: '#333',
  //       filterType: 'text',
  //       fieldType: 'checkbox',
  //       action: false,
  //       columnWidth: null
  //     },
  //     values: [],
  //     child: [],
  //     dependendColumns: null,
  //     visible: true
  //   }];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(component.headerData));
  //   component.rackgetTable();
  //   fixture.detectChanges();
  // });

  // it('should check function optimizationGetTable', () => {
  //   spyOn(component, 'optimizationGetTable').and.callThrough();
  //   const url = environment.base_url + 'card-move/get-cardmoveplan';
  //   const optBodyRecords = [{
  //     id: 147513,
  //     productType: '',
  //     sourceCardId: null,
  //     destinationCardId: null,
  //     siteName: 'COVENTRY ROMES SITE A B',
  //     code1141: 'CV/R',
  //     sourceSneId: '20476401',
  //     sourceCardMtosiName: '',
  //     sourceCardName: '',
  //     sourceSlot: '',
  //     sourceCardLevel: '',
  //     sourceCardType: '',
  //     sourceCardUsedPortsCount: '0',
  //     destinationSneId: '20476401',
  //     destinationCardMtosiName: '',
  //     destinationCardName: '',
  //     destinationSlot: '',
  //     destinationCardLevel: '',
  //     destinationCardType: '',
  //     destinationCardFreePortCount: '0',
  //     cpNumber: '',
  //     projectId: '',
  //     cpDate: null,
  //     sourceNoOfService: 0,
  //     destinationNoOfService: 0,
  //     workflowstatus: '3',
  //     status: 'Saved',
  //     free: '',
  //     rackId: '',
  //     rackPosition: '',
  //     cardMoveStatus: 'Pending',
  //     sourceSatelliteShelf: null,
  //     destinationSatelliteShelf: null,
  //     cardInfillSavePlanRequest: null
  //   }];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(optBodyRecords));
  //   component.optimizationGetTable();
  //   fixture.detectChanges();
  //   expect(component.optimizationGetTable).toHaveBeenCalled();
  //   expect(component.optimizationGetTable).toBeDefined();
  // });

  // it('should check function getTable', () => {
  //   spyOn(component, 'getTable').and.callThrough();
  //   const getEIN = 609542383;
  //   const userType = 'ADMIN';
  //   const url = environment.base_url + 'capacity-planning-build/data?ein=' + getEIN + '&role=' + userType;
  //   component.getTable();
  //   expect(component.getTable).toHaveBeenCalled();
  //   expect(component.getTable).toBeDefined();
  // });

  // it('should check function getCableTable', () => {
  //   const url = environment.base_url + 'cableshortfallReport/fetch-data?searchData=' + ' ';
  //   const res = [{
  //     id: 1,
  //     projectI: '1234',
  //     cpNumber: 'CP123',
  //     cpDate: null,
  //     jobType: null,
  //     sneId: '20392630',
  //     trsArea: 'AA',
  //     cardPosition: null,
  //     port: null,
  //     bundledCabledSource: null,
  //     bundledCabledInstaller: null,
  //     advaNumber: null,
  //     advaTrsArea: null,
  //     advaRackType: null,
  //     advaChassis: null,
  //     ccppLocation: null,
  //     ccppPosition: null,
  //     tieInstaller: null,
  //     fiberTieRequired: null,
  //     status: null,
  //     messageId: null,
  //     wfmtRequestId: null,
  //     createdDate: null,
  //     modifiedDate: null
  //   }];
  //   spyOn(service, 'get').and.returnValue(of(res));
  //   component.cableTableSettings.data = res;
  //   spyOn(component, 'getCableTable').and.callThrough();
  //   component.getCableTable();
  //   expect(component.getCableTable).toHaveBeenCalled();
  //   expect(component.getCableTable).toBeDefined();
  // });

  // it('should check function rackgetTable', () => {
  //   spyOn(component, 'rackgetTable').and.callThrough();
  //   component.rackgetTable();
  //   expect(component.rackgetTable).toHaveBeenCalled();
  //   expect(component.rackgetTable).toBeDefined();
  //   const url = environment.base_url + 'cbp-rack/fetch-data';
  //   component.showErrorMsg = false;
  //   component.rackTableSetting.data = [{
  //     id: 90144,
  //     code1141: 'NMN',
  //     trsArea: 'NMN/K',
  //     projectId: '',
  //     cpNumber: '',
  //     capacityRequiredByDate: '29/01/2021',
  //     rackInfillType: 'ADVA/OSA/EFM Rack',
  //     rackType: '',
  //     status: 'Processing'
  //   }];
  //   spyOn(service, 'get').and.returnValue(of(component.rackTableSetting.data));
  //   component.rackExportDisable = false;
  //   component.rackTableSetting.status = [
  //     { label: 'Select Status', value: null },
  //     { label: 'Saved', value: 'Saved' },
  //     { label: 'Submitted', value: 'Submitted' },
  //     { label: 'Processing', value: 'Processing' },
  //     { label: 'Submission Failed', value: 'Submission Failed' }
  //   ];
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it('should check function getSelectedPageNo', () => {
  //   spyOn(component, 'getSelectedPageNo').and.callThrough();
  //   const event = { page: 1};
  //   component.tableJsonFormat.pageNo = event.page + 1;
  //   component.getSelectedPageNo(event);
  //   expect(component.rackgetTable).toHaveBeenCalled();
  //   expect(component.getSelectedPageNo).toBeDefined();
  // });

  // it('should check function getlistRowSelect', () => {
  //   spyOn(component, 'getlistRowSelect').and.callThrough();
  //   const event = {target: { value: 100 }};
  //   component.tableSettings.refreshPagination = true;
  //   component.tableJsonFormat.pageNo = 1;
  //   component.tableJsonFormat.pageSize = event.target.value;
  //   component.getlistRowSelect(event);
  //   expect(component.getlistRowSelect).toHaveBeenCalled();
  //   expect(component.getlistRowSelect).toBeDefined();
  // });

  // it('should check function getTable', () => {
  //   spyOn(component, 'getTable').and.callThrough();
  //   const url = environment.base_url + 'capacity-planning-build/data';
  //   component.tableSettings.data = [{
  //     id: 109578,
  //     checked: false,
  //     projectId: 'C2CFU',
  //     cpNumber: 'CP008AP',
  //     cpDate: '28/10/2020',
  //     productType: 'Ethernet',
  //     sneId: 21101318,
  //     slot: '/shelf=1/slot=10',
  //     cardInFillType: 'New 48 port FE/GigE card',
  //     portAvailability: 48,
  //     status: 'Submitted',
  //     type: 'Holder',
  //     exCode: 'BM/TH',
  //     siteName: 'BIRMINGHAM TELEPHONE HOUSE',
  //     rackId: 'BIRMINGHAM TH:004:014:412:660',
  //     rackPostion: '660',
  //     level: 'Level1',
  //     free: 'Yes',
  //     nodeType: 'METRO',
  //     jobType: 'Card Infil'
  //   }];
  //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
  //   component.tableRecordsCount = component.tableSettings.data.length;
  //   component.tableSettings.status = [
  //     { label: 'Select Status', value: null },
  //     { label: 'Saved', value: 'Saved' },
  //     { label: 'Submitted', value: 'Submitted' },
  //     { label: 'Processing', value: 'Processing' },
  //     { label: 'Submission Failed', value: 'Submission Failed' }
  //   ];
  //   component.getTable();
  //   expect(component.getTable).toHaveBeenCalled();
  //   expect(component.getTable).toBeDefined();
  // });

  // it('should check function loadTabledatBySearch', () => {
  //   spyOn(component, 'loadTabledatBySearch').and.callThrough();
  //   const sitename = 'ABERDARE';
  //   component.loadTabledatBySearch(sitename);
  //   expect(component.loadTabledatBySearch).toHaveBeenCalled();
  //   expect(component.loadTabledatBySearch).toBeDefined();
  //   component.getDataBySiteName(sitename);
  //   component.searchedData = sitename;
  // });

  // it('should check function loadCabledatBySearch', () => {
  //   spyOn(component, 'loadCabledatBySearch').and.callThrough();
  //   const sitename = 'ABERDARE';
  //   component.loadCabledatBySearch(sitename);
  //   expect(component.loadCabledatBySearch).toHaveBeenCalled();
  //   expect(component.loadCabledatBySearch).toBeDefined();
  // });

  // it('should check function loadRackTableBySearch', () => {
  //   const sitename = 'ABERDARE';
  //   component.loadRackTableBySearch('sitename');
  //   const url = environment.base_url + 'cbp-rack/fetch-data?code1141=' + sitename;
  //   spyOn(service, 'get').and.returnValue(of(component.tableSettings.data));
  //   expect(component.loadRackTableBySearch).toHaveBeenCalled();
  //   expect(component.loadRackTableBySearch).toBeDefined();
  // });


  // it('should check function getDataBySiteName', () => {
  //   const sitename = 'ABERDARE';
  //   const url = environment.base_url + 'capacity-planning-build/data?siteName=' + sitename;
  //   component.getDataBySiteName(sitename);
  //   expect(component.getDataBySiteName).toHaveBeenCalled();
  //   expect(component.getDataBySiteName).toBeDefined();
  // });

  // it('should check function clearFilterData', () => {
  //   component.clearFilterData();
  //   expect(component.clearFilterData).toHaveBeenCalled();
  //   expect(component.clearFilterData).toBeDefined();
  // });

  // it('should check function rackclearAll', () => {
  //   component.rackclearAll();
  //   component.rackClearTable = true;
  //   component.showErrorMsg = false;
  //   component.rackTableFilterRecords = [];
  //   component.rackClearEnable = true;
  //   component.rackgetTable();
  //   expect(component.rackclearAll).toHaveBeenCalled();
  //   expect(component.rackclearAll).toBeDefined();
  // });

  // it('should check function exportParam', () => {
  //   const param = '';
  //   component.exportParam(param);
  //   expect(component.exportParam).toHaveBeenCalled();
  //   expect(component.exportParam).toBeDefined();
  // });

  // it('should check function exportDisableFilter', () => {
  //   const ed = 'aaa';
  //   component.exportDisableFilter(ed);
  //   expect(component.exportDisableFilter).toHaveBeenCalled();
  //   expect(component.exportDisableFilter).toBeDefined();
  // });

  // it('should check function exportDisableCable', () => {
  //   const ed = 'aaa';
  //   component.exportDisableCable(ed);
  //   expect(component.exportDisableCable).toHaveBeenCalled();
  //   expect(component.exportDisableCable).toBeDefined();
  // });

  // it('should check function exportData', () => {
  //   component.exportData();
  //   expect(component.exportData).toHaveBeenCalled();
  //   expect(component.exportData).toBeDefined();
  // });

  // it('should check function exportCableData', () => {
  //   component.exportCableData();
  //   expect(component.exportCableData).toHaveBeenCalled();
  //   expect(component.exportCableData).toBeDefined();
  // });

  // it('should check function convertBase64ToBlobData', () => {
  //   const base64Data = 'aaa';
  //   component.convertBase64ToBlobData(base64Data);
  //   expect(component.convertBase64ToBlobData).toHaveBeenCalled();
  //   expect(component.convertBase64ToBlobData).toBeDefined();
  // });

  // it('should check function enableSubmitButton', () => {
  //   const value = 'aaa';
  //   component.enableSubmitButton(value);
  //   expect(component.enableSubmitButton).toHaveBeenCalled();
  //   expect(component.enableSubmitButton).toBeDefined();
  // });

  // it('should check function deleteRow', () => {
  //   const value = 'aaa';
  //   component.deleteRow(value);
  //   expect(component.deleteRow).toHaveBeenCalled();
  //   expect(component.deleteRow).toBeDefined();
  // });

  // it('should check function onDialogClose', () => {
  //   component.onDialogClose();
  //   expect(component.onDialogClose).toHaveBeenCalled();
  //   expect(component.onDialogClose).toBeDefined();
  // });

  // it('should check function updatedRow', () => {
  //   const value = 'aaa';
  //   component.updatedRow(value);
  //   expect(component.updatedRow).toHaveBeenCalled();
  //   expect(component.updatedRow).toBeDefined();
  // });

  // it('should check function deleteRecord', () => {
  //   component.deleteRecord();
  //   expect(component.deleteRecord).toHaveBeenCalled();
  //   expect(component.deleteRecord).toBeDefined();
  // });

  // it('should check function submitButton', () => {
  //   component.submitButton();
  //   expect(component.submitButton).toHaveBeenCalled();
  //   expect(component.submitButton).toBeDefined();
  // });

  // it('should check function wfmtPopup', () => {
  //   component.wfmtPopup();
  //   expect(component.wfmtPopup).toHaveBeenCalled();
  //   expect(component.wfmtPopup).toBeDefined();
  // });

  // it('should check function wfmtTierPopup', () => {
  //   component.wfmtTierPopup();
  //   expect(component.wfmtTierPopup).toHaveBeenCalled();
  //   expect(component.wfmtTierPopup).toBeDefined();
  // });

  // it('should check function exportFilterdRecord', () => {
  //   const ev = 'aaa';
  //   component.exportFilterdRecord(ev);
  //   expect(component.exportFilterdRecord).toHaveBeenCalled();
  //   expect(component.exportFilterdRecord).toBeDefined();
  // });
  
});
