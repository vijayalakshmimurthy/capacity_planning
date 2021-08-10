// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { DiversityReportComponent } from './diversity-report.component';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppService } from '../shared/services/app-service';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { SearchFilterComponent } from './search-filter/search-filter.component';
// import { InfoDiversityComponent } from './info-diversity/info-diversity.component';
// import { DiversityReportTableComponent } from './diversity-report-table/diversity-report-table.component';
// import { TableModule } from 'primeng/table';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { SharedModule } from '../shared/shared.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { environment } from '../../environments/environment';


// describe('DiversityReportComponent', () => {
//   let component: DiversityReportComponent;
//   let fixture: ComponentFixture<DiversityReportComponent>;
//   // tslint:disable-next-line:prefer-const
//   let service: AppService;
//   // tslint:disable-next-line:prefer-const
//   let httpTestingController: HttpTestingController;
//   const formBuilder: FormBuilder = new FormBuilder();
//   const mockData = {
//     diversityGroupForecastList: '',
//     portAvailablity: 'Not Enough Capacity'
//   };
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ DiversityReportComponent, SearchFilterComponent, InfoDiversityComponent, DiversityReportTableComponent],
//       imports: [CommonModule, HttpClientTestingModule, BrowserAnimationsModule, TableModule, AutoCompleteModule,
//       ReactiveFormsModule, SharedModule ],
//       providers: [AppService, RouterTestingModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//     service = TestBed.get(AppService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DiversityReportComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//   // it('should create', () => {
//   //   component.roleName = 'USER';
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should check function ngOnInit', () => {
//   //   spyOn(component, 'ngOnInit').and.callThrough();
//   //   component.ngOnInit();
//   //   component.role();
//   //   expect(component.ngOnInit).toHaveBeenCalled();
//   //   expect(component.ngOnInit).toBeDefined();
//   // });
//   // it('should check function role', () => {
//   //   spyOn(component, 'role').and.callThrough();
//   //   component.roleName = 'PROD_CE_VIEWER';
//   //   component.role();
//   //   expect(component.role).toHaveBeenCalled();
//   //   expect(component.role).toBeDefined();
//   // });
//   // it('should check function showFilter', () => {
//   //   spyOn(component, 'showFilter').and.callThrough();
//   //   component.display = true;
//   //   component.showFilter();
//   //   expect(component.showFilter).toHaveBeenCalled();
//   //   expect(component.showFilter).toBeDefined();
//   // });
//   // it('should check function onDialogClose', () => {
//   //   spyOn(component, 'onDialogClose').and.callThrough();
//   //   const event = true;
//   //   component.display = event;
//   //   component.onDialogClose(event);
//   //   expect(component.onDialogClose).toHaveBeenCalled();
//   //   expect(component.onDialogClose).toBeDefined();
//   // });
//   // it('should check function showInfo', () => {
//   //   spyOn(component, 'showInfo').and.callThrough();
//   //   component.displayInfo = true;
//   //   component.showInfo();
//   //   expect(component.showInfo).toHaveBeenCalled();
//   //   expect(component.showInfo).toBeDefined();
//   // });
//   // it('should check function onDialogInfoClose', () => {
//   //   spyOn(component, 'onDialogInfoClose').and.callThrough();
//   //   const event = true;
//   //   component.displayInfo = event;
//   //   component.onDialogInfoClose(event);
//   //   expect(component.onDialogInfoClose).toHaveBeenCalled();
//   //   expect(component.onDialogInfoClose).toBeDefined();
//   // });
//   // it('should check function OnsearchGroup', () => {
//   //   spyOn(component, 'OnsearchGroup').and.callThrough();
//   //   component.request = {popLocation: 'MBF',
//   //                       diversityGroupDetailForecastList: [{noOfPorts: '10',
//   //                       diversityGroupName: 'btran_lon_66'}]};
//   //   //component.updateButton = false;
//   //   component.exportCSV();
//   //   component.getTableData();
//   //   component.OnsearchGroup(component.request);
//   //   expect(component.OnsearchGroup).toHaveBeenCalled();
//   //   expect(component.OnsearchGroup).toBeDefined();
//   // });
//   // it('should check function getTableData', () => {
//   //   spyOn(component, 'getTableData').and.callThrough();
//   //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data';
//   //   component.tableResponse = [{
//   //     search: 'No. of Ports : 10, Diversity Group Name : btran_lon_66, PoP Location : MBF',
//   //     diversityGroupForecastList: [{
//   //       sneId: '20926620',
//   //       cardDetail: 'Dummy IMM Module (card = 2/1)',
//   //       freePortDetail: '2/1/7/1',
//   //       cardStatus: 'Installed',
//   //       // tslint:disable-next-line:max-line-length
//   //       scenario: 'Scenario-1-Stage1-cardtod=Y-cardstatus=Installed-porttod=Capable-portCUF=Ethernet Access-DG=btran_lon_66-CardID=20926620:/shelf=1/slot=2/sub_slot=1-DisplayName=Dummy IMM Module',
//   //       diversityGroupName: 'BTRAN-LLN-01,BTRAN-test44,btran_lon_66',
//   //       cardId: '20926620:/shelf=1/slot=2/sub_slot=1',
//   //       cardDGName: 'BTRAN-LLN-01,BTRAN-test44,btran_lon_66'
//   //     }],
//   //     portAvailablity: ''
//   //   }];
//   //   //component.updateButton = true;
//   //   component.getTableData();
//   //   spyOn(service, 'post').and.returnValue(of(component.tableResponse));
//   //   expect(component.getTableData).toHaveBeenCalled();
//   //   expect(component.getTableData).toBeDefined();
//   // });
//   // it('should check function getTableData for empty', () => {
//   //   spyOn(component, 'getTableData').and.callThrough();
//   //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data';
//   //   component.tableResponse = [{
//   //     search: 'No. of Ports : 10, Diversity Group Name : btran_lon_66, PoP Location : MBF',
//   //     diversityGroupForecastList: [],
//   //     portAvailablity: 'Not Enough Capacity'
//   //   }];
//   //  // component.updateButton = false;
//   //   component.getTableData();
//   //   spyOn(service, 'post').and.returnValue(of(component.tableResponse));
//   //   expect(component.getTableData).toHaveBeenCalled();
//   //   expect(component.getTableData).toBeDefined();
//   // });
//   // it('should check function exportCSV', () => {
//   //   spyOn(component, 'exportCSV').and.callThrough();
//   //   component.request = {popLocation: 'MBF',
//   //   diversityGroupDetailForecastList: [{noOfPorts: '10',
//   //   diversityGroupName: 'btran_lon_66'}]};
//   //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-download';
//   //   // tslint:disable-next-line:max-line-length
//   //   component.exportData = '"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';
//   //   component.fileName = 'Diversity_Group_Forecast.xlsx';
//   //   const userresponse = {

