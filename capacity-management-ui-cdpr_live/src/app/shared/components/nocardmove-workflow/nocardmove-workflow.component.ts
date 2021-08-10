import { Component, OnDestroy , Output , Input, EventEmitter , OnChanges} from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Workflowfields } from '../../constants/workflow.constant';
import { AppService } from '../../services/app-service';
import { OrderIdService } from '../../services/order-id.service';
import { UtilityService } from '../../services/utility.service';
import { CP_ERROR } from '../../constants/error.constant';
import { environment } from '../../../../environments/environment';
/** No-cardmove-workflow component
 *  @author divya.rajasekar@bt.com
 */

@Component({
  selector: 'app-nocardmove-workflow',
  templateUrl: './nocardmove-workflow.component.html',
  styleUrls: ['./nocardmove-workflow.component.scss']
})
export class NocardmoveWorkflowComponent implements OnDestroy , OnChanges {
  status: Subscription;
  curentstatus = 0;
  workflow = false;
  isLeftDisabled = true;
  isRightDisabled = true;
  editmode = false;
  cardmoverequest;
  coreImage = false;
  satelitteImgae = false;
  workflowredirection = Workflowfields;
  sitename;
  sourcesneid;
  destinationsneid;
  code1141;
  sourceCardName;
  desCardName;
  cardInfillType;
  slotNumber;
  cardInfillSneid;
  destinationtype;
  enablecarddes = true;
  nextStatus;
  enableNextButton;
  @Output() prevcurrent = new EventEmitter();
  @Output() emitnextclick = new EventEmitter();
  @Input() prevvalue;
  type: string;
  @Input() enableapicall;
  @Input() disablenext;

  constructor(private workflowservice: WorkflowService, private router: Router,
              private appService: AppService, private orderIdService: OrderIdService,
              private utilityService: UtilityService) {
    this.workflowservice.enableNOWorlflow.next(true);
    this.status = this.workflowservice.status.subscribe((value) => {
      console.log(value, this.prevvalue);
      if (value) {
        this.enableNextButton = value.enableNextButton;
        this.curentstatus = value.activestatus;
        this.cardmoverequest = value.cardmoverequest;
        this.sourcesneid = this.cardmoverequest.sourceSneId;
        this.code1141 = this.cardmoverequest.code1141;
        this.sourceCardName = this.cardmoverequest.sourceCardName;
        this.destinationsneid = this.cardmoverequest.destinationSneId;
        this.desCardName = this.cardmoverequest.destinationCardName;
        if (this.curentstatus !== 0) {
          this.workflowstatus(this.curentstatus);
        }
        if (value.previousvalue !== undefined && value.previousvalue === 1) {
          this.loadPrevNextWorkflow(value.previousvalue);
        } else {
          this.loadPrevNextWorkflow(this.curentstatus);
        }
      }
    });
  }

