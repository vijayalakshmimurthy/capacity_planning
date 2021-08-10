import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { Router } from '@angular/router';
import { UtilityService } from '../shared/services/utility.service';
import { CP_ERROR } from '../shared/constants/error.constant';
import { editColumn, staticTable } from './phase-forecast-header.constant';
/** this is the phase forecast component */
@Component({
  selector: 'app-phase-forecast',
  templateUrl: './phase-forecast.component.html',
  styleUrls: ['./phase-forecast.component.scss']
})
/** class contents phase forecast */
export class PhaseForecastComponent implements OnInit {
  /** count */
  count = 0;
  /** update boolean */
  updateBoolean = false;
  /** submit file variable for upload */
  failedSiteName = false;
  /** submit file variable for upload */
  successSiteName = false;
  /** To send update in file upload component */
  fileCancel = '';
  popupType = '';
  /** Download data variable */
  fileMessage = '';
  /** edit mode check for table variable */
  successRecord = 0;
  errorRecord = 0;
  /** Defined uploadData Array resposne of the submit */
  uploadData;
  /** rowUpdatedSuccessfully object for handling flag of updated data */
  exceptionmsg;
  exceptionboolean;
  /** file dialog boolean */
  displayBasic = false;
  /** delete boolean */
  cancelBoolean = false;
  /** edit rows disable update and cancel button */
  countEdit = 0;
  /** boolean add */
  addMode = false;
  /** boolean show rows */
  showbutnRows = false;
  /** boolean search */
  searchSite = true;
  /** boolean cancel */
  alertCancel = false;
  /* table Component variables */
  rows: any = [];
  /** select */
  singleselect;
  /** single select json  */
  singleselectjson;
  /** tab selection */
  selectedTab;
  /** submit button disable */
  submitValue = true;
  /** delete popup variable */
  deletePopup = false;
  /** updatedRowObj object for binding updated rows result */
  tableminheight;
  /** serach box */
  searchBoxPlaceHolder = 'Search Site/1141 Code/SNE ID';
  /** filter data */
  filterData = [];
  type = 'search';
  /** phase forecast header */
  phaseHeader = 'Phase Forecast';
  /** upload file heading */
  fileHeading = 'Upload Phase Forecast File (XLS File)';
  /** option variable */
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  /** header */
  header;
  /** for table records of first tab */
  tablerecordsdata: any = [];
  /** to show message when no records for table */
  showErrorMsg = false;
  /** to initialize index value on initializaton of page */
  index = 0;
  /** to disable the export button when no records for table */
  exportDisablebtn = false;
  /** declare for second tab */
  cardmovetab;
  /** for pagination api call object */
  tableJsonFormat = {
    pageNo: 1,
    pageSize: 0,
    sortByField: '',
    isSortOrder: 'ASC',
    isDownload: false
  };
  /** downloadExportsheet input to phase-csv.directive */
  fileName = '';
  tableSettings = {
    headers: [], data: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: false,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };
  /** headerSubmit; */
  submitvalue;
  /** delete popup show */
  display = false;
  /** Table header variable */
  headerData: any;
  /** for table row id for delete */
  deleteId = 0;
  /** for table row id for edit */
  editId = 0;
  /** show alert for error message for delete */
  errorMsg = false;
  /** to show the error message text */
  errorMsgText = '';
  /** array for searched data from suggestion component */
  searchedData = '';
  /** for modal body content of delete popup */
  bodyContent;
  /** for ok button of confirm popup */
  buttonOne;
  /** increment */
  increment = 0;
  /** edit mode */
  editMode = false;
  /** calender edit variable */
  headerpush;
  /** selected list of data in rows */
  checkedArray;
  /** secondSubmitRecords */
  secondSubmitRecords;
  /** popup show */
  displayAddreport = false;
  /** error records */
  addErrorRecords;
  /** success records */
  addsuccessRecords;
  addMessage;
  /** row for delete variable */
  rowForDelete;
  /** rowUpdatedSuccessfully object for handling flag of updated data */
  rowUpdatedSuccessfully = { updated: false };
  /** updatedRowObj object for binding updated rows result */
  updatedRowObj = [];
  /* table Component variables */
  columns: any = [];
  /** noRecordError Flag is for getting No record found message */
  noRecordError = false;
  /**   successsfully submitted */
  successsfullysubmitted;
  allcheck;
  /** constructor to inject app service */
  constructor(private appService: AppService, private router: Router, private utilityService: UtilityService) {
  }
  /** onLoad get the table header value */
  ngOnInit() {
    this.header = 'Phase Forecast';
    this.searchSite = false;
    this.addMode = false;
  }
  /** phase forecast tab change */
  tabChange(event) {
    this.selectedTab = event.originalEvent.target.innerText;
    if (this.selectedTab === 'Phase Forecast Upload') {
      this.fileUploadCancel();
      this.searchSite = false;
      this.addMode = false;
      this.successSiteName = false;
      this.failedSiteName = false;
      this.tableSettings.data = [];
      this.tableSettings.headers = [];
    } else if (this.selectedTab === 'Manage Phase Forecast') {
      this.searchSite = true;
      this.updateBoolean = false;
      this.cancelBoolean = false;
      this.rows = [];
      this.tableSettings.data = [];
      this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      this.tableSettings.headers = [];
      this.addMode = true;
      this.searchSite = true;
      this.showbutnRows = false;
      this.submitValue = true;
      this.index = event.index;
      this.filterData = [];
      this.updateColumnsOfTable('static');
    }
  }
  /** add data for phase forecast json */
  addData() {
    this.allcheck = true;
    this.countEdit++;
    const url = environment.base_url + 'generic-header/grid-phaseadd-header';
    this.appService.get(url).subscribe(res => {
      this.headerData = res;
      this.tableSettings.headers = this.headerData;
      this.tableSettings.headers = this.headerData;
      const len = this.headerData.length;
      this.headerpush = this.headerData[len - 2];
      this.headerpush.properties.pageName = 'PHASE';
      this.headerData.push(this.headerpush);
      this.headerpush = this.headerData[len - 3];
      this.headerpush.properties.pageName = 'PHASE';
      this.headerData.push(this.headerpush);
      const uniheaderData = new Set(this.headerData);
      this.headerData = [...uniheaderData];
      this.tableSettings.headers = this.headerData;
    });
    this.showbutnRows = true;
    this.addMode = false;
    this.searchSite = false;
    const event = {
      id: this.increment,
      code1141: '',
      phaseForecastDate: '',
      phasePlannedDate: '',
      phaseStatus: '',
      sauId: ' ',
      siteName: '',
      sneId: '',
    };
    this.tableSettings.data.push(event);
    this.increment++;
  }
  /** add rows */
  addRows(event) {
    this.checkedArray = event;
    if (this.checkedArray.length > 0) {
      this.submitValue = false;
    } else {
      this.submitValue = true;
    }
    const len = this.headerData.length;
    this.headerpush = this.headerData[len - 2];
    this.headerpush.properties.pageName = 'PHASE';
    this.headerData.push(this.headerpush);
    this.headerpush = this.headerData[len - 3];
    this.headerpush.properties.pageName = 'PHASE';
    this.headerData.push(this.headerpush);
    const uniheaderData = new Set(this.headerData);
    this.headerData = [...uniheaderData];
    this.tableSettings.headers = this.headerData;
  }
  /** cancel */
  cancelRows() {
    this.alertCancel = true;
  }
  /** phase forecast header add for upload phase forecast table */
  uploadFileHeader() {
    const url = environment.base_url + 'generic-header/grid-phascancel-header';
    this.appService.get(url).subscribe(res => {
      this.headerData = res;
      this.tableSettings.headers = this.headerData;
    });
  }
  /** model ok click */
  modelOk() {
    this.tableSettings.data.length = 0;
    this.alertCancel = false;
    this.count++;
    this.uploadFileHeader();
    this.showbutnRows = false;
    this.addMode = true;
    this.searchSite = true;
  }
  /** funtion to cancel the delete popup */
  modelCancel() {
    this.alertCancel = false;
  }
  /** function to cancel the popup */
  closepopup() {
    this.displayAddreport = false;
  }
  /** to fill suggestions in search box */
  onKeyPressSearchBox(event) {
    if (event === null) {
      this.tableSettings.data = [];
    } else {
      const url = environment.base_url + 'phase-forecast/search-data?searchData=' + event.target.value;
      this.appService.get(url).subscribe(res => {
        this.filterData = JSON.parse(JSON.stringify(res));
      });
    }
  }
  /** to get table data based on search Go button */
  onManageSearchData(event) {
    this.updateColumnsOfTable('edit');
    this.noRecordError = false;
    const url = environment.base_url + 'phase-forecast/fetch-data?searchData=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length > 0) {
        this.rows = res;
        this.tableSettings.data = this.rows;
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }
    });
  }
  /** to get data for table while selecting any value from search box */
  onSelectSearch(event) {
    this.updateColumnsOfTable('edit');
    if (this.count > 0) {
      this.updateColumnsOfTable('static');
    }
    this.addMode = false;
    const url = environment.base_url + 'phase-forecast/fetch-data?searchData=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length > 0) {
        this.rows = res;
        this.singleselect = this.rows;
        this.singleselectjson = JSON.parse(JSON.stringify(this.singleselect));
        this.tableSettings.data = this.singleselectjson;
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
      } else {
        this.tableSettings.data = [];
        this.tableSettings.headers = [];
      }
    });
  }
  /** submit msg header */
  submitMessage() {
    const url = environment.base_url + 'generic-header/grid-phase-allmsg-header';
    this.appService.get(url).subscribe(res => {
      this.tableSettings.headers = [];
      this.uploadData = res;
      this.tableSettings.headers = JSON.parse(JSON.stringify(this.uploadData));
      const len = this.uploadData.length;
      this.headerpush = this.uploadData[len - 3];
      this.headerpush.properties.pageName = 'PHASEALLMSG';
      this.uploadData.push(this.headerpush);
      this.headerpush = this.uploadData[len - 4];
      this.headerpush.properties.pageName = 'PHASEALLMSG';
      this.uploadData.push(this.headerpush);
      const uniheaderData = new Set(this.uploadData);
      this.uploadData = [...uniheaderData];
      this.tableSettings.headers = this.uploadData;
    });
  }
  /** submit record function */
  submitRecord() {
    this.successsfullysubmitted = true;
    const url = environment.base_url + 'phase-forecast/add-data';
    this.appService.post(url, this.checkedArray).subscribe(res => {
      this.displayAddreport = true;
      this.successsfullysubmitted = true;
      if (res.recordsSummary.errorRecord > 0) {
        this.submitMessage();
        this.tableSettings.data = [];
        this.tableSettings.data = res.invalidPhaseForecastRecords;
        this.secondSubmitRecords = res.invalidPhaseForecastRecords;
        this.addErrorRecords = res.recordsSummary.errorRecord;
        this.addsuccessRecords = res.recordsSummary.successRecord;
        this.submitValue = true;
      } else {
        this.tableSettings.data = [];
        this.addsuccessRecords = res.recordsSummary.successRecord;
        this.addMessage = 'Successfully Added';
        this.addErrorRecords = 0;
      }
      this.rowUpdatedSuccessfully.updated = true;
      this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
      this.updatedRowObj = [];
    });
  }
  /** edit row of table for phase forecast table */
  updateRow(event) {
    this.updateBoolean = true;
    this.cancelBoolean = true;
    this.addMode = false;
    if (this.countEdit > 0 && this.showbutnRows === true) {
      this.updateBoolean = false;
      this.cancelBoolean = false;
    }
    if (event != null) {
      this.updatedRowObj = [];
      const index = this.updatedRowObj.findIndex(x => x.id === event.id);
      if (index > -1) {
        this.updatedRowObj = this.updatedRowObj.filter(obj => obj.id !== event.id);
      }
      this.updatedRowObj.push(event);
    } else if (event == null) {
      this.updateBoolean = true;
      this.cancelBoolean = true;
      this.addMode = false;
    }
  }
  /** edit click option for table row  */
  updateRecord() {
    this.updateBoolean = false;
    this.cancelBoolean = false;
    const url = environment.base_url + 'phase-forecast/update-info';
    this.appService.post(url, this.updatedRowObj).subscribe(res => {
      if (res.message === 'Exception in updating/inserting the PhaseForecast data') {
        this.utilityService.validateStatus('error', CP_ERROR.ERROR_MESSAGES.FAILED_TO_SAVE, CP_ERROR.SEVERITY.ERROR, 3000);
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
      } else {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.TABLE_RECORD, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.updatedRowObj = [];
        this.singleselect = this.tableSettings.data;
        this.singleselectjson = JSON.parse(JSON.stringify(this.tableSettings.data));
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
      }
    });
  }
  /** cancel click option for table row  */
  cancelRecord() {
    this.updateBoolean = false;
    this.cancelBoolean = false;
    this.tableSettings.data = this.singleselectjson;
    this.rowUpdatedSuccessfully.updated = true;
    this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
  }
  /** delete row of table for phase forecast table */
  deleteRow(event) {
    this.rowForDelete = event;
    this.deletePopup = true;
  }
  /** delete cancel popup function for table */
  deleteCancel() {
    this.deletePopup = false;
  }
  /** delete the records in the table */
  deleteOk() {
    this.displayBasic = false;
    this.popupType = '';
    const url = environment.base_url + 'phase-forecast/delete-info?id=' + this.rowForDelete;
    this.appService.delete(url).subscribe(res => {
      const id = this.rowForDelete;
      this.deletePopup = false;
      if (res.status === true) {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.tableSettings.data = JSON.parse(JSON.stringify(this.rows.filter(obj => obj.id !== this.rowForDelete)));
      } else {
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
      }
    });
  }
  /** To get the upload response for success and failed case */
  submitfile(event) {
    this.fileCancel = '';
    const url = environment.base_url + 'phase-forecast/upload-file';
    this.appService.postFile(url, event).subscribe(res => {
      this.displayBasic = true;
      this.popupType = '50vw';
      if (res.status === true) {
        this.uploadData = res;
        this.successRecord = res.recordsSummary.successRecord;
        this.errorRecord = res.recordsSummary.errorRecord;
        this.fileMessage = '';
      } else {
        const r = res.message;
        const k = r.substring(0, 9);
        if (k === 'Exception') {
          this.exceptionboolean = true;
          this.exceptionmsg = r;
          this.fileMessage = '';
        }
        this.fileMessage = res.message;
        this.successRecord = 0;
        this.errorRecord = 0;
      }
    }, err => {
    });
  }
  /** upload file header message header for upload table */
  uploadFileHeaderMessage() {
    const url = environment.base_url + 'generic-header/grid-phasemsg-header';
    this.appService.get(url).subscribe(res => {
      this.headerData = res;
      this.tableSettings.headers = this.headerData;
    });
  }
  /** To show success data center case on table */
  showSucessresult() {
    this.failedSiteName = true;
    this.successSiteName = false;
    this.tableminheight = '';
    this.displayBasic = false;
    this.uploadFileHeader();
   // this.uploadFileHeaderMessage();
    this.rows = this.uploadData['validPhaseForecastRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
  }
  /** To show failed data center case on table */
  showFailedresult() {
    this.successSiteName = true;
    this.failedSiteName = false;
    this.tableminheight = '';
    this.displayBasic = false;
    this.uploadFileHeaderMessage();
    this.rows = this.uploadData['invalidPhaseForecastRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
  }
  /** cancel file upload click on cancel button in footer */
  uploadCancelModel() {
    this.displayBasic = false;
  }
  /** cancel file upload while clicking on cancel button from top */
  fileUploadCancel() {
    this.tableSettings.data = [];
    this.tableSettings.headers = [];
    this.failedSiteName = false;
    this.successSiteName = false;
    this.fileCancel = 'file cancel';
  }
  /** file upload submit */
  submitUploadFile() {
    const url = environment.base_url + 'phase-forecast/update-info';
    this.appService.post(url, this.uploadData['validPhaseForecastRecords']).subscribe(res => {
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FILE_UPLOAD, CP_ERROR.SEVERITY.SUCCESS, 3000);
      this.failedSiteName = false;
      this.successSiteName = false;
      this.tableSettings.data = [];
      this.tableSettings.headers = [];
      this.fileCancel = 'file cancel';
    }, err => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.FILE_NOT_SUBMIT, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }
  /** colums defines here for input table */
  updateColumnsOfTable(type) {
    if (type === 'edit') {
      this.columns = editColumn;
    } else if (type === 'static') {
      this.columns = staticTable;
    }
    this.bindTableProperties(type);
  }
  /** bind the value of the tables */
  bindTableProperties(type) {
    this.tableSettings.headers = this.columns;
    if (type === 'edit') {
      this.tableSettings.editkey = 'id';
    }
    if (type === 'static') {
      this.tableSettings.editkey = 'id';
    }
  }
  /** reset search input function */
  OnResetSearchInput(event) {
    this.tableSettings.data = [];
    this.addMode = true;
  }
}