//   //     headers: {
//   //       ContentType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
//   //       ContentDisposition: ['attachment;filename=diversityGroupForecast.xlsx']
//   //     },
//   //     body: {
//   //       FileName: component.fileName ,
//   //       FileContent: component.exportData
//   //     },
//   //     statusCode: 'OK',
//   //     statusCodeValue: 200
//   //   };
//   //   component.exportCSV();
//   //   spyOn(service, 'post').and.returnValue(of(userresponse));
//   //   expect(component.exportCSV).toBeDefined();
//   // });
//   // it('should check function editDGName', () => {
//   //   spyOn(component, 'editDGName').and.callThrough();
//   //   component.editDGButton = true;
//   //   component.editDGName();
//   //   expect(component.editDGName).toHaveBeenCalled();
//   //   expect(component.editDGName).toBeDefined();
//   // });
//   // it('should check function getFilterData', () => {
//   //   spyOn(component, 'getFilterData').and.callThrough();
//   //   component.checkflag = true;
//   //   const event = 'BTRAN-lo';
//   //   // tslint:disable-next-line:max-line-length
//   //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data/diversitygroupname?diversitygroupname=' + event;
//   //   component.groupData = [];
//   //   component.getFilterData(event);
//   //   spyOn(service, 'get').and.returnValue(of(component.groupData));
//   //   expect(component.getFilterData).toHaveBeenCalled();
//   //   expect(component.getFilterData).toBeDefined();
//   // });
//   // it('should check function getFilterData', () => {
//   //   spyOn(component, 'getFilterData').and.callThrough();
//   //   component.checkflag = false;
//   //   const event = 'BTRAN-lo';
//   //   // tslint:disable-next-line:max-line-length
//   //   const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data/diversitygroupname?diversitygroupname=' + event;
//   //   component.groupData = ['BTRAN-LON-44', 'BTRAN-CEL-67'];
//   //   component.getFilterData(event);
//   //   spyOn(service, 'get').and.returnValue(of(component.groupData));
//   //   expect(component.getFilterData).toHaveBeenCalled();
//   //   expect(component.getFilterData).toBeDefined();
//   // });
//   // it('should check function onDialogUpdateClose', () => {
//   //   spyOn(component, 'onDialogUpdateClose').and.callThrough();
//   //   const event = true;
//   //   component.displayPopup = event;
//   //   component.onDialogUpdateClose(event);
//   //   expect(component.onDialogUpdateClose).toHaveBeenCalled();
//   //   expect(component.onDialogUpdateClose).toBeDefined();
//   // });
//   // it('should check function showUpdatePopup', () => {
//   //   spyOn(component, 'showUpdatePopup').and.callThrough();
//   //   component.showUpdatePopup();
//   //   expect(component.showUpdatePopup).toHaveBeenCalled();
//   //   expect(component.showUpdatePopup).toBeDefined();
//   // });
// });
