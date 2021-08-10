import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCardmoveOverviewHeaderComponent } from './network-cardmove-overview-header.component';

describe('NetworkCardmoveOverviewHeaderComponent', () => {
  let component: NetworkCardmoveOverviewHeaderComponent;
  let fixture: ComponentFixture<NetworkCardmoveOverviewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkCardmoveOverviewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkCardmoveOverviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
