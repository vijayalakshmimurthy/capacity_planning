import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackPopupComponent } from './rack-popup.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('RackPopupComponent', () => {
  let component: RackPopupComponent;
  let fixture: ComponentFixture<RackPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackPopupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
