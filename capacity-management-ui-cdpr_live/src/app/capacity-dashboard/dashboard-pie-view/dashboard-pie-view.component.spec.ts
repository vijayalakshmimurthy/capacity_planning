import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPieViewComponent } from './dashboard-pie-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { ChartModule } from 'primeng/chart';
import { AppService } from '../../shared/services/app-service';
import { of } from 'rxjs';

describe('DashboardPieViewComponent', () => {
  let component: DashboardPieViewComponent;
  let fixture: ComponentFixture<DashboardPieViewComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, ChartModule],
      declarations: [ DashboardPieViewComponent, ChartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  // it('should check function ngOnChanges', () => {
  //   spyOn(component, 'ngOnChanges').and.callThrough();
  //   component.ngOnChanges();
  //   expect(component.ngOnChanges).toBeDefined();
  // });
  // it('should check function loadPieChartByPortSpeed', () => {
  //   //component.data = component.pieChartData;
  //   spyOn(component, 'loadPieChartByPortSpeed').and.callThrough();
   
  //    component.data = {
  //     labels: [
  //       'Ethernet',
  //       'Broadband',
  //       'Backhaul',
  //       'Infrastructure',
  //       'P2PE'
  //     ],
  //     datasets: [
  //       {
  //         data: [
  //           630,
  //           212,
  //           166,
  //           33,
  //           146
  //         ],
  //         backgroundColor: ['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050'],
  //         datalabels: {
  //           color: (context) => {
  //             const index = context.dataIndex;
  //             const value = context.dataset.data[index];
  //             return value === 0 ? 'transparent' : 'white';
  //           },
  //           font: {
  //             weight: 'bold',
  //             size: 14,
  //           }
  //         }
  //       }
  //     ],
  //     totalTbps: 1187
  //   };
  //   component.loadPieChartByPortSpeed();
  //   spyOn(service, 'get').and.returnValue(of(component.data));
  //   expect(component.data.labels).toEqual([ 'Ethernet',
  //   'Broadband',
  //   'Backhaul',
  //   'Infrastructure',
  //   'P2PE']);
  //   expect(component.data.datasets[0].backgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']);
  //   expect(component.data.datasets[0].backgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']); 
  //   expect(component.loadPieChartByPortSpeed).toBeDefined();
  // });


  // it('should check function loadPieChartByPortSpeed', () => {
  //   component.data = component.pieChartData;
  //   spyOn(component, 'loadPieChartByPortSpeed').and.callThrough();
   
  //   component.data  = {
  // labels: [
  //               'Ethernet',
  //               'Broadband',
  //               'Backhaul',
  //               'Infrastructure',
  //               'P2PE'
  //             ]
     
  //     ,
  //     datasets: [
  //       {
  //         data: [
  //           630,
  //           212,
  //           166,
  //           33,
  //           146
  //         ],
  //        // hoverBackgroundColor: ['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050'],
  //         // datalabels: {
  //         //   color: (context) => {
  //         //     const index = context.dataIndex;
  //         //     const value = context.dataset.data[index];
  //         //     return value === 0 ? 'transparent' : 'white';
  //         //   },
  //         //   font: {
  //         //     weight: 'bold',
  //         //     size: 14,
  //         //   }
  //         // }
  //       }
  //     ],
  //     totalTbps: 1187
  //   };
  //   component.loadPieChartByPortSpeed();
  //   spyOn(service, 'get').and.returnValue(of(component.data));
  // // expect(component.data.labels).toEqual([ 'Ethernet',
  // //   'Broadband',
  // //   'Backhaul',
  // //   'Infrastructure',
  // //   'P2PE']);
  //   expect(component.data.datasets[0].backgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']);
  //   expect(component.data.datasets[0].hoverBackgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']); 
  //   expect(component.loadPieChartByPortSpeed).toBeDefined();
  //   expect(component.loadPieChartByPortSpeed).toBeDefined();
  // });

  // it('should check function loadPieChartByPortSpeed', () => {
  //   component.data = component.pieChartData;
  //   spyOn(component, 'loadPieChartByPortSpeed').and.callThrough();
   
  //   component.data  = {
  // labels: [
  //               'Ethernet',
  //               'Broadband',
  //               'Backhaul',
  //               'Infrastructure',
  //               'P2PE'
  //             ]
     
  //     ,
  //     datasets: [
  //       {
  //         data: [
  //           630,
  //           212,
  //           166,
  //           33,
  //           146
  //         ],
  //        // hoverBackgroundColor: ['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050'],
  //         // datalabels: {
  //         //   color: (context) => {
  //         //     const index = context.dataIndex;
  //         //     const value = context.dataset.data[index];
  //         //     return value === 0 ? 'transparent' : 'white';
  //         //   },
  //         //   font: {
  //         //     weight: 'bold',
  //         //     size: 14,
  //         //   }
  //         // }
  //       }
  //     ],
  //     totalTbps: 1187
  //   };
  //   component.loadPieChartByPortSpeed();
  //   spyOn(service, 'get').and.returnValue(of(component.data));
  // // expect(component.data.labels).toEqual([ 'Ethernet',
  // //   'Broadband',
  // //   'Backhaul',
  // //   'Infrastructure',
  // //   'P2PE']);
  //   expect(component.data.datasets[0].backgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']);
  //   expect(component.data.datasets[0].hoverBackgroundColor).toEqual(['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050']); 
  //   expect(component.loadPieChartByPortSpeed).toBeDefined();
  //   expect(component.loadPieChartByPortSpeed).toBeDefined();
  // });

});
