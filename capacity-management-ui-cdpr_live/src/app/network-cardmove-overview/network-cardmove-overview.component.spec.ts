import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCardmoveOverviewComponent } from './network-cardmove-overview.component';

describe('NetworkCardmoveOverviewComponent', () => {
  let component: NetworkCardmoveOverviewComponent;
  let fixture: ComponentFixture<NetworkCardmoveOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkCardmoveOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkCardmoveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