  ngOnChanges() {
    if (this.enableapicall !== undefined && Object.keys(this.enableapicall).length !== 0) {
      this.cardMoveProceed();
    }
    if (this.disablenext) {
      this.isRightDisabled = true;
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
          // }
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
    if (status <= 1 || status === 5) {
      this.isLeftDisabled = true;
    } else {
      this.isLeftDisabled = false;
    }
    if (this.prevvalue < this.curentstatus || this.enableNextButton) {
      this.isRightDisabled = false;
    } else {
      this.isRightDisabled = true;
    }
  }

  prevNextWorkflow(type) {
    let nextStatus;
    const status =  this.curentstatus - 1;
    if (type === 'previous') {
      if (this.prevvalue) {
        nextStatus = this.prevvalue - 1;
      } else {
        nextStatus = this.curentstatus - 1;
      }
    } else if (type === 'next') {
      if (this.prevvalue) {
        nextStatus = this.prevvalue + 1;
      } else {
        nextStatus = this.curentstatus + 1;
      }
    }
    this.workflowservice.previousStatus.next(nextStatus);
    this.loadPrevNextWorkflow(nextStatus);
    if (nextStatus !== 5) {
      this.navigateNextPageByStatus(nextStatus, type , status);
    } else {
      this.emitnextclick.emit();
    }
  }

  navigateNextPageByStatus(nextStatus, type, status) {
    let url;
    if (nextStatus === 2 || nextStatus === 4) {
      url = 'chassis-viewer';
    } else if (nextStatus === 1 || nextStatus === 3) {
      url = 'three60-twod';
    }
    if (this.enableNextButton && type === 'next' && nextStatus !== 5) {
      this.router.navigate(['/' + url]);
    } else {
      this.navtigateyourl(url, nextStatus , status);
    }
  }

  navtigateyourl(navigateUrl, status , curstatus) {
    this.editmode = true;
    this.workflowredirection.workflowstatus = curstatus;
    if (status === 2) {
      if (this.cardmoverequest && this.cardmoverequest.sourceSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    if (status >= 4) {
      if (this.cardmoverequest && this.cardmoverequest.sourceSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    const obj = {
      editmode: this.editmode,
      currentstatus: curstatus,
      actualrequ: this.cardmoverequest,
      coreImage: this.coreImage,
      satelitteImgae: this.satelitteImgae,
      workflowredirection: this.workflowredirection,
      activeStatus: status,
      type: this.type
    };
    if (this.cardmoverequest && (status === 2 || status === 4 || status === 5)) {
      if (status <= 5) {
        this.workflowredirection.id = this.cardmoverequest.id;
        this.workflowredirection.siteName = this.cardmoverequest.siteName;
        this.workflowredirection.sourceSneId = this.cardmoverequest.sourceSneId;
        this.workflowredirection.sourceCardMtosiName = this.cardmoverequest.sourceCardMtosiName;
        this.workflowredirection.sourceCardId = this.cardmoverequest.sourceCardId;
        this.workflowredirection.sourceCardName = this.cardmoverequest.sourceCardName;
        this.workflowredirection.sourceSlot = this.cardmoverequest.sourceSlot;
        this.workflowredirection.sourceCardLevel = this.cardmoverequest.sourceCardLevel;
        this.workflowredirection.sourceCardType = this.cardmoverequest.sourceCardType;
        this.workflowredirection.sourcePortSpeed = this.cardmoverequest.sourcePortSpeed;
        this.workflowredirection.sourceCardUsedPortsCount = this.cardmoverequest.sourceCardUsedPortsCount;
        this.workflowredirection.sourceSatelliteShelf = this.cardmoverequest.sourceSatelliteShelf;
      }
      if (this.cardmoverequest && status === 4) {
        this.workflowredirection.destinationSneId = this.cardmoverequest.destinationSneId;
        this.workflowredirection.destinationCardName = this.cardmoverequest.destinationCardName;
        this.workflowredirection.destinationCardId = this.cardmoverequest.destinationCardId;
        this.workflowredirection.destinationCardMtosiName = this.cardmoverequest.destinationCardMtosiName;
        this.workflowredirection.destinationSlot = this.cardmoverequest.destinationSlot;
        this.workflowredirection.destinationCardLevel = this.cardmoverequest.destinationCardLevel;
        this.workflowredirection.destinationCardType = this.cardmoverequest.destinationCardType;
        this.workflowredirection.destinationCardFreePortCount = this.cardmoverequest.destinationFreePortCount;
        this.workflowredirection.free = this.cardmoverequest.free;
        this.workflowredirection.rackId = this.cardmoverequest.rackId;
        this.workflowredirection.rackPosition = this.cardmoverequest.rackPosition;
        this.workflowredirection.destinationPortSpeed = this.cardmoverequest.destinationPortSpeed;
        this.workflowredirection.destinationSatelliteShelf = this.cardmoverequest.destinationSatelliteShelf;
        if (this.cardmoverequest.cardInfillSavePlanRequest !== null && this.cardmoverequest.cardInfillSavePlanRequest.length !== 0) {
          this.workflowredirection.cardInfillSavePlanRequest = this.cardmoverequest.cardInfillSavePlanRequest;
        } else {
          this.workflowredirection.cardInfillSavePlanRequest = null;
        }
      }
      if (this.cardmoverequest && status === 5) {
        this.workflowredirection.destinationSneId = this.cardmoverequest.destinationSneId;
        this.workflowredirection.destinationCardName = this.cardmoverequest.destinationCardName;
        this.workflowredirection.destinationCardId = this.cardmoverequest.destinationCardId;
        this.workflowredirection.destinationCardMtosiName = this.cardmoverequest.destinationCardMtosiName;
        this.workflowredirection.destinationSlot = this.cardmoverequest.destinationSlot;
        this.workflowredirection.destinationCardLevel = this.cardmoverequest.destinationCardLevel;
        this.workflowredirection.destinationCardType = this.cardmoverequest.destinationCardType;
        this.workflowredirection.destinationPortSpeed = this.cardmoverequest.destinationPortSpeed;
        this.workflowredirection.destinationCardFreePortCount = this.cardmoverequest.destinationFreePortCount;
        this.workflowredirection.destinationSatelliteShelf = this.cardmoverequest.destinationSatelliteShelf;
        if (this.cardmoverequest.cardInfillSavePlanRequest !== null && this.cardmoverequest.cardInfillSavePlanRequest.length !== 0) {
          this.workflowredirection.cardInfillSavePlanRequest = this.cardmoverequest.cardInfillSavePlanRequest;
        } else {
          this.workflowredirection.cardInfillSavePlanRequest = null;
        }
        this.workflowredirection.free = this.cardmoverequest.free;
        this.workflowredirection.rackId = this.cardmoverequest.rackId;
        this.workflowredirection.rackPosition = this.cardmoverequest.rackPosition;
      }
      this.workflowservice.workflowtopage3d.next(obj);
    }
    if (this.cardmoverequest && (status === 1 || status === 3)) {
      if (status <= 3) {
        this.workflowredirection.id = this.cardmoverequest.id;
        this.workflowredirection.siteName = this.cardmoverequest.siteName;
        this.workflowredirection.sourceSneId = this.cardmoverequest.sourceSneId;
        this.workflowredirection.sourceSatelliteShelf = this.cardmoverequest.sourceSatelliteShelf;

        if (status === 3) {
          this.workflowredirection.id = this.cardmoverequest.id;
          this.workflowredirection.siteName = this.cardmoverequest.siteName;
          this.workflowredirection.sourceSneId = this.cardmoverequest.sourceSneId;
          this.workflowredirection.sourceCardMtosiName = this.cardmoverequest.sourceCardMtosiName;
          this.workflowredirection.sourceCardId = this.cardmoverequest.sourceCardId;
          this.workflowredirection.sourceCardName = this.cardmoverequest.sourceCardName;
          this.workflowredirection.sourceSlot = this.cardmoverequest.sourceSlot;
          this.workflowredirection.sourceCardLevel = this.cardmoverequest.sourceCardLevel;
          this.workflowredirection.sourceCardType = this.cardmoverequest.sourceCardType;
          this.workflowredirection.sourceCardUsedPortsCount = this.cardmoverequest.sourceCardUsedPortsCount;
          this.workflowredirection.sourcePortSpeed = this.cardmoverequest.sourcePortSpeed;
          this.workflowredirection.destinationSneId = this.cardmoverequest.destinationSneId;
          this.workflowredirection.destinationSatelliteShelf = this.cardmoverequest.destinationSatelliteShelf;
        }
      }
      this.workflowservice.workflowtopage360.next(obj);
    }
    this.workflowservice.enableNOWorlflow.next(true);
    this.router.navigate(['/' + navigateUrl]);
  }

  cardMoveProceed() {
    let reqObj;
    let portMoveId = [];
    this.orderIdService.portMoveObj.subscribe(requestObj => {
      reqObj = requestObj;
    });
    const params = {
      url: environment.no_Base_url + '/port-move/card-move-proceed',
      request: reqObj
    };
    this.appService.requestWithParams(params).subscribe((res) => {
      portMoveId = [];
      this.orderIdService.OrderIdFun(res.data.orderId);
      res.data.backHaulData.forEach((data) => {
        portMoveId.push(data.port_move_id);
      });
      this.orderIdService.setPortMoveIdList(portMoveId);
      this.orderIdService.emailIdPass(reqObj.roCallRequestData.emailId);
      this.router.navigate(['/network-cardmove-overview']);
    }, (err) => {
      this.utilityService.validateStatus(err.status, err.error.data.error[0], CP_ERROR.SEVERITY.ERROR, 5000);
      this.isRightDisabled = true;
      this.curentstatus = 4;
      this.prevvalue = 4;
    });
  }

  ngOnDestroy() {
    if (!this.editmode) {
      this.workflowservice.workflowtopage3d.next(null);
      this.workflowservice.workflowtopage360.next(null);
    }
  }
}
