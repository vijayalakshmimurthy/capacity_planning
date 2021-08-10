import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Three60TwodComponent } from './three60-twod.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('Three60TwodComponent', () => {
  let component: Three60TwodComponent;
  let fixture: ComponentFixture<Three60TwodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Three60TwodComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Three60TwodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
