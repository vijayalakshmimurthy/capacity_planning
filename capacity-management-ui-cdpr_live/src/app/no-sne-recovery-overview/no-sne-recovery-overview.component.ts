import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { UtilityService } from './../shared/services/utility.service';
import { OrderIdService } from '../shared/services/order-id.service';
import { WorkflowService } from '../shared/services/workflow.service';
import { Subscription } from 'rxjs';
import { CP_ERROR } from '../shared/constants/error.constant';

@Component({
  selector: 'app-no-sne-recovery-overview',
  templateUrl: './no-sne-recovery-overview.component.html',
  styleUrls: ['./no-sne-recovery-overview.component.scss']
})
export class NoSneRecoveryOverviewComponent implements OnInit {
  enableDeviceRecoveryWorkflow$: Subscription;
  enableRecoveryWorkflow = false;
  orderId = [];
  disableEditIcon = false;
  disableSaveBtn = true;
  disableSubmitBtn = true;
  disableExportBtn = false;
  recoveryTypeHolder = false;
  emailId: any;
  tableData = [];
  saveSuccess = false;
  orderid;
  orderStatus;
  orderIDList = [];
  role;
  disableTable = true;
  // tslint:disable-next-line:max-line-length
  constructor(private appService: AppService, private router: Router, private utilityService: UtilityService,
              private orderIdService: OrderIdService, private workflowService: WorkflowService) {
    this.enableDeviceRecoveryWorkflow$ = this.workflowService.enableDeviceRecoveryWorkflow$.subscribe((workflow) => {
      if (workflow) {
        this.enableRecoveryWorkflow = workflow;
      }
    });

    this.orderIdService.cardMoveSummaryPage.subscribe((summaryData) => {
      if (summaryData) {
        this.disableSaveBtn = summaryData.disableSaveBtn;
        this.disableSubmitBtn = summaryData.disableSubmitBtn;
        this.disableExportBtn = summaryData.disableExportBtn;
        this.saveSuccess = summaryData.saveSuccess;
      }
    });
  }

