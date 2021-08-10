import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { AlertService } from '../shared/services/alert.service';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
/** This is the Data Center Parent Component whcih contents data upload and manage search tabs */
@Component({
  selector: 'app-data-center',
  templateUrl: './data-center.component.html',
  styleUrls: ['./data-center.component.scss']
})
export class DataCenterComponent implements OnInit {
  /** All Local variable has defined here and viewChild statments are here. */

  tableSettings = {
    frozenColumns: [], headers: [], data: [], paginator: true, scrollHeight: '450px', sort: false,
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: false,
    frozenWidth: '', editkey: '', scrollable: true
  };
  hideFizeSize = false;
  fileToUpload: File = null;
  filesizemsg = '';
  uploadFileName = 'No file chosen';
  skippedFile = false;
  cancelTable = true;
  showActionComponent = false;
  failed = false;
  successTable = false;
  showButton: boolean;
  displayBasic = false;
  showTable = false;
  /** Defined uploadData Array resposne of the submit */
  uploadData = [];
  tableType = '';

  /** edit mode check for table variable */
  editMode = false;
  successRecord = 0;
  errorRecord = 0;
  downloadFileName = '';

  /** Download data variable */
  csvData: string;
  fileMessage = '';
  disableButton = false;
  selectedTab = 'Data Centre Upload';

  /* table Component variables */
  columns: any = [];
  rows: any = [];

  /** To send update in file upload component */
  // fileCancel = '';

  popupType = '';
  /* delete exact row variables */
  rowFordelete = null;

  /* option variables */
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  /** filterData */
  filterData = [];
  searchData = '';
  errorMsg = '';
  searchBoxPlaceHolder = 'Enter 1141 Code/TRS Area/SNE ID ';
  /** updatedRowObj object for binding updated rows result */
  updatedRowObj = [];
  /** rowUpdatedSuccessfully object for handling flag of updated data */
  rowUpdatedSuccessfully = { updated: false };
  /** noRecordError Flag is for getting No record found message */
  noRecordError = false;
  /** ViewChild for Function using reset from child */
  @ViewChild(FileUploadComponent, { static: false }) fileUploadRef: FileUploadComponent;
  /** Constructor to inject app service */
  constructor(private appService: AppService, protected alertService: AlertService) {
  }

  ngOnInit() {
    /** calling function to get download data from backend */
    this.onDownloadClick();

  }
  /** to set the data empty for each tab */
  tabChange(event) {
    this.selectedTab = event.originalEvent.target.innerText;
    this.rows = [];
    this.tableSettings.data = [];
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    if (this.selectedTab === 'Manage Data Centre') {
      this.filterData = [];
      this.updateColumnsOfTable('edit');
    }
  }

  /** To fill suggestions in search box */
  onKeyPressSearchBox(event) {
    this.errorMsg = '';
    const url = environment.base_url + 'stt/datacenter/search-sitedetails?searchStr=' + event.target.value;
    this.appService.get(url).subscribe(res => {
      this.filterData = JSON.parse(JSON.stringify(res));
    });
  }

