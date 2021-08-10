import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyStatsticsComponent } from './key-statstics.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('KeyStatsticsComponent', () => {
  let component: KeyStatsticsComponent;
  let fixture: ComponentFixture<KeyStatsticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyStatsticsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyStatsticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
