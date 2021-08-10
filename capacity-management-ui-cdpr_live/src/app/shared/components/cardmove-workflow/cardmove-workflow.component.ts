import { Component, OnInit , OnDestroy } from '@angular/core';
import { WorkflowService } from '../../services/workflow.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Workflowfields } from '../../constants/workflow.constant';
/** card move workflow component
 *  @author vijayalakshmi.t@bt.com
 */

@Component({
  selector: 'app-cardmove-workflow',
  templateUrl: './cardmove-workflow.component.html',
  styleUrls: ['./cardmove-workflow.component.scss']
})
export class CardmoveWorkflowComponent implements OnInit , OnDestroy {
  status: Subscription;
  curentstatus = 0;
  editmode;
  cardmoverequest;
  coreImage = false;
  satelitteImgae = false;
  workflowredirection = Workflowfields;
  workflow = false;
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
  constructor(private workflowservice: WorkflowService, private router: Router) {
    this.workflowservice.enableworlflow.next(true);
    this.status = this.workflowservice.status.subscribe((value) => {
      console.log('API value', value);
      if (value) {
        this.curentstatus = value.activestatus;
        this.cardmoverequest = value.cardmoverequest;
        this.sitename = this.cardmoverequest.siteName;
        this.sourcesneid = this.cardmoverequest.sourceSneId;
        this.code1141 = this.cardmoverequest.code1141;
        this.sourceCardName = this.cardmoverequest.sourceCardName;
        this.destinationsneid = this.cardmoverequest.destinationSneId;
        this.desCardName = this.cardmoverequest.destinationCardName;
        this.destinationtype = this.cardmoverequest.destinationCardType;
        if (this.cardmoverequest.cardInfillSavePlanRequest !== null && this.cardmoverequest.cardInfillSavePlanRequest.length !== 0) {
          this.cardInfillType = this.cardmoverequest.cardInfillSavePlanRequest[0].cardInfillType;
          this.slotNumber = this.cardmoverequest.cardInfillSavePlanRequest[0].slotNumber;
          this.cardInfillSneid = this.cardmoverequest.cardInfillSavePlanRequest[0].sneId;
        }
        if (this.curentstatus !== 0) {
          this.workflowstatus(this.curentstatus);
        }
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.workflowservice.status.next(null);
    if (!this.editmode) {
      this.workflowservice.workflowtopage3d.next(null);
      this.workflowservice.workflowtopage360.next(null);
    }
    if (this.status) {
      this.status.unsubscribe();
    }
  }
  navtigateyourl(navigateUrl, status) {
    console.log('flowchecked');
    this.editmode = true;
    this.workflowredirection.workflowstatus = this.cardmoverequest.workflowstatus;
    if (status === 2) {
      if (this.cardmoverequest.sourceSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    if (status >= 4) {
      if (this.cardmoverequest.sourceSatelliteShelf > 0) {
        this.satelitteImgae = true;
      } else {
        this.coreImage = true;
      }
    }
    const obj = {
      editmode: true,
      currentstatus: status,
      actualrequ: this.cardmoverequest,
      coreImage: this.coreImage,
      satelitteImgae : this.satelitteImgae,
      workflowredirection: this.workflowredirection
    };
    if (status === 2 || status === 4 || status === 5) {
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
      if (status === 4) {
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
        if (this.cardmoverequest.cardInfillSavePlanRequest !== null && this.cardmoverequest.cardInfillSavePlanRequest.length !== 0 ) {
          this.workflowredirection.cardInfillSavePlanRequest = this.cardmoverequest.cardInfillSavePlanRequest;
        } else {
          this.workflowredirection.cardInfillSavePlanRequest = null;
        }
      }
      if (status === 5) {
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
    if (status === 1 || status === 3) {
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
    console.log(this.workflowredirection);
    this.router.navigate(['/' + navigateUrl]);
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
}