  /** To get data for table while selecting any value from search box */
  onSelectSearch(event) {
    this.noRecordError = false;
    const url = environment.base_url + 'stt/datacenter/fetch-datacenters?searchCriteria=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length > 0) {
        this.rows = res;
        this.tableSettings.data = this.rows;
        this.editMode = true;
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }
    });
  }

  /** Funtion to open the delete popup */
  deleteRowPopup(deleteObj) {
    this.rowFordelete = deleteObj;
    this.displayBasic = true;
    this.popupType = '30vw';
  }


  /** Funtion to cancel the delete popup */
  modelCancel(event: any) {
    this.popupType = '';
    this.displayBasic = false;
    this.rowFordelete = null;
  }

  /** delete perticular record */
  deleteRow() {
    this.displayBasic = false;
    this.popupType = '';
    const url = environment.base_url + 'stt/datacenter/delete-info?id=' + this.rowFordelete;
    this.appService.delete(url).subscribe(res => {
      const id = this.rowFordelete;
      if (res[id].status) {
        this.alertService.success('Deleted Successfully', this.options);
        this.tableSettings.data = JSON.parse(JSON.stringify(this.rows.filter(obj => obj.id !== this.rowFordelete)));

        this.rowFordelete = null;
      }
    });
  }

  /** To update data of searched row from manage component */
  updateRow(event) {
    if (event !== null) {
      const index = this.updatedRowObj.findIndex(x => x.id === event.id);
      if (index > -1) {
        this.updatedRowObj = this.updatedRowObj.filter(obj => obj.id !== event.id);
      }
      this.updatedRowObj.push(event);
    }
    this.tableType = 'update';
  }


  /** Funtion to update the row by id to submit for backend */
  submitData() {
    const url = environment.base_url + 'stt/datacenter/update-info';
    this.appService.post(url, this.updatedRowObj).subscribe(res => {
      if (res.message === 'Exception in updating the stt DataCenters data') {
        this.alertService.error(`File have not Updated`);
      } else {
        this.alertService.success(`Update Successfully`, this.options);
        this.updatedRowObj = [];
        this.tableType = '';
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
        this.onDownloadClick();
      }
    });
  }

  /** to get table data based on search Go button */
  onManageSearchData(event) {
    this.noRecordError = false;
    const url = environment.base_url + 'stt/datacenter/fetch-datacenters?searchCriteria=' + event;
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

  /** search box data reset while clickin on cancel button from top */
  onSearchdataUpdateCancel() {
    this.tableType = '';
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));

    this.rowUpdatedSuccessfully.updated = true;
    this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
  }

  /** To Download the whole Data center Data on the download link */
  onDownloadClick() {
    const url = environment.base_url + 'stt/datacenter/download';
    this.appService.get(url).subscribe(res => {
      this.csvData = res.body.FileContent;
      this.downloadFileName = res.body.FileName;
    });
  }


  /** To get the upload response for success and failed case */
  submitfile(event) {
    // this.fileCancel = '';
    const url = environment.base_url + 'stt/datacenter/new-upload-file';
    this.appService.postFile(url, event).subscribe(res => {
      this.displayBasic = true;
      this.popupType = '50vw';
      if (res.validDataCentersRecords.length > 0 || res.invalidDataCentersRecords.length > 0) {
        this.uploadData = res;
        this.successRecord = res.successRecord;
        this.errorRecord = res.errorRecord;
        this.fileMessage = '';
      } else {
        this.fileMessage = res.message;
        this.successRecord = 0;
        this.errorRecord = 0;
      }
    }, err => {
    });
  }

  /** On file upload modal button cancel */
  modelfileuploadCancel() {
    this.displayBasic = false;
    this.onfileUploadFromActionCancel();
  }

  /** To submit the success table json the backend */
  submitFileData() {
    const url = environment.base_url + 'stt/datacenter/update-info';
    this.appService.post(url, this.uploadData['validDataCentersRecords']).subscribe(res => {
      this.alertService.success(`Uploaded Succesfully`, this.options);
      this.rows = [];
      this.fileUploadRef.resetFile();
      this.tableType = '';
      this.successRecord = 0;
      this.errorRecord = 0;
      this.onDownloadClick();
    }, err => {
      this.alertService.error(`File have not Uploaded`, this.options);
    });
  }

  /** To show success data center case on table */
  showSucessresult() {
    this.updateColumnsOfTable('');
    this.rows = this.uploadData['validDataCentersRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.displayBasic = false;
    this.popupType = '';
    this.editMode = false;
    this.tableType = 'successTable';
  }

  /** To show failed data center case on table */
  showFailedresult() {
    this.updateColumnsOfTable('');
    this.rows = this.uploadData['invalidDataCentersRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.displayBasic = false;
    this.editMode = false;
    this.tableType = 'failed';
    this.popupType = '';
  }

  /** cancel file upload while clicking on cancel button from top */
  onfileUploadFromActionCancel() {
    this.rows = [];
    this.successRecord = 0;
    this.errorRecord = 0;
    this.fileUploadRef.resetFile();
    this.tableType = '';
  }

  /** colums defines here for input table */
  updateColumnsOfTable(type) {
    this.columns = [
      { field: 'sauCode', header: 'SAU ID', visible: true, properties: { sort: true, editable: false, columnWidth: '8%' } },
      { field: 'sneId', header: 'SNE ID', visible: true, properties: { sort: true, editable: false, columnWidth: '8%' } },
      { field: 'tRSArea', header: 'TRS Area', visible: true, properties: { sort: true, editable: false, columnWidth: '8%' } },
      {
        field: 'dataCentreName', header: '3rd Party DC Name',
        visible: true, properties: { sort: false, editable: false, columnWidth: '20%' }
      }
    ];
    if (type === 'edit') {
      const obj = [
        {
          field: 'maxEtherwayBandwidth', header: 'Max Etherway Bandwidth', visible: true,
          properties: { sort: true, editable: true, columnWidth: '13%' },
          type: 'select', values: ['10Gb', '2.5Gb']
        },
        {
          field: 'maxEVCBandwidth', header: 'Max EVC Bandwidth', visible: true,
          properties: { sort: true, editable: true, columnWidth: '13%' },
          type: 'select', values: ['10Gb', '2.5Gb']
        },
        {
          field: 'futureAvailablity', header: 'Future availability of 10G EVCs', visible: true,
          properties: { sort: true, editable: true, columnWidth: '10%' },
          type: 'text', values: ''
        },
        {
          field: 'etherflowsGt1GB', header: 'No. of Etherflows>1GB', visible: true,
          properties: { sort: true, editable: true, columnWidth: '10%' },
          type: 'text', values: ''
        },
        { field: 'actions', header: 'Action', visible: true, properties: { sort: false, editable: false, columnWidth: '10%' } }];
      this.columns = [...this.columns, ...obj];
    } else if (type === '') {
      const obj = [
        {
          field: 'maxEtherwayBandwidth', header: 'Max Etherway Bandwidth', visible: true,
          properties: { sort: true, editable: false, columnWidth: '13%' }
        },
        { field: 'maxEVCBandwidth', header: 'Max EVC Bandwidth', properties: { sort: true, editable: false, columnWidth: '13%' } },
        {
          field: 'futureAvailablity', header: 'Future availability of 10G EVCs', visible: true,
          properties: { sort: true, editable: false, columnWidth: '10%' }
        },
        {
          field: 'etherflowsGt1GB', header: 'No. of Etherflows>1GB', visible: true,
          properties: { sort: true, editable: false, columnWidth: '10%' }
        }];
      // this.columns.concat(...obj);
      this.columns = [...this.columns, ...obj];
    }
    this.bindTableProperties(type);
  }

  bindTableProperties(type) {
    // this.tableSettings.data = this.rows;
    this.tableSettings.headers = this.columns;
    this.tableSettings.frozenColumns = null;
    this.tableSettings.columnWidthDynamic = true;
    if (type === '') {
      this.tableSettings.paginator = true;
      this.tableSettings.scrollable = true;
      this.tableSettings.scrollHeight = '450px';
    } else {
      this.tableSettings.paginator = false;
      this.tableSettings.scrollable = true;
      this.tableSettings.scrollHeight = '450px';
      this.tableSettings.editkey = 'id';
      this.tableSettings.paginator = false;
    }
  }

}
