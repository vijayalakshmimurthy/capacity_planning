import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter  } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';

/** This is the Reservation Dashboard Parent Component */
@Component({
    selector: 'app-reservation-dashboard',
    templateUrl: './reservation-dashboard.component.html',
    styleUrls: ['./reservation-dashboard.component.scss']
})
/** Class contents charts and table data */
export class ReservationDashboardComponent implements OnInit {
 /** chart output */
 reservationData: any;
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
  rowGroupData: { groupColName: null, viewType: null }, refreshPagination : false
};
 /** Table header variable */
 headerData: any;
  /** export data */
  exportData: string;
 /** downloadExportsheet input to reservation-csv.directive */
 fileName = '';
  /** to increase width of first column of table header */
//  headerWidth: any;
  /** table total records */
  tableTotalRecords;
/** Constructor to inject app service */
  constructor(private appService: AppService) { }
/** OnLoad get the table header value */
  ngOnInit() {
    this.getPiCharts();
    this.getTable();
  //  this.getTotalRecords();
    this.downloadXLXReport();
    const reservationHeaderUrl = environment.base_url + 'generic-header/grid-resd-header/';
  //  const reservationHeaderUrl =  'assets/json/reservation_dashboard.json';
    this.appService.get(reservationHeaderUrl).subscribe(reservationHeaderColumnResponse => {
    this.headerData = reservationHeaderColumnResponse;
  //  this.headerWidth = this.headerData[0];
  //  this.headerWidth.properties.columnWidth = '237px';
    this.tableSettings.headers = this.headerData;
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
  /** Get PIECHARTS */
  getPiCharts() {
    const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-data ';
    this.appService.get(url).subscribe(res => {
      this.reservationData = res;
    });
  }
  // /** Get Table data */
  // getTotalRecords() {
  //   const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-grid-data';
  //   const reqObj = { ...this.tableJsonFormat };
  //   this.appService.post(url, reqObj).subscribe(res => {
  //       this.tableTotalRecords = res.totalRecords;
  //   });
  // }
  /** Get Table total records */
  getTable() {
    this.tableJsonFormat.isDownload = false;
   // this.tableJsonFormat.isSortOrder = 'ASC';
   // this.tableJsonFormat.sortByField = '';
    this.noRecordError = false;
    const url = environment.base_url + 'reservation-dashboard/reservation-dashboard-grid-data';
    const reqObj = { ...this.tableJsonFormat };
    this.appService.post(url, reqObj).subscribe(res => {
        this.tableSettings.data = res.data;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    });
  }
  // It is for download the table data from java side and make api call.
  downloadXLXReport() {
    const reservationExportUrl = environment.base_url + 'reservation-dashboard/dashboard-table-data-download';
    this.tableJsonFormat.isDownload = true;
    const reqObj = { ...this.tableJsonFormat };
    this.appService.post(reservationExportUrl, reqObj).subscribe((res: any) => {
      this.exportData = res.body;
      this.fileName = 'ReservationDashboard.xlsx';
    });
  }
  customSort(event) {
    if (event.order === 1) {
      if (this.tableJsonFormat.isSortOrder !== 'ASC' || this.tableJsonFormat.sortByField !== event.field) {
    //  this.tableJsonFormat.pageNo = 1;
    //  this.tableJsonFormat.pageSize = 0;
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
    //  this.tableJsonFormat.pageNo = 1;
    //  this.tableJsonFormat.pageSize = 0;
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
