import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicpopupcompnentComponent } from './dynamicpopupcompnent.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('DynamicpopupcompnentComponent', () => {
  let component: DynamicpopupcompnentComponent;
  let fixture: ComponentFixture<DynamicpopupcompnentComponent>;
  let sneid = '20919880';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicpopupcompnentComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicpopupcompnentComponent);
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
    
    
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
