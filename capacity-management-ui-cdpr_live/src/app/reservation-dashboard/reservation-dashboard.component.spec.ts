// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReservationDashboardComponent } from './reservation-dashboard.component';
// import { ReservationDashboardPiechartComponent } from './reservation-dashboard-piechart/reservation-dashboard-piechart.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { SharedModule } from '../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppService } from '../shared/services/app-service';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { of } from 'rxjs';
// import { environment } from '../../environments/environment';

// describe('ReservationDashboardComponent', () => {
//   let component: ReservationDashboardComponent;
//   let fixture: ComponentFixture<ReservationDashboardComponent>;
//   // tslint:disable-next-line:prefer-const
//   let service: AppService;
//   // tslint:disable-next-line:prefer-const
//   let httpTestingController: HttpTestingController;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
//         declarations: [ ReservationDashboardComponent, ReservationDashboardPiechartComponent],
//         providers: [AppService],
//         schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//     service = TestBed.get(AppService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReservationDashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   //   component. tableSettings = {
//   //     frozenColumns: '', headers: [], data: [], paginator: true, customSort: true, 
//   // clientSorting: false, scrollHeight: '450px', sort: false,
//   //     columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
//   //     frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0,
//   //     rowGroupData: { groupColName: null, viewType: null }, refreshPagination : false
//   //   };
//   // });

//   // it('should check function getPiCharts', () => {
//   //   spyOn(component, 'getPiCharts').and.callThrough();
//   //   const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-data ';
//   //   const res = {
//   //       totalPortVersusReservation: [{
//   //           labels: ['Total Ports across Sites', 'Total Reserved Ports across Sites'],
//   //           datasets: [{
//   //           data: [483267, 12436]
//   //           }]
//   //       }],
//   //       reservationCategory: [{
//   //           labels: ['P2PE', 'Voice', 'DCN', 'Broadband', 'Backhaul', 'Ethernet', 'Blocked', 'Infrastructure', 'PRTC'],
//   //           datasets: [{
//   //           data: [86, 30, 1, 415, 186, 11514, 61, 141, 2]
//   //           }]
//   //       }]
//   //   };
//   //   spyOn(service, 'get').and.returnValue(of(res));
//   //   component.reservationData = res;
//   //   component.getPiCharts();
//   //   expect(component.getPiCharts).toHaveBeenCalled();
//   //   expect(component.getPiCharts).toBeDefined();
//   // });

//   // it('should check function getTable', () => {
//   //   spyOn(component, 'getTable').and.callThrough();
//   //   const getTable = {
//   //       totalPages: 14,
//   //       totalRecords: 1380,
//   //       headers: null,
//   //       data: [{
//   //           resdSiteName: 'ABERCONWY GWYNEDD',
//   //           resdExCode: 'ABW',
//   //           resdTotalReservedPorts: 18,
//   //           resdInfrastructure: 0,
//   //           resdBlocked: 0,
//   //           resdBackhaul: 0,
//   //           resdBroadband: 7,
//   //           resdEthernet: 11,
//   //           resdP2pe: 0,
//   //           resdVoice: 0,
//   //           resdPrtc: 0,
//   //           resdDcn: 0
//   //       }]
//   //   };
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   spyOn(service, 'post').and.returnValue(of(getTable));
//   //   component.getTable();
//   //   fixture.detectChanges();
//   //   expect(component.getTable).toHaveBeenCalled();
//   //   expect(component.getTable).toBeDefined();
//   //   component.tableSettings.data = getTable.data;
//   //   component.tableSettings.totalRecords = getTable.totalRecords;
//   // });

//   // it('should check function downloadXLXReport', () => {
//   //   spyOn(component, 'downloadXLXReport').and.callThrough();
//   //   const res = 'aaa';
//   //   // const reservationExportUrl = environment.base_url + 'reservation-dashboard/dashboard-table-data-download';
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   spyOn(service, 'post').and.returnValue(of(res));
//   //   component.downloadXLXReport();
//   //   fixture.detectChanges();
//   //   expect(component.downloadXLXReport).toHaveBeenCalled();
//   //   expect(component.downloadXLXReport).toBeDefined();
//   // });

