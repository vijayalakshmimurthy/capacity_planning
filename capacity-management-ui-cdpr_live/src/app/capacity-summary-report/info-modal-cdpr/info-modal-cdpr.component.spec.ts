import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModalCdprComponent } from './info-modal-cdpr.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('InfoModalCdprComponent', () => {
  let component: InfoModalCdprComponent;
  let fixture: ComponentFixture<InfoModalCdprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoModalCdprComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule,RouterModule,DialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoModalCdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('should check onClose', () => {
    spyOn(component.displayChange, 'emit');
    component.onClose();
    expect(component.displayChange.emit).toHaveBeenCalled();
  });

  it('should check ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.pageName = 'CDPR';
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.headerName).toEqual('Capacity Demand Summary Report');
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
