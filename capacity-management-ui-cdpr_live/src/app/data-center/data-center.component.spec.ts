import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCenterComponent } from './data-center.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { AppService } from '../shared/services/app-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('DataCenterComponent', () => {
  let component: DataCenterComponent;
  let fixture: ComponentFixture<DataCenterComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCenterComponent ],
      imports: [FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule, TabViewModule,RouterTestingModule,RouterModule],
      providers: [AppService ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should check ngOniit', () => {
  //   expect(component.ngOnInit).toBeTruthy();
  // });

  // it('should check ngOniit download click function', () => {
  //   expect(component.onDownloadClick).toBeTruthy();
  // });

  // it('should check function tabChange', () => {
  //   spyOn(component, 'tabChange').and.callThrough();
  //   const event = {
  //     originalEvent: {
  //       target: {
  //         innerText: 'Manage Data Centre'
  //       }
  //     }

  //   };
  //   component.tabChange(event);
  //   expect(component.tabChange).toBeDefined();
  // });
  // it('should check function onkeyPressSearchBox', () => {
  //   spyOn(component, 'onKeyPressSearchBox').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'yz'
  //     }
  //   };
  //   component.filterData = ['YAIOF', 'YAIOF/PP'];
  //   component.onKeyPressSearchBox(event);
  //   expect(component.onKeyPressSearchBox).toBeDefined();
  // });
  // it('should check function onselectSearch', () => {
  //   spyOn(component, 'onSelectSearch').and.callThrough();
  //   const event = 'YAIOF';
  //   const userresponse = [{
  //     code1141: 'YZUNN',
  //     creationDate: '2020-07-01T05:55:19.000+0000',
  //     dataCentreName: 'Ark - Farnborough Crown Hosting (Cody Pk)',
  //     etherflowsGt1GB: null,
  //     futureAvailablity: null,
  //     id: 412856,
  //     maxEVCBandwidth: '2.5Gb',
  //     maxEtherwayBandwidth: '10Gb',
  //     sauCode: 'YZUNN',
  //     siteName: 'FARNBOROUGH IVELY ROAD CODY PARK',
  //     sneId: 20722652,
  //     tRSArea: 'YZUNN/L'
  //   }];
  //   component.onSelectSearch(event);
  //   expect(component.onSelectSearch).toBeDefined();
  // });
  // it('should check function deleteRowPopup', () => {
  //   spyOn(component, 'deleteRowPopup').and.callThrough();
  //   component.displayBasic = true;
  //   component.popupType = '30vw';
  //   const deleteobj = 412856;
  //   component.deleteRowPopup(deleteobj);
  //   expect(component.deleteRowPopup).toBeDefined();
  // });
  // it('should check function modelCancel', () => {
  //   spyOn(component, 'modelCancel').and.callThrough();
  //   const event = '';
  //   component.popupType = '';
  //   component.displayBasic = false;
  //   component.rowFordelete = null;
  //   component.modelCancel(event);
  //   expect(component.modelCancel).toBeDefined();
  // });
  // it('should check function deleteRow', () => {
  //   spyOn(component, 'deleteRow').and.callThrough();
  //   const id = 41235;
  //   component.displayBasic = false;
  //   component.popupType = '';
  //   component.deleteRow();
  //   expect(component.deleteRow).toBeDefined();
  // });

  // it('should check function updateRow', () => {
  //   //spyOn(component, 'updateRow').and.callThrough();
  //   let event : any;
  //   const id = 41235;
  //   component.displayBasic = false;
  //   component.popupType = '';
  //   component.updateRow(event);
  //   expect(component.updateRow).toBeDefined();
  // });


  // it('should check function onManageSearchData', () => {
  //   //spyOn(component, 'onManageSearchData').and.callThrough();
  //   let event : any;
  //   //const id = 41235;
  //   //component.displayBasic = false;
  //  // component.popupType = '';
  //   component.onManageSearchData(event);
  //   expect(component.onManageSearchData).toBeDefined();
  // });

  // // it('should check function submitfile', () => {
  // //   //spyOn(component, 'submitfile').and.callThrough();
  // //   let event : [{
  // //     code1141: 'YZUNN',
  // //     creationDate: '2020-07-01T05:55:19.000+0000',
  // //     dataCentreName: 'Ark - Farnborough Crown Hosting (Cody Pk)',
  // //     etherflowsGt1GB: null,
  // //     futureAvailablity: null,
  // //     id: 412856,
  // //     maxEVCBandwidth: '2.5Gb',
  // //     maxEtherwayBandwidth: '10Gb',
  // //     sauCode: 'YZUNN',
  // //     siteName: 'FARNBOROUGH IVELY ROAD CODY PARK',
  // //     sneId: 20722652,
  // //     tRSArea: 'YZUNN/L'
  // //   }];
   
  // //   component.submitfile(event);
  // //   expect(component.submitfile).toBeDefined();
  // // });

  // it('should check function submitFileData', () => {
  //   spyOn(component, 'submitFileData').and.callThrough();
  //   component.submitFileData();
  //   expect(component.submitFileData).toBeDefined();
  // });
  

  // it('should check submitData', () => {
  //   component.submitData();
  //   expect(component.submitData).toBeDefined();
  // });

  // // it('should check function showSucessresult', () => {
   
  // //   spyOn(component, 'showSucessresult').and.callThrough();
  // //   component.displayBasic = false;
  // //   component.popupType = '';
  // //   component.editMode = false;
  // //   component.tableType = 'successTable';
  // //  component.showSucessresult();
  // //   expect(component.showSucessresult).toBeDefined();
  // // });
  
  // it('should check onfileUploadFromActionCancel', () => {
  //   component.onfileUploadFromActionCancel();
  //   expect(component.onfileUploadFromActionCancel).toBeDefined();
  // });
  // // it('should check showFailedresult', () => {
  // //   component.showFailedresult();
  // //   expect(component.showFailedresult).toBeDefined();
  // // });
  
  // it('should check modelfileuploadCancel', () => {
  //   component.modelfileuploadCancel();
  //   expect(component.modelfileuploadCancel).toBeDefined();
  // });
  
  // it('should check onSearchdataUpdateCancel', () => {
  //   component.onSearchdataUpdateCancel();
  //   expect(component.onSearchdataUpdateCancel).toBeDefined();
  // });
  

  
});
