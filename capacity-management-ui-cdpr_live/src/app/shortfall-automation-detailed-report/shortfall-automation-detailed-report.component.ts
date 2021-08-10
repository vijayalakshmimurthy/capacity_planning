import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { PageObjShortfall } from '../shortfall-automation-detailed-report/PageObjShortfall.model';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';

@Component({
  selector: 'app-shortfall-automation-detailed-report',
  templateUrl: './shortfall-automation-detailed-report.component.html',
  styleUrls: ['./shortfall-automation-detailed-report.component.scss']
})
export class ShortfallAutomationDetailedReportComponent implements OnInit {
  public pageData = new PageObjShortfall();
  public pageDataShort = new PageObjShortfall();
  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/SNE';
  /** DSR output based on searchtype */
  dsrData: any;
  /** filterData */
  filterData = [];
  // filterItemcol = '';
  // filterItem = '';  
  selectedSNE: string;
  /** Assign searchType */
  searchType: any;
  /** extend expiry date button enabled */
  extendButton = true;
  disableExportButton = false;
  searchVisible = false;
  clearfilterData = false;
  /** Table header variable */
  headerData: any;
  tableData: any;
  headerpush: any;
  noRecordError = false;
  expiryDateAll = '';
  expiryDateDetatils = [];
  reservationReport = [];
  /**  popup type input to madal popup */
  popuptype = '';
  display = false;
  delete;
  cancelButtonShow;
  footerButtons;
  commonModelProperties: any;
  /** for modal body content of Confirmation popup */
  bodyContent;
  /** for ok button of confirm popup */
  buttonOne;
  /** for cancel button of confirm popup */
  buttonTwo;
  /** show alert for  message for updated */
  successMsg = false;
  /** to show the  message text */
  successMsgText = '';
  /** Status of header Datepicker */
  setDatepickerstatus = [];
  /** Table settings data */
  type = 'search';
  tableSettings = {
    headers: [], data: [], status: [], currentStatus: [], shortfallType: [], isNewCapacityPlanned: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true
  };
  /** for pagination api call object */
  tableJsonFormat = {
    pageNo: 1,
    pageSize: 0,
    sortByField: '',
    isSortOrder: 'ASC',
    isDownload: false,
    isEntireRecord: 'NO',
    expiryDateForAll: '',
    reservationDetailsRequest: this.pageDataShort,
    reservationData: []
  };

