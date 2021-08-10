import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SvgComponent } from './svg.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SvgComponent', () => {
  let component: SvgComponent;
  let fixture: ComponentFixture<SvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should contain svg ', () => {
    expect(component).toBeTruthy();
  });
});
