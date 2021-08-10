import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { PageObjDetailed } from '../detail-reservation-report/pageObjDetailed.model';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';

@Component({
  selector: 'app-detail-reservation-report',
  templateUrl: './detail-reservation-report.component.html',
  styleUrls: ['./detail-reservation-report.component.scss'],
  // styles: [`
  // th.otherhd.ui-sortable-column[ngvalue="sneId"],
  // th.otherhd.ui-sortable-column[ngvalue="siteName1"],
  // th.otherhd.ui-sortable-column[ngvalue="code1141"],
  // th.otherhd[ngvalue="sneId"],
  // th.otherhd[ngvalue="siteName1"],
  // th.otherhd[ngvalue="code1141"],
  // .purple-border {
  //   border-bottom: 4px solid #a26afd;  
  //   @media only screen and (-ms-high-contrast: active),
  //   (-ms-high-contrast: none) {
  //     border-bottom: 5px solid #a26afd;
  //   }
  // }
  // `],
  // encapsulation: ViewEncapsulation.None  
})
export class DetailReservationReportComponent implements OnInit {
  public pageData = new PageObjDetailed();
  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/SNE';
  /** DSR output based on searchtype */
  dsrData: any;
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
  selectData: any;
  reservationProjectTypeList = [];
  tableData: any;
  headerpush: any;
  noRecordError = false;
  expiryDateAll = '';
  expiryDateDetatils = [];
  reservationReport = [];
  userType = '';
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
    headers: [], data: [], usageType: [], reservationProjectType: [], portSpeedlist: [], paginator: true, scrollHeight: '55vh',
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
    reservationDetailsRequest: this.pageData,
    reservationData: []
  };

  pageObj = {
    pageNo: 1,
    pageSize: 0,
    sortOrder: true,
    siteName: '',
    exchangeCode: '',
    enableSorting: true,
    sortByField: 'siteName',
  };


  constructor(private appService: AppService, private utilityService: UtilityService) {
    const roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    if (roleName === 'PROD_CE_ADMIN') {
      this.userType = 'ADMIN';
    } else {
      this.userType = 'USER';
    }
  }

  ngOnInit() {
    this.getTableHeader();
  }
  /** Get Table Header */
  getTableHeader() {
    const dsrHeaderUrl = environment.base_url + 'generic-header/grid-drr-header';
    // const dsrHeaderUrl = 'assets/json/drr-header.json';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;
      const len = this.headerData.length;
      this.headerpush = this.headerData[len - 4];
      this.headerpush.properties.fieldTypeCheckboxHeader = 'checkbox';
      this.headerpush.properties.fieldTypeCalenderbodyType = 'calendar';
      this.headerpush.properties.filterType = 'drrpage';
      this.headerpush.columnWidth = '237px';
      this.headerData.push(this.headerpush);
      const uniheaderData = new Set(this.headerData);
      this.headerData = [...uniheaderData];
      this.tableSettings.headers = this.headerData;
      this.tableSettings.usageType.push({ label: 'Select Usage Type', value: null });
      this.tableSettings.reservationProjectType.push({ label: 'Select Reservation Project Type', value: null });
      // const selectUrl = 'assets/json/select_list.json';
      const url = environment.base_url + 'cuf-usage-flag/cuf-usage-list';
      this.appService.get(url).subscribe(selectUrlResponse => {
        this.selectData = selectUrlResponse;
        const a = selectUrlResponse.cufValues;
        for (const i of a) {
          if (i.projectType !== 'Customize') {
            const b = { label: i, value: i };
            this.tableSettings.usageType.push(b);
          }
        }
        this.tableSettings.usageType.push({ label: '(Blanks)', value: 'BLANK' });
      });
      const ReservationProjectType = environment.base_url + 'chassis-reservation/projectType?userType=' + this.userType;
      this.appService.get(ReservationProjectType).subscribe((response) => {
        this.reservationProjectTypeList = response;
        const a = this.reservationProjectTypeList;
        for (const i of a) {
          if (i.projectType !== 'Customize') {
          const b = { label: i.projectType, value: i.projectType };
          this.tableSettings.reservationProjectType.push(b);
        }
      }
        this.tableSettings.reservationProjectType.push({ label: '(Blanks)', value: 'BLANK' });
      });
      this.tableSettings.portSpeedlist = [
        { label: 'Select Port Speed', value: null },
        { label: 'GigE', value: 'GigE' },
        { label: 'FastE', value: 'FastE' },
        { label: '10GigE', value: '10GigE' },
        { label: '100GigE', value: '100GigE' }

      ];
    });

    this.getTable();
  }
  /** Get Table data */
  getTable() {
    const height = '100vh';
    this.noRecordError = false;
    const url = environment.base_url + 'detailed-reservation-report/reservation-report-data?ein=' + this.appService.getEIN();
    // 'assets/json/ddr.json'
    this.appService.post(url, this.pageData).subscribe(res => {
      if (res.reservationDataList.length > 0) {
        this.tableSettings.data = res.reservationDataList;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }
      console.log(this.tableSettings.data);
    });
    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
  }

  getSelectedPageNo(event) {
    this.tableSettings.refreshPagination = false;
    this.pageData.pageNo = event.page + 1;
    this.getTable();
  }
  getlistRowSelect(event) {
    this.pageData.pageSize = event.target.value;
    this.getTable();
  }
  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
    this.searchSiteErrorMsg = '';
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
  /** Onselect call service and get DSR data */
  onselectSearch(event) {
    this.getDataBySiteName(event);
  }

  /** Get data based on site name */
  getDataBySiteName(siteName) {
    this.pageData.globalSearchData[0] = siteName;
    const url = environment.base_url + 'detailed-reservation-report/reservation-report-data?ein=' + this.appService.getEIN();
    this.appService.post(url, this.pageData).subscribe(res => {
      this.tableSettings.data = res.reservationDataList;
      this.tableSettings.totalRecords = res.totalRecords;
      this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    });
  }
  /** Manage search data */
  onManageSearchData(event) {
    this.noRecordError = false;
    this.pageData.globalSearchData[0] = event;
    const url = environment.base_url + 'detailed-reservation-report/reservation-report-data?ein=' + this.appService.getEIN();
    this.appService.post(url, this.pageData).subscribe(res => {
      this.tableSettings.data = res.reservationDataList;
      this.tableSettings.totalRecords = res.totalRecords;
      this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    });
  }

  /** Manage Submit button and checkbox */
  openSearch() {
    this.extendButton = false;
    this.tableSettings.editkey = 'yes';
    const len = this.headerData.length;
    this.headerpush = this.headerData[len - 4];
    this.headerpush.properties.editable = 'true';
    this.headerpush.properties.sort = false;
    this.headerData.push(this.headerpush);
    const uniheaderData = new Set(this.headerData);
    this.headerData = [...uniheaderData];
    this.tableSettings.headers = this.headerData;
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));

  }
  /** Remove Submit button and checkbox */
  cancelOpenSearch() {
    this.extendButton = true;
    this.tableSettings.editkey = 'no';
    const len = this.headerData.length;
    this.headerpush = this.headerData[len - 4];
    this.headerpush.properties.editable = 'false';
    this.headerpush.properties.sort = true;
    this.headerData.push(this.headerpush);
    const uniheaderData = new Set(this.headerData);
    this.headerData = [...uniheaderData];
    this.tableSettings.headers = this.headerData;
    this.getTableHeader();
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
  }
  /** Set Expiry Date For All Columns */
  setExpiryDateAllColumnValue(value) {
    this.expiryDateAll = value;
    // this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    // console.log('Expiry Date All' + this.expiryDateAll);
    this.tableSettings.data.forEach((record, index) => {
      if (record.hasOwnProperty('expiryDate')) {
        this.tableSettings.data[index].expiryDate = value;
      }
    });
    console.log(this.tableSettings.data);
  }
  /** Set Expity Date For Table Body */
  setExpiryDateColumnValue(rowdata) {
    this.expiryDateDetatils = rowdata;
    console.log('Expiry Date' + this.expiryDateDetatils);
  }
  /** to get update table modal */
  // onDialogClose(event) {
  //   this.display = event;
  //   // this.confirmationPopup = event;
  //   this.popuptype = '';
  // }
  /** for exporting the table data */
  exportData() {
    const url = environment.base_url + 'detailed-reservation-report/dashboard-data-download?ein=' + this.appService.getEIN();
    this.appService.post(url, this.pageData).subscribe((res: any) => {
      const sheetBase64 = res.body.toString();
      const blobData = this.convertBase64ToBlobData(sheetBase64);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `DetailReservationReport.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `DetailReservationReport.xlsx`;
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
  /** get Confirmation popup */
  confirm() {
    this.delete = true;
    this.cancelButtonShow = true;
    this.display = true;
    this.commonModelProperties = {
      bodyContent: 'Do you want to extend the expiry date',
      popupType: 'confirmationPopup',
      header: 'Confirmation',
      footerButtons: 'true',
      // tslint:disable-next-line:max-line-length
      dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }]
    };
  }
  cancelLayerdPopup() {
    this.display = false;
  }
  submitDataApi() {
    if (this.expiryDateAll !== '' || this.expiryDateDetatils.length > 0) {
      if (this.expiryDateAll === '') {
        this.tableJsonFormat.isEntireRecord = 'NO';
        this.tableJsonFormat.expiryDateForAll = '';
        this.tableJsonFormat.reservationData = this.expiryDateDetatils;
        this.tableJsonFormat.reservationDetailsRequest = this.pageData;
      } else {
        this.tableJsonFormat.isEntireRecord = 'YES';
        this.tableJsonFormat.expiryDateForAll = this.expiryDateAll;
        // this.tableJsonFormat.reservationData = this.expiryDateDetatils;
        this.tableJsonFormat.reservationDetailsRequest = this.pageData;
      }
      const url = environment.base_url + 'detailed-reservation-report/update-expiry-date';
      // const url = 'http://10.52.35.46:61010/srimsCP/detailed-reservation-report/update-expiry-date';
      this.appService.post(url, this.tableJsonFormat).subscribe((res: any) => {
        this.expiryDateDetatils = [];
        this.reservationReport = res.reservationDataList;
      });
      console.log('cofirmAdded');
      this.display = false;
      this.expiryDateDetatils = [];
      this.expiryDateAll = '';
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS, 3000);
      this.tableSettings.editkey = 'no';
      this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      this.extendButton = true;
      // this.getTable();
      // this.getTableHeader();
    } else {
      this.display = false;
      this.utilityService.validateStatus(401, CP_ERROR.ERROR_MESSAGES.FAILED_TO_SAVE, CP_ERROR.SEVERITY.ERROR, 3000);
      this.tableSettings.editkey = 'no';
      // this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      this.extendButton = true;
      this.getTable();
      this.getTableHeader();
    }
  }
  customSort(event) {
    if (event.order === 1) {
      if (this.pageData.sortOrder !== 'ASC' || this.pageData.sortByField !== event.field) {
        this.pageData.sortOrder = 'ASC';
        this.pageData.sortByField = event.field;
        this.getTable();
      }
    } else if ((event.order === -1)) {
      if (this.pageData.sortOrder !== 'DESC' || this.pageData.sortByField !== event.field) {
        this.pageData.sortOrder = 'DESC';
        this.pageData.sortByField = event.field;
        this.getTable();
      }
    }
  }
  getFilterData(data) {
    this.pageData = data;
    this.pageData.pageNo = 1;
    this.searchVisible = true;
    this.getTable();

  }
  cancelSearch() {
    this.searchVisible = false;
    this.clearfilterData = true;
    // this.pageData.pageNo = 1;
    // this.pageData.pageSize = 100;
    this.tableSettings.usageType = [];
    this.tableSettings.reservationProjectType = [];
    this.pageData.cardModel = [];
    this.pageData.code1141 = [];
    this.pageData.expiryDate = [];
    this.pageData.globalSearchData = [];
    this.pageData.pageNo = 1;
    this.pageData.pageSize = 100;
    this.pageData.portId = [];
    this.pageData.portSpeed = [];
    this.pageData.reservationDate = [];
    this.pageData.reservedBy = [];
    this.pageData.siteName = [];
    this.pageData.sneId = [];
    this.pageData.reservedByName = [];
    this.pageData.cuf = [];
    this.pageData.cufValue = [];
    this.pageData.muxId = [];
    this.pageData.lagId = [];
    this.pageData.reservationProjectType = [];
    this.pageData.sortByField = 'siteName';
    this.pageData.sortOrder = 'ASC';
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    this.getTableHeader();

  }
  OnResetSearchInput(event) {
    if (event !== '' && event !== undefined && event !== null) {
      this.pageData.globalSearchData.push(event);
    } else {
      this.pageData.globalSearchData = [];
      // tslint:disable-next-line:no-trailing-whitespace
    }
    this.getDataBySiteName(event);
  }
}

