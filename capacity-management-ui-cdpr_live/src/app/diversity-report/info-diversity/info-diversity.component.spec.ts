// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { InfoDiversityComponent } from './info-diversity.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// describe('InfoDiversityComponent', () => {
//   let component: InfoDiversityComponent;
//   let fixture: ComponentFixture<InfoDiversityComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ InfoDiversityComponent ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(InfoDiversityComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   it('should check function onClose', () => {
//     spyOn(component, 'onClose').and.callThrough();
//     component.onClose();
//     component.displayChangeInfo.emit(false);
//     expect(component.onClose).toHaveBeenCalled();
//     expect(component.onClose).toBeDefined();
//   });
// });
