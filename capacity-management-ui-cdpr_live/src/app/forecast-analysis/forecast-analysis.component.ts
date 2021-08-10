import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { LineChartOptionsForFMR } from '../shared/constants/dsr-chart.constant';
import { ProductTypeConstantsForForecast } from '../shared/constants/dsr-productType.constant';
import { environment } from '../../environments/environment';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { Subscription } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-forecast-analysis',
  templateUrl: './forecast-analysis.component.html',
  styleUrls: ['./forecast-analysis.component.scss']
})
export class ForecastAnalysisComponent implements OnInit, OnDestroy {

  /** Table settings data */
  tableSettings = {
    frozenColumns: [], headers: [], data: [], paginator: false, scrollHeight: '610px', sort: false,
    columnHeight: '30px', columnWidthDynamic: false,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, pagination: false,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };

  /** Producttab variable */
  productType = ProductTypeConstantsForForecast;
  /** Graph property variable */
  options = LineChartOptionsForFMR;
  activeTabName = 'Ethernet';
  /** Graph property variable */
  type = 'line';
  /** Graph property variable */
  data: any;
  noLineData = false;
  showlineData = true;
  portList = [{portSpeed: '1GE'}, {portSpeed: '10GE'}, {portSpeed: '100GE'}];
  /** model value for portspeed dropdown */
  selectedPortSpeed = '10GE';
  /** filterData */
  filterData: any = [];

  /** placeholder for searchbox */
  searchBoxPlaceHolder = ' Search Site/1141';
  /** error message for searchbox */
  searchSiteErrorMsg = '';
  tableData: any;
  graphData: any;
  siteName: string;
  /** Display message if there is no data */
  messageDisplay = 'Search the Site/1141 for Forecast Analysis';
  showData = false;
  navigateFMRToFABySiteName$: Subscription;
  noPortSpeedData = true;

   /** Constructor to inject app service */
  constructor(private appService: AppService, private utilityService: UtilityService,
              private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigateFMRToFABySiteName$ = this.navigationService.navigateFMRToFABySiteName$.subscribe((siteName) => {
      if (siteName) {
        this.siteName = siteName;
        this.setActiveTabValue({ name: 'Ethernet', active: true, type: 'line' });
        this.getGraphData(this.siteName);
        this.getTableData(this.siteName);
      }
    });
    this.getHeader();
  }

  getGraphData(event) {
    const url = environment.base_url + 'forecastAnalysisReport/fetch-forecastAnalysis-graph-data?searchParam=' + event;
    this.appService.get(url).subscribe(response => {
      if (response !== null) {
        this.showData = true;
        this.graphData = response.data;
        this.siteName = response.data.siteName;
        this.loadGraphData();
      }
    }, (err) => {
      this.siteName = null;
      this.showData = false;
      this.messageDisplay = 'Data is not available';
    });
  }

  /** Load Graphdata based on type */
  loadGraphData() {
    if (this.activeTabName === 'Ethernet') {
      if (this.type === 'line') {
        this.options = LineChartOptionsForFMR;
        this.loadGraphDataByPortSpeed(this.graphData[this.activeTabName]);
      }
    } else {
      this.noLineData = true;
      this.showlineData = false;
    }
  }

  loadGraphDataByPortSpeed(graphData) {
    this.data = [];
    this.noPortSpeedData = true;
    for (const key in graphData) {
      if (this.selectedPortSpeed === graphData[key].port) {
        this.data = graphData[key];
        this.noPortSpeedData = false;
        this.loadLineChartProperties(this.data);
      }
    }
  }

   /** Set borderColor for LineChart */
   loadLineChartProperties(data) {
    if (data !== null) {
      this.showlineData = true;
      const lineBorderColor = new Map([['ARIMA', '#6400aa'], ['HoltsMethod', '#FF0000'], ['HoltWinter', '#00FF00'],
        ['LSTM(Bidirectional)', '#0000FF'], ['LSTM(CONV)', '#A52A2A'], ['Actual', '#000000']]);
      for (const key of Object.keys(data.datasets)) {
        data.datasets[key].fill = false;
        data.datasets[key].borderColor = lineBorderColor.get(data.datasets[key].label);
      }
    }
  }

  getHeader() {
      const url = environment.base_url + 'generic-header/grid-forecast-analysis-header';
      this.appService.get(url).subscribe(response => {
        this.tableSettings.headers = response;
      });
  }

  getTableData(event) {
    const url = environment.base_url + 'forecastAnalysisReport/fetch-forecastAnalysis-table-data?searchParam=' + event;
    this.appService.get(url).subscribe(response => {
      if (response !== null) {
        this.showData = true;
        this.siteName = response.siteName;
        this.tableData = response['productValue'];
        this.loadTableData();
      }
    }, (err) => {
      this.siteName = null;
      this.showData = false;
      this.messageDisplay = 'Data is not available';
    });
  }

  loadTableData() {
    this.tableSettings.data = [];
    this.tableData.forEach(element => {
      if (this.activeTabName.toLowerCase() === element['productType'].toLowerCase()) {
        this.loadDataByPortSpeed(element['data']);
      }
    });
  }

  loadDataByPortSpeed(data) {
    this.tableSettings.data = [];
    for (const key in data) {
      if (this.selectedPortSpeed === data[key].portSpeed) {
        this.tableSettings.data = data[key].table;
      }
    }
  }

  /** Set type based on producttab */
  changeProduct(value) {
    this.setActiveTabValue(value);
    this.loadGraphData();
    this.loadTableData();
  }

  setActiveTabValue(value) {
    this.productType.forEach(element => {
      if (element.name === value.name) {
        element.active = true;
        this.activeTabName = value.name;
        this.type = value.type;
      } else {
        element.active = false;
      }
    });
    this.selectedPortSpeed = '10GE';
  }

  loadChartByPortSpeed(value) {
    this.selectedPortSpeed = value;
    this.loadGraphDataByPortSpeed(this.graphData[this.activeTabName]);
    this.loadTableData();
  }

  onkeyPressSearch(event) {
    this.searchSiteErrorMsg = '';
    const alphabets =  /[a-z, A-Z, /]/;
    if (event) {
      if (alphabets.test(event.target.value)) {
        if (event.target.value.length > 1) {
          const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
          this.appService.get(url).subscribe(res => {
            if (res.length > 0) {
              this.filterData = JSON.parse(JSON.stringify(res));
            } else {
              this.filterData = [];
              this.searchSiteErrorMsg = 'Site not found';
            }
          }, (err) => {
            this.utilityService.validateStatus(err.status, err.message, CP_ERROR.SEVERITY.ERROR, 3000);
          });
        }
      }
    }
  }

  /** Onselect call service and get site data data */
  onselectSearch(event) {
    this.setActiveTabValue({ name: 'Ethernet', active: true, type: 'line' });
    this.getGraphData(event);
    this.getTableData(event);
  }

  validateInputData(event) {
    const pattern = /[a-z, A-Z, /]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

   /** Call appservice downloadCSV */
   downloadCSV() {
    const url = environment.base_url + 'forecastAnalysisReport/trend-forecast-data-download?exCode=' + this.siteName + '&portSpeed='+ 
      this.selectedPortSpeed + '&productType=' + this.activeTabName;
    this.appService.downloadCSV(url);
  }

  ngOnDestroy() {
    this.navigateFMRToFABySiteName$.unsubscribe();
    this.navigationService.navigateFMRToFABySiteName.next(null);
  }
}
