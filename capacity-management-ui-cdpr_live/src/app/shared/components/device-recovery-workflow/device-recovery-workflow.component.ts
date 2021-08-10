import { Component, Input , Output , EventEmitter ,OnChanges} from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from '../../services/app-service';
import { OrderIdService } from '../../services/order-id.service';
import { UtilityService } from '../../services/utility.service';
import { CP_ERROR } from '../../constants/error.constant';
import { DeviceRecovery } from '../../constants/device-recovery.constant';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-device-recovery-workflow',
  templateUrl: './device-recovery-workflow.component.html',
  styleUrls: ['./device-recovery-workflow.component.scss']
})
export class DeviceRecoveryWorkflowComponent implements OnChanges{
  isLeftDisabled = true;
  isRightDisabled = true;
  status: Subscription;
  enableNextButton;
  currentstatus = 0;
  deviceRecoveryRequest;
  workflowredirection = DeviceRecovery;
  @Input() prevvalue;
  @Input() enableapicall;
  @Input() disablenext;
  @Output() emitnextclick = new EventEmitter();
  orderId = [];
  editmode = false;
  coreImage = false;
  satelitteImgae = false;

  constructor(private workflowservice: WorkflowService, private router: Router,
              private appService: AppService, private orderIdService: OrderIdService,
              private utilityService: UtilityService) {
    this.workflowservice.enableDeviceRecoveryWorkflow.next(true);
    this.status = this.workflowservice.deviceRecoveryStatus.subscribe((value) => {
      if (value) {
        console.log(value);
        this.enableNextButton = value.enableNextButton;
        this.currentstatus = value.activestatus;
        this.deviceRecoveryRequest = value.deviceRecovery;

        if (value.orderId.length > 0) {
          this.arraycheck(value.orderId);
        }
        if (this.currentstatus !== 0) {
          this.workflowstatus(this.currentstatus);
        }
        if (value.previousvalue !== undefined && value.previousvalue === 1) {
          this.loadPrevNextWorkflow(value.previousvalue);
        } else {
          this.loadPrevNextWorkflow(this.currentstatus);
        }
      }
    });
  }
  ngOnChanges() {
    if (this.enableapicall !== undefined && Object.keys(this.enableapicall).length !== 0) {
        this.callProceedAPI();
    }
    if (this.disablenext) {
      this.isRightDisabled = true;
    }
  }
  arraycheck(array) {
    for (const value of array) {
      if (Array.isArray(value)) {
        this.arraycheck(value);
      } else {
        if (this.orderId.indexOf(value) === -1) {
          this.orderId.push(value);
        }
      }
    }
  }
  workflowstatus(status) {
    const disable = document.getElementsByClassName('workflow');
    for (let i = 0; i < status; i++) {
      if (i < (status - 1)) {
        if (disable[i].classList.contains('success')) {
          disable[i].classList.add('disabled');
          disable[i].classList.remove('success');
        }
        if (disable[i].classList.contains('active') || disable[i].classList.contains('disabled')) {
          disable[i].classList.add('success');
          disable[i].classList.remove('active');
          disable[i].classList.remove('disabled');
        }
      }
      if (status <= disable.length) {
        if (i === (status - 1)) {
          if (disable[i].classList.contains('disabled') || disable[i].classList.contains('success')) {
            disable[i].classList.add('active');
            disable[i].classList.remove('disabled');
            disable[i].classList.remove('success');
          }
          for (let j = i + 1; j < disable.length; j++) {
            if (disable[j].classList.contains('success') || disable[i].classList.contains('active')) {
              disable[j].classList.add('disabled');
              disable[j].classList.remove('success');
              disable[j].classList.remove('active');
            }
          }
        }
      }
    }
  }

  loadPrevNextWorkflow(status) {
    if (status <= 1 || status === 3) {
      this.isLeftDisabled = true;
    } else {
      this.isLeftDisabled = false;
    }
    if (this.prevvalue < this.currentstatus || this.enableNextButton) {
      this.isRightDisabled = false;
    } else {
      this.isRightDisabled = true;
    }
  }

  prevNextWorkflow(type) {
    let nextStatus;
    const status =  this.currentstatus - 1;
    if (type === 'previous') {
      if (this.prevvalue) {
        nextStatus = this.prevvalue - 1;
      } else {
        nextStatus = this.currentstatus - 1;
      }
    } else if (type === 'next') {
      if (this.prevvalue) {
        nextStatus = this.prevvalue + 1;
      } else {
        nextStatus = this.currentstatus + 1;
      }
    }
    this.workflowservice.previousStatus.next(nextStatus);
    this.loadPrevNextWorkflow(nextStatus);
    if (nextStatus !== 3) {
      this.navigateNextPageByStatus(nextStatus, type , status);
    } else {
      this.emitnextclick.emit();
    }
  }

