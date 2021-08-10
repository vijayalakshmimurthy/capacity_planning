import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { FileUploaderComponent } from '../shared/components/file-uploader/file-uploader.component';
import { AppRegExpressionsConfig } from './../shared/literals/app.regex';
import { cardRecoveryHeader } from './input-table/input-table-header.constant';
import { OrderIdService } from '../shared/services/order-id.service';

@Component({
  selector: 'app-netopt-sne-recovery',
  templateUrl: './netopt-sne-recovery.component.html',
  styleUrls: ['./netopt-sne-recovery.component.scss']
})
export class NetoptSneRecoveryComponent implements OnInit {
  @ViewChild('fileUploader', { static: false }) fileUploader: FileUploaderComponent;
  selectedValue = 'uploadcsv';
  acceptedFormats: Array<string> = ['csv'];
  inputTableProperties = {
    headers: [], data: [], paginator: true, scrollHeight: '50vh',
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: false,
    editkey: '', scrollable: true, totalRecords: 0,
    refreshPagination: false
  };
  disableCon = false;
  disableTable = false;
  emptyRow = [];
  uploadCsvBtn = true;
  proceedEnable = true;
  uploadFileDetails: File;
  submitError: boolean;
  fileInfo = '';
  reloadCSV = false;
  fileName = '';
  csvUploadError = ''; 
  emailIds: any;
  userEmailId = '';
  recoverSneParam;
  orderidcreated;
  orderIdOverview = [];
  orderData = [];
  requestData = [];
  tabledata = [];
  uploadSuccess = false;
  role;

