import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisRightPanelComponent } from './chassis-right-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisRightPanelComponent', () => {
  let component: ChassisRightPanelComponent;
  let fixture: ComponentFixture<ChassisRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, OverlayPanelModule, TableModule],
      declarations: [ChassisRightPanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
