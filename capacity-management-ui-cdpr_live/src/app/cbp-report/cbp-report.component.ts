import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { WorkflowService } from '../shared/services/workflow.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/api';
import { RackPopupComponent } from './rack-popup/rack-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { NavigationService } from '../shared/services/navigation.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cbp-report',
  templateUrl: './cbp-report.component.html',
  styleUrls: ['./cbp-report.component.scss'],
  providers: [DialogService]
})

export class CbpReportComponent implements OnInit, OnDestroy, AfterViewInit {
  href: string;
  // for table records of first tab
  tablerecordsdata: any = [];
  // for table records of second tab
  optimizationTabledata: any = [];
  // to show message when no records for table
  showErrorMsg = false;
  /** show no records found for card tab */
  showCardErrorMsg = false;
  showCardErrorMsgCable = false;
  // to initialize index value on initializaton of page
  index = 0;
  // to disable the export button when no records for table
  exportDisablebtn = false;
  // declare for second tab
  cardmovetab;
  rackHeader: string;
  cbpCardheader: string;
  cbpCableheader: string;
  optimizationHeader: string;
  /** for pagination api call object */
  tableJsonFormat = {
    pageNo: 1,
    pageSize: 0,
    sortByField: '',
    isSortOrder: 'ASC',
    isDownload: false
  };
  // send to table for calling export function inside table component
  exportDataToTable;
  /** if no filter/search exportobj for export */
  exportObj = {
    id: '', siteName: '', projectId: '', cpNumber: '', cpDate: '', productType: '', sneId: '',
    slot: '', cardInFillType: '', exCode: '', portAvailability: '', status: ''
  };
  /** Table settings data */
  tableSettings = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };

  cableTableSettings = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [],
  };

  rackTableSetting = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: false, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [],
  };
  commonModelProperties: any;
  // headerSubmit;
  submitvalue = true;
  /** clear all enabled */
  clearEnabled = true;
  /** for card tab popup */
  displayCard = false;
  // delete popup show
  display = false;
  /** table records count */
  tableRecordsCount;
  /**  popup type input to madal popup */
  popuptype = '';
  /** Table header variable */
  headerData: any;
  // for table row id for delete
  deleteId = 0;
  // for table row id for edit
  editId = 0;
  // show alert for error message for delete
  errorMsg = false;
  // to show the error message text
  errorMsgText = '';
  // array for searched data from suggestion component
  searchedData = '';
  // to get rolenames
  roleName;
  // for modal body content of delete popup
  bodyContent;
  // for ok button of confirm popup
  buttonOne;
  // for cancel button of confirm popup
  buttonTwo;
  /** array for selected checkboxes  */
  selectedRow = [];
  beforeSubmitWFMT = false;
  /** clear table on clearall  */
  clearTable;
  cabinetSolution: any = [];
  cableSourceFrom: any = [];
  additionalAttribute = false;
  showPlanSubmission: boolean;
  submit;
  delete;
  cancelButtonShow;
  footerButtons;
  submitWfmt;
  headerPopup = '';
  tablePopup;
  cableExportDisable;
  /** Optimization table body declare */
  optBodyRecords: any = [];
  /** property values for select input of wfmt popup */
  priorityvalue: any = [];
  cardExportDisable: boolean;
  submitWfmtpopup;
  planSubmissionForm: FormGroup;
  /** Table settings data */
  tableSettingsPopup = {
    headers: [], data: [], scrollHeight: '450px', columnWidthDynamic: false,
    scrollable: true
  };

  rackClearTable: boolean;
  clearCableTable: boolean;
  rackHeaderData: any;
  rackTableFilterRecords = [];
  rackExportDisable: boolean;
  ref: DynamicDialogRef;
  optimizationStatusChange = '';
  @Input() confirmDeleteRow: boolean;
  cancelDeleteRow: boolean;
  @Input() confirmStatusValue;
  @Input() cancelStatusValue;
  disableSubmit = true;
  optClearAllTable: boolean;
  getEIN: any;
  getEmailID: any;
  optExportParams: any = {
    code1141: '',
    // tslint:disable-next-line:max-line-length
    projectId: '', cpNumber: '', cpDate: '', sourceSneId: '', sourceSlot: '', sourceCard: '', sourceNoOfPorts: '', sourceNoOfService: '', destinationSneId: '', destinationSlot: '', destinationCard: '', destinationNoOfPorts: '', destinationNoOfService: '', status: '', sitename: ''
  };
  disableExportOpt: boolean;
  navigate3DToCBPBySiteName$$: Subscription;
  optSubmitRecords: any;
  // card move
  cardmoverequest;
  editmode = false;
  /** display sitename in header for search */
  headerSitename = '';
  rackClearEnable = true;
  optClearEnable = true;
  coreImage = false;
  satelitteImgae = false;
  sitename3dSearch = '';
  siteNameFlag: boolean;
  siteNameFlagEnable = false;
  cableExportObj;
  userType;
  optimizationSiteName: string;
  rackSiteName: string;
  clearEnabledCable = true;
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService, private router: Router, public dialogService: DialogService, private fb: FormBuilder, private utilityService: UtilityService, private workflowService: WorkflowService, private navigationService: NavigationService) {
    const roleList: any = sessionStorage.getItem('SRIMS_CURRENT_SESSION').split(',');
    roleList.forEach(element => {
      this.roleName = element;
    });
    const roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    if (roleName === 'PROD_CE_ADMIN') {
      this.userType = 'ADMIN';
    } else {
      this.userType = 'USER';
    }
    this.planSubmissionForm = this.fb.group({
      capacityRequiredByDate: ['', Validators.required],
      priority: ['', Validators.required],
      cardFirstProjectNumber: ['', Validators.required],
      schemeDriver: ['', Validators.required],
      orderType: ['', Validators.required]
    });

    this.navigate3DToCBPBySiteName$$ = this.navigationService.navigate3DToCBPBySiteName$.subscribe((siteName) => {
      if (siteName) {
        this.siteNameFlagEnable = true;
        this.sitename3dSearch = siteName;
        this.loadTabledatBySearch(siteName);
      }
    });

    /**
     * Get EIN & EmailID
     */
    this.getEIN = this.appService.getEIN();
    const emailIdUrl = environment.base_url + 'chassis-reservation/emailId/ein?ein=' + this.getEIN;
    this.appService.get(emailIdUrl).subscribe(_ => {
      this.getEmailID = _.emailId;
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }
  ngOnInit() {
    /**
     * Assign Header Name when Tabs are change
     * @author Binu & Swathi
     */
    this.href = this.router.url.replace('/', '');
    switch (this.href) {
      case 'capacitybuildplan':
        this.index = 0;
        break;

      case 'capacitybuildplancable':
        this.index = 1;
        break;

      case 'optimizationplan':
        this.index = 3;
        break;

      case 'capacitybuildplanRack':
        this.index = 2;
        break;
    }
    this.cbpCardheader = 'Capacity Build Plan Report - Card';
    this.cbpCableheader = 'Capacity Build Plan Report - Cable';
    this.rackHeader = 'Capacity Build Plan Report - Rack';
    this.optimizationHeader = 'Capacity Optimization Plan Report';

    const cbpHeaderrUrl = environment.base_url + 'generic-header/grid-cbpr-header/';
    // const cbpHeaderrUrl = 'assets/json/cbp_card_header.json';
    this.appService.get(cbpHeaderrUrl).subscribe(cbpHeaderResponse => {
      this.headerData = cbpHeaderResponse;
      // if (this.roleName !== 'PROD_CE_ADMIN') {
      //   this.headerData.pop();
      // }
      this.tableSettings.headers = this.headerData;
      if (this.sitename3dSearch === '') {
        this.getTable();
      } else {
        this.loadTabledatBySearch(this.sitename3dSearch);
      }
    });

    const cbpCableUrl = environment.base_url + 'generic-header/grid-cbpcable-header';
    // const cbpCableUrl = 'assets/json/cbp_cable_header.json';
    this.appService.get(cbpCableUrl).subscribe(cbpCableResponse => {
      this.headerData = cbpCableResponse;
      this.cableTableSettings.headers = this.headerData;
      this.cableTableSettings.status = [
        { label: 'Select Status', value: null },
        { label: 'Saved', value: 'Saved' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Submission Failed', value: 'Submission Failed' }
      ];
      this.getCableTable();
    });

    /**
     * Rack Table Header is fecting from Backend
     * @author Binu
     */
    const rackHeaderrUrl = environment.base_url + 'generic-header/grid-cbprack-header/';
    this.appService.get(rackHeaderrUrl).subscribe(rackHeaderRes => {
      this.rackHeaderData = rackHeaderRes;
      // if (this.roleName !== 'PROD_CE_ADMIN') {
      //   this.rackHeaderData.pop();
      // }
      this.rackTableSetting.headers = this.rackHeaderData;
      this.rackgetTable();
    });

    /**
     * Optimization table body data is fetching from backend
     * @author Binu
     */
    this.optimizationGetTable();
  }

  /** on page no change call table  */
  getSelectedPageNo(event) {
    this.tableJsonFormat.pageNo = event.page + 1;
  }
  /** on items per page change call table  */
  getlistRowSelect(event) {
    this.tableSettings.refreshPagination = true;
    this.tableJsonFormat.pageNo = 1;
    this.tableJsonFormat.pageSize = event.target.value;
  }
  /** Get card Table data */
  getTable() {
    const url = environment.base_url + 'capacity-planning-build/data?ein=' + this.getEIN + '&role=' + this.userType;
    this.appService.get(url).subscribe(res => {
      if (res.status === false) {
        this.tableSettings.data = [];
        this.showCardErrorMsg = true;
      } else {
        this.tableSettings.data = res;
        this.tableRecordsCount = res.length;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
        this.tableSettings.status = [
          { label: 'Select Status', value: null },
          { label: 'Saved', value: 'Saved' },
          { label: 'Submitted', value: 'Submitted' },
          { label: 'Processing', value: 'Processing' },
          { label: 'Submission Failed', value: 'Submission Failed' }
        ];
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** Get cable Table data */
  getCableTable() {
    // const url = 'assets/json/cbp_cable_data.json';
    const url = environment.base_url + 'cableshortfallReport/fetch-data?searchData=' + ' ';
    this.appService.get(url).subscribe(res => {
      if (res.status === false) {
        this.cableTableSettings.data = [];
        this.showCardErrorMsgCable = true;
        this.cableExportDisable = true;
      } else {
        this.showCardErrorMsgCable = false;
        // for (let i = 0; i < res.length; i++) {
        //   const cpdate = res[i].cpDate;
        //   const index = cpdate.indexOf('T');
        //   const date = cpdate.slice(0, index);
        //   res[i].cpDate = date;
        // }
        this.cableTableSettings.data = res;
        this.cableExportObj = this.cableTableSettings.data;
        this.cableTableSettings = JSON.parse(JSON.stringify(this.cableTableSettings));
        this.clearEnabledCable = true;
        this.cableExportDisable = false;
        this.clearCableTable = false;
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  // rack table
  rackgetTable() {
    const url = environment.base_url + 'cbp-rack/fetch-data?ein=' + this.getEIN + '&role=' + this.userType;
    this.appService.get(url).subscribe(res => {
      this.showErrorMsg = false;
      if (res.status === false) {
        this.rackTableSetting.data = [];
        this.showErrorMsg = true;
        this.rackExportDisable = true;
        // this.utilityService.validateStatus(400, res.message, CP_ERROR.SEVERITY.ERROR, 3000);
      } else {
        this.showErrorMsg = false;
        this.rackTableSetting.data = res;
        this.rackExportDisable = false;
        this.rackTableSetting = JSON.parse(JSON.stringify(this.rackTableSetting));
      }
      this.rackTableSetting.status = [
        { label: 'Select Status', value: null },
        { label: 'Saved', value: 'Saved' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Submission Failed', value: 'Submission Failed' }
      ];
    });
  }

  /**
   * optimization table body data
   * @author Binu
   */
  optimizationGetTable() {
    const url = environment.base_url + 'card-move/get-cardmoveplan';
    this.appService.get(url).subscribe(result => {
      if (result.cardMovePlanRequestList !== null) {
        this.optBodyRecords = JSON.parse(JSON.stringify(result.cardMovePlanRequestList));
      } else {
        this.optBodyRecords = [];
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }
  /** based on search load table data  */
  loadTabledatBySearch(sitename) {
    this.getDataBySiteName(sitename);
    this.searchedData = sitename;
  }
  /** based on search load Cable table data  */
  loadCabledatBySearch(cableSitename) {
    const url = environment.base_url + 'cableshortfallReport/fetch-data?searchData=' + cableSitename;
    this.appService.get(url).subscribe(res => {
      if (res.status === false) {
        this.cableTableSettings.data = [];
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
        this.cableExportDisable = true;
        this.clearEnabledCable = false;
      } else {
        // tslint:disable-next-line:prefer-for-of
        // for (let i = 0; i < res.length; i++) {
        //   const cpdate = res[i].cpDate;
        //   const index = cpdate.indexOf('T');
        //   const date = cpdate.slice(0, index);
        //   res[i].cpDate = date;
        // }
        this.cableTableSettings.data = res;
        this.cableExportObj = this.cableTableSettings.data;
        this.cableExportDisable = false;
        this.clearEnabledCable = false;
      }
    });
  }

  /**
   * 
   * @author 
   * Clear All for Cable
   */

  clearCableAll() {
    this.clearCableTable = true;
    this.getCableTable();
  }
  /***
   * @author Binu
   * Rack Table record based on site name or 1141code
   */
  loadRackTableBySearch(sitename) {
    const url = environment.base_url + 'cbp-rack/fetch-data?code1141=' + sitename + '&ein=' + this.getEIN + '&role=' + this.userType;
    this.appService.get(url).subscribe(res => {
      if (res.status === false) {
        this.rackTableSetting.data = [];
        // this.showErrorMsg = true;
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
        this.rackExportDisable = true;
        this.rackClearEnable = false;
      } else {
        this.rackTableSetting.data = res;
        this.rackSiteName = '-' + res[0].siteName;
        this.rackExportDisable = false;
        this.rackClearEnable = false;
        this.showErrorMsg = false;
      }
    });
  }
  /** Get data based on site name */
  getDataBySiteName(siteName) {
    // tslint:disable-next-line:max-line-length
    this.getEIN = this.appService.getEIN();
    // tslint:disable-next-line:max-line-length
    const url = environment.base_url + 'capacity-planning-build/data?siteName=' + siteName + '&ein=' + this.getEIN + '&role=' + this.userType;
    this.appService.get(url).subscribe(res => {
      if (res.status === false) {
        this.tableSettings.data = [];
        this.showCardErrorMsg = true;
        this.cardExportDisable = true;
        this.clearEnabled = false;
      } else {
        const searchedSitename = res[0].siteName;
        this.headerSitename = '-' + searchedSitename;
        //  console.log(this.headerSitename);
        this.clearEnabled = false;
        this.tableSettings.data = res;
        this.tableSettings.status = [
          { label: 'Select Status', value: null },
          { label: 'Saved', value: 'Saved' },
          { label: 'Submitted', value: 'Submitted' },
          { label: 'Processing', value: 'Processing' },
          { label: 'Submission Failed', value: 'Submission Failed' }
        ];
        if (this.siteNameFlagEnable) {
          this.siteNameFlag = true;
        }
        this.cardExportDisable = false;
        this.showCardErrorMsg = false;
      }
    }, (err) => {
      this.tableSettings.data = [];
      this.clearEnabled = false;
      this.cardExportDisable = true;
      this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
    });
  }
  /** on clear button click clear all objects  */
  clearFilterData() {
    this.headerSitename = '';
    this.clearEnabled = true;
    this.submitvalue = true;
    this.clearTable = true;
    this.cardExportDisable = false;
    this.siteNameFlagEnable = false;
    this.siteNameFlag = false;
    this.exportObj = {
      id: '', siteName: '', projectId: '', cpNumber: '', cpDate: '', productType: '', sneId: '',
      slot: '', cardInFillType: '', exCode: '', portAvailability: '', status: ''
    };
    this.searchedData = '';
    this.showCardErrorMsg = false;
    this.getTable();
  }
  rackclearAll() {
    this.rackClearTable = true;
    this.showErrorMsg = false;
    this.rackTableFilterRecords = [];
    this.rackClearEnable = true;
    this.rackgetTable();
    this.rackSiteName = '';
  }
  /** getting exportobj for filter from table  */
  exportParam(param) {
    //  console.log(this.tableSettings.data);
    this.exportObj = param;
    const result = Object.keys(param).map(itm => param[itm]);
    const filteredArray = result.filter(m => m !== '');
    if (filteredArray.length === 0) {
      this.clearEnabled = true;
    } else {
      this.clearEnabled = false;
    }
  }
  /** Disable export based on filter */
  exportDisableFilter(ed) {
    if (Object.keys(ed['filters']).length !== 0) {
      const filterValues = ed['filteredValue'];
      if (filterValues.length > 0) {
        this.cardExportDisable = false;
      } else {
        this.cardExportDisable = true;
      }
    } else {
      this.cardExportDisable = false;
    }
  }
  /** Disable export Cable based on filter */
  exportDisableCable(ed) {
    if (Object.keys(ed['filters']).length !== 0) {
      const filterValues = ed['filteredValue'];
      if (filterValues.length > 0) {
        this.cableExportDisable = false;
        this.cableExportObj = filterValues;
        this.clearEnabledCable = false;
      } else {
        this.cableExportDisable = true;
        this.clearEnabledCable = false;
      }
    } else {
      this.cableExportDisable = true;
    }
  }
  /** for exporting the card table data */
  exportData() {
    if (this.searchedData !== '') {
      this.exportObj['siteName'] = this.searchedData;
    } else {
      this.exportObj['siteName'] = '';
    }
    const url = environment.base_url + 'capacity-planning-build/data-download';
    this.appService.post(url, this.exportObj).subscribe(res => {
      const sheetBase64 = res.body.toString();
      const blobData = this.convertBase64ToBlobData(sheetBase64);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `CapacityBuildPlanReport.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `CapacityBuildPlanReport.xlsx`;
        link.click();
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** for exporting the cable table data */
  exportCableData() {
    const url = environment.base_url + 'cableshortfallReport/export-data';
    this.appService.post(url, this.cableExportObj).subscribe(res => {
      const sheetBase64 = res.body.toString();
      const blobData = this.convertBase64ToBlobData(sheetBase64);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `CapacityBuildPlanReport.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `CapacityBuildPlanReport.xlsx`;
        link.click();
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
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
  // submit button enable/disable
  enableSubmitButton(value) {


    let jobTypesatellite = value.filter(x => x.jobType == 'Satellite Shelf Plan')
    let jobTypeNotsatellite = value.filter(x => x.jobType !== 'Satellite Shelf Plan')
    this.selectedRow = value;
    //this is for single submittion of SAS Plan	commenting coz of not going live in current sprint
    if (jobTypesatellite.length === 1 && jobTypeNotsatellite.length == 0 && jobTypesatellite[0].jobType === 'Satellite Shelf Plan' ) {	
      switch (this.index) {	
        case 0:	
          this.clearEnabled = false;	
          setTimeout(() => {	
            this.submitvalue = false;	
          }, 0);	
          break;	
        case 2:	
          this.rackClearEnable = false;	
          break;	
        case 3:	
          this.optClearEnable = false;	
          break;	
      }	
    }	
    //here need to add job type should not be SAtellite plan	
    else if (jobTypeNotsatellite.length > 0 && jobTypesatellite.length == 0 ) {	
   // if (jobTypeNotsatellite.length > 0 && jobTypesatellite.length == 0) {
      switch (this.index) {
        case 0:
          this.clearEnabled = false;
          setTimeout(() => {
            this.submitvalue = false;
          }, 0);
          break;
        case 2:
          this.rackClearEnable = false;
          break;
        case 3:
          this.optClearEnable = false;
          break;
      }
    }
    else {
      this.submitvalue = true;
      switch (this.index) {
        case 0:
          this.clearEnabled = true;
          break;
        case 2:
          this.rackClearEnable = true;
          break;
        case 3:
          this.optClearEnable = true;
          break;
      }
    }
    if (value.length > 0) {
      this.clearEnabled = false;
      this.rackClearEnable = false;
      this.optClearEnable = false;
    } else {
      this.clearEnabled = true;
      this.rackClearEnable = true;
      this.optClearEnable = true;
    }
  }
  // get table id for delete operation
  deleteRow(value) {
    this.deleteId = value;
    this.displayCard = true;
    this.commonModelProperties = {
      image: 'assets/images/question_icon.png',
      bodyContent: 'Are you sure that you want to delete the data',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: '',
      width: 'auto',
      // tslint:disable-next-line:max-line-length
      dynamicButton: [{ btnName: 'Okay', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'Cancel', funcName: 'cancel', class: 'btn-modal' }]
    };
  }
  /** to get update table modal */
  onDialogClose() {
    this.displayCard = false;
  }
  // edit row of table for capacity build plan table
  updatedRow(value) {
    this.editId = value.id;
    const url = environment.base_url + 'card-move/validate-edit?id=' + this.editId;
    this.appService.get(url).subscribe(res => {
      if (res.isCardMovePossiable) {
        this.navigationService.navigateCBPTo3DByRowData.next(value);
        this.router.navigate(['/chassis-viewer']);
      } else if (res.isCardMovePossiable === false) {
        this.errorMsg = true;
        this.errorMsgText = res.message;
        setTimeout(() => {
          this.errorMsg = false;
          this.errorMsgText = '';
        }, 5000);
      }
    });
  }
  // delete record confirmation on click of ok button
  deleteRecord() {
    if (this.deleteId !== 0) {
      const url = environment.base_url + 'capacity-planning-build/delete-plan?id=' + this.deleteId + '&isCardMove=' + false;
      this.appService.delete(url).subscribe(result => {
        if (result['status'] === true) {
          this.displayCard = false;
          this.tableSettings.data = this.tableSettings.data.filter(value => value.id !== this.deleteId);
          this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        } else if (result['status'] === false) {
          this.utilityService.validateStatus(400, result['message'], CP_ERROR.SEVERITY.ERROR, 5000);
          this.displayCard = false;
        }
      },
        err => {
          this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        });
    }
  }
  /** submit button click function from header */
  submitButton() {
    if (this.selectedRow.length > 1) {
      const excode = this.selectedRow[0].nodeType;
      for (let i = 1; i < this.selectedRow.length; i++) {
        if (excode !== null && this.selectedRow[i].nodeType.indexOf(excode) === -1) {
          this.displayCard = true;
          this.commonModelProperties = {
            image: '',
            bodyContent: 'Multiple plans for different Sites are not allowed to be submitted together',
            popupType: 'confirmationPopup',
            footerButtons: 'true',
            header: '',
            width: 'auto',
            // tslint:disable-next-line:max-line-length
            dynamicButton: [{ btnName: 'Okay', funcName: 'cancel', class: 'btn-Okay' }]
          };
          break;
        } else {
          if (this.selectedRow[i].nodeType === 'TIER1') {
            this.wfmtTierPopup();
            break;
          } else {
            this.wfmtPopup();
            break;
          }
        }
      }
    } else {
      if (this.selectedRow[0].nodeType === 'TIER1') {
        this.wfmtTierPopup();
      } else {
        this.wfmtPopup();
      }
    }
    // this.headerSitename = '';
    // this.clearEnabled = true;
    // this.submitvalue = true;
    // this.clearTable = true;
    // this.cardExportDisable = false;
    // this.siteNameFlagEnable = false;
    // this.siteNameFlag = false;
    // this.searchedData = '';
    // this.showCardErrorMsg = false;
  }
  wfmtPopup() {
    let url;

    console.log(this.selectedRow, 'selected')

    if (this.selectedRow.length == 1 && this.selectedRow[0].jobType === 'Satellite Shelf Plan') {
      url = environment.base_url + 'generic-header/grid-saspopup-header';
    }
    else {
      url = environment.base_url + 'generic-header/grid-optpopup-header';
    }
    this.appService.get(url).subscribe(res => {
      const dummyJson = res;
      this.ref = this.dialogService.open(RackPopupComponent, {
        data: {
          dummyJson,
          confirm: 'Confirm',
          cancel: 'Cancel',
          layerdPopup: 0,
        },
        header: 'Input For WFMT',
        width: '95%',
        baseZIndex: 100000,
      });
      this.ref.onClose.subscribe(result => {
        if (result !== undefined && result !== null && result !== '') {
          // tslint:disable-next-line:prefer-const
          let planWfmt = {
            planList: this.selectedRow,
            commonValues: result,
          };
          // tslint:disable-next-line:no-shadowed-variable
          const url = environment.base_url + 'capacity-planning-build/wfmt-request';
          this.appService.post(url, planWfmt).subscribe(res => {
            this.headerSitename = '';
            // this.clearEnabled = true;
            this.submitvalue = true;
            this.clearTable = true;
            this.cardExportDisable = false;
            this.siteNameFlagEnable = false;
            this.siteNameFlag = false;
            this.searchedData = '';
            this.showCardErrorMsg = false;

            this.errorMsg = true;
            this.errorMsgText = 'Submitted Successfully';
            this.selectedRow = [];
            // tslint:disable-next-line:no-shadowed-variable
            const cbpHeaderrUrl = environment.base_url + 'generic-header/grid-cbpr-header/';
            this.appService.get(cbpHeaderrUrl).subscribe(cbpHeaderResponse => {
              this.headerData = cbpHeaderResponse;
              // if (this.roleName !== 'PROD_CE_ADMIN') {
              //   this.headerData.pop();
              // }
              this.tableSettings.headers = this.headerData;
              if (this.sitename3dSearch === '') {
                this.getTable();
              } else {
                this.loadTabledatBySearch(this.sitename3dSearch);
              }
            });
            // this.appService.get(url).subscribe(res => {
            //   //  const reqs: [] = res;
            //   this.tableSettings.data = res;
            //   //  console.log(this.tableSettings.data);
            // });
            setTimeout(() => {
              this.errorMsg = false;
              this.errorMsgText = '';
            }, 3000);
          },
            (err) => {
              this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
            });
        }
      });
    });
  }
  wfmtTierPopup() {
    //  const url = '../../assets/json/cbp-wfmt.json';
    const url = environment.base_url + 'generic-header/grid-cbppopup-header';
    this.appService.get(url).subscribe(res => {
      const dummyJson = res;
      this.ref = this.dialogService.open(RackPopupComponent, {
        data: {
          dummyJson,
          confirm: 'Confirm',
          cancel: 'Cancel',
          layerdPopup: 0,
        },
        header: 'Input For WFMT',
        width: '95%',
        baseZIndex: 100000,
      });
      this.ref.onClose.subscribe(result => {
        if (result !== undefined && result !== null && result !== '') {
          const planWfmt = {
            planList: this.selectedRow,
            commonValues: result,
          };
          const url = environment.base_url + 'capacity-planning-build/wfmt-request';
          this.appService.post(url, planWfmt).subscribe(res => {
            this.headerSitename = '';
            // this.clearEnabled = true;
            this.submitvalue = true;
            this.clearTable = true;
            this.cardExportDisable = false;
            this.siteNameFlagEnable = false;
            this.siteNameFlag = false;
            this.searchedData = '';
            this.showCardErrorMsg = false;

            this.errorMsg = true;
            this.errorMsgText = 'Submitted Successfully';
            this.selectedRow = [];
            const url = environment.base_url + 'capacity-planning-build/data?ein=' + this.getEIN + '&role=' + this.userType;
            this.appService.get(url).subscribe(res => {
              //  console.log(res);
              //  const reqs: [] = res;
              this.tableSettings.data = res;
              //  console.log(this.tableSettings.data);
            });
            setTimeout(() => {
              this.errorMsg = false;
              this.errorMsgText = '';
            }, 3000);
          },
            (err) => {
              this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
            });
        }
      });
    });
  }
  /*** Rack Table filterd export
   *
   * @author Binu
   */
  exportFilterdRecord(ev) {

    if (Object.keys(ev['filters']).length !== 0) {
      this.rackTableFilterRecords = ev['filteredValue'];
      if (this.rackTableFilterRecords.length > 0) {
        this.rackExportDisable = false;
        this.rackClearEnable = false;
      } else {
        this.rackExportDisable = true;
        this.rackClearEnable = false;
      }
    } else {
      this.rackTableFilterRecords = [];
      this.rackExportDisable = false;
      this.rackClearEnable = true;
    }
  }

  /**
   * @author binu
   * Rack table Export
   */
  rackexportData() {
    let exportValue = [];
    if (this.rackTableFilterRecords.length > 0) {
      exportValue = this.rackTableFilterRecords;
    } else {
      exportValue = this.rackTableSetting.data;
    }
    const url = environment.base_url + 'cbp-rack/export-data';
    this.appService.post(url, exportValue).subscribe(value => {
      const sheetBase64 = value.body.toString();
      const blobData = this.convertBase64ToBlobData(sheetBase64);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `CapacityRackPlanReport.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `CapacityRackPlanReport.xlsx`;
        link.click();
      }
    });
  }

  /** Tab Change
   * @author Binu
   */
  tabChange(e) {
    this.index = e.index;
  }

  /** Plan Rack Button */
  showRackButton() {
    const url = environment.base_url + 'generic-header/grid-rackpopup-header';
    this.appService.get(url).subscribe(_ => {
      const dummyJson = _;
      this.ref = this.dialogService.open(RackPopupComponent, {
        data: {
          dummyJson,
          header: 'planRack',
          confirm: 'Confirm',
          cancel: 'Cancel',
          layerdPopup: 1,
          url: 'cbp-rack/validate-plan?code1141='
        },
        header: 'Input For WFMT',
        width: '95%',
        baseZIndex: 100000,
      });
      this.ref.onClose.subscribe(result => {
        if (result !== undefined && result !== null && result !== '') {
          const formValue = result;
          const url1 = environment.base_url + 'cbp-rack/wfmt-request';
          formValue.code1141 = formValue.code1141.data;
          if (formValue.trsArea.value) {
            formValue.trsArea = formValue.trsArea.value;
          }
          if (formValue.workComments === '') {
            formValue.workComments = '<blank>';
          }
          this.appService.post(url1, formValue).subscribe(wfmt => {
            if (wfmt.status === 'success') {
              this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS);
              this.rackgetTable();
            } else {
              this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.WFMT_FAILING, CP_ERROR.SEVERITY.ERROR);
            }
          }, (err) => {
            this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR);
          });
        }
      });
    });
  }

  ngAfterViewInit() {
  }
  redirectto360() {
    this.workflowService.enableworlflow.next(true);
    this.router.navigate(['/three60-twod']);
  }

  /**
   * Optimaization table status chnage in cell level
   */

  statusChange(value) {
    this.optimizationStatusChange = value;
    this.display = true;
    this.commonModelProperties = {
      image: 'assets/images/question_icon.png',
      bodyContent: 'Are you sure that you want save the plan',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: '',
      width: 'auto',
      // tslint:disable-next-line:max-line-length
      dynamicButton: [{ btnName: 'Okay', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'Cancel', funcName: 'cancel', class: 'btn-modal' }]
    };
  }

  confirmStatus() {
    if (this.optimizationStatusChange === 'status') {
      this.confirmStatusValue = false;
      setTimeout(() => {
        this.confirmStatusValue = true;
        this.optimizationStatusChange = '';
      }, 0);
    } else if (this.optimizationStatusChange === 'delete') {
      this.confirmDeleteRow = false;
      setTimeout(() => {
        this.confirmDeleteRow = true;
        this.optimizationStatusChange = '';
      }, 0);
    }
    this.display = false;
  }
  cancelStatus(value) {
    if (this.optimizationStatusChange === 'status') {
      this.cancelStatusValue = true;
      setTimeout(() => {
        this.cancelStatusValue = false;
        this.optimizationStatusChange = '';
      }, 0);
    } else if (this.optimizationStatusChange === 'delete') {
      this.cancelDeleteRow = true;
      setTimeout(() => {
        this.cancelDeleteRow = false;
        this.optimizationStatusChange = '';
      }, 0);
    }
    this.display = false;
  }

  /** Optimization delete row */
  deleteEachRow(value) {
    this.optimizationStatusChange = value;
    this.display = true;
    this.commonModelProperties = {
      image: 'assets/images/question_icon.png',
      bodyContent: 'Are you sure that you want to delete the plan',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: '',
      width: 'auto',
      // tslint:disable-next-line:max-line-length
      dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }]
    };
  }

  /** Optimization table submit button enable & Disable */
  optimizationSubmit(e) {
    this.optClearEnable = e.btn;
    this.disableSubmit = e.btn;
    this.optSubmitRecords = e.list;
  }

  /** Optimization Table will be loading by sitename / 1141 code */

  optTableLoadSrch(ev) {

    const url = environment.base_url + 'card-move/get-cardmoveplan?code1141=' + ev;
    this.appService.get(url).subscribe(result => {
      this.clearEnabled = false;
      if (result.cardMovePlanRequestList !== null) {
        this.optBodyRecords = JSON.parse(JSON.stringify(result.cardMovePlanRequestList));
        this.optExportParams.sitename = result.cardMovePlanRequestList[0].siteName;
        this.optimizationSiteName = '-' + result.cardMovePlanRequestList[0].siteName;
        this.disableExportOpt = false;
        this.optClearEnable = false;
      } else {
        this.optBodyRecords = [];
        this.disableExportOpt = true;
        this.optClearEnable = false;
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
      }

    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** Optimaization page clear All */
  optClearAll() {
    this.optClearEnable = true;
    this.submitvalue = true;
    this.optClearAllTable = true;
    this.optimizationSiteName = '';
    this.optExportParams = {
      code1141: '',
      // tslint:disable-next-line:max-line-length
      projectId: '', cpNumber: '', cpDate: '', sourceSneId: '', sourceSlot: '', sourceCard: '', sourceNoOfPorts: '', sourceNoOfService: '', destinationSneId: '', destinationSlot: '', destinationCard: '', destinationNoOfPorts: '', destinationNoOfService: '', status: '', sitename: ''
    };
    this.disableSubmit = true;
    this.disableExportOpt = false;
    this.optimizationGetTable();
  }

  /** Export Optimization table Record data */
  exportOptTableData(e) {
    // tslint:disable-next-line:max-line-length
    const filterValue = ['code1141', 'projectId', 'cpNumber', 'cpDate', 'sourceSneId', 'sourceSlot', 'sourceCard', 'sourceNoOfPorts', 'sourceNoOfService', 'destinationSneId', 'destinationSlot', 'destinationCard', 'destinationNoOfPorts', 'destinationNoOfService', 'status'];
    const filteredValue = Object.keys(e['filters']);
    filterValue.filter(ele => {
      if (filteredValue.indexOf(ele) !== -1) {
        this.optExportParams[ele] = e['filters'][ele].value;
      } else {
        this.optExportParams[ele] = '';
      }
    });
    if (Object.keys(e['filters']).length !== 0) {
      if (e['filteredValue'].length > 0) {
        this.disableExportOpt = false;
        this.optClearEnable = false;
      } else {
        this.disableExportOpt = true;
        this.optClearEnable = false;
      }
    } else {
      this.disableExportOpt = false;
      this.optClearEnable = true;
    }
  }

  exportOptTableRecord() {
    const url = environment.base_url + 'card-move/optimization-report-download';
    this.appService.post(url, this.optExportParams).subscribe(result => {
      const sheetBase64 = result.body.toString();
      const blobData = this.convertBase64ToBlobData(sheetBase64);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobData, `OptimizationPlanReport.xlsx`);
      } else {
        const blob = new Blob([blobData], { type: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64' });
        // tslint:disable-next-line:no-shadowed-variable
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `OptimizationPlanReport.xlsx`;
        link.click();
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** Optimization table Submit */
  optSubmit() {
    if (this.optSubmitRecords.length > 0) {
      const url = environment.base_url + 'generic-header/grid-optpopup-header';
      this.appService.get(url).subscribe(result => {
        const dummyJson = result;
        this.ref = this.dialogService.open(RackPopupComponent, {
          data: {
            dummyJson,
            confirm: 'Confirm',
            cancel: 'Cancel',
          },
          header: 'Input For NO',
          width: '95%',
          baseZIndex: 100000,
        });
        this.ref.onClose.subscribe($ => {
          const request = [];
          const popUpValue = $;
          this.optSubmitRecords.forEach(_ => {
            const requestObj = {
              cardmoveId: _.id,
              sourceSneId: _.sourceSneId,
              destinationSneId: _.destinationSneId,
              fistProjNo: popUpValue['cardFirstProjectNumber'],
              schemeDriver: popUpValue['schemeDriver'],
              capacityRequiredByDate: popUpValue['capacityRequiredByDate'],
              priority: popUpValue['priorityvalue'],
              orderType: popUpValue['orderType']
            };
            request.push(requestObj);
          });
          const wfmt = environment.base_url + 'card-move/submit-workflow';
          this.appService.post(wfmt, request).subscribe(_ => {
            this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS);
          }, (err) => {
            this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
          });
        });
      }, (err) => {
        this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      });
    }
  }
  editrowevent(row) {
    this.cardmoverequest = row;
    //  console.log(row);
    this.editmode = true;
    let currentstatus;
    currentstatus = Number(this.cardmoverequest.workflowstatus) + 1;
    // const shelf = /^shelf=/;
    // let shelfNumber;
    if (currentstatus === 2) {
      if (row.sourceSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    if (currentstatus >= 4) {
      if (row.destinationSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    if (currentstatus === 2) {
    }
    const obj = {
      editmodewithtbl: true,
      editmode: true,
      coreImage: this.coreImage,
      satelitteImgae: this.satelitteImgae,
      currentstatus,
      actualrequ: this.cardmoverequest,
      workflowredirection: this.cardmoverequest
    };
    if (currentstatus === 2 || currentstatus === 4 || currentstatus === 5 || currentstatus === 6) {
      this.workflowService.workflowtopage3d.next(obj);
      this.router.navigate(['/chassis-viewer']);
    }
    if (currentstatus === 1 || currentstatus === 3) {
      this.workflowService.workflowtopage360.next(obj);
      this.router.navigate(['/three60-twod']);
    }
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.navigate3DToCBPBySiteName$$.unsubscribe();
    this.navigationService.navigate3DToCBPBySiteName.next(null);
  }
}

