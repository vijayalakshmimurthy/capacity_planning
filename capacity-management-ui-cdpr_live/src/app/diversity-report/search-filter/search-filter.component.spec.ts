// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SearchFilterComponent } from './search-filter.component';
// import { AppService } from '../../shared/services/app-service';
// import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormBuilder, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { RouterTestingModule } from '@angular/router/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { of } from 'rxjs';

// describe('SearchFilterComponent', () => {
//   let component: SearchFilterComponent;
//   let fixture: ComponentFixture<SearchFilterComponent>;
//   // tslint:disable-next-line:prefer-const
//   let service: AppService;
//   // tslint:disable-next-line:prefer-const
//   let httpTestingController: HttpTestingController;
//   const formBuilder: FormBuilder = new FormBuilder();
//   const mockData = {
//     diversityGroupForecastList: '',
//     portAvailablity: 'Not Enough Capacity'
//   };
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SearchFilterComponent ],
//       imports: [CommonModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule, AutoCompleteModule,
//         ReactiveFormsModule ],
//       providers: [AppService, RouterTestingModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//     service = TestBed.get(AppService);
//     httpTestingController = TestBed.get(HttpTestingController);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SearchFilterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   it('should check function onClose', () => {
//     spyOn(component, 'onClose').and.callThrough();
//     component.onClose();
//     component.code = '';
//     component.newcode = '';
//     component.newport = '';
//     component.flagCode = '';
//     component.displayChange.emit(false);
//     expect(component.onClose).toHaveBeenCalled();
//     expect(component.onClose).toBeDefined();
//   });
//   it('should check function onCompleteSiteCode', () => {
//     spyOn(component, 'onCompleteSiteCode').and.callThrough();
//     const query = 'lo';
//     const url = environment.base_url + 'site-management/search-site-name?searchParam=' + query;
//     component.popData = [ 'ABERDEEN CENTRAL TE', 'ABERDEEN CENTRAL TE'];
//     component.onCompleteSiteCode(url);
//     spyOn(service, 'get').and.returnValue(of(component.popData));
//     expect(component.onCompleteSiteCode).toHaveBeenCalled();
//     expect(component.onCompleteSiteCode).toBeDefined();
//   });
//   it('should check function onSelectSearch', () => {
//     spyOn(component, 'onSelectSearch').and.callThrough();
//     const formName = 'groupName';
//     const event = 'BTRAN-LON-44';
//     const groupName = 'BTRAN-LON-44';
//     component.onSelectSearch(formName, event);
//     expect(component.onSelectSearch).toHaveBeenCalled();
//     expect(component.onSelectSearch).toBeDefined();
//   });
//   it('should check function onSelectSearch', () => {
//     spyOn(component, 'onSelectSearch').and.callThrough();
//     const formName = 'code';
//     const event = 'MBF';
//     component.onSelectSearch(formName, event);
//     expect(component.onSelectSearch).toHaveBeenCalled();
//     expect(component.onSelectSearch).toBeDefined();
//   });
//   it('should define formPortValidation ', () => {
//     // tslint:disable-next-line:prefer-const
//     let control = new FormControl('port');
//     control.setValue(2);
//     component.formPortValidation(control);
//     expect(component.formPortValidation).toBeDefined();
//   });
//   it('should define formPortValidation for more then 45', () => {
//     // tslint:disable-next-line:prefer-const
//     let control = new FormControl('port');
//     control.setValue(45);
//     component.formPortValidation(control);
//     expect(component.formPortValidation).toBeDefined();
//   });
//   it('should define keyPressPopLocation event of C', () => {
//     const pattern = /[a-z, A-Z]/;
//     const event = {
//       charCode: 67,
//       preventDefault : () => {}
// };
//     component.keyPressPopLocation(event);
//     expect(component.keyPressPopLocation).toBeDefined();
//   });
//   it('should define keyPressPopLocation after event of [', () => {
//     const pattern = /[a-z, A-Z]/;
//     const event = {
//       charCode: 91,
//       preventDefault : () => {}
// };
//     component.keyPressPopLocation(event);
//     expect(component.keyPressPopLocation).toBeDefined();
//   });
//   it('should define keyPressPort more then 40', () => {
//     const pattern = /[0-9]/;
//     const event = {
//       charCode: 91,
//       preventDefault : () => {}
// };
//     component.keyPressPort(event);
//     expect(component.keyPressPort).toBeDefined();
//   });
//   it('should define keyPressPort 1-40', () => {
//     const pattern = /[0-9]/;
//     const event = {
//       charCode: 49,
//       preventDefault : () => {}
// };
//     component.keyPressPort(event);
//     expect(component.keyPressPort).toBeDefined();
//   });
//   it('should define keyPressAdd pass case ', () => {
//     const pattern = /[a-zA-Z0-9_-]/;
//     const event = {
//       charCode: 49,
//       preventDefault : () => {}
// };
//     component.keyPressAdd(event);
//     expect(component.keyPressAdd).toBeDefined();
//   });
//   it('should define keyPressAdd fail case', () => {
//     const pattern = /[a-zA-Z0-9_-]/;
//     const event = {
//       charCode: 60,
//       preventDefault : () => {}
// };
//     component.keyPressAdd(event);
//     expect(component.keyPressAdd).toBeDefined();
//   });
//   it('should check function removeCode', () => {
//     spyOn(component, 'removeCode').and.callThrough();
//     component.removeCode();
//     component.code = '';
//     component.newcode = '';
//     component.popLocation = null;
//     component.newport = '';
//     component.resetFilterAll();
//     expect(component.removeCode).toHaveBeenCalled();
//     expect(component.removeCode).toBeDefined();
//   });
//   it('should define onCompleteGroupName', () => {
//     const query = 'lo';
//     const value = 'BTRAN' + query;
//     component.getFilterData.emit(value);
//     component.onCompleteGroupName(value);
//     expect(component.onCompleteGroupName).toBeDefined();
//   });
//   // it('should check function onSubmitFrom', () => {
//   //   spyOn(component, 'onSubmitFrom').and.callThrough();
//   //   const portArray = ['10, btran_lon_66'];
//   //   const x = 'btran_lon_66'.split(/[-_]/);
//   //   const k = 'BTRAN-'.split('-');
//   //   if ('btran' === 'btran') {
//   //     component.serachFilter(true);
//   //     // tslint:disable-next-line: max-line-length
//   //   }
//   //   component.onSubmitFrom();
//   //   spyOn(service, 'get').and.returnValue(of(portArray));
//   //   expect(component.onSubmitFrom).toHaveBeenCalled();
//   //   expect(component.onSubmitFrom).toBeDefined();
//   // });
//   it('should check function resetFilterAll', () => {
//     spyOn(component, 'resetFilterAll').and.callThrough();
//     component.newcode = '';
//     component.newport = '';
//     component.newgroup = '';
//     component.popLocation = null;
//     component.portsarrayobj = [];
//     component.portsarray = [];
//     component.dispSearchbtn = false;
//     component.flagCode = '';
//     // setTimeout(() => {
//     //   this.diversityForm.reset();
//     // }, 3000);
//     component.checkflag = false;
//     component.diversityForm.controls.geocode.reset();
//     component.resetFilterAll();
//     expect(component.resetFilterAll).toHaveBeenCalled();
//     expect(component.resetFilterAll).toBeDefined();
//   });
//   it('should check function removeGroup', () => {
//     spyOn(component, 'removeGroup').and.callThrough();
//     const portGroupAraay = ['10, btran_lon_66'];
//     const i = 1;
//     component.portsarray.splice(i, 1);
//     component.portsarrayobj.splice(i, 1);
//     component.removeGroup(portGroupAraay, i);
//     expect(component.removeGroup).toHaveBeenCalled();
//     expect(component.removeGroup).toBeDefined();
//   });
//   it('should check function removeGroup', () => {
//     spyOn(component, 'removeGroup').and.callThrough();
//     const portGroupAraay = [];
//     const i = 0;
//     component.portsarray.splice(i, 1);
//     component.portsarrayobj.splice(i, 1);
//     component.dispSearchbtn = false;
//     component.removeGroup(portGroupAraay, i);
//     expect(component.removeGroup).toHaveBeenCalled();
//     expect(component.removeGroup).toBeDefined();
//   });
//   it('should check function searchOnGroupValue', () => {
//     spyOn(component, 'searchOnGroupValue').and.callThrough();
//     let value;
//     value = {
//       popLocation: 'MBF',
//       diversityGroupDetailForecastList: '10, btran_lon_66'
//     };
//     component.resetFilterAll();
//     component.displayChange.emit(false);
//     component.OnsearchGroup.emit(value);
//     component.searchOnGroupValue();
//     expect(component.searchOnGroupValue).toHaveBeenCalled();
//     expect(component.searchOnGroupValue).toBeDefined();
//   });
// });
