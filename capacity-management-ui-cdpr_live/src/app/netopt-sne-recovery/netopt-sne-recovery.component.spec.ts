import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetoptSneRecoveryComponent } from './netopt-sne-recovery.component';

describe('NetoptSneRecoveryComponent', () => {
  let component: NetoptSneRecoveryComponent;
  let fixture: ComponentFixture<NetoptSneRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetoptSneRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetoptSneRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
