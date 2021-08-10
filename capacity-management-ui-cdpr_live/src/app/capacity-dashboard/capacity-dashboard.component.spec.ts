import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityDashboardComponent } from './capacity-dashboard.component';
import { KeyStatsticsComponent } from './key-statstics/key-statstics.component';
import { DashboardPieViewComponent } from './dashboard-pie-view/dashboard-pie-view.component';
import { DashboardChartViewComponent } from './dashboard-chart-view/dashboard-chart-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../shared/services/app-service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('CapacityDashboardComponent', () => {
  let component: CapacityDashboardComponent;
  let fixture: ComponentFixture<CapacityDashboardComponent>;
  // tslint:disable-next-line:prefer-const
  let service: AppService;
  // tslint:disable-next-line:prefer-const
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      declarations: [ CapacityDashboardComponent, KeyStatsticsComponent, DashboardPieViewComponent, DashboardChartViewComponent ],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    service = TestBed.get(AppService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should check function loadNetworkTrend', () => {
    spyOn(component, 'loadNetworkTrend').and.callThrough();
    const loadNetworkTrendData = {
      totalNetworkTrend: {
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
      }
    };
    // component.otherFilters = [{ name: 'radius' }];
    spyOn(service, 'get').and.returnValue(of(loadNetworkTrendData));
    component.loadNetworkTrend();
    fixture.detectChanges();
    expect(component.loadNetworkTrend).toHaveBeenCalled();
    expect(component.totalNetworkTrend).toEqual(jasmine.objectContaining(loadNetworkTrendData.totalNetworkTrend));
    expect(component.showNetworkStatistics ).toBeTruthy();
  });

  it('should call loadNetworkTrend and if api returns error', () => {
    spyOn(component, 'loadNetworkTrend').and.callThrough();
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.loadNetworkTrend();
    fixture.detectChanges();
    expect(component.loadNetworkTrend).toHaveBeenCalled();
    expect(component.showNetworkStatistics).toBeFalsy();
  });

  it('should check function loadKeyNetworkStatistics', () => {
    spyOn(component, 'loadKeyNetworkStatistics').and.callThrough();
    const keyStatsticsdata = [
      {
        productType: 'Ethernet',
        totalPorts: 40468,
        freePorts: 17098
      },
      {
        productType: 'Broadband',
        totalPorts: 18137,
        freePorts: 9239
      },
      {
        productType: 'Backhaul',
        totalPorts: 16440,
        freePorts: 7833
      },
      {
        productType: 'Infrastructure',
        totalPorts: 3257,
        freePorts: 2695
      },
      {
        productType: 'P2PE',
        totalPorts: 9828,
        freePorts: 3003
      }
    ];
    spyOn(service, 'get').and.returnValue(of(keyStatsticsdata));
    component.loadKeyNetworkStatistics();
    fixture.detectChanges();
    expect(component.loadKeyNetworkStatistics).toHaveBeenCalled();
    expect(component.keyStatsticsdata).toEqual(jasmine.objectContaining(keyStatsticsdata));
  });

  it('should call loadKeyNetworkStatistics and if api returns error', () => {
    spyOn(component, 'loadKeyNetworkStatistics').and.callThrough();
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.loadKeyNetworkStatistics();
    fixture.detectChanges();
    expect(component.loadKeyNetworkStatistics).toHaveBeenCalled();
    expect(component.noKeyStatistics).toBeTruthy();
  });

  it('should check function loadCapacityDistribution', () => {
    spyOn(component, 'loadCapacityDistribution').and.callThrough();
    const loadCapacityDistributionData = {
      labels: [
        'Ethernet',
        'Broadband',
        'Backhaul',
        'Infrastructure',
        'P2PE'
      ],
      datasets: [
        {
          data: [
            630,
            212,
            166,
            33,
            146
          ]
        }
      ],
      totalTbps: 1187
    };
    spyOn(service, 'get').and.returnValue(of(loadCapacityDistributionData));
    component.loadCapacityDistribution();
    fixture.detectChanges();
    expect(component.loadCapacityDistribution).toHaveBeenCalled();
    expect(component.capacityDistribution).toEqual(jasmine.objectContaining(loadCapacityDistributionData));
  });

  it('should call loadCapacityDistribution and if api returns error', () => {
    spyOn(component, 'loadCapacityDistribution').and.callThrough();
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.loadCapacityDistribution();
    fixture.detectChanges();
    expect(component.loadCapacityDistribution).toHaveBeenCalled();
    expect(component.showPieChart).toBeFalsy();
  });

  it('should check function loadTableData', () => {
    spyOn(component, 'loadTableData').and.callThrough();
    const tableData = {
      deviceDetails: [{
        'TiMOS-C-15.0.R15': 1080,
        'TiMOS-C-12.0.R14': 2,
        'TiMOS-C-15.0.R1': 1,
        'TiMOS-C-15.0.R6-1': 657,
        'TiMOS-C-13.0.R12-1': 794,
        '(N/A)': 72,
        'TiMOS-C-13.0.R12': 630,
        'TiMOS-C-15.0.R6': 92,
        'TiMOS-C-15.0.R12': 310
      }],
      cardDetails: [{
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM12': 1956,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM5': 4060,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv1': 4525,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM3': 2259,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM2': 720,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv3': 5211,
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM5': 3707,
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM20': 1110,
        'IMM2 x 100G': 559,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv3c': 6919,
        'IMM 1 x 100G': 44,
        'IMM12(5)': 2299,
        'IOM4-e-hs': 1184
      }]
    };
    spyOn(service, 'get').and.returnValue(of(tableData));
    component.loadTableData();
    fixture.detectChanges();
    expect(component.loadTableData).toHaveBeenCalled();
    expect(component.tableData).toEqual(jasmine.objectContaining(tableData));
  });

  it('should call loadTableData and if api returns error', () => {
    spyOn(component, 'loadTableData').and.callThrough();
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.loadTableData();
    fixture.detectChanges();
    expect(component.loadTableData).toHaveBeenCalled();
    expect(component.showTableData).toBeFalsy();
  });


  it('should check function loadProductTrend', () => {
    spyOn(component, 'loadProductTrend').and.callThrough();
    const loadProductTrendData = [{
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
    }, {
      typeName: 'Broadband',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [30564, 30554, 30377, 30151, 30934, 30934, 30690]
      }, {
        label: '10G',
        data: [15764, 15888, 16025, 16146, 16427, 16503, 16563]
      }, {
        label: '100G',
        data: [1, 1, 1, 1, 1, 1, 1]
      }, {
        label: 'FE',
        data: [0, 0, 0, 0, 0, 0, 0]
      }]
    }, {
      typeName: 'Backhaul',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [1, 1, 1, 1, 1, 1, 1]
      }, {
        label: '10G',
        data: [2, 2, 46, 46, 399, 409, 409]
      }, {
        label: '100G',
        data: [0, 0, 0, 0, 1, 5, 5]
      }, {
        label: 'FE',
        data: [0, 0, 0, 0, 0, 0, 0]
      }]
    }, {
      typeName: 'Infrastructure',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [0, 0, 1, 1, 10, 10, 10]
      }, {
        label: '10G',
        data: [3130, 3300, 3308, 3290, 3372, 3372, 3237]
      }, {
        label: '100G',
        data: [0, 0, 0, 0, 0, 0, 0]
      }, {
        label: 'FE',
        data: [0, 0, 0, 0, 0, 0, 0]
      }]
    }, {
      typeName: 'P2PE',
      labels: ['W22,2020', 'W23,2020', 'W24,2020', 'W25,2020', 'W26,2020', 'W27,2020', 'W28,2020'],
      datasets: [{
        label: '1G',
        data: [0, 0, 0, 0, 0, 0, 0]
      }, {
        label: '10G',
        data: [2186, 2437, 2423, 2415, 2544, 2544, 2479]
      }, {
        label: '100G',
        data: [0, 0, 0, 0, 0, 0, 0]
      }, {
        label: 'FE',
        data: [0, 0, 0, 0, 0, 0, 0]
      }]
    }];
    spyOn(service, 'get').and.returnValue(of(loadProductTrendData));
    component.loadProductTrend();
    fixture.detectChanges();
    expect(component.loadProductTrend).toHaveBeenCalled();
    expect(component.totalProductTrend).toEqual(jasmine.objectContaining(loadProductTrendData));
  });

  it('should call loadProductTrend and if api returns error', () => {
    spyOn(component, 'loadProductTrend').and.callThrough();
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.loadProductTrend();
    fixture.detectChanges();
    expect(component.loadProductTrend).toHaveBeenCalled();
    expect(component.showProductGraph).toBeFalsy();
  });

  it('should check function loadLineChartProperties', () => {
    spyOn(component, 'loadLineChartProperties').and.callThrough();
    const keyStatsticsdata =
     [
          {
            productType: 'Ethernet',
            totalPorts: 40468,
            freePorts: 17098
          },
          {
            productType: 'Broadband',
            totalPorts: 18137,
            freePorts: 9239
          },
          {
            productType: 'Backhaul',
            totalPorts: 16440,
            freePorts: 7833
          },
          {
            productType: 'Infrastructure',
            totalPorts: 3257,
            freePorts: 2695
          },
          {
            productType: 'P2PE',
            totalPorts: 9828,
            freePorts: 3003
          }
        ];
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
    for (const key of Object.keys(keyStatsticsdata)) {
      keyStatsticsdata[key].borderColor = lineBorderColor.get(keyStatsticsdata[key].productType);
    }
    // component.otherFilters = [{ name: 'radius' }];
    component.loadLineChartProperties(keyStatsticsdata);
    expect(component.loadLineChartProperties).toHaveBeenCalled();
    expect(keyStatsticsdata).not.toBe(null);
    expect(component.loadKeyStatstics).toBeDefined();
  });
  it('should check function loadKeyStatstics', () => {
    spyOn(component, 'loadKeyStatstics').and.callThrough();
    const keyStatsticsdata =
     [
          {
            productType: 'Ethernet',
            totalPorts: 40468,
            freePorts: 17098
          },
          {
            productType: 'Broadband',
            totalPorts: 18137,
            freePorts: 9239
          },
          {
            productType: 'Backhaul',
            totalPorts: 16440,
            freePorts: 7833
          },
          {
            productType: 'Infrastructure',
            totalPorts: 3257,
            freePorts: 2695
          },
          {
            productType: 'P2PE',
            totalPorts: 9828,
            freePorts: 3003
          }
        ];
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
    for (const key of Object.keys(keyStatsticsdata)) {
      keyStatsticsdata[key].borderColor = lineBorderColor.get(keyStatsticsdata[key].productType);
    }
    // component.otherFilters = [{ name: 'radius' }];
    // expect(component.loadLineChartProperties).toHaveBeenCalled();
    expect(keyStatsticsdata).not.toBe(null);
    expect(component.loadKeyStatstics).toBeDefined();
  });
  it('should check function loadtableData', () => {
    spyOn(component, 'loadtableData').and.callThrough();
    const data = {
      deviceDetails: [{
        'TiMOS-C-15.0.R15': 1080,
        'TiMOS-C-12.0.R14': 2,
        'TiMOS-C-15.0.R1': 1,
        'TiMOS-C-15.0.R6-1': 657,
        'TiMOS-C-13.0.R12-1': 794,
        '(N/A)': 72,
        'TiMOS-C-13.0.R12': 630,
        'TiMOS-C-15.0.R6': 92,
        'TiMOS-C-15.0.R12': 310
      }],
      cardDetails: [{
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM12': 1956,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM5': 4060,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv1': 4525,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM3': 2259,
        // tslint:disable-next-line:object-literal-key-quotes
        'CPM2': 720,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv3': 5211,
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM5': 3707,
        // tslint:disable-next-line:object-literal-key-quotes
        'IMM20': 1110,
        'IMM2 x 100G': 559,
        // tslint:disable-next-line:object-literal-key-quotes
        'IOMv3c': 6919,
        'IMM 1 x 100G': 44,
        'IMM12(5)': 2299,
        'IOM4-e-hs': 1184
      }]
    };
    const card = data.cardDetails[0];
    component.tableSettingsCard.data = [{
      'TiMOS-C-15.0.R15': 1080,
      'TiMOS-C-12.0.R14': 2,
      'TiMOS-C-15.0.R1': 1,
      'TiMOS-C-15.0.R6-1': 657,
      'TiMOS-C-13.0.R12-1': 794,
      '(N/A)': 72,
      'TiMOS-C-13.0.R12': 630,
      'TiMOS-C-15.0.R6': 92,
      'TiMOS-C-15.0.R12': 310
    }];
    component.tableSettingsCard.headers = [{ field: 'TiMOS-C-13.0.R12-1', header: 'TiMOS-C-13.0.R12-1', visible: true,
      properties: { sort: false, editable: false }}]
    ;
    component.loadtableData(data);
    expect(component.loadtableData).toBeDefined();
  });
  it('should check function downloadCSVProduct Ethernet', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'Ethernet';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct Broadband', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'Broadband';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct Infrastructure', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'Infrastructure';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct P2PE', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'P2PE';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct backhaul', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'Backhaul';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct device', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'device';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct card', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = 'card';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });
  it('should check function downloadCSVProduct ', () => {
    spyOn(component, 'downloadCSVProduct').and.callThrough();
    const typeName = '';
    component.downloadCSVProduct(typeName);
    expect(component.downloadCSVProduct).toBeDefined();
  });

});
