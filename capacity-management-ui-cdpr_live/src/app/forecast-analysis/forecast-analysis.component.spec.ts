import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastAnalysisComponent } from './forecast-analysis.component';
import { SharedModule } from '../shared/shared.module';
import { of, throwError } from 'rxjs';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { NavigationService } from '../shared/services/navigation.service';

describe('ForecastAnalysisComponent', () => {
  let component: ForecastAnalysisComponent;
  let fixture: ComponentFixture<ForecastAnalysisComponent>;
  let service: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ForecastAnalysisComponent],
      providers: [ NavigationService, AppService ]
    })
      .compileComponents();
    service = TestBed.get(AppService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should check function onkeyPressSearch which return success response', () => {
    spyOn(component, 'onkeyPressSearch').and.callThrough();
    const event = {
      target: {
        value: 'AA'
      }
    };
    const filterData = ['ABERDARE'];
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(filterData));
    component.onkeyPressSearch(event);
    fixture.detectChanges();
    expect(component.onkeyPressSearch).toHaveBeenCalled();
    expect(component.filterData).toEqual(filterData);
  });

  it('should check function onkeyPressSearch which return empty response', () => {
    spyOn(component, 'onkeyPressSearch').and.callThrough();
    const event = {
      target: {
        value: 'AA'
      }
    };
    const filterData = [];
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(of(filterData));
    component.onkeyPressSearch(event);
    fixture.detectChanges();
    expect(component.onkeyPressSearch).toHaveBeenCalled();
    expect(component.filterData).toEqual(filterData);
  });

  it('should check function onkeyPressSearch which return error response', () => {
    spyOn(component, 'onkeyPressSearch').and.callThrough();
    const event = {
      target: {
        value: 'AA'
      }
    };
    const filterData = [];
    service = fixture.debugElement.injector.get(AppService);
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.onkeyPressSearch(event);
    fixture.detectChanges();
    expect(component.onkeyPressSearch).toHaveBeenCalled();
  });


  it('should check function getGraphData with siteName', () => {
    spyOn(component, 'getGraphData').and.callThrough();
    const event = 'ABERDEEN WEST TE';
    const graphResponse = {
      data: {
        siteName: 'ABERDEEN WEST TE',
        Ethernet: [
          {
            port: '10GE',
            labels: [
              'Apr,2020',
              'May,2020',
              'Jun,2020',
              'Jul,2020',
              'Aug,2020',
              'Sep,2020',
              'Oct,2020',
              'Nov,2020',
              'Dec,2020',
            ],
            datasets: [
              {
                label: 'ARIMA',
                data: [100, 200, 150, 50, 300, 500, 100, 200, 400]
              }
            ]
          }
        ]
      }
    };
    spyOn(service, 'get').and.returnValue(of(graphResponse));
    component.getGraphData(event);
    fixture.detectChanges();
    expect(component.getGraphData).toHaveBeenCalled();
    expect(component.graphData).toEqual(graphResponse.data);
  });

  it('should check function getGraphData which return error response', () => {
    spyOn(component, 'getGraphData').and.callThrough();
    const event = 'ABERDEEN WEST TE';
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.getGraphData(event);
    fixture.detectChanges();
    expect(component.getGraphData).toHaveBeenCalled();
  });

  it('should check function getTableData with siteName', () => {
    spyOn(component, 'getTableData').and.callThrough();
    const event = 'ABERDEEN WEST TE';
    const url = environment.base_url + 'forecastAnalysisReport/fetch-forecastAnalysis-table-data?searchParam=' + event;
    const tableResponse = {
      siteName: 'ABERDEEN WEST TE',
      productValue:
        [
          {
            productType: 'Ethernet',
            data:
              [
                {
                  portSpeed: '10GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                },
                {
                  portSpeed: '1GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                }
              ]
          }
        ]
    };
    spyOn(service, 'get').and.returnValue(of(tableResponse));
    component.getTableData(event);
    fixture.detectChanges();
    expect(component.getTableData).toHaveBeenCalled();
    expect(component.tableData).toEqual(tableResponse['productValue']);
  });

  it('should check function getTableData which return error response', () => {
    spyOn(component, 'getTableData').and.callThrough();
    const event = 'ABERDEEN WEST TE';
    spyOn(service, 'get').and.returnValue(throwError([]));
    component.getTableData(event);
    fixture.detectChanges();
    expect(component.getTableData).toHaveBeenCalled();
  });

  it('should call onselectSearch method', () => {
    spyOn(component, 'onselectSearch').and.callThrough();
    const event = 'ABERDEEN WEST TE';
    component.onselectSearch(event);
    fixture.detectChanges();
    expect(component.onselectSearch).toHaveBeenCalledWith('ABERDEEN WEST TE');
  });

  it('should call loadChartByPortSpeed method', () => {
    spyOn(component, 'loadChartByPortSpeed').and.callThrough();
    const value = '10GE';
    const graphResponse = {
      data: {
        siteName: 'ABERDEEN WEST TE',
        Ethernet: [
          {
            port: '10GE',
            labels: [
              'Apr,2020',
              'May,2020',
              'Jun,2020',
              'Jul,2020',
              'Aug,2020',
              'Sep,2020',
              'Oct,2020',
              'Nov,2020',
              'Dec,2020',
            ],
            datasets: [
              {
                label: 'ARIMA',
                data: [100, 200, 150, 50, 300, 500, 100, 200, 400]
              }
            ]
          }
        ]
      }
    };
    const tableResponse = {
      siteName: 'ABERDEEN WEST TE',
      productValue:
        [
          {
            productType: 'Ethernet',
            data:
              [
                {
                  portSpeed: '10GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                },
                {
                  portSpeed: '1GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                }
              ]
          }
        ]
    };
    component.tableData = tableResponse['productValue'];
    component.graphData = graphResponse.data;
    component.loadChartByPortSpeed(value);
    fixture.detectChanges();
    expect(component.loadChartByPortSpeed).toHaveBeenCalledWith('10GE');
    expect(component.selectedPortSpeed).toBe('10GE');
  });

  it('should call changeProduct method', () => {
    spyOn(component, 'changeProduct').and.callThrough();
    const event = { name: 'BroadBand', active: true, type: 'line' };
    const graphResponse = {
      data: {
        siteName: 'ABERDEEN WEST TE',
        BroadBand: [
          {
            port: '10GE',
            labels: [
              'Apr,2020',
              'May,2020',
              'Jun,2020',
              'Jul,2020',
              'Aug,2020',
              'Sep,2020',
              'Oct,2020',
              'Nov,2020',
              'Dec,2020',
            ],
            datasets: [
              {
                label: 'ARIMA',
                data: [100, 200, 150, 50, 300, 500, 100, 200, 400]
              }
            ]
          }
        ]
      }
    };
    const tableResponse = {
      siteName: 'ABERDEEN WEST TE',
      productValue:
        [
          {
            productType: 'Ethernet',
            data:
              [
                {
                  portSpeed: '10GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                },
                {
                  portSpeed: '1GE',
                  table: [
                    {
                      model: 'Yearly Forecast',
                      actual: '257',
                      arima: '257',
                      lSTMBidirectional: '257',
                      lSTMConv: '257',
                      holtsMethod: '257',
                      holtWinter: '257'
                    },
                    {
                      model: 'Accuracy',
                      actual: '',
                      arima: '',
                      lSTMBidirectional: '',
                      lSTMConv: '',
                      holtsMethod: '',
                      holtWinter: ''
                    }
                  ]
                }
              ]
          }
        ]
    };
    component.tableData = tableResponse['productValue'];
    component.graphData = graphResponse.data;
    component.changeProduct(event);
    fixture.detectChanges();
    expect(component.changeProduct).toHaveBeenCalled();
  });

  it('should call downloadCSV method', () => {
    spyOn(component, 'downloadCSV').and.callThrough();
    component.downloadCSV();
    fixture.detectChanges();
    expect(component.downloadCSV).toHaveBeenCalled();
  });

  it('should call getHeader method', () => {
    spyOn(component, 'getHeader').and.callThrough();
    const response = [];
    const url = environment.base_url + 'generic-header/grid-forecast-analysis-header';
    spyOn(service, 'get').and.returnValue(of(response));
    component.getHeader();
    fixture.detectChanges();
    expect(component.getHeader).toHaveBeenCalled();
  });

});
