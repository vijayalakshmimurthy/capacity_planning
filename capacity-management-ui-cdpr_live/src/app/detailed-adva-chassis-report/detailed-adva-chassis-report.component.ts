import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { Subscription } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { PageObjAdvaChassis } from '../detailed-adva-chassis-report/PageObjAdvaChassis.model';
import { LoaderService } from '../shared/services/loader.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-detailed-adva-chassis-report',
  templateUrl: './detailed-adva-chassis-report.component.html',
  styleUrls: ['./detailed-adva-chassis-report.component.scss']
})
export class DetailedAdvaChassisReportComponent implements OnInit {

  public pageDataPatch = new PageObjAdvaChassis();
  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/1141';
  /** DSR output based on searchtype */
  dsrData: any;
  /** assign showgraph to true when dsrData is available */
  showTable = false;
  navigateCRSCToDACRBySiteName$: Subscription;
  /** Assign siteName */
  siteName = false;
  siteNameval = false;
  /** Display message if there is no data */
  messageDisplay = 'Search the Site/1141 for Detailed ADVA Chassis Report';
  /** filterData */
  filterData = [];
  selectedSNE: string;
  /** Assign searchType */
  searchType: any;
  /** extend expiry date button enabled */
  extendButton = true;
  searchVisible = false;
  clearfilterData = false;
  /** Table header variable */
  headerData: any;
  tableData: any;
  headerpush: any;
  noRecordError = false;
  expiryDateAll = '';
  expiryDateDetatils = [];
  siteNameExport = '';
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
  exportTableData = [];
  disableExportButton = false;
  tableSettings = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };
  /** for pagination api call object */
  tableJsonFormat = {
    // pageNo: 1,
    // pageSize: 0,
    // sortByField: '',
    // isSortOrder: 'ASC',
    // isDownload: false,
    // isEntireRecord: 'NO',
    // expiryDateForAll: '',
    // reservationDetailsRequest: this.pageDataPatch,
    // reservationData: []
    pageNo: 1,
    pageSize: 0,
    sortByField: '',
    isSortOrder: 'ASC',
    isDownload: false
  };
  fileName = '';
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
  showLoader = false;
  constructor(private appService: AppService, private utilityService: UtilityService, private navigationService: NavigationService,private loaderService: LoaderService) { }

  ngOnInit() {
    this.navigateCRSCToDACRBySiteName$ = this.navigationService.navigateCRSCToDACRBySiteName$.subscribe((siteName) => {
      if (siteName) {
        this.siteNameval = true;
        this.siteName = siteName;
        //   this.getDataBySiteName(this.siteName);
        console.log(this.siteName);
        this.getTableHeader();
        this.getTable(this.siteName);
      }
    });
    // this.getTableHeader();
  }

  /** Get Table Header */
  getTableHeader() {
    this.showTable = true;
    //  const dsrHeaderUrl = 'assets/json/dppr_header.json';
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-detailFreeAdvaChassisPortsReport-header';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;

      this.tableSettings.headers = this.headerData;
      console.log(this.tableSettings.headers);
      console.log(this.tableSettings);
    });
    //this.getTable();
  }

  /** Get Table data */
  getTable(siteName) {
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    const height = '100vh';
    const reqdata = {
      //"siteName": "FROME"
      "siteName": siteName
    }
    this.siteNameval = true;
    this.siteNameExport = siteName.siteName;
    //const url = 'assets/json/detailed-adva-chassis-reporttable.json';
    const url = environment.base_url + 'shortfallReport/fetch-detailFreeAdvaChassisReport-dataGrid-details';
    this.appService.post(url, siteName).subscribe(res => {
      this.showLoader = false;
      this.loaderService.showHideLoader(false);
      if (res.length > 0) {
        this.tableSettings.data = res;
        //  this.tableSettings.totalRecords = res.totalRecords;
        // this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }

    });
    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
  }



  getSelectedPageNo(event) {
    //  this.tableSettings.refreshPagination = false;
    //  this.pageDataPatch.pageNo = event.page + 1;
    // this.getTable(this.siteName);
    this.tableJsonFormat.pageNo = event.page + 1;
  }
  getlistRowSelect(event) {
    this.tableSettings.refreshPagination = true;
    this.tableJsonFormat.pageNo = 1;
    this.tableJsonFormat.pageSize = event.target.value;
  }
  cancelSearch() {
    this.searchVisible = false;
    this.clearfilterData = true;
    this.pageDataPatch.pageNo = 1;
    this.pageDataPatch.pageSize = 100;
    this.exportTableData = [];
    this.disableExportButton = false
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    this.getTableHeader();
  }

  /** Disable export based on filter */
  exportDisableFilter(ed) {
    if (Object.keys(ed['filters']).length !== 0) {
      const filterValues = ed['filteredValue'];
      if (filterValues.length > 0) {
        this.exportTableData = filterValues;
        this.disableExportButton = false;
      } else {
        this.disableExportButton = true;
        this.exportTableData = [];
      }
    } else {
      this.disableExportButton = false;
      this.searchVisible = false;
      this.exportTableData = [];
    }
  }

  /** for exporting the table data */  
  exportData() {   
    let rearrangeJson = [];  
    const colsToFile = this.tableSettings.headers.map((el) => {
      rearrangeJson.push(el.header);
      return el.header;
    });

    if(this.exportTableData.length > 0)
    {
      const rearrange = JSON.parse(JSON.stringify(this.exportTableData));
      const rowsToFile = rearrange as object[];
      const options = {
        showLabels: true,
        showTitle: true,
        title: 'Detailed ADVA Chassis Report - ' + this.siteNameExport,
        headers: colsToFile
      };   
      new ngxCsv(rowsToFile, 'DetailedADVAChassisReport', options);
    }
    else
    {     
    const rearrange = JSON.parse(JSON.stringify(this.tableSettings.data));
    const rowsToFile = rearrange as object[];
    let header = 'Selected Filter -';
    const options = {
      showLabels: true,
      showTitle: true,
      title: 'Detailed ADVA Chassis Report - ' + this.siteNameExport,
      headers: colsToFile
    };   
    new ngxCsv(rowsToFile, 'DetailedADVAChassisReport', options);
  }
  }

  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
  this.searchSiteErrorMsg = '';
    const numbers = /^\d+$/;
    if (event !== null) {
      if (!numbers.test(event.target.value)) {
        if (event.target.value.length > 1) {
          const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
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
    }
  }
  /** Onselect call service and get DSR data */
  onselectSearch(event) {
    this.getTableHeader();
    const reqdata = {
      "siteName": event,
      "portSpeed": []
    }
    this.siteNameExport = event;
    this.getTable(reqdata);
  }

  getFilterData(data) {

    this.pageDataPatch = data;
    this.pageDataPatch.pageNo = -1;
    this.searchVisible = true;
    //  this.getTable(this.siteName);
    this.pageDataPatch.orderId = [];
    this.pageDataPatch.orderItemId = [];
    this.pageDataPatch.exchange1141Code = [];
    this.pageDataPatch.trsArea1141Code = [];
    this.pageDataPatch.shortfallType = [];
    this.pageDataPatch.shortfallSubType = [];
    this.pageDataPatch.windowsType = [];
    this.pageDataPatch.isInflightIdentified = [];
    this.pageDataPatch.sneIdentified = [];
    this.pageDataPatch.slotIdentified = [];
    this.pageDataPatch.cpNumberIdentified = [];
    this.pageDataPatch.wfmtProjectIdIdentified = [];
    this.pageDataPatch.isNewCapacityPlanned = [];
    this.pageDataPatch.capacityPlanningNumber = [];
    this.pageDataPatch.wfmtProjectId = [];
    this.pageDataPatch.SNEId = [];
    this.pageDataPatch.currentStatus = [];
    this.pageDataPatch.capacityAvailableDate = [];
    this.pageDataPatch.shortfallReceivedDate = [];
    this.pageDataPatch.sortByField = 'shortfallReceivedDate';
    this.pageDataPatch.sortOrder = 'DESC';
    this.pageDataPatch.pageNo = 1;
    this.pageDataPatch.pageSize = 100;
  }

  ngOnDestroy() {
    this.navigateCRSCToDACRBySiteName$.unsubscribe();
    this.navigationService.navigateCRSCToDACRBySiteName.next(null);
  }


}
