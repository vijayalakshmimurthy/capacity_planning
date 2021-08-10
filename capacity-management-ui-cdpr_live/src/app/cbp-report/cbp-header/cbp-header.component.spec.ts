import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';
import { WorkflowService } from '../../shared/services/workflow.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/api';
import { CbpHeaderComponent } from './cbp-header.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from '.././../shared/services/utility.service';
import { CP_ERROR } from '.././../shared/constants/error.constant';
import { NavigationService } from '../../shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { CbpReportComponent } from '.././cbp-report.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
// import { CbpHeaderComponent } from './cbp-header.component';
// import { CommonModule } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FormsModule } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { DialogModule } from 'primeng-lts/dialog';
// import { SharedModule } from 'primeng-lts/components/common/shared';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MultiSelectModule } from 'primeng-lts/multiselect';
// import { TabViewModule } from 'primeng-lts/tabview';
// import { AppService } from 'src/app/shared/services/app-service';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';
// import { of } from 'rxjs';
// import { AutoSuggestionsComponent } from 'src/app/shared/components/auto-suggestions/auto-suggestions.component';
// import { SvgComponent } from 'src/app/shared/components/svg/svg.component';
// import { AutoComplete, AutoCompleteModule } from 'primeng-lts/components/autocomplete/autocomplete';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('CbpHeaderComponent', () => {
  let component: CbpHeaderComponent;
  let fixture: ComponentFixture<CbpHeaderComponent>;
  let httpTestingController: HttpTestingController;
  let service: AppService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbpHeaderComponent ],
      schemas: [],
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, RouterTestingModule.withRoutes([])],
        providers: [{ provide: Router, useValue: router }, AppService, WorkflowService, DialogService, UtilityService, NavigationService],
    })
    .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbpHeaderComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should run #ngOnInit()', async () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.ngOnInit();
  //   expect(component.ngOnInit).toHaveBeenCalled();
  //   expect(component.ngOnInit).toBeDefined();
  // });

  // it('should check function ngOnDestroy', () => {
  //   spyOn(component, 'ngOnDestroy').and.callThrough();
  //   component.ngOnDestroy();
  //   expect(component.ngOnDestroy).toHaveBeenCalled();
  //   expect(component.ngOnDestroy).toBeDefined();
  // });

  // it('should check function onkeyPressSearch', () => {
  //   spyOn(component, 'onkeyPressSearch').and.callThrough();
  //   const res = ['YAIOF', 'YAIOF/PP'];
  //   const event = {
  //     target: {
  //       value: 'yz'
  //     }
  //   };
  //   if (event.target.value.length > 1) {
  //     const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
  //     service = fixture.debugElement.injector.get(AppService);
  //     spyOn(service, 'get').and.returnValue(of(res));
  //   }
  //   component.onkeyPressSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onkeyPressSearch).toHaveBeenCalled();
  //   expect(component.onkeyPressSearch).toBeDefined();
  // });

  // it('should check function onselectSearch', () => {
  //   spyOn(component, 'onselectSearch').and.callThrough();
  //   const event = { target: { value: 100 } };
  //   component.onselectSearch(event);
  //   fixture.detectChanges();
  //   expect(component.onselectSearch).toHaveBeenCalled();
  //   expect(component.onselectSearch).toBeDefined();
  //   spyOn(component.loadTabledatBySearch, 'emit');
  //   expect(component.planRackButton.emit(event)).toHaveBeenCalled();
  // });

  // it('should check function tableConvert', () => {
  //   spyOn(component, 'tableConvert').and.callThrough();
  //   const download = 'csv';
  //   component.tableConvert(download);
  //   fixture.detectChanges();
  //   expect(component.tableConvert).toHaveBeenCalled();
  //   expect(component.tableConvert(download)).toBeDefined();
  //   if (download === 'csv') {
  //     spyOn(component.exportData, 'emit');
  //     expect(component.exportData.emit).toHaveBeenCalled();
  //   }
  // });

  // it('should emit clearFilterData method onclick', () => {
  //   spyOn(component, 'clearFilter').and.callThrough();
  //   component.clearFilter();
  //   fixture.detectChanges();
  //   expect(component.clearFilter).toHaveBeenCalled();
  //   expect(component.clearFilter).toBeDefined();
  //   spyOn(component.clearFilterData, 'emit');
  //   expect(component.clearFilterData.emit).toHaveBeenCalled();
  // });

  // it('should emit submitToWfmt method onclick', () => {
  //   spyOn(component, 'submitToWfmt').and.callThrough();
  //   component.submitToWfmt();
  //   fixture.detectChanges();
  //   expect(component.submitToWfmt).toHaveBeenCalled();
  //   expect(component.submitToWfmt).toBeDefined();
  //   spyOn(component.submitButton, 'emit');
  //   expect(component.submitButton.emit).toHaveBeenCalled();
  // });

  // it('should emit planRackButton method onclick', () => {
  //   spyOn(component, 'planRack').and.callThrough();
  //   component.planRack();
  //   fixture.detectChanges();
  //   expect(component.planRack).toHaveBeenCalled();
  //   expect(component.planRack).toBeDefined();
  //   spyOn(component.planRackButton, 'emit');
  //   expect(component.planRackButton.emit).toHaveBeenCalled();
  // });
});
