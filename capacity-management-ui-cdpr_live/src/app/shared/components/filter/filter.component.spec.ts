// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { FilterComponent } from './filter.component';
// import { DropdownModule } from 'primeng/dropdown';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


// describe('FilterComponent', () => {
//   let component: FilterComponent;
//   let fixture: ComponentFixture<FilterComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ FilterComponent ],
//       imports: [DropdownModule, BrowserAnimationsModule, FormsModule],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FilterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should call ngOnChanges', () => {
//   //     fixture = TestBed.createComponent(FilterComponent);
//   //     const hostComponent = fixture.componentInstance;
//   //     hostComponent.filterViewCustomization = {
//   //       filters: true,
//   //       customFilter: false
//   //     };
//   //     component = hostComponent.savedFilters;
//   //     spyOn(component, 'ngOnChanges').and.callThrough();
//   //     fixture.detectChanges();
//   //     expect(component.ngOnChanges).toHaveBeenCalled();
//   // });
//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should render `filter`', () => {
//   //   component.savedFilters = [ {
//   //     filterName: 'serviceType',
//   //     filterValue: 'H.E',
//   //     id: 1
//   //   },
//   //   {
//   //     filterName: 'nodeType',
//   //     filterValue: 'TEIR1',
//   //     id: 2
//   //   }];
//   //   component.ngOnChanges();
//   //   expect(component.ngOnChanges).toBeDefined(component.savedFilters );
//   // });
//   // it('should check function checkFilterIsSaved', () => {
//   //   spyOn(component, 'checkFilterIsSaved').and.callThrough();
//   //   component.savedFilters = [ {
//   //     filterName: 'serviceType',
//   //     filterValue: 'H.E',
//   //     id: 1
//   //   },
//   //   {
//   //     filterName: 'nodeType',
//   //     filterValue: 'TEIR1',
//   //     id: 2
//   //   }];
//   //   component.checkFilterIsSaved( component.savedFilters.filterName,  component.savedFilters.filterValue);
//   //   expect(component.checkFilterIsSaved).toBeDefined();
//   // });
//   // it('should check function checkFilter', () => {
//   //   spyOn(component, 'checkFilter').and.callThrough();
//   //   const obj = {
//   //     value: 'H.E',
//   //     type: 'serviceType',
//   //     filterId: 1,
//   //     filterName: ''
//   //   };
//   //   component.requestFilters.emit( obj);
//   //   component.checkFilter( obj.value, obj.type, obj.filterId, obj.filterName);
//   //   expect(component.checkFilter).toBeDefined();
//   // });
//   // it('should check function selectService', () => {
//   //   spyOn(component, 'selectService').and.callThrough();
//   //   component.savedFilters = [ {
//   //     filterName: '',
//   //     filterValue: '',
//   //     id: null
//   //   }];
//   //   const obj = {
//   //     value: 'H.E',
//   //     type: 'serviceType'
//   //   };
//   //   component.requestFilters.emit(obj);
//   //   expect(component.selectService).toBeDefined();
//   // });
// });