//   // it('should run #ngOnInit()', async () => {
//   //   spyOn(component, 'ngOnInit').and.callThrough();
//   //   const reservationHeaderUrl = environment.base_url + 'generic-header/grid-resd-header/';
//   //   const reservationHeaderColumnResponse = [{
//   //     id: 164,
//   //     field: 'resdSiteName',
//   //     header: 'Site Name',
//   //     fixed: false,
//   //     type: 'null',
//   //     childType: true,
//   //     pageName: 'RESD',
//   //     productName: null,
//   //     deviceModel: null,
//   //     properties: {
//   //       gpId: 164,
//   //       gid: '164',
//   //       sort: true,
//   //       editable: false,
//   //       filter: false,
//   //       link: false,
//   //       url: null,
//   //       urlParameter: null,
//   //       colour: '#333'
//   //     },
//   //     values: [],
//   //     child: [],
//   //     dependendColumns: null,
//   //     visible: true
//   // }];
//   //   service = fixture.debugElement.injector.get(AppService);
//   //   spyOn(service, 'get').and.returnValue(of(reservationHeaderColumnResponse));
//   //   component.ngOnInit();
//   //   fixture.detectChanges();
//   //   expect(component.ngOnInit).toHaveBeenCalled();
//   //   expect(component.ngOnInit).toBeDefined();
//   //   component.headerData = reservationHeaderColumnResponse;
//   //   component.tableSettings.headers = component.headerData;
//   // });

//   // it('should check function getSelectedPageNo', () => {
//   //   spyOn(component, 'getSelectedPageNo').and.callThrough();
//   //   const event = {  page: 0 };
//   //   component.getSelectedPageNo('a');
//   //   expect(component.getSelectedPageNo).toBeDefined();
//   // });
//   // it('should check function getlistRowSelect', () => {
//   //   spyOn(component, 'getlistRowSelect').and.callThrough();
//   //   const event = { target: { value: 100 }};
//   //   component.getlistRowSelect(event);
//   //   expect(component.getlistRowSelect).toBeDefined();
//   // });

// //   it('should check function customSort for event order 1', () => {
// //     spyOn(component, 'customSort').and.callThrough();
// //     const event = { order: 1};
// //     const res = [{
// //       resdSiteName: 'ABERCONWY GWYNEDD',
// //       resdExCode: 'ABW',
// //       resdTotalReservedPorts: 18,
// //       resdInfrastructure: 0,
// //       resdBlocked: 0,
// //       resdBackhaul: 0,
// //       resdBroadband: 7,
// //       resdEthernet: 11,
// //       resdP2pe: 0,
// //       resdVoice: 0,
// //       resdPrtc: 0,
// //       resdDcn: 0
// //     }];
// //     service = fixture.debugElement.injector.get(AppService);
// //     spyOn(service, 'post').and.returnValue(of(res));
// //     component.customSort(event);
// //     fixture.detectChanges();
// //     expect(component.customSort).toHaveBeenCalled();
// //     expect(component.customSort).toBeDefined();
// //   });

// //   it('should check function customSort for event order -1', () => {
// //     spyOn(component, 'customSort').and.callThrough();
// //     const event = { order: -1};
// //     const res = [{
// //       resdSiteName: 'azsw',
// //       resdExCode: 'dc',
// //       resdTotalReservedPorts: 18,
// //       resdInfrastructure: 0,
// //       resdBlocked: 0,
// //       resdBackhaul: 0,
// //       resdBroadband: 7,
// //       resdEthernet: 11,
// //       resdP2pe: 0,
// //       resdVoice: 0,
// //       resdPrtc: 0,
// //       resdDcn: 0
// //     }];
// //     service = fixture.debugElement.injector.get(AppService);
// //     spyOn(service, 'post').and.returnValue(of(res));
// //     component.customSort(event);
// //     fixture.detectChanges();
// //     expect(component.customSort).toHaveBeenCalled();
// //     expect(component.customSort).toBeDefined();
// //   });
// // });
// });