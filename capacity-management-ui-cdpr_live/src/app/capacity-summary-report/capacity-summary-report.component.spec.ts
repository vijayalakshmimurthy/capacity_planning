import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitySummaryReportComponent } from './capacity-summary-report.component';
import { AppService } from '../shared/services/app-service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfoModalCdprComponent } from './info-modal-cdpr/info-modal-cdpr.component';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { TabViewModule } from 'primeng-lts/tabview';
describe('CapacitySummaryReportComponent', () => {
  let component: CapacitySummaryReportComponent;
  let fixture: ComponentFixture<CapacitySummaryReportComponent>;
  // tslint: disable - next - line: prefer -const
  let service: AppService;
  // tslint: disable - next - line: prefer -const
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapacitySummaryReportComponent, InfoModalCdprComponent],
      imports: [CommonModule, RouterTestingModule, FormsModule, HttpClientTestingModule, DialogModule,
        SharedModule, BrowserAnimationsModule, MultiSelectModule, TabViewModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacitySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  /*it('should check function getSavePre', () => {
    spyOn(component, 'getSavePre').and.callThrough();
    const ein = '61264718';
    const url = environment.base_url + '/preference-management/preference';
    component.filters = [{
      id: 1,
      filterName: 'Port Speed',
      filterKey: 'port_Speed',
      type: 'checkbox',
      accordian: true,
      values: [{
        id: 1,
        label: 'FE',
        value: 'FE',
        selected: false
      }, {
        id: 2,
        label: 'GE',
        value: 'GE',
        selected: false
      }, {
        id: 3,
        label: '10GE',
        value: '10GE',
        selected: true
      }, {
        id: 4,
        label: '100GE',
        value: '100GE',
        selected: false
      }]
    }];
    component.tableDataObj = {
      totalPages: 1,
      totalRecords: 1284,
      exchangeInfo: [{
        id: 1,
        ein: 609542383,
        exchangeCode: 'ABW',
        siteName: 'ABERCONWY GWYNEDD',
        sauId: 'WNABC',
        totalPorts: 14,
        usedPorts: 13,
        reserved: 0,
        freePorts: 1,
        freeSlots: 1,
        broadBandRem: 0,
        broadBandColo: 0,
        ethernetNonTodPorts: 1,
        ethernetTodPorts: 0,
        inFlightPorts: 0,
        potential10gETHPorts: 20,
        potential10gBBETHPorts: 0,
        plannedPorts: 0,
        buildPorts: 0,
        consumedPorts: 0,
        consumedPortsBackhaul100g: 0,
        buildPortsBackhaul100g: 0,
        plannedPortsBackhaul100g: 0,
        consumedPortsBackhaul10g: 0,
        buildPortsBackhaul10g: 0,
        plannedPortsBackhaul10g: 0,
        consumedPortsBroadband10g: 0,
        buildPortsBroadband10g: 0,
        plannedPortsBroadband10g: 0,
        consumedPortsBroadband1g: 0,
        buildPortsBroadband1g: 0,
        plannedPortsBroadband1g: 0,
        consumedPortsEthernet100gAccess: 0,
        buildPortsEthernet100gAccess: 0,
        plannedPortsEthernet100gAccess: 0,
        consumedPortsEthernet10gHe: 0,
        buildPortsEthernet10gHe: 0,
        plannedPortsEthernet10gHe: 0,
        consumedPortsEthernet10gWmcApolloTef: 0,
        buildPortsEthernet10gWmcApolloTef: 0,
        plannedPortsEthernet10gWmcApolloTef: 0,
        consumedPortsEthernet1gHe: 0,
        buildPortsEthernet1gHe: 0,
        plannedPortsEthernet1gHe: 0,
        consumedPortsEthernetFaste: 0,
        buildPortsEthernetFaste: 0,
        plannedPortsEthernetFaste: 0,
        backhaul100g: '0',
        backhaul10g: '0',
        broadband10g: '2',
        broadband1g: '0',
        ethernet100gAccess: '0',
        ethernet10gHe: '0',
        ethernet10gWmcApolloTef: '0',
        ethernet1gHe: '0',
        ethernetFaste: '0',
        deviceNo: 2,
        cardNo: 6,
        forCastPorts: 0,
        delta: 1,
        broadband1gDelta: 0,
        broadband10gDelta: 0,
        ethernetFasteDelta: 0,
        ethernet1gHeDelta: 0,
        ethernet10gHeDelta: 1,
        ethernet10gWmcDelta: 0,
        ethernet100gAccessDelta: 0,
        backhaul10gDelta: 0,
        backhaul100gDelta: 0,
        inflightTodPortsDelta: 0,
        inflightNonTodPortsDelta: 1
      }]
    };
    spyOn(service, 'post').and.returnValue(of(component.tableDataObj));
    component.getSavePre();
    expect(component.getSavePre).toBeDefined();
  });
  it('should check function onselectSearch', () => {
    spyOn(component, 'onselectSearch').and.callThrough();
    component.pageObj.siteName = 'AA';
    component.pageObj.exchangeCode = 'AA';
    const reqObj = {
      deviceModel: ['7750 SR-12'], deviceUsage: [], deviceType: ['Edge Rt'],
      deviceVersion: [], productType: 'Ethernet', portSpeed: ['10GE'],
      chassisSpeed: [], cardModel: [], cardType: [], cardVersion: [],
      marketType: [], nodeType: [], ein: 609542383, pageNo: 1,
      pageSize: 0, sortOrder: true, siteName: 'SAA', exchangeCode: 'SAA',
      enableSorting: true, sortByField: 'siteName'
    };
    const userresponse = {
      totalPages: 1,
      totalRecords: 1284,
      exchangeInfo: [{
        id: 1,
        ein: 609542383,
        exchangeCode: 'ABW',
        siteName: 'ABERCONWY GWYNEDD',
        sauId: 'WNABC',
        totalPorts: 14,
        usedPorts: 13,
        reserved: 0,
        freePorts: 1,
        freeSlots: 1,
        broadBandRem: 0,
        broadBandColo: 0,
        ethernetNonTodPorts: 1,
        ethernetTodPorts: 0,
        inFlightPorts: 0,
        potential10gETHPorts: 20,
        potential10gBBETHPorts: 0,
        plannedPorts: 0,
        buildPorts: 0,
        consumedPorts: 0,
        consumedPortsBackhaul100g: 0,
        buildPortsBackhaul100g: 0,
        plannedPortsBackhaul100g: 0,
        consumedPortsBackhaul10g: 0,
        buildPortsBackhaul10g: 0,
        plannedPortsBackhaul10g: 0,
        consumedPortsBroadband10g: 0,
        buildPortsBroadband10g: 0,
        plannedPortsBroadband10g: 0,
        consumedPortsBroadband1g: 0,
        buildPortsBroadband1g: 0,
        plannedPortsBroadband1g: 0,
        consumedPortsEthernet100gAccess: 0,
        buildPortsEthernet100gAccess: 0,
        plannedPortsEthernet100gAccess: 0,
        consumedPortsEthernet10gHe: 0,
        buildPortsEthernet10gHe: 0,
        plannedPortsEthernet10gHe: 0,
        consumedPortsEthernet10gWmcApolloTef: 0,
        buildPortsEthernet10gWmcApolloTef: 0,
        plannedPortsEthernet10gWmcApolloTef: 0,
        consumedPortsEthernet1gHe: 0,
        buildPortsEthernet1gHe: 0,
        plannedPortsEthernet1gHe: 0,
        consumedPortsEthernetFaste: 0,
        buildPortsEthernetFaste: 0,
        plannedPortsEthernetFaste: 0,
        backhaul100g: '0',
        backhaul10g: '0',
        broadband10g: '2',
        broadband1g: '0',
        ethernet100gAccess: '0',
        ethernet10gHe: '0',
        ethernet10gWmcApolloTef: '0',
        ethernet1gHe: '0',
        ethernetFaste: '0',
        deviceNo: 2,
        cardNo: 6,
        forCastPorts: 0,
        delta: 1,
        broadband1gDelta: 0,
        broadband10gDelta: 0,
        ethernetFasteDelta: 0,
        ethernet1gHeDelta: 0,
        ethernet10gHeDelta: 1,
        ethernet10gWmcDelta: 0,
        ethernet100gAccessDelta: 0,
        backhaul10gDelta: 0,
        backhaul100gDelta: 0,
        inflightTodPortsDelta: 0,
        inflightNonTodPortsDelta: 1
      }]
    };
    component.onselectSearch(reqObj);
    spyOn(service, 'post').and.returnValue(of(userresponse));
    expect(component.onselectSearch).toBeDefined();
  });
  it('should check function getHeaders', () => {
    spyOn(component, 'getHeaders').and.callThrough();
    component.pageObj.siteName = 'AA';
    component.pageObj.exchangeCode = 'AA';
    const reqObj = {
      deviceModel: ['7750 SR-12'], deviceUsage: [], deviceType: ['Edge Rt'],
      deviceVersion: [], productType: 'Ethernet', portSpeed: ['10GE'],
      chassisSpeed: [], cardModel: [], cardType: [], cardVersion: [],
      marketType: [], nodeType: [], ein: 609542383, pageNo: 1,
      pageSize: 0, sortOrder: true, siteName: 'SAA', exchangeCode: 'SAA',
      enableSorting: true, sortByField: 'siteName'
    };
    const userresponse = {
      totalPages: 1,
      totalRecords: 1284,
      exchangeInfo: [{
        id: 1,
        ein: 609542383,
        exchangeCode: 'ABW',
        siteName: 'ABERCONWY GWYNEDD',
        sauId: 'WNABC',
        totalPorts: 14,
        usedPorts: 13,
        reserved: 0,
        freePorts: 1,
        freeSlots: 1,
        broadBandRem: 0,
        broadBandColo: 0,
        ethernetNonTodPorts: 1,
        ethernetTodPorts: 0,
        inFlightPorts: 0,
        potential10gETHPorts: 20,
        potential10gBBETHPorts: 0,
        plannedPorts: 0,
        buildPorts: 0,
        consumedPorts: 0,
        consumedPortsBackhaul100g: 0,
        buildPortsBackhaul100g: 0,
        plannedPortsBackhaul100g: 0,
        consumedPortsBackhaul10g: 0,
        buildPortsBackhaul10g: 0,
        plannedPortsBackhaul10g: 0,
        consumedPortsBroadband10g: 0,
        buildPortsBroadband10g: 0,
        plannedPortsBroadband10g: 0,
        consumedPortsBroadband1g: 0,
        buildPortsBroadband1g: 0,
        plannedPortsBroadband1g: 0,
        consumedPortsEthernet100gAccess: 0,
        buildPortsEthernet100gAccess: 0,
        plannedPortsEthernet100gAccess: 0,
        consumedPortsEthernet10gHe: 0,
        buildPortsEthernet10gHe: 0,
        plannedPortsEthernet10gHe: 0,
        consumedPortsEthernet10gWmcApolloTef: 0,
        buildPortsEthernet10gWmcApolloTef: 0,
        plannedPortsEthernet10gWmcApolloTef: 0,
        consumedPortsEthernet1gHe: 0,
        buildPortsEthernet1gHe: 0,
        plannedPortsEthernet1gHe: 0,
        consumedPortsEthernetFaste: 0,
        buildPortsEthernetFaste: 0,
        plannedPortsEthernetFaste: 0,
        backhaul100g: '0',
        backhaul10g: '0',
        broadband10g: '2',
        broadband1g: '0',
        ethernet100gAccess: '0',
        ethernet10gHe: '0',
        ethernet10gWmcApolloTef: '0',
        ethernet1gHe: '0',
        ethernetFaste: '0',
        deviceNo: 2,
        cardNo: 6,
        forCastPorts: 0,
        delta: 1,
        broadband1gDelta: 0,
        broadband10gDelta: 0,
        ethernetFasteDelta: 0,
        ethernet1gHeDelta: 0,
        ethernet10gHeDelta: 1,
        ethernet10gWmcDelta: 0,
        ethernet100gAccessDelta: 0,
        backhaul10gDelta: 0,
        backhaul100gDelta: 0,
        inflightTodPortsDelta: 0,
        inflightNonTodPortsDelta: 1
      }]
    };
    component.onselectSearch(reqObj);
    spyOn(service, 'post').and.returnValue(of(userresponse));
    expect(component.onselectSearch).toBeDefined();
  });

  it('should check if customSort', () => {
    const event = {
      order: 1
    };
    component.customSort(event);
    expect(component.customSort).toBeDefined();
  });

  it('should check else customSort', () => {
    const event = {
      order: -1
    };
    component.customSort(event);
    expect(component.customSort).toBeDefined();
  });


  it('should onDialogClose', () => {
    component.onDialogClose(event);
    expect(component.onDialogClose).toBeDefined();
  });

  it('should getlistRowSelect', () => {
    const event: any;
    component.getlistRowSelect(event);
    expect(component.getlistRowSelect).toBeDefined();
  });

  it('should onManageSearchData', () => {
    const event: any;
    component.onManageSearchData(event);
    expect(component.onManageSearchData).toBeDefined();
  });

  it('should selectedFilters', () => {
    const event: any;
    component.selectedFilters(component.filters);
    expect(component.selectedFilters).toBeDefined();
  });

  it('should getUpdatedHeaders', () => {
    const event = { type: 'add' };
    component.getUpdatedHeaders(event);
    expect(component.getUpdatedHeaders).toBeDefined();
  });

  it('should getUpdatedHeaders', () => {
    const event = { type: 'minus' };
    component.getUpdatedHeaders(event);
    expect(component.getUpdatedHeaders).toBeDefined();
  });

  it('should onkeyPressSearch', () => {
    const event = { target: { value: 1 } };
    component.onkeyPressSearch(event);
    expect(component.onkeyPressSearch).toBeDefined();
  });

  it('should getSelectedPageNo', () => {
    const event: any;
    component.getTableData();
    component.getSelectedPageNo(event);
    expect(component.getSelectedPageNo).toBeDefined();
  });

  it('should bindTableProperties', () => {
    const event: any;
    component.bindTableProperties(event);
    expect(component.bindTableProperties).toBeDefined();
  });

  it('should bindTableProperties', () => {
    const event = { type: ' ' };
    component.tableSettings.paginator = true;
    component.bindTableProperties(event);
    expect(component.bindTableProperties).toBeDefined();
  });

  it('should expandFilterResults', () => {
    const txtBtn = document.getElementById('changeButton').innerText;
    component.expandFilterResults();
    expect(component.expandFilterResults).toBeDefined();
  });
  it('should expandFilterResults', () => {
    const txtBtn = document.getElementById('changeButton').innerText;
    component.expandFilterResults();
    expect(component.expandFilterResults).toBeDefined();
  });

  it('should clearFilters', () => {
    component.clearFilters();
    expect(component.clearFilters).toBeDefined();
  });

  it('should submitFilters', () => {
    component.submitFilters();
    expect(component.submitFilters).toBeDefined();
  });

  it('should submitFilters', () => {
    component.submitFilters();
    expect(component.submitFilters).toBeDefined();
  });

  it('should check  updateFiltersFromChild', () => {
    const columnData = { columnIndex: 'delta' };
    component.updateFiltersFromChild(columnData);
    expect(component.updateFiltersFromChild).toBeDefined();
  });

  it('should onSavePreference', () => {
    component.onSavePreference();
    expect(component.onSavePreference).toBeDefined();
  });

  it('should showFilterPopup', () => {
    component.showFilterPopup();
    expect(component.showFilterPopup).toBeDefined();
  });

  it('should showBasicDialoginfo', () => {
    component.showBasicDialoginfo();
    expect(component.showBasicDialoginfo).toBeDefined();
  });

  it('should selectedColumnChange', () => {
    const event: any;
    component.selectedColumnChange();
    component.selectedColumnChange(event);
    expect(component.selectedColumnChange).toBeDefined();
  });

  it('should check  navigateUrl', () => {
    const columnData = { columnIndex: 'siteName' };
    component.navigateUrl(columnData);
    expect(component.navigateUrl).toBeDefined();
  });

  it('should check  navigateUrl', () => {
    const columnData = { columnIndex: 'delta' };
    component.navigateUrl(columnData);
    expect(component.navigateUrl).toBeDefined();
  });

  it('should check  navigateUrl', () => {
    const columnData = { columnIndex: 'broadband1gDelta' };
    component.navigateUrl(columnData);
    expect(component.navigateUrl).toBeDefined();
  });

  it('should check  navigateUrl', () => {
    const columnData = { columnValue: 1 };
    component.navigateUrl(columnData);
    expect(component.navigateUrl).toBeDefined();
  });

  it('should check  navigateUrl', () => {
    const columnData = { columnValue: 0 };
    component.navigateUrl(columnData);
    expect(component.navigateUrl).toBeDefined();
  });


  it('should check  convert', () => {
    let header = 'Selected Filter -';
    header += component.selectedFilterString as string;
    const param = 'csv';
    component.convert(param);
    expect(component.convert).toBeDefined();
  });

  it('should check  convert', () => {
    const param = 'pdf';
    component.convert(param);
    expect(component.convert).toBeDefined();
  });*/

});
