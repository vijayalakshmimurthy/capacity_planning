import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from './../shared/services/utility.service';
import { Router } from '@angular/router';
import { AppService } from '../shared/services/app-service';
import { staticTable } from './input-table/input-table-header.constant';
import { CP_ERROR } from './../shared/constants/error.constant';
import { AppRegExpressionsConfig } from './../shared/literals/app.regex';
import { OrderIdService } from '../shared/services/order-id.service';
import { environment } from '../../environments/environment';
import { FileUploaderComponent } from '../shared/components/file-uploader/file-uploader.component';
@Component({
  selector: 'app-netopt-card-move',
  templateUrl: './netopt-card-move.component.html',
  styleUrls: ['./netopt-card-move.component.scss']
})
export class NetoptCardMoveComponent implements OnInit {
  @ViewChild('fileUploader', { static: false }) fileUploader: FileUploaderComponent;
  selectedValue = 'uploadcsv';
  disableCon = false;
  acceptedFormats: Array<string> = ['csv'];
  submitError: boolean;
  uploadCsvBtn = true;
  fileInfo = '';
  reloadCSV = false;
  fileName = '';
  emailIds: any;
  inputTableProperties = {
    headers: [], data: [], paginator: true, scrollHeight: '50vh',
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: false,
    editkey: '', scrollable: true, totalRecords: 0,
    refreshPagination: false
  };
  emptyRow = [];
  disableTable = false;
  rowIndex: number;
  proceedEnable = true;
  userEmailId = '';
  csvUploadError = '';
  uploadFileDetails: File;
  cardMoveParam;
  emailenable = true;
  uploadSuccess = false;
  role;
  // tslint:disable-next-line:max-line-length
  csvHeaders: Array<string> = ['Source SNE', 'Source Port', 'Destination SNE', 'Destination Port', 'Fist Project No', 'Scheme Driver', 'Capacity Required Date'];
  constructor( private utility: UtilityService,
               private appService: AppService,
               private orderIdService: OrderIdService,
               private router: Router) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.selectedValue = 'uploadcsv';
    this.inputTableProperties.headers = staticTable;
    this.diableFileUploader();
    this.userEmailId = this.appService.getEmail();
    this.getEmailId();
  }
  diableFileUploader() {
    if (this.selectedValue === 'manually') {
      this.inputTableProperties.data = [];
      this.disableCon = true;
      this.disableTable = false;
      this.getTableData();
    } else {
      this.inputTableProperties.data = [];
      this.disableCon = false;
      this.disableTable = true;
      this.getTableData();
    }
  }

  fileUpload(filedata) {
    this.uploadCsvBtn = false;
    this.uploadSuccess = false;
    this.uploadFileDetails = filedata.objFile;
    if (filedata.type === 'error') {
      this.submitError = false;
      this.fileInfo = filedata.objFile.name;
    } else if (filedata.type === 'success') {
      this.fileInfo = filedata.objFile.name;
      this.submitError = true;
    }
  }

  uploadCSV() {

    if (this.submitError === false) {
      this.fileName = this.fileInfo;
      this.csvUploadError = 'Invalid CSV format. Please refer to the sample CSV for correct format.';
      this.reloadCSV = true;
    } else {
      const formData = new FormData();
      formData.append('port-move', this.uploadFileDetails, this.uploadFileDetails.name);
      const params = {
        url: environment.no_Base_url + '/port-move/card-move-upload',
        request: formData
      };
      this.appService.requestWithParams(params).subscribe((res) => {
        if (res.data.backHaulData.length > 0) {
          this.inputTableProperties.data = [];
          res.data.backHaulData.map(row => {
            row.showErr = [false, false, false, false, false, false, false];
          });
          this.inputTableProperties.data = res.data.backHaulData;
        }
        this.disableTable = false;
        this.checkvalidation();
        this.uploadCsvBtn = true;
        this.uploadSuccess = true;
      }, (err) => {
        this.uploadCsvBtn = true;
        this.csvUploadError = err.error.data.error[0];
        this.fileName = this.fileInfo;
        this.reloadCSV = true;
      });

    }
  }

  checkvalidation() {
    const data = this.inputTableProperties.data;
    for (const value of data) {
      if (value.source_sne !== null && value.source_port !== null && value.destination_sne !== null &&
        value.destination_port !== null && value.fist_Project_No !== null && value.scheme_Driver !== null &&
        value.capacity_Required_Date !== null) {
        if (value.source_sne !== '' && value.source_port !== '' && value.destination_sne !== '' &&
        value.destination_port !== '' && value.fist_Project_No !== '' && value.scheme_Driver !== '' &&
        value.capacity_Required_Date !== '') {
          this.proceedEnable = false;
        } else {
          this.proceedEnable = true;
        }
      } else {
        this.proceedEnable = true;
      }
    }
  }

  reuploadFile() {
    this.reloadCSV = false;
  }
  /** Get filter Json */
  getTableData() {
    const height = '100vh';
    this.emptyRow = [];
    this.inputTableProperties.data = [];
    const url = './assets/json/cardMove_inputTable.json';
    this.appService.get(url).subscribe(res => {
      const tempObj = JSON.parse(JSON.stringify(res));
      this.inputTableProperties.data.push(tempObj);
    });
  }

  proceedFun() {
    if (!this.validateEmail()) {
      this.utility.validateStatus(400, 'Please enter valid email', CP_ERROR.SEVERITY.ERROR, 5000);
    } else {
      const reqObj = {
        roCallRequestData: {
          orderId: null,
          emailId: this.emailIds,
          fileName: this.fileInfo,
          requestData: this.inputTableProperties.data
        }
      };
      const params = {
        url: environment.no_Base_url + '/port-move/card-move-proceed',
        request: reqObj
      };
      this.appService.requestWithParams(params).subscribe((res) => {
        this.cardMoveParam = res.data.orderId;
        this.orderIdService.OrderIdFun(this.cardMoveParam);
        this.router.navigate(['/network-cardmove-overview']);
      }, (err) => {
        this.utility.validateStatus(err.status, err.error.data.error[0], CP_ERROR.SEVERITY.ERROR, 5000);
      });
    }
  }

  validateEmail(): boolean {
    const mailPattern = /[;]/;
    if (!this.emailIds) {
      return false;
    }

    const emailList = this.emailIds.split(mailPattern);
    for (const email of emailList) {
      if (!email || (email && !AppRegExpressionsConfig(email))) {
        return false;
      }
    }
    return true;
  }

  reset() {
    this.selectedValue = 'uploadcsv';
    this.emailIds = null;
    this.diableFileUploader();
    this.fileUploader.fileReset();
    this.inputTableProperties.data = [];
    this.emptyRow = [];
    this.proceedEnable = true;
    this.getEmailId();
  }

  appendRow() {
    this.emptyRow = [];
    const url = './assets/json/cardMove_inputTable.json';
    this.appService.get(url).subscribe(res => {
      const tempObj = JSON.parse(JSON.stringify(res));
      if (this.selectedValue === 'uploadcsv') {
        this.inputTableProperties.data.push(tempObj);
      } else if (this.selectedValue === 'manually') {
        this.inputTableProperties.data.push(tempObj);
      }
    });
  }

  deleteRow(row) {
    this.emptyRow = [];
    this.inputTableProperties.data.splice(row, 1);
  }
  emailAdd() {
    if (this.emailIds !== null && this.emailIds !== undefined && this.emailIds !== '') {
      this.emailenable = false;
    } else {
      this.emailenable = true;
    }
  }

  getEmailId() {
    const url = environment.no_Base_url + '/cease-of-backhaul/email-Id';
    this.appService.get(url).subscribe(res => {
      if (Object.keys(res.data).length === 0) {
        this.emailIds = this.userEmailId;
        this.emailAdd();
      } else {
        this.emailIds = res.data.emailId;
        this.emailAdd();
        this.userEmailId = '';
      }
    }, (err) => {
      this.utility.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }
  emitproceedcheck(event) {
    this.proceedEnable = event;
  }
  sampleCsv() {
    const url = environment.no_Base_url + '/port-move/sample-csv';
    this.appService.downloadCSV(url);
  }

  redirectToHomePage() {
    if (this.role !== 'no user') {
      this.router.navigate(['/capacity-summary-report']);
    } else if (this.role === 'no user') {
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }
  }
}
