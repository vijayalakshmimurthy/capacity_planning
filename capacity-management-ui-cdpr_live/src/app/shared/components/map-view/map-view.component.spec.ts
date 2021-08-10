// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { MapViewComponent } from './map-view.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MapsAPILoader, AgmCoreModule } from '@agm/core';

// describe('MapViewComponent', () => {
//   let component: MapViewComponent;
//   let fixture: ComponentFixture<MapViewComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ MapViewComponent ],
//       imports: [ AgmCoreModule.forRoot() ],
//       providers: [
//         {
//           provide: MapsAPILoader,
//           useValue: {
//             load: jasmine.createSpy('load').and.returnValue(new Promise(() => true))
//             }
//         }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MapViewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should check function setImage', () => {
//   //   spyOn(component, 'setImage').and.callThrough();
//   //   component.serviceMarker =  {
//   //     message: 'Success',
//   //     locationCount: 108,
//   //     data: {
//   //       locations: [{
//   //         id: 1,
//   //         latitude: 57.143638,
//   //         longitude: -2.105667,
//   //         color: 'green',
//   //         nodeType: 'METRO',
//   //         nearestExchange: false,
//   //         distance: 0.0,
//   //         toolTipInfo: {
//   //           sttTableData: [{
//   //             titleOne: 'ABERDEEN CENTRAL TE(AB)-METRO  Total Ports:26 /  Phase Ports:0 /  In-Build:0',
//   //             titleTwo: null,
//   //             titleThree: null,
//   //             // tslint:disable-next-line:max-line-length
//   // tslint:disable-next-line:max-line-length
//   //             titleFour: 'The Data is indication only and will be validated at order submission. Diversity groups are not currently displayed.',
//   //             toolTipheaders: {
//   //               headerOne: 'Service Types',
//   //               headerTwo: 'Total Services',
//   //               headerThree: 'Phase Services'
//   //             },
//   //             data: [{
//   //               cellOneData: 'EAD',
//   //               cellTwoData: '14',
//   //               cellThreeData: '0'
//   //             }]
//   //           }]
//   //         },
//   //         url: {
//   //           url: 'assets/images/Ellipse112_green.png'
//   //         }
//   //       }]
//   //     }
//   //   };
//   //   component.setImage( 'assets/images/Ellipse112_green.png');
//   //   expect(component.setImage).toBeDefined();
//   // });
//   // it('should check function OnmouseOver', () => {
//   //   spyOn(component, 'OnmouseOver').and.callThrough();
//   //   component.markerDt = {
//   //     message: 'Success',
//   //     locationCount: 108,
//   //     data: {
//   //       locations: [{
//   //         id: 1,
//   //         latitude: 57.143638,
//   //         longitude: -2.105667,
//   //         color: 'green',
//   //         nodeType: 'METRO',
//   //         nearestExchange: false,
//   //         distance: 0.0,
//   //         toolTipInfo: {
//   //           sttTableData: [{
//   //             titleOne: 'ABERDEEN CENTRAL TE(AB)-METRO  Total Ports:26 /  Phase Ports:0 /  In-Build:0',
//   //             titleTwo: null,
//   //             titleThree: null,
//   //             // tslint:disable-next-line:max-line-length
//   // tslint:disable-next-line:max-line-length
//   //             titleFour: 'The Data is indication only and will be validated at order submission. Diversity groups are not currently displayed.',
//   //             toolTipheaders: {
//   //               headerOne: 'Service Types',
//   //               headerTwo: 'Total Services',
//   //               headerThree: 'Phase Services'
//   //             },
//   //             data: [{
//   //               cellOneData: 'EAD',
//   //               cellTwoData: '14',
//   //               cellThreeData: '0'
//   //             }]
//   //           }]
//   //         },
//   //         url: {
//   //           url: 'assets/images/Ellipse112_green.png'
//   //         }
//   //       }]
//   //     }
//   //   };
//   //   const tooltip = {
//   //     sttTableData: [{
//   //       titleOne: 'ABERDEEN CENTRAL TE(AB)-METRO  Total Ports:26 /  Phase Ports:0 /  In-Build:0',
//   //       titleTwo: null,
//   //       titleThree: null,
//   //       // tslint:disable-next-line:max-line-length
//   // tslint:disable-next-line:max-line-length
//   //       titleFour: 'The Data is indication only and will be validated at order submission. Diversity groups are not currently displayed.',
//   //       toolTipheaders: {
//   //         headerOne: 'Service Types',
//   //         headerTwo: 'Total Services',
//   //         headerThree: 'Phase Services'
//   //       },
//   //       data: [{
//   //         cellOneData: 'EAD',
//   //         cellTwoData: '14',
//   //         cellThreeData: '0'
//   //       }]
//   //     }]
//   //   };
//   //   component.OnmouseOver(component.markerDt, tooltip.sttTableData );
//   //   expect(component.OnmouseOver).toBeDefined();
//   // });
// });

