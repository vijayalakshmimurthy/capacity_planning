import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartViewComponent } from './dashboard-chart-view.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LineChartOptions } from '../../shared/constants/dsr-chart.constant';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../../shared/services/app-service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { of } from 'rxjs';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from '../../shared/components/chart/chart.component';

describe('DashboardChartViewComponent', () => {
  let component: DashboardChartViewComponent;
  let fixture: ComponentFixture<DashboardChartViewComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, SharedModule],
      declarations: [ DashboardChartViewComponent  ],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should check function loadGraphDatatotalNetworkTrend', () => {
    spyOn(component, 'loadGraphData').and.callThrough();
    const totalNetworkTrend =  {
          labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
          label: 'NETWORK_CAPACITY_TREND',
          datasets: [{
            label: 'Ethernet',
            data: [857.95, 857.95, 855.45, 855.74, 875.95, 875.95, 862.89]
          }, {
            label: 'Broadband',
            data: [188.29, 189.4, 190.52, 191.6, 195.3, 195.82, 196.42]
          }, {
            label: 'Backhaul',
            data: [0.02, 0.02, 0.46, 0.46, 4.09, 4.59, 4.59]
          }, {
            label: 'Infrastructure',
            data: [31.3, 33.0, 33.08, 32.9, 33.73, 33.73, 32.38]
          }, {
            label: 'P2PE',
            data: [21.86, 24.37, 24.23, 24.15, 25.44, 25.44, 24.79]
          }, {
            label: 'Total Capacity',
            data: [1099.03, 1099.03, 1103.17, 1104.27, 1134.51, 1134.51, 1121.07]
          }]
    };
    component.options = {
      title: {
          display: true,
          text: 'TBPS',
          position: 'left'
      },
      legend: { display: false },
      plugins: {
          datalabels: {
              color: '#36A2EB',
              font: {
                  weight: 'bold',
                  size: 0,
              }
          }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    const data = totalNetworkTrend;
    // component.otherFilters = [{ name: 'radius' }];
    component.loadTotalLineChartProperties(totalNetworkTrend);
    component.loadGraphData();
    expect(component.loadGraphData).toBeDefined();
  });
  // it('should check function loadGraphDataproduct', () => {
  //   spyOn(component, 'loadGraphData').and.callThrough();
  //   component.downloadImageNameTotal = 'line-chart-total';
  //   const ProductNetworkTrend =  {
  //     typeName: 'Ethernet',
  //     labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
  //     datasets: [{
  //       borderColor: '#bfb2ff',
  //       label: '1G',
  //       fill: false,
  //       data: [154463, 154492, 154032, 153395, 155306, 155306, 153410]
  //     }, {
  //       borderColor: '#7f69eb',
  //       label: '10G',
  //       fill: false,
  //       data: [59944, 59944, 59417, 59442, 60761, 60761, 59854]
  //     }, {
  //       borderColor: '#f8bf5d',
  //       label: '100G',
  //       fill: false,
  //       data: [852, 852, 891, 891, 941, 941, 921]
  //     }, {
  //       borderColor: '#fc6b89',
  //       label: 'FE',
  //       fill: false,
  //       data: [188644, 188648, 188411, 188311, 189301, 189301, 188391]
  //     }]
  //   };
  //   component.options = {
  //     title: {
  //         display: true,
  //         text: 'No of Ports',
  //         position: 'left'
  //     },
  //     legend: { display: false },
  //     plugins: {
  //       datalabels: {
  //         color: '#36A2EB',
  //         font: {
  //           weight: 'bold',
  //           size: 0,
  //         }
  //       }
  //     },
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   };
  //   const data = ProductNetworkTrend;
  //   // component.otherFilters = [{ name: 'radius' }];
  //   component.loadProductLineChartProperties(ProductNetworkTrend);
  //   component.loadGraphData();
  //   fixture.detectChanges();
  //   expect(component.loadGraphData).toBeDefined();
  // });
  it('should check function loadProductLineChartProperties', () => {
    spyOn(component, 'loadProductLineChartProperties').and.callThrough();
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
    // tslint:disable-next-line:no-shadowed-variable
    // component.otherFilters = [{ name: 'radius' }];
    const data = {
      typeName: 'Ethernet',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [154463, 154492, 154032, 153395, 155306, 155306, 153410]
      }, {
        label: '10G',
        data: [59944, 59944, 59417, 59442, 60761, 60761, 59854]
      }, {
        label: '100G',
        data: [852, 852, 891, 891, 941, 941, 921]
      }, {
        label: 'FE',
        data: [188644, 188648, 188411, 188311, 189301, 189301, 188391]
      }]
    };
    component.loadProductLineChartProperties(data);
    expect(component.loadProductLineChartProperties).toBeDefined();
  });
  it('should check function loadProductLineChartProperties broadband', () => {
    spyOn(component, 'loadProductLineChartProperties').and.callThrough();
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
    // tslint:disable-next-line:no-shadowed-variable
    // component.otherFilters = [{ name: 'radius' }];
    const data = {
      typeName: 'Broadband',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [154463, 154492, 154032, 153395, 155306, 155306, 153410]
      }, {
        label: '10G',
        data: [59944, 59944, 59417, 59442, 60761, 60761, 59854]
      }, {
        label: '100G',
        data: [852, 852, 891, 891, 941, 941, 921]
      }, {
        label: 'FE',
        data: [188644, 188648, 188411, 188311, 189301, 189301, 188391]
      }]
    };
    component.loadProductLineChartProperties(data);
    expect(component.loadProductLineChartProperties).toBeDefined();
  });
  it('should check function loadTotalLineChartProperties', () => {
    spyOn(component, 'loadTotalLineChartProperties').and.callThrough();
    const lineBorderColor = new Map([['1G', '#bfb2ff'], ['10G', '#7f69eb'], ['100G', '#f8bf5d'], ['FE', '#fc6b89']]);
    // tslint:disable-next-line:no-shadowed-variable
    // component.otherFilters = [{ name: 'radius' }];
    const data = {
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      label: 'NETWORK_CAPACITY_TREND',
      datasets: [{
        label: 'Ethernet',
        data: [857.95, 857.95, 855.45, 855.74, 875.95, 875.95, 862.89]
      }, {
        label: 'Broadband',
        data: [188.29, 189.4, 190.52, 191.6, 195.3, 195.82, 196.42]
      }, {
        label: 'Backhaul',
        data: [0.02, 0.02, 0.46, 0.46, 4.09, 4.59, 4.59]
      }, {
        label: 'Infrastructure',
        data: [31.3, 33.0, 33.08, 32.9, 33.73, 33.73, 32.38]
      }, {
        label: 'P2PE',
        data: [21.86, 24.37, 24.23, 24.15, 25.44, 25.44, 24.79]
      }, {
        label: 'Total Capacity',
        data: [1099.03, 1099.03, 1103.17, 1104.27, 1134.51, 1134.51, 1121.07]
      }]
    };
    component.loadTotalLineChartProperties(data);
    expect(component.loadTotalLineChartProperties).toBeDefined();
  });
  it('should check function downloadCSVLine', () => {
    spyOn(component, 'downloadCSVLine').and.callThrough();
    const typeName = 'Ethernet';
    component.downloadCSVLine(typeName);
    expect(component.downloadCSVLine).toBeDefined();
  });
  it('should check function ngOnChanges', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();
    expect(component.ngOnChanges).toBeDefined();
  });
});
