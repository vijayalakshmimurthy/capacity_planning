import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackProgressTableComponent } from './track-progress-table.component';

describe('TrackProgressTableComponent', () => {
  let component: TrackProgressTableComponent;
  let fixture: ComponentFixture<TrackProgressTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackProgressTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackProgressTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
