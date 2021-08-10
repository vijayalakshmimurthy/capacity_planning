import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmoveWorkflowComponent } from './cardmove-workflow.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('CardmoveWorkflowComponent', () => {
  let component: CardmoveWorkflowComponent;
  let fixture: ComponentFixture<CardmoveWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardmoveWorkflowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardmoveWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
