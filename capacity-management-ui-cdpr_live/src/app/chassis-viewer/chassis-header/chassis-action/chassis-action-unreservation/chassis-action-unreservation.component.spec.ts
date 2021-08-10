import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisActionUnreservationComponent } from './chassis-action-unreservation.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisActionUnreservationComponent', () => {
  let component: ChassisActionUnreservationComponent;
  let fixture: ComponentFixture<ChassisActionUnreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SidebarModule, SharedModule],
      declarations: [ ChassisActionUnreservationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisActionUnreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
