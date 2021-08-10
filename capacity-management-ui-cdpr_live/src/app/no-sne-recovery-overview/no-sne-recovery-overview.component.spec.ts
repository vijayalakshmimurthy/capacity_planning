import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSneRecoveryOverviewComponent } from './no-sne-recovery-overview.component';

describe('NoSneRecoveryOverviewComponent', () => {
  let component: NoSneRecoveryOverviewComponent;
  let fixture: ComponentFixture<NoSneRecoveryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSneRecoveryOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSneRecoveryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
