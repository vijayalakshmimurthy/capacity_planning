import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisActionReservationComponent } from './chassis-action-reservation.component';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { SharedModule } from '../../../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisActionReservationComponent', () => {
  let component: ChassisActionReservationComponent;
  let fixture: ComponentFixture<ChassisActionReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DropdownModule, TableModule, SidebarModule, SharedModule],
      declarations: [ ChassisActionReservationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisActionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
