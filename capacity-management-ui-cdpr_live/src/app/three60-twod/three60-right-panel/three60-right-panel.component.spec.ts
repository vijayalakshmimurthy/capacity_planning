import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Three60RightPanelComponent } from './three60-right-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('Three60RightPanelComponent', () => {
  let component: Three60RightPanelComponent;
  let fixture: ComponentFixture<Three60RightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Three60RightPanelComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Three60RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
