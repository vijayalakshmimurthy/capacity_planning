import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { WorkflowService } from '../shared/services/workflow.service';
import { Subscription } from 'rxjs';
import { staticTable } from './cbpcard/cbpcard-header-constant';
import { OrderIdService } from '../shared/services/order-id.service';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from '../shared/constants/error.constant';
import { DialogService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/api';
import { WfmtPopupComponent } from './wfmt-popup/wfmt-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network-cardmove-overview',
  templateUrl: './network-cardmove-overview.component.html',
  styleUrls: ['./network-cardmove-overview.component.scss'],
  providers: [DialogService]
})
export class NetworkCardmoveOverviewComponent implements OnInit, OnChanges {
  enableNOWorlflow$: Subscription;
  enableNOCardMoveWorkflow = false;
  activestatus;
  enablenextbutton = false;
  index = 1;
  tableSettings = {
    headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh',
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true
  };
  tableData = [];
  cardInfillRequest = [];
  orderIDValue;
  disablePortMoveSave = true;
  disableCardInfillSave = true;
  disablePortMoveSubmit = true;
  disableCardInfillSubmit = true;
  disableExportButton = false;
  cardInfillTableData = [];
  summaryData: any;
  ref: DynamicDialogRef;
  saveSucess = false;
  emailId;
  response = [];
  savePlanWithCardMove;
  orderId;
  orderStatus;
  cardInfill = false;
  portMoveList;
  cardInfillId;
  role;
  disableTable = false;