  // tslint:disable-next-line:max-line-length
  csvHeaders: Array<string> = ['Device', 'Holder', 'Recovery Type', 'Fist Project No', 'Scheme Driver', 'Capacity Required Date', 'Physical Connector Removal', 'Rack Recovery', 'Network Change', 'Auto Progression'];
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService, private router: Router, private utility: UtilityService, private orderIdService: OrderIdService, ) { }
  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.selectedValue = 'uploadcsv';
    this.inputTableProperties.headers = cardRecoveryHeader;
    this.diableFileUploader();
    this.userEmailId = this.appService.getEmail();
    this.getEmailId();
  }

  arraycheck(array) {
    for (const value of array) {
      if (Array.isArray(value)) {
        this.arraycheck(value);
      } else {
        if ( this.orderData.indexOf(value) === -1) {
          this.orderData.push(value);
          this.orderIdOverview.push(value);
        }
      }
    }
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

  getTableData() {
    const height = '100vh';
    this.emptyRow = [];
    this.inputTableProperties.data = [];
    const obj = {
      sne_Id: null,
      holder: null,
      recovery_type: null,
      fist_Project_No: null,
      scheme_Driver: null,
      capacity_Required_Date: null,
      physical_Connector_Removal: null,
      rack_Recovery: null,
      network_Change: null,
      auto_Progression: null,
      showErr: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
    for (let i = 0; i <= 4; i++) {
      if (i <= 0) {
        const tempObj = JSON.parse(JSON.stringify(obj));
        this.inputTableProperties.data.push(tempObj);
      }
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
      this.submitError = true;
      this.fileInfo = filedata.objFile.name;
    }
  }

  uploadCSV() {
    if (this.submitError === false) {
      this.fileName = this.fileInfo;
      this.csvUploadError = 'Invalid CSV format. Please refer to the sample CSV for correct format.';
      this.reloadCSV = true;
    } else {
      const formData = new FormData();
      formData.append('recover-sne', this.uploadFileDetails, this.uploadFileDetails.name);
      const params = {
        url: environment.no_Base_url + '/device-recovery/csv-upload',
        request: formData
      };
      this.appService.requestWithParams(params).subscribe((res) => {
        if (res.data.recoverSnesData.length > 0) {
          this.inputTableProperties.data = [];
          res.data.recoverSnesData.map(row => {
            row.showErr = [false, false, false, false, false, false, false, false, false, false];
          });
          // tslint:disable-next-line:forin
          for (const arr in res.data.recoverSnesData) {
            for (const value in res.data.recoverSnesData[arr]) {
              if (typeof (res.data.recoverSnesData[arr][value]) === 'object') {
                const value1 = res.data.recoverSnesData[arr][value]['label'];
                res.data.recoverSnesData[arr][value] = value1;
              }
            }
          }
          this.inputTableProperties.data = res.data.recoverSnesData;
        }
        this.disableTable = false;
        this.uploadSuccess = true;
        this.uploadCsvBtn = true;
        this.checkvalidation();
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
      if (value.sne_Id !== null && value.holder !== null && value.recovery_type !== null &&
        value.fist_Project_No !== null && value.scheme_Driver !== null && value.capacity_Required_Date !== null &&
        value.physical_Connector_Removal !== null && value.rack_Recovery !== null && value.network_Change !== null &&
        value.auto_Progression !== null) {
        if (value.sne_Id !== '' && value.holder !== '' && value.recovery_type !== '' &&
          value.fist_Project_No !== '' && value.scheme_Driver !== '' && value.capacity_Required_Date !== '' &&
          value.physical_Connector_Removal !== '' && value.rack_Recovery !== '' && value.network_Change !== '' &&
          value.auto_Progression !== '') {
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

  appendRow() {
    this.emptyRow = [];
    const obj = {
      sne_Id: null,
      holder: null,
      recovery_type: null,
      fist_Project_No: null,
      scheme_Driver: null,
      capacity_Required_Date: null,
      physical_Connector_Removal: null,
      rack_Recovery: null,
      network_Change: null,
      auto_Progression: null,
      showErr: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ]
    };
    const tempObj = JSON.parse(JSON.stringify(obj));
    if (this.selectedValue === 'uploadcsv') {
      this.inputTableProperties.data.push(tempObj);
    } else if (this.selectedValue === 'manually') {
      this.inputTableProperties.data.push(tempObj);
    }
  }

  deleteRow(row) {
    this.emptyRow = [];
    this.inputTableProperties.data.splice(row, 1);
  }

  emailAdd() {
    if (this.emailIds !== null && this.emailIds !== undefined && this.emailIds !== '') {
    } else {
    }
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

  getEmailId() {
    const url = environment.no_Base_url + '/cease-of-backhaul/email-Id';
    this.appService.get(url).subscribe(res => {
      if (Object.keys(res.data).length === 0) {
        this.emailIds = this.userEmailId;
      } else {
        this.emailIds = res.data.emailId;
        this.userEmailId = '';
      }
    }, (err) => {
      this.utility.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  proceedFun() {
    this.orderIdService.cardMovePage.subscribe((orderData) => {
      if (orderData) {
        this.orderData = orderData;
        this.arraycheck(this.orderData);
      }
    });
    if (!this.validateEmail()) {
      this.utility.validateStatus(400, 'Please enter valid email', CP_ERROR.SEVERITY.ERROR, 5000);
    } else {
      this.requestData = [];
      const tableData = JSON.parse(JSON.stringify(this.inputTableProperties.data));
      this.reqobjiter(tableData);
      const params = {
        url: environment.no_Base_url + '/device-recovery/save-recover-device-data?type=Manual',
        request: this.requestData
      };
      this.appService.requestWithParams(params).subscribe((res) => {
        this.utility.validateStatus(200, CP_ERROR.STATUS_MESSAGES.TABLE_RECORD, CP_ERROR.SEVERITY.SUCCESS, 3000);
        const recoverSNEList = [];
        res.forEach((value) => {
          value.data.recoverSnesData.forEach((recoverData) => {
            recoverSNEList.push(recoverData.recover_Sne_Id);
          });
          if (this.orderData.length) {
            const orderDetails =   this.orderData.filter(x => x.sneId === value.data.recoverSnesData[0].sne_Id);
            if (orderDetails.length === 0) {
              const orderobj = { sneId: value.data.recoverSnesData[0].sne_Id, orderId: value.data.orderId };
              this.orderData.push(orderobj);
              this.orderIdService.OrderIdFun(this.orderData);
            }
          } else {
            const orderobj = { sneId: value.data.recoverSnesData[0].sne_Id, orderId: value.data.orderId };
            this.orderData.push(orderobj);
            this.orderIdService.OrderIdFun(this.orderData);
          }
        });
        this.orderIdService.setRecoverSneList(recoverSNEList);
        this.orderIdService.emailIdPass(this.emailIds);
        this.router.navigate(['/sne-recovery-overview']);
      }, (err) => {
        if (err.error.message) {
          this.utility.validateStatus(400, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
        } else {
          this.utility.validateStatus(400, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 5000);
        }
      });
    }
  }
  reqobjiter(tableData) {
    let reqObj;
    let orderId = null;
    let sne = '';
    this.tabledata = tableData;
    for (let i = 0; i <   this.tabledata.length; i++) {
      const requestSNEData =   this.tabledata.filter(x => x.sne_Id ===   this.tabledata[i].sne_Id);
      // tslint:disable-next-line:radix
      const orderDetails = this.orderData.filter(x => x.sneId === parseInt(this.tabledata[i].sne_Id));
      if (orderDetails.length) {
        orderId = orderDetails[0].orderId;
      } else {
        orderId = null;
      }

      sne = tableData[i].sne_Id;
      if (requestSNEData.length > 0) {
        reqObj = {
          roCallSneRequestData: {
            isUploadAction: false,
            functionName: 'Recover SNE Update',
            orderId,
            emailId: this.emailIds,
            fileName: null,
            projectId: null,
            messageId: null,
            version: null,
            sneRequestData: requestSNEData
          }
        };
        this.requestData.push(reqObj);
      }
      break;
    }
    this.filtertable( this.tabledata, sne);
    if (  this.tabledata.length !== 0) {
      this.reqobjiter(this.tabledata);
    } else {
      return this.requestData;
    }
  }
  filtertable(tableData, sne) {
    for (let i = 0; i <   this.tabledata.length; i++) {
      if (  this.tabledata[i].sne_Id === sne) {
        this.tabledata.splice(i, 1);
        this.tabledata = JSON.parse(JSON.stringify(  this.tabledata));
        break;
      }
    }

    if (  this.tabledata.length !== 0) {
      const requestSNEData =   this.tabledata.filter(x => x.sne_Id === sne);
      if (requestSNEData.length > 0) {
        this.filtertable(  this.tabledata, sne);
      } else {
        if (this.tabledata.length !== 0) {
          return;
        } else {
          this.tabledata = [];
          return;
        }
      }
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

  emitproceedcheck(event) {
    this.proceedEnable = event;
  }

  sampleCsv() {
    const url = environment.no_Base_url + '/device-recovery/sample-csv?fileType=DeviceRecovery';
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
