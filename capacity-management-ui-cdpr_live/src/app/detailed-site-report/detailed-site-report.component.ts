import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NavigationService } from '../shared/services/navigation.service';
import { Subscription } from 'rxjs';
/** This is the Detailed Site Report Parent Component */
@Component({
  selector: 'app-detailed-site-report',
  templateUrl: './detailed-site-report.component.html',
  styleUrls: ['./detailed-site-report.component.scss']
})
/** Class contents report and manage search tabs */
export class DetailedSiteReportComponent implements OnInit, OnDestroy {

  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/SNE/TRS Area';
  /** Display message if there is no data */
  messageDisplay = 'Search the Site/SNE for Detailed Site Report';
  /** filterData */
  filterData = [];
  /** Diable 3D site view button */
  disable3DBtn = true;
  /** Assign siteName */
  siteName = false;
  /** Assign searchType */
  searchType: any;
  /** assign showgraph to true when dsrData is available */
  showGraphs = false;
  showTable = false;
  selectedSNE: string;
  navigateCDPRToDSRBySiteName$: Subscription;
  noRecordError = false;
  ethernetPieData: any;
  broadBandPieData: any;
  noLineData = false;
  nodonutdata = false;
  deviceType ='';
  /** DSR output based on searchtype */
  dsrData: any;
  graphData: any;
  index = 0;
  href: string;
  header: string;	
  piechartdata = [];
  hideAndShow = [];
  /** Table settings data */
  tableSettings = {
    frozenColumns: [], headers: [], data: [], paginator: false, scrollHeight: '610px', sort: false,
    columnHeight: '30px', columnWidthDynamic: false,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, pagination: false,
    rowGroupData: { groupColName: 'groupName', viewType: 'subHeader' }, refreshPagination: false
  };

  /** Table header variable */
  headerData: any;
  columnList: any;
  selectedColumns: any;
  portspeed;
  /** Constructor to inject app service */
  constructor(private appService: AppService, private router: Router, private navigationService: NavigationService) {
  }