  arraycheck(array) {
    for (const value of array) {
      if (this.orderId.indexOf(value) === -1) {
        this.orderId.push(value);
        this.orderIDList.push(value.orderId);
      }
    }
  }

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.orderid = sessionStorage.getItem('orderId');
    this.orderStatus = sessionStorage.getItem('orderStatus');
    if (this.orderStatus !== null && (this.orderStatus !== 'Uploaded' || this.orderStatus !== 'Saved')) {
      this.disableSaveBtn = true;
      this.disableSubmitBtn = true;
      this.disableExportBtn = false;
      this.disableTable = true;
    } else {
      this.disableTable = false;
    }
    this.getTableData();
    if (this.enableRecoveryWorkflow) {
      this.emitDeviceRecoveryData();
    }
    this.orderIdService.emailIdPage.subscribe(emailId => {
      this.emailId = emailId;
    });
  }

  getTableData() {
    const height = '100vh';
    const orderList = [];
    // const url = './assets/json/deviceRecovery_overview.json';
    // this.appService.get(url).subscribe(res => {
    this.orderIdService.cardMovePage.subscribe(orderId => {
      if (orderId !== null) {
        this.arraycheck(orderId);
        this.tableData = [];
        this.getDetailsByOrderId(this.orderIDList);
      } else if (this.orderid !== null) {
        this.getDetailsByOrderId([this.orderid]);
      }
    });
  }

  getDetailsByOrderId(orderList) {
    const url = environment.no_Base_url + '/device-recovery/all-orders-overview-data';
    this.appService.post(url, orderList).subscribe(res => {
      res.forEach((value) => {
        let cardObj;
        value.data.view_data.forEach((data) => {
          cardObj = {
            sne_id: data.sne_id,
            holder: data.holder,
            recovery_type: data.recovery_type,
            fist_Project_No: data.fist_Project_No,
            scheme_Driver: data.scheme_Driver,
            capacity_required_date: data.cpCRDate,
            physical_connector_removal: data.physical_connector_removal,
            rack_recovery: data.rack_recovery,
            network_change: data.network_change,
            auto_progression: data.auto_progression,
            recover_sne_id: data.recover_sne_id,
            orderId: value.data.orderId
          };
          this.tableData.push(cardObj);
        });
      });
      this.checkValidation(this.tableData);
    });
  }

  checkValidation(data) {
    for (const value of data) {
      if (value.fist_Project_No !== null && value.scheme_Driver !== null && value.capacity_required_date !== null &&
        value.physical_connector_removal !== null && value.rack_recovery !== null && value.network_change !== null &&
        value.auto_progression !== null) {
        if (value.fist_Project_No !== '' && value.scheme_Driver !== '' && value.capacity_required_date !== '' &&
          value.physical_connector_removal !== '' && value.rack_recovery !== '' && value.network_change !== '' &&
          value.auto_progression !== '' && !this.saveSuccess) {
          this.disableSaveBtn = false;
        } else {
          this.disableSaveBtn = true;
        }
      } else {
        this.disableSaveBtn = true;
      }
      if (value.recovery_type === 'Device') {
        this.recoveryTypeHolder = true;
      } else {
        this.recoveryTypeHolder = false;
      }
    }
  }

  emitDeviceRecoveryData() {
    const obj = {
      deviceRecovery: this.tableData,
      activestatus: 3,
      enableNextButton: false,
      orderId: [],
    };
    setTimeout(() => {
      this.workflowService.deviceRecoveryStatus.next(obj);
    }, 0);
  }

  deleteRow(recoverSNEList) {
    const url = environment.no_Base_url + '/device-recovery/delete-device-recover-data';
    this.appService.post(url, recoverSNEList).subscribe(res => {
      recoverSNEList.forEach((value) => {
        const index = this.tableData.findIndex(x => x.recover_sne_id === value);
        this.tableData.splice(index, 1);
        this.checkValidation(this.tableData);
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
        if (this.tableData.length === 0) {
          this.disableExportBtn = true;
          this.disableSaveBtn = true;
          this.disableSubmitBtn = true;
        }
      });
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
    }, (err) => {
      this.utilityService.validateStatus(200, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  save() {
    const saveObj = [];
    const showErr = [true, true, true, true, true, true, true, true, false];
    this.tableData.forEach((data) => {
      const cardObj = {
        showErr,
        sne_Id: data.sne_id,
        holder: data.holder,
        recovery_type: data.recovery_type,
        fist_Project_No: data.fist_Project_No,
        scheme_Driver: data.scheme_Driver,
        capacity_Required_Date: data.capacity_required_date,
        physical_Connector_Removal: data.physical_connector_removal,
        rack_Recovery: data.rack_recovery,
        network_Change: data.network_change,
        auto_Progression: data.auto_progression,
        recover_Sne_Id: data.recover_sne_id
      };
      const obj = {
        roCallSneRequestData: {
          isUploadAction: false,
          functionName: 'Recover SNE Update',
          emailId: this.emailId,
          fileName: null,
          projectId: null,
          messageId: null,
          version: null,
          orderId: data.orderId,
          sneRequestData: [cardObj]
        }
      };
      saveObj.push(obj);
    });
    const url = environment.no_Base_url + '/device-recovery/save-recover-device-data?type=Manual';
    this.appService.post(url, saveObj).subscribe(response => {
      this.disableSaveBtn = true;
      this.disableSubmitBtn = false;
      this.saveSuccess = true;
      this.utilityService.validateStatus(200, response[0].message, CP_ERROR.SEVERITY.SUCCESS, 3000);
    }, (err) => {
      this.disableSaveBtn = false;
      this.saveSuccess = false;
      this.utilityService.validateStatus(200, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  export() {
    const orderId = (this.orderIDList.length > 0) ? this.orderIDList.toString() : this.orderid;
    const url = environment.no_Base_url + '/port-move/card-move-all-details-csv-data?order-id=' + orderId;
    this.appService.downloadCSV(url);
  }

  submit() {
    if (this.orderId) {
      this.orderId.forEach((value) => {
        // tslint:disable-next-line:max-line-length
        const url = environment.no_Base_url + '/recover-sne/submit-recoversne-Initial?order-id=' + value.orderId;
        this.appService.get(url).subscribe(res => {
          this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS, 3000);
          this.disableEditIcon = true;
          setTimeout(() => {
            this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
          }, 3000);
        }, (err) => {
          this.utilityService.validateStatus(err.status, err.error.message, CP_ERROR.SEVERITY.ERROR, 5000);
        });
      });
    } else {
      const url = environment.no_Base_url + '/recover-sne/submit-recoversne-Initial?order-id=' + this.orderid;
      this.appService.get(url).subscribe(res => {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.disableEditIcon = true;
        setTimeout(() => {
          this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
        }, 3000);
      }, (err) => {
        this.utilityService.validateStatus(err.status, err.error.message, CP_ERROR.SEVERITY.ERROR, 5000);
      });
    }
  }

  redirectToHomePage() {
    if (this.role !== 'no user') {
      this.router.navigate(['/capacity-summary-report']);
    } else if (this.role === 'no user') {
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }
  }
}