  constructor(private workflowService: WorkflowService, private orderIdService: OrderIdService,
              private appService: AppService, private utilityService: UtilityService,
              public dialogService: DialogService, private router: Router) {
    this.enableNOWorlflow$ = this.workflowService.enableNOWorlflow$.subscribe((workflow) => {
      if (workflow) {
        this.enableNOCardMoveWorkflow = workflow;
        this.activestatus = 5;
      }
    });

    this.orderIdService.cardInfillTableDataSend.subscribe(res => {
      if (res) {
        this.index = 0;
        this.cardInfill = true;
        this.cardInfillRequest = res;
      }
    });

    this.orderIdService.cardMovePage.subscribe(orderId => {
      this.orderIDValue = orderId;
    });

    this.orderIdService.cardMoveSummaryPage.subscribe((summaryData) => {
      if (summaryData) {
        this.summaryData = summaryData;
        this.disablePortMoveSave = summaryData.disablePortMoveSave;
        this.disableCardInfillSave = summaryData.disableCardInfillSave;
        this.disablePortMoveSubmit = summaryData.disablePortMoveSubmit;
        this.disableCardInfillSubmit = summaryData.disableCardInfillSubmit;
        this.disableExportButton = summaryData.disableExportBtn;
        this.cardInfillTableData = this.cardInfillTableData;
      }
    });

    this.orderIdService.emailIdSubscribe.subscribe(emailId => {
      this.emailId = emailId;
    });

    this.orderIdService.portMoveIdList.subscribe((portMoveList) => {
      this.portMoveList = portMoveList;
    });
  }

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.orderId = sessionStorage.getItem('orderId');
    this.orderStatus = sessionStorage.getItem('orderStatus');
    if (this.orderStatus !== null && this.orderStatus !== 'Uploaded') {
      this.disablePortMoveSave = true;
      this.disableCardInfillSave = true;
      this.disablePortMoveSubmit = true;
      this.disableCardInfillSubmit = true;
      this.disableExportButton = false;
      this.disableTable = true;
    } else {
      this.disableTable = false;
    }
    this.tableSettings.headers = staticTable;
    this.getTable();
    if (!this.cardInfillRequest) {
      this.getCardInfillTableByOrderId();
    }
    if (this.summaryData) {
      this.tableSettings.data = this.summaryData.cardInfillTableData;
    } else if (this.cardInfillRequest) {
      this.tableSettings.data = this.cardInfillRequest;
    }
    if (!this.summaryData && this.tableSettings.data.length) {
      this.disableCardInfillSave = false;
    }
  }

  ngOnChanges() {
    if (this.cardInfillRequest) {
      this.disableExportButton = true;
      this.disablePortMoveSave = true;
      this.disablePortMoveSubmit = true;
    } else {
      this.disableExportButton = false;
    }
  }

  getCardInfillTableByOrderId() {
    const orderId = this.orderId ? this.orderId : this.orderIDValue;
    const url = environment.base_url + 'capacity-planning-build/card-infill-data?order-id=' + orderId;
    this.appService.get(url).subscribe(res => {
      this.tableSettings.data = [];
      if (res.length > 0) {
        this.index = 0;
        this.cardInfill = true;
        this.cardInfillRequest = res;
      }
    });
  }

  emitsavecheck(event) {
    this.disablePortMoveSave = event;
  }

  /** Get Table data */
  getTable() {
    const orderId = this.orderId ? this.orderId : this.orderIDValue;
    const url = environment.no_Base_url + '/port-move/card-move-data?order-id=' + orderId;
    this.appService.get(url).subscribe(res => {
      res.data.portmoverespdata.forEach((data) => {
        const obj = {
          capacity_Required_Date: data.capacity_Required_Date ? data.capacity_Required_Date : null,
          portmoveid: data.portmoveid,
          source_Cardmodel: data.source_Cardmodel,
          source_Cardtype: data.source_Cardtype,
          source_Device: data.source_Device,
          source_Port: data.source_Port,
          source_SpecVersion: data.source_SpecVersion,
          target_Cardmodel: data.target_Cardmodel,
          target_Cardtype: data.target_Cardtype,
          target_Device: data.target_Device,
          target_Port: data.target_Port,
          target_Spec_Version: data.target_Spec_Version,
          fist_Project_No: data.fist_Project_No ? data.fist_Project_No : null,
          scheme_Driver: data.scheme_Driver ? data.scheme_Driver : null,
          orderId: res.data.orderId
        };
        this.tableData.push(obj);
      });
      this.tableData = JSON.parse(JSON.stringify(this.tableData));
    });
    this.workflowstatusenable();
  }

  deleteRow(portMoveIds) {
    const url = environment.no_Base_url + '/port-move/delete-port-move-data';
    this.appService.post(url, portMoveIds).subscribe(res => {
      portMoveIds.forEach((id) => {
        const index = this.tableData.findIndex(x => x.portmoveid === id);
        this.tableData.splice(index, 1);
        this.tableData = JSON.parse(JSON.stringify(this.tableData));
        this.deleteCardInfill(portMoveIds);
      });
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
    }, (err) => {
      this.utilityService.validateStatus(200, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  deleteCardInfill(portMoveIds) {
    if (this.cardInfill) {
      const url = environment.base_url + '/capacity-planning-build/card-infill-move-update?card-move-id=' + portMoveIds[0];
      this.appService.get(url).subscribe(res => {
        this.getCardInfillTableByOrderId();
      }, (err) => {
        this.utilityService.validateStatus(200, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
      });
    }
  }

  tabChange(e) {
    this.index = e.index;
  }

  workflowstatusenable() {
    const obj = {
      cardmoverequest: this.tableData,
      activestatus: this.activestatus,
      enableNextButton: this.enablenextbutton
    };
    setTimeout(() => {
      this.workflowService.status.next(obj);
    }, 100);
  }

  saveCBP() {
    const orderId = this.orderId ? this.orderId : this.orderIDValue;
    const url = environment.base_url + 'capacity-planning-build/save-plan';
    if (this.cardInfill) {
      this.cardInfillRequest[0]['cardMoveOrderId'] = orderId;
      this.cardInfillRequest[0]['cardMoveId'] = this.portMoveList[0];
      this.cardInfillRequest[0]['cardMoveEmailId'] = this.emailId;
    }
    this.appService.post(url, this.cardInfillRequest).subscribe((response) => {
      if (response.failedResult === true) {
        if (response.failedResponse) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < response.failedResponse.length; i++) {
            const val = response.failedResponse[i].reason.replace('[', '') + ' , Slot ID : ' + response.failedResponse[i].slotid;
            this.utilityService.validateStatus(400, val.replace(']', ''), 'error', 3000);
          }
        } else if (response.message) {
          this.utilityService.validateStatus(400, response.message, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      }
      if (response.successResult === true) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < response.response.length; i++) {
          this.savePlanWithCardMove = response.response[i];
          const message = CP_ERROR.STATUS_MESSAGES.THREED_PLAN_SAVED + ' , Slot ID : ' + response.response[i].slot;
          this.utilityService.validateStatus(200, message, CP_ERROR.SEVERITY.SUCCESS, 3000);
          this.getCardInfillTableById(response.response[i].id);
          this.cardInfillId = response.response[i].id;
          this.disableCardInfillSave = true;
          this.disableCardInfillSubmit = false;
        }
      }
    });
  }

  getCardInfillTableById(id) {
    const url1 = environment.base_url + 'capacity-planning-build/cbp-data?id=' + id
      + '&ein=' + this.appService.getEIN();
    this.appService.get(url1).subscribe((res) => {
      this.cardInfillTableData = [];
      const obj = {
        exCode: res.exCode,
        projectid: res.projectId,
        cpnumber: res.cpNumber,
        cpdate: res.cpDate,
        productType: res.productType,
        sneId: res.sneId,
        slot: res.slot,
        cardInfillType: res.cardInFillType,
        jobtype: res.jobType,
        portAvailability: res.portAvailability,
        status: res.status,
        id: res.id
      };
      this.response.push(res);
      this.cardInfillTableData.push(obj);
      this.tableSettings.data = JSON.parse(JSON.stringify(this.cardInfillTableData));
    });
  }

  submitCBP() {
    const url = environment.base_url + 'generic-header/grid-cbppopup-header';
    this.appService.get(url).subscribe(res => {
      const dummyJson = res;
      this.ref = this.dialogService.open(WfmtPopupComponent, {
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
            planList: this.response,
            commonValues: result
          };
          const url1 = environment.base_url + 'capacity-planning-build/wfmt-request';
          this.appService.post(url1, planWfmt).subscribe(response => {
            if (response[0].status === 'Success') {
              this.getCardInfillTableById(this.cardInfillTableData[0].id);
              this.disableCardInfillSubmit = true;
            }
          },
            (err) => {
              this.disableCardInfillSubmit = false;
              this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
            });
        }
      });
    });
  }

  saveCardMove() {
    const orderId = this.orderId ? this.orderId : this.orderIDValue;
    const portData = [];
    const url = environment.no_Base_url + '/port-move/card-move-validate-save';
    this.tableData.forEach((data) => {
      const portObj = {
        port_move_id: data.portmoveid,
        source_sne: data.source_Device,
        source_port: data.source_Port,
        source_card_type: data.source_Cardtype,
        source_card_model: data.source_Cardmodel,
        source_card_version: data.source_SpecVersion,
        destination_sne: data.target_Device,
        destination_port: data.target_Port,
        destination_card_type: data.target_Cardtype,
        destination_card_model: data.target_Cardmodel,
        destination_card_version: data.target_Spec_Version,
        capacity_Required_Date: data.capacity_Required_Date,
        fist_Project_No: data.fist_Project_No,
        scheme_Driver: data.scheme_Driver
      };
      portData.push(portObj);
    });
    const saveParams = {
      roCallRequestData: {
        orderId,
        emailId: this.emailId,
        fileName: '',
        cardinfill: this.cardInfill,
        requestData: portData
      }
    };
    this.appService.post(url, saveParams).subscribe(res => {
      if (res.message === 'CP Validations Errors') {
        this.utilityService.validateStatus(400, res.data.error[0], CP_ERROR.SEVERITY.ERROR, 3000);
        this.disablePortMoveSubmit = true;
        this.disablePortMoveSave = false;
        this.saveSucess = false;
      } else {
        this.disablePortMoveSubmit = false;
        this.disablePortMoveSave = true;
        this.saveSucess = true;
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.TABLE_RECORD, CP_ERROR.SEVERITY.SUCCESS, 3000);
      }
    }, (err) => {
      this.saveSucess = false;
      this.disablePortMoveSubmit = true;
      this.disablePortMoveSave = false;
      this.utilityService.validateStatus(err.status, err.error.message, CP_ERROR.SEVERITY.ERROR, 5000);
    });
  }

  submitCardMove() {
    /*capacity optimization plan*/
    const url = environment.no_Base_url + '/port-move/submit-port-move';
    const orderId = {
      orderId: this.orderIDValue
    };
    const button = document. querySelector('button');
    this.appService.post(url, orderId).subscribe(res => {
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS, 3000);
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }, (err) => {
      this.disablePortMoveSubmit = false;
      this.utilityService.validateStatus(err.status, err.error.data.error[0], CP_ERROR.SEVERITY.ERROR, 5000);
    });
  }

  exportCardMove() {
    const orderId = this.orderId ? this.orderId : this.orderIDValue;
    const url = environment.no_Base_url + '/port-move/card-move-all-details-csv-data?order-id=' + orderId;
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
