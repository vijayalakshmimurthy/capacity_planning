import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OptimizationComponent } from './optimization.component';
import { AppService } from 'src/app/shared/services/app-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
//mport { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { InfoModalCdprComponent } from './info-modal-cdpr/info-modal-cdpr.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TabViewModule } from 'primeng-lts/tabview';
//import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AutoSuggestionsComponent } from 'src/app/shared/components/auto-suggestions/auto-suggestions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';

//import { SvgComponent } from 'src/app/shared/components/svg/svg.component';
//import { AutoComplete, AutoCompleteModule } from 'primeng-lts/components/autocomplete/autocomplete';


describe('OptimizationComponent', () => {
  let component: OptimizationComponent;
  let fixture: ComponentFixture<OptimizationComponent>;
  let httpTestingController: HttpTestingController;
  let service: AppService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizationComponent, ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule,AutoCompleteModule,  FormsModule, HttpClientTestingModule, DialogModule,SharedModule, BrowserAnimationsModule, MultiSelectModule,TabViewModule,
      RouterTestingModule.withRoutes([])],
        providers: [AppService
        ]
    })
    .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });


  // it('should editRow', () => {
  //   let event : any;
  //   component.editRow(event);
  //   expect(component.editRow).toBeDefined();
  // });
  // it('should check  deleteRow', () => {
  //   let id = 1;
  //    component.deleteRow(id);
  //    expect(component.deleteRow).toBeDefined();
  //  });
  //  it('should checkingFilter', () => {
  //   let e : any;
  //   component.checkingFilter(e);
  //   this.checkingFilter.emit(e);
  //   expect(component.checkingFilter).toBeDefined();
  // });
  // it('should check if rowSelect', () => {
  //   let wfmtRequest  : {};
  //   component.selectedRow.length > 0 
  //   expect(component.rowSelect).toBeDefined();
  // });
  // it('should else rowSelect', () => {
  //   let wfmtRequest  : {};
  //   component.selectedRow.length = 0 
  //   expect(component.rowSelect).toBeDefined();
  // });
 
  // it('should selectRow', () => {
  //   let event : any;
  //   component.selectRow(event);
  //   expect(component.selectRow).toBeDefined();
  // });

  // it('should selectRow', () => {
  //   component.selectRow;
  //   expect(component.selectRow).toBeDefined();
  // });

});
