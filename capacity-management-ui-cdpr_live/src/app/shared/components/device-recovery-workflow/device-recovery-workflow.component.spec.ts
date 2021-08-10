import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceRecoveryWorkflowComponent } from './device-recovery-workflow.component';

describe('DeviceRecoveryWorkflowComponent', () => {
  let component: DeviceRecoveryWorkflowComponent;
  let fixture: ComponentFixture<DeviceRecoveryWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceRecoveryWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRecoveryWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
