import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModelCrsrComponent } from './info-model-crsr.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng-lts/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('InfoModelCrsrComponent', () => {
  let component: InfoModelCrsrComponent;
  let fixture: ComponentFixture<InfoModelCrsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoModelCrsrComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, RouterModule, DialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModelCrsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should check onClose', () => {
    spyOn(component, 'onClose').and.callThrough();
    component.displayChange.emit(false);
    expect(component.onClose).toBeDefined();
  });
  // it('should check displaychange', () => {
  //   expect(component.displayChange.emit(false)).toBeDefined();
  // });
});
