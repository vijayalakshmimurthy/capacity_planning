import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatellitedataComponent } from './satellitedata.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SatellitedataComponent', () => {
  let component: SatellitedataComponent;
  let fixture: ComponentFixture<SatellitedataComponent>;
  let sneid = '20919880';
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatellitedataComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatellitedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // it('should check function ngOnInit', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   component.deviceConfiguration.target = [];
  //   component.deviceConfiguration.chassisText[0].text = sneid;
  //   component.deviceConfiguration.chassisText[0].x = 380;
  //   component.deviceConfiguration.chassisText[0].y = 8;
    
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toBeDefined();
  // });
  // it('should check function ondblClickNavigate', () => {
  //   spyOn(component, 'ondblClickNavigate').and.callThrough();
  //   const data = {
  //     sneid: sneid,
  //     shelfnumber : component.shelfnumber,
  //     Index : component.Index
  //   };
  //   component.ondblClickNavigate(sneid,'2',0,'event');
  //   component.sneidforcardmovesat.emit(data);
  //   component.redirectpageto3dsat.emit(true);
  //   expect(component.ondblClickNavigate).toBeDefined();
  // });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
