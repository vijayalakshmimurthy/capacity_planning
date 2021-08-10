import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetoptCardMoveComponent } from './netopt-card-move.component';

describe('NetoptCardMoveComponent', () => {
  let component: NetoptCardMoveComponent;
  let fixture: ComponentFixture<NetoptCardMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetoptCardMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetoptCardMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
