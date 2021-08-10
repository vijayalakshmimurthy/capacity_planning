import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CablingAndRackShortfallCapacityReportComponent } from './cabling-and-rack-shortfall-capacity-report.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('CablingAndRackShortfallCapacityReportComponent', () => {
  let component: CablingAndRackShortfallCapacityReportComponent;
  let fixture: ComponentFixture<CablingAndRackShortfallCapacityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CablingAndRackShortfallCapacityReportComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CablingAndRackShortfallCapacityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
