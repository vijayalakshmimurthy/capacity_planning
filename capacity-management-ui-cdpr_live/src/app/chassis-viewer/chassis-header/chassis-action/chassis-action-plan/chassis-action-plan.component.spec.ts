import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisActionPlanComponent } from './chassis-action-plan.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisActionPlanComponent', () => {
  let component: ChassisActionPlanComponent;
  let fixture: ComponentFixture<ChassisActionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChassisActionPlanComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