  navigateNextPageByStatus(nextStatus, type, status) {
    let url;
    if (nextStatus === 2) {
      url = 'chassis-viewer';
    } else if (nextStatus === 1) {
      url = 'three60-twod';
    }
    if (this.enableNextButton && type === 'next' && nextStatus !== 3) {
      this.router.navigate(['/' + url]);
    } else {
      this.navtigateyourl(url, nextStatus , status);
    }
  }

  navtigateyourl(navigateUrl, status , curstatus) {    ;
    this.editmode = true;
    this.workflowredirection.workflowStatus = curstatus;
    if (status === 2) {
      if (this.deviceRecoveryRequest && this.deviceRecoveryRequest.deviceSatelliteShelfIndex > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    const obj = {
      editmode: this.editmode,
      currentstatus: curstatus,
      actualrequ: this.deviceRecoveryRequest,
      coreImage: this.coreImage,
      satelitteImgae: this.satelitteImgae,
      workflowredirection: this.workflowredirection,
      activeStatus: status,
    };

    if (this.deviceRecoveryRequest && status === 2) {
      this.workflowredirection.siteName = this.deviceRecoveryRequest.siteName;
      this.workflowredirection.deviceSneId = this.deviceRecoveryRequest.deviceSneId;
      this.workflowredirection.holderName = this.deviceRecoveryRequest.holder;
      this.workflowredirection.ejectDeviceId = this.deviceRecoveryRequest.ejectDeviceId;
      this.workflowredirection.deviceSatelliteShelfIndex = this.deviceRecoveryRequest.deviceSatelliteShelfIndex;
      this.workflowservice.workflowtopage3d.next(obj);
    }
    if (this.deviceRecoveryRequest && status === 1) {
      this.workflowredirection.siteName = this.deviceRecoveryRequest.siteName;
      this.workflowredirection.deviceSneId = this.deviceRecoveryRequest.deviceSneId;
      this.workflowredirection.deviceSatelliteShelfIndex = this.deviceRecoveryRequest.deviceSatelliteShelfIndex;
      this.workflowservice.workflowtopage360.next(obj);
    }
    this.workflowservice.enableDeviceRecoveryWorkflow.next(true);
    this.router.navigate(['/' + navigateUrl]);
  }

  callProceedAPI() {
    this.formRequestObject();
  }

  formRequestObject() {
    let orderId = null;
    const showErr = [true, true, true, true, true, true, true, true, false];
    const holderObj = [];
    this.orderId.forEach((orderData) => {
      // tslint:disable-next-line:radix
      if (orderData.sneId === parseInt(this.deviceRecoveryRequest.deviceSneId)) {
        orderId = orderData.orderId;
      } else {
        orderId = null;
      }
    });
    this.deviceRecoveryRequest.holderName.forEach((value) => {
      const cardObj = {
        showErr,
        sne_Id: this.deviceRecoveryRequest.deviceSneId,
        holder: value,
        recovery_type: this.deviceRecoveryRequest.RecoveryType,
        fist_Project_No: null,
        scheme_Driver: null,
        capacity_Required_Date: null,
        physical_Connector_Removal: null,
        rack_Recovery: null,
        network_Change: null,
        auto_Progression: null
      };
      holderObj.push(cardObj);
    });
    const obj = {
      roCallSneRequestData: {
        isUploadAction: false,
        functionName: 'Recover SNE Update',
        emailId: this.deviceRecoveryRequest.emailId,
        fileName: null,
        projectId: null,
        messageId: null,
        version: null,
        orderId,
        sneRequestData: holderObj
      }
    };
    const requestPayload = [];
    requestPayload.push(obj);
    const url = environment.no_Base_url + '/device-recovery/save-recover-device-data?type=360';
    this.appService.post(url, requestPayload).subscribe(response => {
      const recoverSNEList = [];
      if (orderId === null) {
        const orderObj = {sneId: response[0].data.recoverSnesData[0].sne_Id, orderId: response[0].data.orderId};
        this.orderId.push(orderObj);
      }
      if (this.orderId.length) {
        this.orderIdService.OrderIdFun(this.orderId);
        this.router.navigate(['/sne-recovery-overview']);
      }
      response[0].data.recoverSnesData.forEach((recoverData) => {
        recoverSNEList.push(recoverData.recover_Sne_Id);
      });
      this.orderIdService.setRecoverSneList(recoverSNEList);
      this.orderIdService.emailIdPass(this.deviceRecoveryRequest.emailId);
    }, (err) => {
      this.utilityService.validateStatus(400, err.error.message, CP_ERROR.SEVERITY.ERROR, 3000);
      this.isRightDisabled = true;
      this.currentstatus = 2;
      this.prevvalue = 2;
    });
  }
}
