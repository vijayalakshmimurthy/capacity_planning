import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { PageObjDetailPatch } from '../detailed-patch-panel-report/PageObjDetailPatch.model';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { Subscription } from 'rxjs';
import { NavigationService } from '../shared/services/navigation.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-detailed-patch-panel-report',
  templateUrl: './detailed-patch-panel-report.component.html',
  styleUrls: ['./detailed-patch-panel-report.component.scss']
})
export class DetailedPatchPanelReportComponent implements OnInit {
  public pageDataPatch = new PageObjDetailPatch();
  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/1141';
  /** DSR output based on searchtype */
  dsrData: any;
  /** assign showgraph to true when dsrData is available */
  showTable = false;
  navigateCRSCToDPPRBySiteName$: Subscription;
  /** Assign siteName */
  siteName = false;
  siteNameval = false;
  /** Display message if there is no data */
  messageDisplay = 'Search the Site/1141 for Detailed Patch Panel Report';
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
  siteNameExport = '';
  expiryDateDetatils = [];
  reservationReport = [];
  exportTableData = [];
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
  disableExportButton = false;
  resExport;
  showLoader = false;
  constructor(private appService: AppService, private utilityService: UtilityService, private navigationService: NavigationService, private loaderService: LoaderService,) { }

  ngOnInit() {
    this.navigateCRSCToDPPRBySiteName$ = this.navigationService.navigateCRSCToDPPRBySiteName$.subscribe((siteName) => {
      if (siteName) {
        this.siteName = siteName;
        this.siteNameval = true;
        //   this.getDataBySiteName(this.siteName);
        console.log(this.siteName);
        this.getTableHeader();
        this.getTable(this.siteName);
      }
    });
  }


  /** Get Table Header */
  getTableHeader() {
    this.showTable = true;
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-detailPatchPanelReport-header';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;
      this.tableSettings.headers = this.headerData;
      console.log(this.tableSettings.headers);
      console.log(this.tableSettings);
    });
  }


  /** Get Table data */
  getTable(siteName) {
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    const height = '100vh';
    this.siteNameval = true;
    this.siteNameExport = siteName.siteName;
    const url = environment.base_url + 'shortfallReport/fetch-detailPatchPanelReport-dataGrid-details';
    this.appService.post(url, siteName).subscribe(res => {
       this.showLoader = false;
       this.loaderService.showHideLoader(false);
      if (res.length > 0) {
        this.tableSettings.data = res;
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }
    });
    this.tableSettings.scrollHeight = `calc(${height} - 330px)`;
  }

  getSelectedPageNo(event) {
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
      rearrangeJson.push(el.field);
      return el.header;
    });
    
    for (let i = 0; i < this.tableSettings.data.length; i++) {
      this.tableSettings.data[i].portName = " " + this.tableSettings.data[i].portName + " ";
      if (this.tableSettings.data[i].ppTRS === null || this.tableSettings.data[i].ppSsneid === null || this.tableSettings.data[i].ppPort === null) {
        this.tableSettings.data[i].ppTRS = "N/A";
        this.tableSettings.data[i].ppSsneid = "N/A";
        this.tableSettings.data[i].ppPort = "N/A";
      }
    }
    if(this.exportTableData.length > 0)
    {
      const rearrange = JSON.parse(JSON.stringify(this.exportTableData, rearrangeJson));
      const rowsToFile = rearrange as object[];
      const options = {
        showLabels: true,
        showTitle: true,
        title: 'Detailed Patch Panel Report - ' + this.siteNameExport,
        headers: colsToFile
      };
      new ngxCsv(rowsToFile, 'DetailedPatchPanelReport', options);
    }
    else
    {
      const rearrange = JSON.parse(JSON.stringify(this.tableSettings.data, rearrangeJson));
      const rowsToFile = rearrange as object[];
      const options = {
        showLabels: true,
        showTitle: true,
        title: 'Detailed Patch Panel Report - ' + this.siteNameExport,
        headers: colsToFile
      };
      new ngxCsv(rowsToFile, 'DetailedPatchPanelReport', options);
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

  customSort(event) {
    if (event.order === 1) {
      if (this.pageDataPatch.sortOrder !== 'ASC' || this.pageDataPatch.sortByField !== event.field) {
        this.pageDataPatch.sortOrder = 'ASC';
        this.pageDataPatch.sortByField = event.field;
        this.getTable(this.siteName);
      }
    } else if ((event.order === -1)) {
      if (this.pageDataPatch.sortOrder !== 'DESC' || this.pageDataPatch.sortByField !== event.field) {
        this.pageDataPatch.sortOrder = 'DESC';
        this.pageDataPatch.sortByField = event.field;
        this.getTable(this.siteName);
      }
    }
  }

  ngOnDestroy() {
    this.navigateCRSCToDPPRBySiteName$.unsubscribe();
    this.navigationService.navigateCRSCToDPPRBySiteName.next(null);
  }

}

