// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CustomLocationComponent } from './custom-location.component';
// import { DropdownModule } from 'primeng/dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { AppService } from '../../services/app-service';
// import { AutoCompleteModule } from 'primeng/autocomplete';
// import { FormsModule } from '@angular/forms';

// describe('CustomLocationComponent', () => {
//   let component: CustomLocationComponent;
//   let fixture: ComponentFixture<CustomLocationComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CustomLocationComponent ],
//         imports: [DropdownModule, BrowserAnimationsModule, AutoCompleteModule, FormsModule],
//         schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CustomLocationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create component', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should check function changeCustomMode', () => {
//     spyOn(component, 'changeCustomMode').and.callThrough();
//     component.customMode = 'latlng';
//     const obj = {
//       value: '',
//       type: ''
//     };
//     component.clearAllWhileClickOnBtn();
//     component.changeCustomMode(obj);
//     expect(component.changeCustomMode).toBeDefined();
//   });
//   it('should check function onSubmit', () => {
//     spyOn(component, 'onSubmit').and.callThrough();
//     const obj = {
//       customMode: 'latlng',
//       lat: 54.20,
//       lng: -1.20,
//       postcode: 'AB101AB'
//     };
//     component.clearAllBtnFlag.flag = true;
//     component.isSubmitted = true;
//     component.CustomFilters.emit(obj);
//     component.onSubmit();
//     expect(component.onSubmit).toBeDefined();
//   });
//   it('should check function clearAllWhileClickOnBtn true', () => {
//     spyOn(component, 'clearAllWhileClickOnBtn').and.callThrough();
//     component.isSubmitted = true;
//     const obj = {
//       value: '',
//       type: ''
//     };
//     component.resetCustomFilters.emit(obj);
//     component.clearAllWhileClickOnBtn();
//     expect(component.clearAllWhileClickOnBtn).toBeDefined();
//   });
//   it('should check function clearAllWhileClickOnBtn false', () => {
//     spyOn(component, 'clearAllWhileClickOnBtn').and.callThrough();
//     component.isSubmitted = false;
//     const obj = {
//       value: 'abc',
//       type: 'bc'
//     };
//     component.resetCustomFilters.emit(obj);
//     component.clearAllWhileClickOnBtn();
//     expect(component.clearAllWhileClickOnBtn).toBeDefined();
//   });
//   it('should check function clearAllWhileMapClick', () => {
//     spyOn(component, 'clearAllWhileMapClick').and.callThrough();
//     component.mapClick.type = 'selectSite';
//     component.lat = '';
//     component.lng = '';
//     component.postcode = '';
//     component.isSubmitted = false;
//     component.clearAllBtnFlag.flag = false;
//     component.clearAllWhileMapClick();
//     expect(component.clearAllWhileMapClick).toBeDefined();
//   });
// });