  pageObj = {
    pageNo: 1,
    pageSize: 0,
    sortOrder: true,
    siteName: '',
    exchangeCode: '',
    enableSorting: true,
    sortByField: 'orderId',
  };
  orderiddata = [];
  exportpageDataShort: any = [];
  resExport;
  constructor(private appService: AppService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.getTableHeader();
  }
  /** Get Table Header */
  getTableHeader() {
    //  const dsrHeaderUrl = 'assets/json/sadr_header.json';
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-shortfallReport-header';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;
      this.tableSettings.status = [
        { label: 'Select Inflight Identified', value: null },
        { label: 'No', value: 'No' },
        { label: 'Yes', value: 'Yes' }
      ];
      this.tableSettings.currentStatus = [
        { label: 'Select Status', value: null },
        { label: 'Completed', value: 'Completed' },
        { label: 'Errored', value: 'Errored' },
        { label: 'In Progress', value: 'In Progress' }
      ];
      this.tableSettings.shortfallType = [
        { label: 'Select Shortfall Type', value: null },
        { label: 'CardShortfall', value: 'CardShortfall' },
        { label: 'CableShortfall', value: 'CableShortfall' },
        { label: 'RackShortfall', value: 'RackShortfall' },
        { label: 'RestOfShortfall', value: 'RestOfShortfall' },
      ];

      this.tableSettings.isNewCapacityPlanned = [
        { label: 'Select Is New Capacity Planned', value: null },
        { label: 'No', value: 'No' },
        { label: 'Yes', value: 'Yes' }
      ];

      const len = this.headerData.length;
      this.headerpush = this.headerData[len - 2];
      this.headerpush.properties.fieldTypeCalenderbodyTypeinshffall = 'calendar';
      this.headerpush.properties.filterType = 'shtfalldrrpage';
      this.headerData.push(this.headerpush);
      const uniheaderData = new Set(this.headerData);
      this.headerData = [...uniheaderData];
      this.tableSettings.headers = this.headerData;
      console.log(this.tableSettings.headers);
      this.tableSettings.headers = this.headerData;
    });
    this.getTable();
  }
  /** Get Table data */
  getTable() {
    const height = '100vh';
    this.noRecordError = false;
    const url = environment.base_url + 'shortfallReport/fetch-details';
    this.exportpageDataShort = this.pageDataShort;
    const expurl = environment.base_url + 'shortfallReport/export-data';
    this.appService.post(expurl, this.exportpageDataShort).subscribe((res: any) => {
      this.resExport = res.body.toString();
    });

    this.appService.post(url, this.pageDataShort).subscribe(res => {
      if (!res.shortfallReportDataList) {
        this.disableExportButton = true;
      }
      if (res.shortfallReportDataList.length > 0) {
        this.disableExportButton = false;
        this.tableSettings.data = res.shortfallReportDataList;
        this.tableSettings.totalRecords = res.totalRecords;
        this.orderiddata = [];
        this.tableSettings.data.forEach((currentValue, index) => {
          if (currentValue.id) {
            this.orderiddata.push({ id: currentValue.id });
          }
        });
        //  this.orderiddata = res.shortfallReportDataList.id;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
        this.disableExportButton = true;
      }


    });
    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
  }

  getSelectedPageNo(event) {
    this.tableSettings.refreshPagination = false;
    this.pageDataShort.pageNo = event.page + 1;
    this.getTable();
  }
  getlistRowSelect(event) {
    this.pageObj.pageSize = event.target.value;
    this.getTable();
  }
  cancelSearch() {
    // this.filterItem = '';
    // this.filterItemcol= '';
    this.searchVisible = false;
    this.clearfilterData = true;
    // this.pageDataShort.pageNo = 1;
    // this.pageDataShort.pageSize = 100;
    this.pageDataShort.orderId = [];
    this.pageDataShort.orderItemId = [];
    this.pageDataShort.exchange1141Code = [];
    this.pageDataShort.trsArea1141Code = [];
    this.pageDataShort.shortfallType = [];
    this.pageDataShort.shortfallSubType = [];
    this.pageDataShort.windowsType = [];
    this.pageDataShort.isInflightIdentified = [];
    this.pageDataShort.sneIdentified = [];
    this.pageDataShort.slotIdentified = [];
    this.pageDataShort.cpNumberIdentified = [];
    this.pageDataShort.wfmtProjectIdIdentified = [];
    this.pageDataShort.isNewCapacityPlanned = [];
    this.pageDataShort.capacityPlanningNumber = [];
    this.pageDataShort.wfmtProjectId = [];
    this.pageDataShort.SNEId = [];
    this.pageDataShort.currentStatus = [];
    this.pageDataShort.capacityAvailableDate = [];
    this.pageDataShort.shortfallReceivedDate = [];
    this.pageDataShort.sortByField = 'shortfallReceivedDate';
    this.pageDataShort.sortOrder = 'DESC';
    this.pageDataShort.pageNo = 1;
    this.pageDataShort.pageSize = 100;
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    this.getTable();
  }
  /** for exporting the table data */
  exportData() {
    const blobData = this.convertBase64ToBlobData(this.resExport);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobData, `ShortfallAutomationDtailedReport.xlsx`);
    } else {
      const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
      // tslint:disable-next-line:no-shadowed-variable
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ShortfallAutomationDtailedReport.xlsx`;
      link.click();
    }

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

  getFilterData(data) {
    this.clearfilterData = false;
    this.pageDataShort = data;
    this.pageDataShort.pageNo = -1;
    this.searchVisible = true;
 
    // if(this.pageDataShort.orderId.length>0){
    //   this.filterItemcol = "orderId";
    //   this.filterItem = this.pageDataShort.orderId[0];
    // }
    // if(this.pageDataShort.exchange1141Code.length>0){
    //   this.filterItemcol = "exchange1141Code";
    //   this.filterItem = this.pageDataShort.exchange1141Code[0];
    // }
    // if(this.pageDataShort.orderItemId.length>0){
    //   this.filterItemcol = "orderItemId";
    //   this.filterItem = this.pageDataShort.orderItemId[0];
    // }    
    // if(this.pageDataShort.trsArea1141Code.length>0){
    //   this.filterItemcol = "trsArea1141Code";
    //   this.filterItem = this.pageDataShort.trsArea1141Code[0];
    // }
    // if(this.pageDataShort.shortfallSubType.length>0){
    //   this.filterItemcol = "shortfallSubType";
    //   this.filterItem = this.pageDataShort.shortfallSubType[0];
    // }
    // if(this.pageDataShort.windowsType.length>0){
    //   this.filterItemcol = "windowsType";
    //   this.filterItem = this.pageDataShort.windowsType[0];
    // }
    // if(this.pageDataShort.shortfallType.length>0){
    //   this.filterItemcol = "shortfallType";
    //   this.filterItem = this.pageDataShort.shortfallType[0];
    // }
    // if(this.pageDataShort.isInflightIdentified.length>0){
    //   this.filterItemcol = "isInflightIdentified";
    //   this.filterItem = this.pageDataShort.isInflightIdentified[0];
    // }
    // if(this.pageDataShort.isNewCapacityPlanned.length>0){
    //   this.filterItemcol = "isNewCapacityPlanned";
    //   this.filterItem = this.pageDataShort.isNewCapacityPlanned[0];
    // }
    // if(this.pageDataShort.currentStatus.length>0){
    //   this.filterItemcol = "currentStatus";
    //   this.filterItem = this.pageDataShort.currentStatus[0];
    // }
    
    this.getTable();

   
    /*this.pageDataShort.orderId = [];
    this.pageDataShort.orderItemId = [];
    this.pageDataShort.exchange1141Code = [];
    this.pageDataShort.trsArea1141Code = [];
    this.pageDataShort.shortfallType = [];
    this.pageDataShort.shortfallSubType = [];
    this.pageDataShort.windowsType = [];
    this.pageDataShort.isInflightIdentified = [];
    this.pageDataShort.sneIdentified = [];
    this.pageDataShort.slotIdentified = [];
    this.pageDataShort.cpNumberIdentified = [];
    this.pageDataShort.wfmtProjectIdIdentified = [];
    this.pageDataShort.isNewCapacityPlanned = [];
    this.pageDataShort.capacityPlanningNumber = [];
    this.pageDataShort.wfmtProjectId = [];
    this.pageDataShort.SNEId = [];
    this.pageDataShort.currentStatus = [];
    this.pageDataShort.capacityAvailableDate = [];
    this.pageDataShort.shortfallReceivedDate = [];
    this.pageDataShort.sortByField = 'shortfallReceivedDate';
    this.pageDataShort.sortOrder = 'DESC';
    this.pageDataShort.pageNo = 1;
    this.pageDataShort.pageSize = 100;*/
  }
  customSort(event) {
    if (event.order === 1) {
      if (this.pageDataShort.sortOrder !== 'ASC' || this.pageDataShort.sortByField !== event.field) {
        this.pageDataShort.sortOrder = 'ASC';
        this.pageDataShort.sortByField = event.field;
        this.getTable();
      }
    } else if ((event.order === -1)) {
      if (this.pageDataShort.sortOrder !== 'DESC' || this.pageDataShort.sortByField !== event.field) {
        this.pageDataShort.sortOrder = 'DESC';
        this.pageDataShort.sortByField = event.field;
        this.getTable();
      }
    }
  }

}

