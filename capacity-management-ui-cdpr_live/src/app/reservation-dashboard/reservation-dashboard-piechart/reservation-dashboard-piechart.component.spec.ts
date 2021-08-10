// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';
// import { ReservationDashboardPiechartComponent } from './reservation-dashboard-piechart.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// describe('ReservationDashboardPiechartComponent', () => {
//   let component: ReservationDashboardPiechartComponent;
//   let fixture: ComponentFixture<ReservationDashboardPiechartComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [FormsModule, SharedModule],
//       declarations: [ ReservationDashboardPiechartComponent ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReservationDashboardPiechartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   it('should check function ngOnChanges', () => {
//     spyOn(component, 'ngOnChanges').and.callThrough();
//     component.ngOnChanges();
//     expect(component.ngOnChanges).toHaveBeenCalled();
//     fixture.detectChanges();
//     expect(component.ngOnChanges).toBeDefined();
//     component.loadPieCharts();
//   });

//   describe('loadPieCharts', () => {
//     it('should call ngOnChange method', () => {
//       spyOn(component, 'loadPieCharts');
//       component.ngOnChanges();
//       expect(component.loadPieCharts).toHaveBeenCalled();
//     });
//     it('loadPieCharts', () => {
//       component.pieChartData = [{  labels: ['P2PE', 'Voice', 'DCN', 'Broadband', 'Backhaul', 'Ethernet',
//       'Blocked', 'Infrastructure', 'PRTC'], datasets: [{ data: [5, 2, 0, 11, 21, 2464, 3, 8, 0],
//       backgroundColor: ['#e60050', '#32a319', '#6300a9', '#0991ce', '#fc8c1d', '#606060', '#8a8a8a',
//        '#FFCE56', '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F'],
//        hoverBackgroundColor: ['#e60050', '#32a319', '#6300a9', '#0991ce', '#fc8c1d', '#606060', '#8a8a8a',
//        '#FFCE56', '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F']}] }],
//       component.loadPieCharts();
//       fixture.detectChanges();
//       expect(component.chartData).toEqual([5, 2, 0, 11, 21, 2464, 3, 8, 0]);
//       expect(component.labels).toEqual( ['P2PE', 'Voice', 'DCN', 'Broadband', 'Backhaul', 'Ethernet',
//       'Blocked', 'Infrastructure', 'PRTC']);
//       expect(component.data.datasets[0].backgroundColor).toEqual(['#e60050', '#32a319', '#6300a9',
//        '#0991ce', '#fc8c1d', '#606060', '#8a8a8a', '#FFCE56', '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F']);
//       expect(component.data.datasets[0].backgroundColor).toEqual(['#e60050', '#32a319', '#6300a9',
//        '#0991ce', '#fc8c1d', '#606060', '#8a8a8a', '#FFCE56', '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F']);
//     });
//   });
// });