  /** OnLoad get the table header value */
  ngOnInit() {
   
    this.navigateCDPRToDSRBySiteName$ = this.navigationService.navigateCDPRToDSRBySiteName$.subscribe((siteName) => {
      if (siteName) {
        console.log(siteName);
        this.siteName = siteName.siteName;
        this.getDeviceTypeRole()
        this.getGraphDataBySiteName(this.siteName);
        this.getTableDataBySiteName(this.siteName);
      }
    });
    this.getDeviceTypeRole();
    /** Call appService and get table header value */
    // this.appService.get('assets/json/dsrTableHeader.json').subscribe(dsrHeaderColumnResponse => {
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-dsr-header?deviceType=' +this.deviceType;
    // const dsrHeaderUrl = environment.base_url + 'generic-header/grid-dsr-header?deviceType';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;
      this.tableSettings.headers = this.headerData;
      if(this.deviceType == 'Core Rt') {
      this.tableSettings.scrollHeight = `calc(${'100vh'} - 315px)`
      }
      this.columnList = JSON.parse(JSON.stringify(dsrHeaderColumnResponse.filter(x => {
        return x.fixed !== true && x.visible === true;
      })));
      this.selectedColumns = JSON.parse(JSON.stringify(dsrHeaderColumnResponse.filter(x => x.fixed !== true)));
    });
  }
  getDeviceTypeRole(){ 
      this.href = this.router.url.replace('/', '');	
      switch (this.href) {	
        case 'detailed-site-reportEdgeRT':
          this.header = 'Detailed Site Report- Edge RT ';
          this.deviceType = 'Edge Rt'
          break;	
        case 'detailed-site-reportCoreRT':
          this.header = 'Detailed Site Report- Core RT ';
          this.deviceType = 'Core Rt'
          break;	 
      }
  }
  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
    this.searchSiteErrorMsg = '';
    if (event && event.target.value.length > 1) {
      const url = environment.base_url + 'detail-site-report/search-site-name-dsr?searchParam=' + event.target.value + '&deviceType=' +this.deviceType;
      this.appService.get(url).subscribe(res => {
        if (res.length > 0) {
          this.filterData = JSON.parse(JSON.stringify(res));
        } else {
          this.filterData = [];
          this.searchSiteErrorMsg = 'Site not found';
        }
      });
    }
  }

  /** Onselect call service and get DSR data */
  onselectSearch(event) {    
    this.getGraphDataBySiteName(event);
    this.getTableDataBySiteName(event);
  }

  /** Get data based on site name */
  getGraphDataBySiteName(siteName) {   
   
    this.noRecordError = false;
    const numbers = /^\d+$/;
    // const staticUrl = 'assets/json/dsrGraphData.json';
    const url = environment.base_url + 'detail-site-report/all-details/searchData?searchData=' + siteName + '&deviceType=' +this.deviceType;
    this.appService.get(url).subscribe(res => {
      this.noLineData = false;    
      this.siteName = res.data.siteName;
      this.portspeed = res.data.portSpeed.join(" ");
      this.graphData = res;
      this.showGraphs = true;
      this.searchSiteErrorMsg = '';
      if (numbers.test(siteName)) {
        this.siteName = siteName;
        if(this.deviceType == 'Edge Rt') {
          this.disable3DBtn = false;
        } else {
          this.disable3DBtn = true;
        }      
        this.selectedSNE = siteName;
        this.searchType = 'SNE';
      } else {
        this.disable3DBtn = true;
        this.searchType = '';
      }
    }, (err) => {
      if (err.status === 200) {
        this.showGraphs = false;
        this.noLineData = true;
      } else {
        this.showGraphs = false;
        this.messageDisplay = 'Data is not available';
      }
    });
  }

  /** Get data based on site name */
  getTableDataBySiteName(siteName) {
    this.noRecordError = false;
    const numbers = /^\d+$/;
    // const staticUrl = 'assets/json/dsrTableData.json';
    const url = environment.base_url + 'detail-site-report/all-details/graphSearchData?searchData=' + siteName + '&deviceType=' +this.deviceType;
    this.appService.get(url).subscribe(res => {
      this.showTable = true;
      this.nodonutdata = false;
      this.siteName = res['donutChartResponse'].siteName;
      this.searchSiteErrorMsg = '';
      this.piechartdata = [];
      if(this.deviceType == 'Core Rt') {
        this.tableSettings.scrollHeight = `calc(${'100vh'} - 245px)`;
      }
      
      for(const piechardata in res['donutChartResponse']) {
         if(Array.isArray(res['donutChartResponse'][piechardata])) {
          let data = res['donutChartResponse'][piechardata][0];
          this.piechartdata.push({labelheader: piechardata, id: data.labels, data:res['donutChartResponse'][piechardata] })
         }
      } 
      if (res['donutChartResponse'].table.data) {
        this.tableSettings.data = res['donutChartResponse'].table.data;
        this.tableSettings.paginator = false;
      } else {
        this.noRecordError = true;
      }
      if (numbers.test(siteName)) {
        this.disable3DBtn = false;
        this.selectedSNE = siteName;
        this.searchType = 'SNE';
      } else {
        this.disable3DBtn = true;
        this.searchType = '';
      }
    }, (err) => {
      if (err.status === 200) {
        this.nodonutdata = true;
        this.showTable = false;
      } else {
        this.showTable = false;
        this.messageDisplay = 'Data is not available';
      }
    
    });
  }

  /** Onclick navigate to 3D page */
  on3DClickNavigation() {
    this.navigationService.navigateDSRTo3DBySNE.next(this.selectedSNE);
    this.router.navigate(['/chassis-viewer']);
  }
  getUpdatedHeaders(event) {
    if (event.type === 'add') {
      const index = this.columnList.findIndex(x => x.field === event.data.field);
      const dataChild = event.data.child.filter(x => x.visible === true);
      this.columnList.splice(index + 1, 0, ...dataChild);
      this.columnList = JSON.parse(JSON.stringify(this.columnList));
      const selectedColumnindex = this.selectedColumns.findIndex(x => x.field === event.data.field);
      const selectedArr = event.data.child.filter(x => x.visible === true);
      this.selectedColumns.splice(selectedColumnindex + 1, 0, ...selectedArr);
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    } else if (event.type === 'minus') {
      const indexMinus = this.columnList.findIndex(x => x.field === event.data.field);
      const dataChild = event.data.child.filter(x => x.visible === true);
      this.columnList.splice(indexMinus + 1, dataChild.length, ...[]);
      this.columnList = JSON.parse(JSON.stringify(this.columnList));
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    }
  }
 onClickNavigation(colIndex, colValue, rowVal) {
    const colData = { columnIndex: colIndex, columnValue: colValue, rowValue: rowVal };
    this.navigateUrlOnTableSelection(colData);
  }
  navigateUrlOnTableSelection(event) {
    // tslint:disable-next-line:radix
    if (parseInt(event.columnValue) !== 0) {
      const selectedSiteorSNE = {
        portProductType: event.rowValue.groupName,
        portProductValue: event.rowValue.dataName, portStatus: event.columnIndex , searchType: this.siteName
      };
      this.navigationService.navigateDSRTo3DBySiteName.next(selectedSiteorSNE);
      this.router.navigate(['/chassis-viewer']);
    }
  }

  /** Call appservice downloadCSV */
  downloadCSV() {
    const url = environment.base_url + 'site-management/line-graph-data-download?searchData=' + this.siteName + '&deviceType=' +this.deviceType;
    this.appService.downloadCSV(url);
  }
  /** funtion to append column on click of plus icon */
  appendColumn(column) {
    this.hideAndShow.push(column.field);
    const index = this.tableSettings.headers.findIndex(x => x.field === column.field);
    this.tableSettings.headers.splice(index + 1, 0, ...column.child);
    const obj = { data: column, type: 'add' };
    this.getUpdatedHeaders(obj);
    const elePlus = document.getElementById(column.field + '_plus') as HTMLElement;
    const eleMinus = document.getElementById(column.field + '_minus') as HTMLElement;
    // elePlus.classList.replace('show', 'hide');
    if(elePlus) {
      elePlus.classList.remove('show');
      elePlus.classList.add('hide');
    }
    if(eleMinus) {
      eleMinus.classList.remove('hide');
      eleMinus.classList.add('show');
    }
    if (column.hasOwnProperty('dependendColumns')) {
      if (column.dependendColumns !== null) {
        column.dependendColumns.forEach(element => {
          const ele = document.getElementById(element + '_plus') as HTMLElement;
          const eleMin = document.getElementById(element + '_plus') as HTMLElement;
          if (ele !== null && eleMin !== null) {
            if (eleMin.classList.contains('show')) {
              ele.click();
            }
          }

        });
      }
    }
  }

  /** funtion to remove column on click of minus icon */
  removeColumn(column) {
    if (this.hideAndShow.indexOf(column.field) !== -1) {
      const _ = this.hideAndShow.indexOf(column.field);
      if (_ > -1) {
        this.hideAndShow.splice(_, 1);
      }
    }
    const index = this.tableSettings.headers.findIndex(x => x.field === column.field);
    let columnCount = column.child.length;
    this.tableSettings.headers.splice(index + 1, columnCount, ...[]);
    const obj = { data: column, type: 'minus' };
    this.getUpdatedHeaders(obj);
    const elePlus = document.getElementById(column.field + '_plus') as HTMLElement;
    const eleMinus = document.getElementById(column.field + '_minus') as HTMLElement;
    if (elePlus !== null) {
      elePlus.classList.remove('hide');
      elePlus.classList.add('show');
    }
    if (eleMinus !== null) {
      eleMinus.classList.remove('show');
      eleMinus.classList.add('hide');
    }
  }
  ngOnDestroy() {
    this.navigateCDPRToDSRBySiteName$.unsubscribe();
    this.navigationService.navigateCDPRToDSRBySiteName.next(null);
  }
}
