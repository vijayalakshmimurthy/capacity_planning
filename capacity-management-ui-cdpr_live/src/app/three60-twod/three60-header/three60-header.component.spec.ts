import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Three60HeaderComponent } from './three60-header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { AppService } from '../../shared/services/app-service';
describe('Three60HeaderComponent', () => {
  let component: Three60HeaderComponent;
  let fixture: ComponentFixture<Three60HeaderComponent>;
  let service: AppService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Three60HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ AppService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Three60HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should check function onkeyPressSearch which return success response', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'AA'
  //     }
  //   };
  //   const filterData = ['ABERDARE'];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(filterData));
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  //   expect(component.filterData).toEqual(filterData);
  // });
  // it('should check function onkeyPressSearch which return empty response', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'AA'
  //     }
  //   };
  //   const filterData = [];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(of(filterData));
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  //   expect(component.filterData).toEqual(filterData);
  // });

  // it('should check function onkeyPressSearch which return error response', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const event = {
  //     target: {
  //       value: 'AA'
  //     }
  //   };
  //   const filterData = [];
  //   service = fixture.debugElement.injector.get(AppService);
  //   spyOn(service, 'get').and.returnValue(throwError([]));
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  // });
  // it('should call onselectSearch method', () => {
  //   spyOn(component, 'onselectSearch').and.callThrough();
  //   const event = 'ABERDEEN WEST TE';
  //   component.onselectSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onselectSearch).toHaveBeenCalledWith('ABERDEEN WEST TE');
  // });
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
