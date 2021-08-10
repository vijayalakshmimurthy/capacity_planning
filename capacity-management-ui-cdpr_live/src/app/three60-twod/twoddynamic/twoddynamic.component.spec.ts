import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoddynamicComponent } from './twoddynamic.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('TwoddynamicComponent', () => {
  let component: TwoddynamicComponent;
  let fixture: ComponentFixture<TwoddynamicComponent>;
  const sneid = '20919880';
  const firstTabData =  [ { "sneId": "20919880", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "2T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R12", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "1" }, { "sneId": "20914626", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "2T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R15", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "1" }, { "sneId": "20901773", "deviceUsage": "MSE", "phaseEnabled": "No", "chassisSpeed": "2T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R6-1", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20880720", "deviceUsage": "MSE", "phaseEnabled": "No", "chassisSpeed": "2T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R15", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20873318", "deviceUsage": "MSE", "phaseEnabled": "No", "chassisSpeed": "1T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R15", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20677516", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "500G", "cpmType": "CPM3", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R15", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20387227", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "500G", "cpmType": "CPM3", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R15", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20293007", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "1T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R12", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "20281707", "deviceUsage": "MSE", "phaseEnabled": "Yes", "chassisSpeed": "500G", "cpmType": "CPM3", "market": "Mkt B", "timosVersion": "TiMOS-C-15.0.R6-1", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "1002212", "deviceUsage": "EEA", "phaseEnabled": "Yes", "chassisSpeed": "1T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-13.0.R12-1", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "860152", "deviceUsage": "MSE", "phaseEnabled": "No", "chassisSpeed": "1T", "cpmType": "CPM5", "market": "Mkt B", "timosVersion": "TiMOS-C-13.0.R12", "pre2008": "No", "deviceModel": "7750 SR-12", "is_satellite_present": "0" }, { "sneId": "262372", "deviceUsage": "EEA", "phaseEnabled": "Yes", "chassisSpeed": "500G", "cpmType": "CPM3", "market": "Mkt B", "timosVersion": "TiMOS-C-13.0.R12-1", "pre2008": "Yes", "deviceModel": "7750 SR-12", "is_satellite_present": "0" } ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoddynamicComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoddynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should check function ngOnInit', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   component.deviceConfiguration.chassisText[0].x = 280;
  //   component.deviceConfiguration.chassisText[0].y = 21;
  //   component.sneidlist  = component.firstTabData.map(sne => sne.sneId);
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toBeDefined();
  // });
  // it('should check onMouseover', () => {
  //   const data = {
  //     val : 20919880,
  //     index : 0
  //   };
  //   spyOn(component, 'onMouseover').and.callThrough();
  //   component.onMouseover(sneid);
  //   component.hoverdata.emit(data);
  //   expect(component.onMouseover).toBeDefined();
  // });
  // it('should check function onMouseover', () => {
  //   spyOn(component, 'onMouseover').and.callThrough();
  //   const sneidlist = component.firstTabData.map(sne => sne.sneId);
  //   const index = sneidlist.indexOf(sneid);
  
  //   const data = {
  //     val : sneid,
  //     index : index
  //   };
  //   component.onMouseover(sneid);
  //   component.hoverdata.emit(data);
  //   expect(component.onMouseover).toBeDefined();
  // });
  // it('should check function onMouseLeave', () => {
  //   spyOn(component, 'onMouseLeave').and.callThrough();
  //   const data = {
  //     val : ' ',
  //     index : 0
  //   };
  //   component.onMouseLeave(0);
  //   component.hoverdata.emit(data);
  //   expect(component.onMouseLeave).toBeDefined();
  // });
  // it('should check function openpopup', () => {
  //   spyOn(component, 'openpopup').and.callThrough();
  //   const data = {
  //     val : true,
  //     sneid: sneid
  //   };
  //   component.openpopup(0,data);
  //   component.popupdata.emit(data);
  //   expect(component.openpopup).toBeDefined();
  // });
  // it('should check function ondblClickNavigate', () => {
  //   spyOn(component, 'ondblClickNavigate').and.callThrough();
  //   component.timer = 0;
  //   component.isSingleClick  = true;
  //   clearTimeout(component.timer);
  //   const data = {
  //     sneid: sneid
  //   };
  //   component.ondblClickNavigate(sneid,'event');
  //   component.sneidforcardmove.emit(data);
  //   component.redirectpageto3d.emit(true);
  //   expect(component.ondblClickNavigate).toBeDefined();
  // });
  // it('should check function opensatellitepopup', () => {
  //   spyOn(component, 'opensatellitepopup').and.callThrough();
  //   const data = {
  //     sneid: sneid
  //   };
  //   component.opensatellitepopup(sneid);
  //   component.popupsatellitedata.emit(data);
  //   expect(component.opensatellitepopup).toBeDefined();
  // });
});
