import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
/** This is the Shortfall Dashboard Parent Component */
@Component({
  selector: 'app-shortfall-automation-dashboard',
  templateUrl: './shortfall-automation-dashboard.component.html',
  styleUrls: ['./shortfall-automation-dashboard.component.scss'],
  providers: [DatePipe]
})
/** Class contents charts and table data */
export class ShortfallAutomationDashboardComponent implements OnInit {
  /** HTML elementId */
  @Input() elementId;
  /** chart output */
  reservationData: any;
  calendarValues;
  /** day week month year boolen value */
  dayCalendar = false;
  weekCalendar = true;
  monthCalendar = false;
  yearCalendar = false;
  dateValue;
  weekValue;
  monthValue;
  yearValue;
  tableHeader: any = [];
  /** chart output */
  noRecordError = false;
  /** download api call object */
  tableJsonFormat = {
    pageNo: 1,
    pageSize: 0,
    sortByField: '',
    isSortOrder: 'ASC',
    isDownload: false
  };
  /** Table settings data */
  tableSettings = {
    frozenColumns: '', headers: [], data: [], paginator: true, customSort: true, clientSorting: false, scrollHeight: '450px', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };
  /** Table header variable */
  headerData: any;
  name;
  headerStartDate;
  headerEndDate;
  tableHeaderList: any = {};
  headerWeek1;
  headerWeek2;
  headerWeek3;
  headerWeek4;
  headerWeek5;
  /** downloadImageName input to reservation-png.directive */
  downloadImageName = 'Bar-chart';
  /** export data */
  exportData: string;
  /** downloadExportsheet input to reservation-csv.directive */
  fileName = '';
  /** table total records */
  tableTotalRecords;
  selectedDate;
  reqObj;
  planList = [
    { code: 'Daily', label: 'Daily' },
    { code: 'Weekly', label: 'Weekly' },
    { code: 'Monthly', label: 'Monthly' },
    { code: 'Yearly', label: 'Yearly' }
  ];
  yearList = [
    { code: '2021', label: '2021' },
    { code: '2022', label: '2022' },
    { code: '2023', label: '2023' },
    { code: '2024', label: '2024' },
    { code: '2025', label: '2025' },
    { code: '2026', label: '2026' },
    { code: '2027', label: '2027' },
    { code: '2028', label: '2028' },
    { code: '2029', label: '2029' },
    { code: '2030', label: '2030' },
    { code: '2031', label: '2031' },
    { code: '2032', label: '2032' },
    { code: '2033', label: '2033' },
    { code: '2034', label: '2034' },
    { code: '2035', label: '2035' }
  ];
  selectedPlan;
  columns: any = [];
  total: any = [];
  customers: any = [];
  // showTable = false;
  // noData = false;
  showChart = false;
  chartNoData = false;
  rowGroupMetadata: any;
  myDate = new Date();
  currDate;
  minDate;
  minMonthDate;
  minYearDate;
  customerRecords: any = [];
  total1;
  total2;
  total3;
  total4;
  total5;
  total6;
  total7;
  total8;
  total9;
  total10;
  total11;
  total12;
  total13;
  total14;
  total15;
  total16;
  total17;
  total18;
  total19;
  total20;
  total21;
  total22;
  total23;
  total24;
  total25;
  shortfallSubTypeGrandTotal;
  leftResponse;
  rightResponse;
  leftArr = false;
  rightArr = false;
  respDate;
  reportType;
  year2020;
  maxDate;
  resExport;
  optionMonth;
  optionYear;
  optionDW;
  exportResTable;
  /** Constructor to inject app service */
  constructor(private appService: AppService, private datePipe: DatePipe) { }
  /** OnLoad get the table header value */
  ngOnInit() {
    this.currDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    console.log(this.currDate);
    const currentDate = this.currDate.split('/');
    const date = currentDate[0] - 13;
    const month = currentDate[1] - 2;
    const year = currentDate[2];
    const date1 = currentDate[0];
    const month1 = currentDate[1] - 1;
    const year1 = currentDate[2];
    this.year2020 = year;
    this.maxDate = new Date(year1, month1, date1);
    this.minDate = new Date(2020, 11, 28);
    this.minMonthDate = new Date(year, month);
    this.minYearDate = new Date(year);
    this.selectedPlan = this.planList[1];
    this.yearValue = this.yearList[0];
    this.calendarValues = 'WEEKLY';
    this.selectedDate = this.currDate;
    this.dateValue = this.selectedDate;
    this.weekValue = this.selectedDate;
    console.log(currentDate);
    this.optionMonth = currentDate[1];
    this.optionYear = currentDate[2];
    const currenMonth = month + 1;
    this.optionDW = currentDate[0] + '/' + this.optionMonth + '/' + this.optionYear;
    this.monthValue = new Date(year, currenMonth);
    // this.yearValue =  '2020';
    this.reqObj = {
      searchType: this.calendarValues.toUpperCase(),
      searchDate: this.selectedDate
    };
    this.getOnLoadBarCharts();
    this.getOnLoadTable();
    // this.downloadXLXReport();
  }
  /** onload new request for bar chart */
  getOnLoadBarCharts() {
    const url = environment.base_url + 'shortfallDashboard/graphdata';
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.selectedDate,
      onLoad: true
    };
    this.appService.post(url, this.reqObj).subscribe(res => {
      // this.appService.get('assets/json/shortfall-dashboard.json').subscribe(res => {
      this.reservationData = res.data;
      // this.appService.post(expurl, this.exportpageDataShort).subscribe((res: any) => {
      //   this.resExport = res.body.toString();
      // });
      if (this.reservationData === []) {
        this.showChart = false;
        this.chartNoData = true;
      } else if (this.reservationData === null) {
        this.showChart = false;
        this.chartNoData = true;
      } else {
        this.showChart = true;
        this.chartNoData = false;
      }
    });
  }
  /** onload new request for table - when page loads*/
  getOnLoadTable() {
    const url = environment.base_url + 'shortfallDashboard/all-details';
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.selectedDate,
      onLoad: true
    };
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.exportResTable = res;
      console.log(res.dashboardHeader);
      console.log(this.exportResTable);
      // this.appService.get('assets/json/shortfall-dashboard-table.json').subscribe(res => {
      this.customers = res.data;
      this.leftResponse = res.leftArrow;
      this.rightResponse = res.rightArrow;
      this.reportType = res.reportType;
      this.leftArr = res.leftArrowEnable;
      this.rightArr = res.rightArrowEnable;
      if (this.leftArr === true) {
        this.leftArr = false;
      } else if (this.leftArr === false) {
        this.leftArr = true;
      }
      if (this.rightArr === true) {
        this.rightArr = false;
      } else if (this.rightArr === false) {
        this.rightArr = true;
      }
      // if (this.customers === []) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else if (this.customers === null) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else {
      //   this.showTable = true;
      //   this.noData = false;
      // }
      this.columns = res.headers;
      this.total = res.footers;
      for (let i = 0; i < this.total.length; i++) {
        this.shortfallSubTypeGrandTotal = this.total[i].shortfallSubType;
        this.total1 = this.total[i].totalTableOne;
        this.total2 = this.total[i].handledTableOne;
        this.total3 = this.total[i].handledPercentageTableOne;
        this.total4 = this.total[i].inflightIdentifiedTableOne;
        this.total5 = this.total[i].capacityPlannedTableOne;
        this.total6 = this.total[i].totalTableTwo;
        this.total7 = this.total[i].handledTableTwo;
        this.total8 = this.total[i].handledPercentageTableTwo;
        this.total9 = this.total[i].inflightIdentifiedTableTwo;
        this.total10 = this.total[i].capacityPlannedTableTwo;
        this.total11 = this.total[i].totalTableThree;
        this.total12 = this.total[i].handledTableThree;
        this.total13 = this.total[i].handledPercentageTableThree;
        this.total14 = this.total[i].inflightIdentifiedTableThree;
        this.total15 = this.total[i].capacityPlannedTableThree;
        this.total16 = this.total[i].totalTableFour;
        this.total17 = this.total[i].handledTableFour;
        this.total18 = this.total[i].handledPercentageTableFour;
        this.total19 = this.total[i].inflightIdentifiedTableFour;
        this.total20 = this.total[i].capacityPlannedTableFour;
        this.total21 = this.total[i].totalTableFive;
        this.total22 = this.total[i].handledTableFive;
        this.total23 = this.total[i].handledPercentageTableFive;
        this.total24 = this.total[i].inflightIdentifiedTableFive;
        this.total25 = this.total[i].capacityPlannedTableFive;
      }
      this.headerWeek1 = res.dashboardHeader[0];
      this.headerWeek2 = res.dashboardHeader[1];
      this.headerWeek3 = res.dashboardHeader[2];
      this.headerWeek4 = res.dashboardHeader[3];
      this.headerWeek5 = res.dashboardHeader[4];
      this.updateRowGroupMetaData();
    });
  }
  /** right arrow click new request for bar chart */
  getRightBarCharts() {
    const url = environment.base_url + 'shortfallDashboard/graphdata';
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.rightResponse,
      onLoad: false
    };
    if(this.calendarValues === 'Monthly') {
      const splitMY = this.rightResponse.split('/');
      console.log(splitMY[0]);
      console.log(splitMY[1]);
      if(splitMY[0].length==1)
      {
        splitMY[0] = "0" + splitMY[0];
      }
      
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: splitMY[0],
        searchYear: splitMY[1],
        onLoad: false
      }
    }
    else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.rightResponse,
        onLoad: false
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.reservationData = res.data;
      if (this.reservationData === null) {
        this.showChart = false;
        this.chartNoData = true;
      } else if (this.reservationData.length === 0) {
        this.showChart = false;
        this.chartNoData = true;
      } else {
        this.showChart = true;
        this.chartNoData = false;
      }
    });
  }
  /** right arrow click new request for table */
  getRightLoadTable() {
    const url = environment.base_url + 'shortfallDashboard/all-details';
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.rightResponse,
      onLoad: false
    };
    if(this.calendarValues === 'Monthly') {
      const splitMY = this.rightResponse.split('/');
      const year = this.optionYear;
     // this.monthValue = month + '/' + year;

      console.log(splitMY[0]);
      console.log(splitMY[1]);
      if(splitMY[0].length==1)
      {
        splitMY[0] = "0" + splitMY[0];
      }
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: splitMY[0],
        searchYear: splitMY[1],
        onLoad: false
      }
    }
    else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.rightResponse,
        onLoad: false
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      //  this.appService.get('assets/json/shortfall-dashboard-table.json').subscribe(res => {
      this.exportResTable = res;
      this.customers = res.data;
      this.leftResponse = res.leftArrow;
      this.rightResponse = res.rightArrow;
      if ((new Date(this.rightResponse).getTime() > new Date(this.currDate).getTime())) {
        this.rightResponse = this.currDate;
      }
      this.dateValue = res.leftArrow;
      this.weekValue = this.rightResponse;
      this.monthValue = this.rightResponse;
      this.yearValue = this.rightResponse;
      this.reportType = res.reportType;
      this.leftArr = res.leftArrowEnable;
      this.rightArr = res.rightArrowEnable;
      if (this.leftArr === true) {
        this.leftArr = false;
      } else if (this.leftArr === false) {
        this.leftArr = true;
      }
      if (this.rightArr === true) {
        this.rightArr = false;
      } else if (this.rightArr === false) {
        this.rightArr = true;
      }
      // if (this.leftResponse === null) {
      //   this.noData = true;
      //   this.showTable = false;
      // }
      // if (this.customers === null) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else if (this.customers.length === 0) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else {
      //   this.showTable = true;
      //   this.noData = false;
      // }
      this.columns = res.headers;
      this.total = res.footers;
      for (let i = 0; i < this.total.length; i++) {
        this.shortfallSubTypeGrandTotal = this.total[i].shortfallSubType;
        this.total1 = this.total[i].totalTableOne;
        this.total2 = this.total[i].handledTableOne;
        this.total3 = this.total[i].handledPercentageTableOne;
        this.total4 = this.total[i].inflightIdentifiedTableOne;
        this.total5 = this.total[i].capacityPlannedTableOne;
        this.total6 = this.total[i].totalTableTwo;
        this.total7 = this.total[i].handledTableTwo;
        this.total8 = this.total[i].handledPercentageTableTwo;
        this.total9 = this.total[i].inflightIdentifiedTableTwo;
        this.total10 = this.total[i].capacityPlannedTableTwo;
        this.total11 = this.total[i].totalTableThree;
        this.total12 = this.total[i].handledTableThree;
        this.total13 = this.total[i].handledPercentageTableThree;
        this.total14 = this.total[i].inflightIdentifiedTableThree;
        this.total15 = this.total[i].capacityPlannedTableThree;
        this.total16 = this.total[i].totalTableFour;
        this.total17 = this.total[i].handledTableFour;
        this.total18 = this.total[i].handledPercentageTableFour;
        this.total19 = this.total[i].inflightIdentifiedTableFour;
        this.total20 = this.total[i].capacityPlannedTableFour;
        this.total21 = this.total[i].totalTableFive;
        this.total22 = this.total[i].handledTableFive;
        this.total23 = this.total[i].handledPercentageTableFive;
        this.total24 = this.total[i].inflightIdentifiedTableFive;
        this.total25 = this.total[i].capacityPlannedTableFive;
      }
      this.headerWeek1 = res.dashboardHeader[0];
      this.headerWeek2 = res.dashboardHeader[1];
      this.headerWeek3 = res.dashboardHeader[2];
      this.headerWeek4 = res.dashboardHeader[3];
      this.headerWeek5 = res.dashboardHeader[4];
      this.updateRowGroupMetaData();
    });
  }
  /** Left arrow click new request for table*/
  getLeftLoadBarCharts() {
    const url = environment.base_url + 'shortfallDashboard/graphdata';
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.leftResponse,
      onLoad: true
    };
    if(this.calendarValues === 'Monthly') {
      const splitMY = this.leftResponse.split('/');
      console.log(splitMY[0]);
      console.log(splitMY[1]);
      if(splitMY[0].length==1)
      {
        splitMY[0] = "0" + splitMY[0];
      }
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: splitMY[0],
        searchYear: splitMY[1],
        onLoad: true
      }
    }
    else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.leftResponse,
        onLoad: true
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.reservationData = res.data;
      if (this.reservationData === []) {
        this.showChart = false;
        this.chartNoData = true;
      } else if (this.reservationData === null) {
        this.showChart = false;
        this.chartNoData = true;
      } else {
        this.showChart = true;
        this.chartNoData = false;
      }
    });
  }
  /** onload new request for table */
  getLeftLoadTable() {
    const url = environment.base_url + 'shortfallDashboard/all-details';
    
    this.reqObj = {
      searchType: this.calendarValues,
      searchDate: this.leftResponse,
      onLoad: true
    };
    if(this.calendarValues === 'Monthly') {
      const splitMY = this.leftResponse.split('/');
      console.log(splitMY[0]);
      console.log(splitMY[1]);
      if(splitMY[0].length==1)
      {
        splitMY[0] = "0" + splitMY[0];
      }
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: splitMY[0],
        searchYear: splitMY[1],
        onLoad: true
      }
    }
    else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.leftResponse,
        onLoad: true
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      // this.appService.get('assets/json/shortfall-dashboard-table.json').subscribe(res => {
      this.exportResTable = res; 
      this.customers = res.data;
      this.leftResponse = res.leftArrow;
      this.rightResponse = res.rightArrow;
      this.dateValue = this.leftResponse;
      this.weekValue = this.leftResponse;
      this.monthValue = this.leftResponse;
      this.yearValue = this.leftResponse;
      this.reportType = res.reportType;
      this.leftArr = res.leftArrowEnable;
      this.rightArr = res.rightArrowEnable;
      if (this.leftArr === true) {
        this.leftArr = false;
      } else if (this.leftArr === false) {
        this.leftArr = true;
      }
      if (this.rightArr === true) {
        this.rightArr = false;
      } else if (this.rightArr === false) {
        this.rightArr = true;
      }
      // if (this.leftResponse === null) {
      //   this.noData = true;
      //   this.showTable = false;
      // }
      // if (this.customers === []) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else if (this.customers === null) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else {
      //   this.showTable = true;
      //   this.noData = false;
      // }
      this.columns = res.headers;
      this.total = res.footers;
      for (let i = 0; i < this.total.length; i++) {
        this.shortfallSubTypeGrandTotal = this.total[i].shortfallSubType;
        this.total1 = this.total[i].totalTableOne;
        this.total2 = this.total[i].handledTableOne;
        this.total3 = this.total[i].handledPercentageTableOne;
        this.total4 = this.total[i].inflightIdentifiedTableOne;
        this.total5 = this.total[i].capacityPlannedTableOne;
        this.total6 = this.total[i].totalTableTwo;
        this.total7 = this.total[i].handledTableTwo;
        this.total8 = this.total[i].handledPercentageTableTwo;
        this.total9 = this.total[i].inflightIdentifiedTableTwo;
        this.total10 = this.total[i].capacityPlannedTableTwo;
        this.total11 = this.total[i].totalTableThree;
        this.total12 = this.total[i].handledTableThree;
        this.total13 = this.total[i].handledPercentageTableThree;
        this.total14 = this.total[i].inflightIdentifiedTableThree;
        this.total15 = this.total[i].capacityPlannedTableThree;
        this.total16 = this.total[i].totalTableFour;
        this.total17 = this.total[i].handledTableFour;
        this.total18 = this.total[i].handledPercentageTableFour;
        this.total19 = this.total[i].inflightIdentifiedTableFour;
        this.total20 = this.total[i].capacityPlannedTableFour;
        this.total21 = this.total[i].totalTableFive;
        this.total22 = this.total[i].handledTableFive;
        this.total23 = this.total[i].handledPercentageTableFive;
        this.total24 = this.total[i].inflightIdentifiedTableFive;
        this.total25 = this.total[i].capacityPlannedTableFive;
      }
      this.headerWeek1 = res.dashboardHeader[0];
      this.headerWeek2 = res.dashboardHeader[1];
      this.headerWeek3 = res.dashboardHeader[2];
      this.headerWeek4 = res.dashboardHeader[3];
      this.headerWeek5 = res.dashboardHeader[4];
      this.updateRowGroupMetaData();
    });
  }
  /** on page no change call table  */
  getSelectedPageNo(event) {
    this.tableSettings.refreshPagination = false;
    this.tableJsonFormat.pageNo = event.page + 1;
    this.getTable();
  }
  /** on items per page change call table  */
  getlistRowSelect(event) {
    this.tableSettings.refreshPagination = true;
    this.tableJsonFormat.pageNo = 1;
    this.tableJsonFormat.pageSize = event.target.value;
    this.getTable();
  }
  /** Get BarCHARTS */
  getBarCharts() {
    if (this.calendarValues === 'WEEKLY') {
      this.calendarValues = 'Weekly';
    }
    const url = environment.base_url + 'shortfallDashboard/graphdata';
    if (this.calendarValues === 'Daily') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.selectedDate,
      //  onLoad: true
      };
    } else if (this.calendarValues === 'Weekly') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.selectedDate
      };
    } else if (this.calendarValues === 'Monthly') {
      const month = this.selectedDate.split('/')[0];
      const year = this.selectedDate.split('/')[1];
      console.log(month, year);
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: month,
        searchYear: year
      };
    } else if (this.calendarValues === 'Yearly') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.selectedDate
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.reservationData = res.data;
      if (this.reservationData === null) {
        this.showChart = false;
        this.chartNoData = true;
      } else if (this.reservationData.length === 0) {
        this.showChart = false;
        this.chartNoData = true;
      } else {
        this.showChart = true;
        this.chartNoData = false;
      }
    });
  }
  /** Get Table total records */
  getTable() {
    if (this.calendarValues === 'WEEKLY') {
      this.calendarValues = 'Weekly';
    }
    this.name = '';
    this.headerWeek1 = '';
    this.headerWeek2 = '';
    this.headerWeek3 = '';
    this.headerWeek4 = '';
    this.headerWeek5 = '';
    this.customers = [];
    this.columns = [];
    this.tableJsonFormat.isDownload = false;
    this.noRecordError = false;
    const url = environment.base_url + 'shortfallDashboard/all-details';
    if (this.calendarValues === 'Daily') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.selectedDate,
      //  onLoad: true
      };
    } else if (this.calendarValues === 'Weekly') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.selectedDate
      };
    } else if (this.calendarValues === 'Monthly') {
      const month = this.selectedDate.split('/')[0];
      const year = this.selectedDate.split('/')[1];
      console.log(month, year);
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: month,
        searchYear: year
      };
    } else if (this.calendarValues === 'Yearly') {
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: this.selectedDate
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      // this.appService.get('assets/json/shortfall-dashboard-table.json').subscribe(res => {
      this.exportResTable = res;
      this.customers = res.data;
      this.leftResponse = res.leftArrow;
      this.rightResponse = res.rightArrow;
      this.reportType = res.reportType;
      this.leftArr = res.leftArrowEnable;
      this.rightArr = res.rightArrowEnable;
      if (this.leftArr === true) {
        this.leftArr = false;
      } else if (this.leftArr === false) {
        this.leftArr = true;
      }
      if (this.rightArr === true) {
        this.rightArr = false;
      } else if (this.rightArr === false) {
        this.rightArr = true;
      }
      // if (this.customers === null) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else if (this.customers.length === 0) {
      //   this.showTable = false;
      //   this.noData = true;
      // } else {
      //   this.showTable = true;
      //   this.noData = false;
      // }
      this.columns = res.headers;
      this.total = res.footers;
      for (let i = 0; i < this.total.length; i++) {
        this.shortfallSubTypeGrandTotal = this.total[i].shortfallSubType;
        this.total1 = this.total[i].totalTableOne;
        this.total2 = this.total[i].handledTableOne;
        this.total3 = this.total[i].handledPercentageTableOne;
        this.total4 = this.total[i].inflightIdentifiedTableOne;
        this.total5 = this.total[i].capacityPlannedTableOne;
        this.total6 = this.total[i].totalTableTwo;
        this.total7 = this.total[i].handledTableTwo;
        this.total8 = this.total[i].handledPercentageTableTwo;
        this.total9 = this.total[i].inflightIdentifiedTableTwo;
        this.total10 = this.total[i].capacityPlannedTableTwo;
        this.total11 = this.total[i].totalTableThree;
        this.total12 = this.total[i].handledTableThree;
        this.total13 = this.total[i].handledPercentageTableThree;
        this.total14 = this.total[i].inflightIdentifiedTableThree;
        this.total15 = this.total[i].capacityPlannedTableThree;
        this.total16 = this.total[i].totalTableFour;
        this.total17 = this.total[i].handledTableFour;
        this.total18 = this.total[i].handledPercentageTableFour;
        this.total19 = this.total[i].inflightIdentifiedTableFour;
        this.total20 = this.total[i].capacityPlannedTableFour;
        this.total21 = this.total[i].totalTableFive;
        this.total22 = this.total[i].handledTableFive;
        this.total23 = this.total[i].handledPercentageTableFive;
        this.total24 = this.total[i].inflightIdentifiedTableFive;
        this.total25 = this.total[i].capacityPlannedTableFive;
      }
      this.headerWeek1 = res.dashboardHeader[0];
      this.headerWeek2 = res.dashboardHeader[1];
      this.headerWeek3 = res.dashboardHeader[2];
      this.headerWeek4 = res.dashboardHeader[3];
      this.headerWeek5 = res.dashboardHeader[4];
      this.name = 'WEEKLY';
      this.updateRowGroupMetaData();
    });
  }
  /** Sorting group data */
  onSort() {
    this.updateRowGroupMetaData();
  }
  /** row group name */
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.customers) {
      for (let i = 0; i < this.customers.length; i++) {
        const rowData = this.customers[i];
        const representativeName = rowData.representative.representative;
        if (i === 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        } else {
          const previousRowData = this.customers[i - 1];
          const previousRowGroup = previousRowData.representative.representative;
          if (representativeName === previousRowGroup) {
            this.rowGroupMetadata[representativeName].size++;
          } else {
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
          }
        }
      }
    }
  }
  /** for exporting the table data */
  exportFile() {
    const exporturl = environment.base_url + 'shortfallDashboard/export-data';
    console.log(this.exportResTable);
    this.appService.post(exporturl, this.exportResTable).subscribe(res => {
      this.resExport = res.body.toString();
      const blobData = this.convertBase64ToBlobData(this.resExport);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `ShortfallAutomationDashboard.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ShortfallAutomationDashboard.xlsx`;
        link.click();
      }
    });
  }
  // tslint:disable-next-line:max-line-length
  convertBase64ToBlobData(base64Data: string, contentType: string = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  /** Arrow left click */
  leftClick(value) {
    console.log(value);
    this.getLeftLoadBarCharts();
    this.getLeftLoadTable();
  }
  /** Arrow right click */
  rightClick(value) {
    console.log(value);
    this.getRightBarCharts();
    this.getRightLoadTable();
  }
  // Change the year option
  changeCalendarYear(event) {
    console.log(event.originalEvent.target.innerText);
    this.selectedDate = event.originalEvent.target.innerText;
    this.getBarCharts();
    this.getTable();
  }
  // Change the calendar option
  changeDropdown(event) {
    console.log(event.originalEvent.target.innerText);
    this.calendarValues = event.originalEvent.target.innerText;
    if (this.calendarValues === 'Daily') {
      this.dayCalendar = true;
      this.weekCalendar = false;
      this.monthCalendar = false;
      this.yearCalendar = false;
    } else if (this.calendarValues === 'Weekly') {
      this.weekCalendar = true;
      this.dayCalendar = false;
      this.monthCalendar = false;
      this.yearCalendar = false;
    } else if (this.calendarValues === 'Monthly') {
      this.monthCalendar = true;
      this.dayCalendar = false;
      this.weekCalendar = false;
      this.yearCalendar = false;
    } else if (this.calendarValues === 'Yearly') {
      this.selectedDate = this.year2020;
      this.yearCalendar = true;
      this.dayCalendar = false;
      this.weekCalendar = false;
      this.monthCalendar = false;
    }
    this.getOptionChangeBarCharts();
    this.getOptionChangeTable();
   // this.getOnLoadTable();
  }
  /** Get BarCHARTS */
  getOptionChangeBarCharts() {
    if (this.calendarValues === 'WEEKLY') {
      this.calendarValues = 'Weekly';
    }
    const url = environment.base_url + 'shortfallDashboard/graphdata';
    if (this.calendarValues === 'Daily') {
      this.dateValue = this.optionDW;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.dateValue,
       // onLoad: true
      };
    } else if (this.calendarValues === 'Weekly') {
      this.weekValue = this.optionDW;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.weekValue,
        onLoad: true
      };
    } else if (this.calendarValues === 'Monthly') {
      const month = this.optionMonth;
      const year = this.optionYear;
      this.monthValue = month + '/' + year;
      console.log(month, year);
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: month,
        searchYear: year
      };
    } else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: year
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.reservationData = res.data;
      if (this.reservationData === null) {
        this.showChart = false;
        this.chartNoData = true;
      } else if (this.reservationData.length === 0) {
        this.showChart = false;
        this.chartNoData = true;
      } else {
        this.showChart = true;
        this.chartNoData = false;
      }
    });
  }
  /** Get Table total records */
  getOptionChangeTable() {
    if (this.calendarValues === 'WEEKLY') {
      this.calendarValues = 'Weekly';
    }
    this.name = '';
    this.headerWeek1 = '';
    this.headerWeek2 = '';
    this.headerWeek3 = '';
    this.headerWeek4 = '';
    this.headerWeek5 = '';
    this.customers = [];
    this.columns = [];
    this.tableJsonFormat.isDownload = false;
    this.noRecordError = false;
    const url = environment.base_url + 'shortfallDashboard/all-details';
    if (this.calendarValues === 'Daily') {
      this.dateValue = this.optionDW;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.dateValue,
      //  onLoad: true
      };
    } else if (this.calendarValues === 'Weekly') {
      this.weekValue = this.optionDW;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchDate: this.weekValue,
        onLoad: true
      };
    } else if (this.calendarValues === 'Monthly') {
      const month = this.optionMonth;
      const year = this.optionYear;
      this.monthValue = month + '/' + year;
      console.log(month, year, this.monthValue);
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchMonth: month,
        searchYear: year
      };
    } else if (this.calendarValues === 'Yearly') {
      const year = this.optionYear;
      this.reqObj = {
        searchType: this.calendarValues.toUpperCase(),
        searchYear: year
      };
    }
    this.appService.post(url, this.reqObj).subscribe(res => {
      this.exportResTable = res;
      this.customers = res.data;
      this.leftResponse = res.leftArrow;
      this.rightResponse = res.rightArrow;
      this.reportType = res.reportType;
      this.leftArr = res.leftArrowEnable;
      this.rightArr = res.rightArrowEnable;
      if (this.leftArr === true) {
        this.leftArr = false;
      } else if (this.leftArr === false) {
        this.leftArr = true;
      }
      if (this.rightArr === true) {
        this.rightArr = false;
      } else if (this.rightArr === false) {
        this.rightArr = true;
      }
      this.columns = res.headers;
      this.total = res.footers;
      for (let i = 0; i < this.total.length; i++) {
        this.shortfallSubTypeGrandTotal = this.total[i].shortfallSubType;
        this.total1 = this.total[i].totalTableOne;
        this.total2 = this.total[i].handledTableOne;
        this.total3 = this.total[i].handledPercentageTableOne;
        this.total4 = this.total[i].inflightIdentifiedTableOne;
        this.total5 = this.total[i].capacityPlannedTableOne;
        this.total6 = this.total[i].totalTableTwo;
        this.total7 = this.total[i].handledTableTwo;
        this.total8 = this.total[i].handledPercentageTableTwo;
        this.total9 = this.total[i].inflightIdentifiedTableTwo;
        this.total10 = this.total[i].capacityPlannedTableTwo;
        this.total11 = this.total[i].totalTableThree;
        this.total12 = this.total[i].handledTableThree;
        this.total13 = this.total[i].handledPercentageTableThree;
        this.total14 = this.total[i].inflightIdentifiedTableThree;
        this.total15 = this.total[i].capacityPlannedTableThree;
        this.total16 = this.total[i].totalTableFour;
        this.total17 = this.total[i].handledTableFour;
        this.total18 = this.total[i].handledPercentageTableFour;
        this.total19 = this.total[i].inflightIdentifiedTableFour;
        this.total20 = this.total[i].capacityPlannedTableFour;
        this.total21 = this.total[i].totalTableFive;
        this.total22 = this.total[i].handledTableFive;
        this.total23 = this.total[i].handledPercentageTableFive;
        this.total24 = this.total[i].inflightIdentifiedTableFive;
        this.total25 = this.total[i].capacityPlannedTableFive;
      }
      this.headerWeek1 = res.dashboardHeader[0];
      this.headerWeek2 = res.dashboardHeader[1];
      this.headerWeek3 = res.dashboardHeader[2];
      this.headerWeek4 = res.dashboardHeader[3];
      this.headerWeek5 = res.dashboardHeader[4];
      this.name = 'WEEKLY';
      this.updateRowGroupMetaData();
    });
  }
  // Change the calendar option
  changeCalendar(event) {
    this.selectedDate = event;
      this.getBarCharts();
      this.getTable(); 
  }
  customSort(event) {
    if (event.order === 1) {
      if (this.tableJsonFormat.isSortOrder !== 'ASC' || this.tableJsonFormat.sortByField !== event.field) {
        this.tableJsonFormat.sortByField = event.field;
        this.tableJsonFormat.isSortOrder = 'ASC';
        this.tableJsonFormat.isDownload = false;
        const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-grid-data';
        const reqObj = { ...this.tableJsonFormat };
        this.appService.post(url, reqObj).subscribe(res => {
          this.tableSettings.data = res.data;
        });
      }
    } else if ((event.order === -1)) {
      if (this.tableJsonFormat.isSortOrder !== 'DESC' || this.tableJsonFormat.sortByField !== event.field) {
        this.tableJsonFormat.sortByField = event.field;
        this.tableJsonFormat.isSortOrder = 'DESC';
        this.tableJsonFormat.isDownload = false;
        const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-grid-data';
        const reqObj = { ...this.tableJsonFormat };
        this.appService.post(url, reqObj).subscribe(res => {
          this.tableSettings.data = res.data;
        });
      }
    }
  }
}
