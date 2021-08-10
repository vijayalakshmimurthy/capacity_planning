import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WfmtPopupComponent } from './wfmt-popup.component';

describe('WfmtPopupComponent', () => {
  let component: WfmtPopupComponent;
  let fixture: ComponentFixture<WfmtPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WfmtPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WfmtPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
