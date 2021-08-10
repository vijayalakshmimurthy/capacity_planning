import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortfallAutomationDashboardBarchartComponent } from './shortfall-automation-dashboard-barchart.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ShortfallAutomationDashboardBarchartComponent', () => {
  let component: ShortfallAutomationDashboardBarchartComponent;
  let fixture: ComponentFixture<ShortfallAutomationDashboardBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortfallAutomationDashboardBarchartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortfallAutomationDashboardBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
