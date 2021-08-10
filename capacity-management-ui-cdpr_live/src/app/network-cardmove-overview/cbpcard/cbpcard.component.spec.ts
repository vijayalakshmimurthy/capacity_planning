import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbpcardComponent } from './cbpcard.component';

describe('CbpcardComponent', () => {
  let component: CbpcardComponent;
  let fixture: ComponentFixture<CbpcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbpcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbpcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
