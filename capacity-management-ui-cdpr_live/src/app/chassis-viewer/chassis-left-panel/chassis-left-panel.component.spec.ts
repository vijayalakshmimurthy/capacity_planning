import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChassisLeftPanelComponent } from './chassis-left-panel.component';
import { SharedModule } from '../../shared/shared.module';
import { SrimsNavigatorModule } from '@BT/srims-navigator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('ChassisLeftPanelComponent', () => {
  let component: ChassisLeftPanelComponent;
  let fixture: ComponentFixture<ChassisLeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, SrimsNavigatorModule],
      declarations: [ChassisLeftPanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChassisLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
