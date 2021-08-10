import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmoveSummaryComponent } from './cardmove-summary.component';

describe('CardmoveSummaryComponent', () => {
  let component: CardmoveSummaryComponent;
  let fixture: ComponentFixture<CardmoveSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardmoveSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardmoveSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
