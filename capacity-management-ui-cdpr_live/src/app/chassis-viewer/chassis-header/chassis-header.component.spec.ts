import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisHeaderComponent } from './chassis-header.component';
import { ChassisActionComponent } from '../chassis-header/chassis-action/chassis-action.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionReservationComponent } from '../chassis-header/chassis-action/chassis-action-reservation/chassis-action-reservation.component';
// tslint:disable-next-line:max-line-length
import { ChassisActionUnreservationComponent } from '../chassis-header/chassis-action/chassis-action-unreservation/chassis-action-unreservation.component';
import { ChassisActionUsageComponent } from '../chassis-header/chassis-action/chassis-action-usage/chassis-action-usage.component';
import { ChassisActionPlanComponent } from '../chassis-header/chassis-action/chassis-action-plan/chassis-action-plan.component';
import { SharedModule } from '../../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisHeaderComponent', () => {
  let component: ChassisHeaderComponent;
  let fixture: ComponentFixture<ChassisHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, SidebarModule, DropdownModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ChassisHeaderComponent, ChassisActionComponent, ChassisActionReservationComponent,
        ChassisActionUnreservationComponent, ChassisActionUsageComponent, ChassisActionPlanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
