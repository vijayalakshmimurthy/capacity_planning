import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NocardmoveWorkflowComponent } from './nocardmove-workflow.component';

describe('NocardmoveWorkflowComponent', () => {
  let component: NocardmoveWorkflowComponent;
  let fixture: ComponentFixture<NocardmoveWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NocardmoveWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocardmoveWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
