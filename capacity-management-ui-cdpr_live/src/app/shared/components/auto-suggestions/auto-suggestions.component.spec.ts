import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestionsComponent } from './auto-suggestions.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('AutoSuggestionsComponent', () => {
  let component: AutoSuggestionsComponent;
  let fixture: ComponentFixture<AutoSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoSuggestionsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
