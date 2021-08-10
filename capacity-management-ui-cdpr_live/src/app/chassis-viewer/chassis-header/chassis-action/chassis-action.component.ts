import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../shared/services/app-service';
import { environment } from '../../../../environments/environment';
import { UtilityService } from '../../../shared/services/utility.service';
import { CP_ERROR } from '../../../shared/constants/error.constant';
import { truncate } from 'fs';
/** Chassis action component is to perform reservation/unreservation/usage/plan
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-action',
  templateUrl: './chassis-action.component.html',
  styleUrls: ['./chassis-action.component.scss']
})
export class ChassisActionComponent implements OnInit, OnChanges {
  /** deviceInfo to perform action */
  @Input() deviceInfo;
  /** defaultInfo to perform action */
  @Input() defaultInfo;
  /** disable/enable all the action */
  @Input() clearActionListArray;
  /** selected sneId */
  @Input() sneId;
  /** selected siteName */
  @Input() siteName;
  @Input() cardmoverequest;
  @Input() clearAllplanvalue;
  /** change the boolean value when there is a change in navigator and device */
  @Input() deviceChangeEvent;
  @Input() cardmoveedit;
  @Input() actiondisable;
  @Input() workflow;
  @Input() planname;
  @Input() cardmoveplan;
  @Input() selectionDetails;
  @Input() requestData;
  @Input() enableplanwindow;
  @Input() cardInfillFlow;
  @Input() demandId;
  @Input() selectedPlanDetails;
  @Input() showEthernet;
  @Input() deltavalue;
  @Input() productType;
  @Input() originaldeltavalue;
  @Input() originalDelta;
  @Input() savedplanincardinfill;
  /** Emit value when action is completed */
  @Output() resetImgData = new EventEmitter();
  @Output() saveworkflow = new EventEmitter();
  @Output() closeplanforcm = new EventEmitter();
  @Output() planSaveApi = new EventEmitter();
  @Output() planEditInCardmove = new EventEmitter();
  @Output() opencufpopup = new EventEmitter();
  /** showLeft pane based on action dropdown selection */
  showLeftPane: string;
  /** store userType */
  userType: string;
  /** store emailId */
  @Input() emailId;
  /** array contains selected free portId */
  portsAvailable = [];
  /** array contains selected reserved portId */
  unReserve = [];
  /** array contains selected cardId */
  cardAvailable = [];
  /** array contains selected level1/2 cardId */
  plancardavialbel = [];
  /** array contains selected holder id */
  planholderavialbel = [];
  /** array contains selected used portId */
  usedPort = [];
  /** array contains selected physical port */
  physicalportcuf = [];
  /** array contains selected level3 cardId */
  level3 = [];
  /** disable unreserve option by default */
  unReserveDashBtn = false;
  /** disable reservetion option by default */
  reservationBtn = false;
  /** disable usage option by default */
  cufBtn = false;
  /** disable plan option by default */
  planBtn = false;
  /** showleft pane false by default */
  display = false;
  /** create object for service */
  cardmoveleftpanel;
  /** count of inflight port */
  inflightportcount = 0;
  /** inflight pot array */
  inflightportarr = [];
  enablemove = true;
  actiondropdowndisable = false;
  setleftnavheight = false;
  satelliteShelfPlan = false;
  cardName = [];
  portId = [];
  cardFriendlyArray = [];
  @Input() CPMType;
  @Input() activeObjects;
  @Input() SASPlan;
  @Input() deviceVersion;
  existingPortSelection = [];
  @Input() enableNOCardMoveWorkflow;
  @Input() showhidecuf = false;
  @Input() opencufinflightpopup;
  @Output() nextWorkflow = new EventEmitter();
  @Input() enableRecoveryWorkflow;
  recoveryBtn = false;
  @Output() emitRecovery = new EventEmitter();
  constructor(private appService: AppService, private utilityService: UtilityService) { }

  /** set userType and emailId on load */
  ngOnInit() {
    const roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    if (roleName === 'PROD_CE_ADMIN') {
      this.userType = 'ADMIN';
    } else {
      this.userType = 'USER';
    }
  }

  /** based on selection enable/disable action dropdown values */
  ngOnChanges() {
    if (this.deviceInfo && !this.showhidecuf) {
      const info = this.deviceInfo;
      if (info.info.Type === 'PhysicalPort') {
        const portselection = { Port_ID: info.info.id, Port_Name: info.info.Name };
        const value = this.physicalportcuf.map(id => id.Port_ID);
        const index = value.indexOf(info.info.id);
        if (info.model.status === 3) {
          if (index === -1) {
            this.inflightportcount = + 1;
          } else {
            this.inflightportcount -= 1;
          }
        }
        if (index === -1) {
          this.physicalportcuf.push(portselection);
        } else {
          this.physicalportcuf.splice(index, 1);
        }
      }
      if (info.info.Type === 'PhysicalPort' && info.model.status === 0 || info.info.Type === 'PhysicalPort'
        && info.model.status === 4 || info.info.Type === 'PhysicalPort' && info.model.status === 5) { // free
        const portav = { Port_ID: info.info.id, Port_Name: info.info.Name, MTOSIName: info.info.MTOSIName };
        const value = this.portsAvailable.map(id => id.Port_ID);
        const index = value.indexOf(info.info.id);
        if (index === -1) {
          this.portsAvailable.push(portav);
        } else {
          this.portsAvailable.splice(index, 1);
        }
        const friendlyName = {
          id: info.info.id,
          name: this.deviceInfo.model.cardFriendlyName
        };

        const cardnameval = this.cardName.map(id => id.id);
        const indexcardname = cardnameval.indexOf(info.info.id);


        if (indexcardname === -1) {
          this.cardName.push(friendlyName);
          // if(this.cardName.filter(m => m.id == info.info.id ).length == 0){
          //   this.cardName.push(friendlyName)
        } else {
          this.cardName.splice(indexcardname, 1);
        }
        console.log(this.cardName, 'SullectedCard Name List');
      } else if (info.info.Type === 'PhysicalPort' && info.model.status === 1) { // used
        const portav = { Port_ID: info.info.id, Port_Name: info.info.Name };
        const value = this.usedPort.map(id => id.Port_ID);
        const index = value.indexOf(info.info.id);
        if (index === -1) {
          this.usedPort.push(portav);
        } else {
          this.usedPort.splice(index, 1);
        }
      } else if (info.info.Type === 'PhysicalPort' && info.model.status === 2) { // unreserve
        const portav = { Port_ID: info.info.id, Port_Name: info.info.Name };
        const value = this.unReserve.map(id => id.Port_ID);
        const index = value.indexOf(info.info.id);
        if (index === -1) {
          this.unReserve.push(portav);
        } else {
          this.unReserve.splice(index, 1);
        }
      } else if (info.info.Type === 'Card') { // card
        const cardav = { Card_Details: info.model.id, Port_Name: info.info.Name };
        const value = this.cardAvailable.map(id => id.Card_Details);
        const valueplan = this.plancardavialbel.map(id => id.Card_Details);
        const index = value.indexOf(info.model.id);
        const indexplan = valueplan.indexOf(info.model.id);
        if (indexplan === -1) {
          if ((info.info.Level === 'Level2' && info.info['Spec Name'] !== 'Switch Fabric /CPU  Module')
            || (info.info.Level === 'Level1' && info.info['Spec Name'] !== 'Switch Fabric /CPU  Module')) {
            this.plancardavialbel.push(cardav);
          }
        } else {
          this.plancardavialbel.splice(index, 1);
        }
        if (index === -1) {
          this.cardAvailable.push(cardav);
        } else {
          this.cardAvailable.splice(index, 1);
        }
      } else if (info.info.Type === 'Holder') { // card
        const cardav = { Card_Details: info.info.MTOSIName };
        const value = this.planholderavialbel.map(id => id.Card_Details);
        const index = value.indexOf(info.info.MTOSIName);
        if (index === -1) {
          this.planholderavialbel.push(cardav);
        } else {
          this.planholderavialbel.splice(index, 1);
        }
      } else if (info.info.Level === 'Level3') {
        const cardav = { Card_Details: info.info.MTOSIName };
        const value = this.level3.map(id => id.Card_Details);
        const index = value.indexOf(info.info.MTOSIName);
        if (index === -1) {
          if (!this.workflow && !this.enableNOCardMoveWorkflow && !this.enableRecoveryWorkflow) {
            this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.THREED_EDIT_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
          }
          this.level3.push(cardav);
        } else {
          this.level3.splice(index, 1);
        }
      }
      if (!this.workflow) {
        this.enableActionList();
      }
    }

    if (this.clearActionListArray) {

      this.portsAvailable = [];
      this.unReserve = [];
      this.cardAvailable = [];
      this.plancardavialbel = [];
      this.planholderavialbel = [];
      this.usedPort = [];
      this.level3 = [];
      this.cardName = [];
      this.unReserveDashBtn = false;
      this.reservationBtn = false;
      this.cufBtn = false;
      this.planBtn = false;
      this.physicalportcuf = [];
      this.inflightportcount = 0;
      this.cardName = [];
      this.physicalportcuf = [];
      this.inflightportcount = 0;
    }
    if (this.enableplanwindow) {
      this.display = this.enableplanwindow;
      this.showLeftPane = 'plan';
      if ((this.workflow || this.enableNOCardMoveWorkflow) && this.cardmoverequest.destinationCardType === 'Holder') {
        this.enablemove = true;
        this.setleftnavheight = false;
      } else {
        this.enablemove = false;
        this.setleftnavheight = true;
      }
    } else {
      this.display = this.enableplanwindow;
    }
    if (this.opencufinflightpopup === 1) {
      this.showsidenav('usage');
    }
  }

  /** should call when action is clicked */
  showsidenav(type) {
    if (type === 'unreservation' && this.userType === 'ADMIN') {
      this.showLeftPane = type;
      this.display = false;
    } else if (type === 'recovery') {
      this.emitRecovery.emit();
    } else {
      this.showLeftPane = type;
      this.display = false;
      setTimeout(() => {
        this.display = true;
      }, 0);
    }
    this.actiondropdowndisable = true;
  }
  enabledropdown() {
    this.actiondropdowndisable = false;
  }
  showarmovenav(type) {
    const info = this.deviceInfo;
    if (this.workflow) {
      this.cardmoveleftpanel = type;
      this.showLeftPane = 'plan';
      if (this.cardmoveleftpanel === 'Move') {
        this.enablemove = false;
        this.setleftnavheight = true;
      } else if (this.cardmoveleftpanel === 'Plan & Move') {
        this.enablemove = true;
        this.setleftnavheight = false;
      }
      // this.display = true;
    }
    this.saveworkflow.emit();
  }

  closeUnreserve() {
    this.showLeftPane = '';
  }
  /** should call when close icon is clicked */
  closeSideNav() {
    this.display = false;
    this.enableplanwindow = false;
    this.closeplanforcm.emit();
  }

  emitSaveApi(event) {
    this.planSaveApi.emit(event);
  }
  editPlanCardmove(event) {
    this.planEditInCardmove.emit(event);
  }
  /** enable/disable action dropdown values */
  enableActionList() {
    if (this.userType === 'ADMIN') {
      if (this.unReserve.length !== 0 && this.portsAvailable.length === 0 && this.plancardavialbel.length === 0 &&
        this.planholderavialbel.length === 0 && this.cardAvailable.length === 0 && this.usedPort.length === 0
        && !this.enableRecoveryWorkflow) {
        this.unReserveDashBtn = true;
      } else {
        this.unReserveDashBtn = false;
      }
      if (((this.plancardavialbel.length === 1 && this.planholderavialbel.length === 0) ||
        (this.plancardavialbel.length === 0 && this.planholderavialbel.length === 1)) &&
        this.portsAvailable.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && !this.enableRecoveryWorkflow) {
        this.planBtn = true;
        this.SASPlan = false;
      } else {
        this.planBtn = false;
      }
      if ((this.portsAvailable.length !== 0 || this.plancardavialbel.length !== 0 || this.cardAvailable.length !== 0)
        && this.planholderavialbel.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && !this.enableRecoveryWorkflow) {
        this.reservationBtn = true;
      } else {
        this.reservationBtn = false;
      }

      if ((this.plancardavialbel.length !== 0 || this.cardAvailable.length !== 0 || this.level3.length !== 0)
        && this.planholderavialbel.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && this.portsAvailable.length === 0 && this.enableRecoveryWorkflow) {
        this.validateRecovery();
      } else {
        this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.RECOVERY_INVALID_SELECTION, CP_ERROR.SEVERITY.ERROR, 3000);
        this.recoveryBtn = false;
      }

      const portCount = this.portsAvailable.length;
      const cardNames = this.cardName.map(x => x.name);

      let validationSuccess = false;
      if (portCount === 4 && this.plancardavialbel.length === 0
        && this.cardAvailable.length === 0 && this.planholderavialbel.length === 0 && this.unReserve.length === 0
        && this.usedPort.length === 0 && this.showEthernet) {
        const cardFriendlyArray = [...new Set(cardNames)];

        if (cardFriendlyArray.length === 1) {
          if (cardFriendlyArray[0] === 'IMM20' || cardFriendlyArray[0] === 'IMM12' || cardFriendlyArray[0] === 'IMM12(5)') {
            validationSuccess = this.validateSatelliteShelf();
          }
        }
        if (cardFriendlyArray.length === 2) {
          if (cardFriendlyArray[0] === 'IMM20' || cardFriendlyArray[0] === 'IMM12' || cardFriendlyArray[0] === 'IMM12(5)') {
            if (cardFriendlyArray[1] === 'IMM20' || cardFriendlyArray[1] === 'IMM12' || cardFriendlyArray[1] === 'IMM12(5)') {
              validationSuccess = this.validateSatelliteShelf();
            }
          }
        }
        if (validationSuccess) {
          this.satelliteShelfPlan = true;
          console.log('validationSuccess is pass');
        }

      } else {
        this.satelliteShelfPlan = false;
      }

    } else if (this.userType === 'USER') {
      if (this.unReserve.length === 1 && this.portsAvailable.length === 0 && this.plancardavialbel.length === 0 &&
        this.planholderavialbel.length === 0 && this.cardAvailable.length === 0 && this.usedPort.length === 0 &&
        !this.enableRecoveryWorkflow) {
        this.unReserveDashBtn = true;
      } else {
        this.unReserveDashBtn = false;
      }
      if (((this.plancardavialbel.length === 1 && this.planholderavialbel.length === 0) ||
        (this.plancardavialbel.length === 0 && this.planholderavialbel.length === 1)) &&
        this.portsAvailable.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && !this.enableRecoveryWorkflow) {
        this.planBtn = true;
      } else {
        this.planBtn = false;
      }
      if (this.portsAvailable.length !== 0 && this.plancardavialbel.length === 0 && this.cardAvailable.length === 0
        && this.planholderavialbel.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && !this.enableRecoveryWorkflow) {
        this.reservationBtn = true;
      } else {
        this.reservationBtn = false;
      }
      if ((this.plancardavialbel.length !== 0 || this.cardAvailable.length !== 0 || this.level3.length !== 0)
        && this.planholderavialbel.length === 0 && this.unReserve.length === 0 && this.usedPort.length === 0
        && this.portsAvailable.length === 0 && this.enableRecoveryWorkflow) {
        this.validateRecovery();
      } else {
        this.recoveryBtn = false;
      }
    }
    if (!this.enableRecoveryWorkflow) {
      if ((this.physicalportcuf.length >= 1 && this.cardAvailable.length === 0 && this.plancardavialbel.length === 0
        && this.level3.length === 0 && this.planholderavialbel.length === 0) ||
        (this.physicalportcuf.length === 0 && this.cardAvailable.length === 1 && this.level3.length === 0 &&
          this.planholderavialbel.length === 0)) {
        this.cufBtn = true;
      } else {
        this.cufBtn = false;
      }
    }
  }

  validateSatelliteShelfPort() {

    this.SASPlan = false;
    const validationSuccess = this.validateSatelliteShelf();
    if (validationSuccess) {
      const portCount = this.portsAvailable.length;
      if (portCount === 4) {
        this.validateSAS4();
      }
    } else {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }
  validateSAS2() {
    let validationSuccess = false;
    let slotId = 0;
    this.activeObjects.forEach((value) => {
      const portId = value['object'].info.info.Name;
      if (portId.charAt(0) !== slotId) {
        slotId = portId.charAt(0);
        validationSuccess = true;
      } else {
        validationSuccess = false;
      }
    });
    if (validationSuccess) {
      this.loadSASRequestData();
      this.showsidenav('plan');
    } else {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }

  validateSAS3() {
    const portId = [];
    this.activeObjects.forEach((value) => {
      portId.push(value['object'].info.info.Name);
    });
    this.existingPortSelection.forEach((value) => {
      portId.push(value);
    });
    this.validateDuplicatePort(portId);
  }

  validateSAS4() {
    this.portId = [];

    this.activeObjects.forEach((value) => {
      this.portId.push(value['object'].info.info.Name);
    });
    this.validateDuplicatePort(this.portId);
  }

  validateDuplicatePort(portId) {
    const value = (portId.length === new Set(portId).size);
    if (value) {
      this.validateSASSlot(portId);
    } else {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }

  validateSASSlot(portId) {

    // validating only 2 ports should select from both side

    const m = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < portId.length; i++) {
      m.push(portId[i].split('/')[0]);
    }

    const dx = m.reduce((acc, cur) => {
      acc[cur] ? acc[cur]++ : acc[cur] = 1;
      return acc;
    }, {});
    const keycount = Object.keys(dx);
    if (keycount.length === 2 && dx[keycount[0]] === 2) {
      if (dx[keycount[0]] === dx[keycount[1]]) {
        const validationSuccess = this.validateSASPort(portId);
        if (!validationSuccess) {
          this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        } else {
          this.showsidenav('plan');
          this.loadSASRequestData();
        }
      }
    } else {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }
  validateSASPort(portId): boolean {

    let sameslot = [];
    let validationSuccess = true;
    portId.forEach((index) => {
      let value = true;
      const cardDetail = index.substring(0, 3);
      sameslot = portId.filter(element => (element.substring(0, 3) === cardDetail));
      if (sameslot.length === 1) {
        value = true;
      } else if (sameslot.length === 2
      ) {
        value = true;
      } else {
        value = false;
      }
      validationSuccess = (validationSuccess && value);
    });
    return validationSuccess;
  }

  loadSASRequestData() {

    const MTOSIName = [];
    const portId = [];
    this.activeObjects.forEach((value) => {
      MTOSIName.push(value['object'].info.info.MTOSIName);
      portId.push(value['object'].info.info.Name);
    });
    this.requestData = {
      productType: 'Ethernet',
      siteName: this.siteName,
      sneId: this.sneId,
      type: this.deviceInfo.info.Type,
      id: MTOSIName,
      newSas: true,
      portSpeed: ''
    };
    this.selectionDetails = {
      'SNE ID': this.sneId,
      'Rack ID': this.defaultInfo.info.RackID,
      'Rack Position': this.defaultInfo.info.RackPosition,
      'Port Numbers': portId,
    };
    this.SASPlan = true;
  }

  validateSatelliteShelf(): boolean {
    let portSignalValidation = true;
    this.activeObjects.forEach((value) => {
      if (value['object'].info.model.portSignalType === '10GigE' && value['object'].info.model.productName === 'ethernet' &&
        this.CPMType === 'CPM5') {
        portSignalValidation = portSignalValidation && true;
      } else {
        portSignalValidation = portSignalValidation && false;
      }
    });
    if (portSignalValidation && (this.defaultInfo.info.Usage === 'Multi Service Edge' ||
      this.defaultInfo.info.Usage === 'Edge Ethernet Switch' || this.defaultInfo.info.Usage === 'Ethernet Edge Router') &&
      (this.deviceVersion === 'TiMOS-C-15.0.R12' || this.deviceVersion === 'TiMOS-C-15.0.R15')) {
      console.log('Pass coz of Multi Service Edge/Edge Ethernet Switch/Ethernet Edge Router/TiMOS-C-15.0.R12/TiMOS-C-15.0.R15');
      return true;
    } else {
      console.log('Failed coz of Multi Service Edge/Edge Ethernet Switch/Ethernet Edge Router/TiMOS-C-15.0.R12/TiMOS-C-15.0.R15');
      return false;
    }
  }

  /** reset all the port/card to empty */
  resetValues() {
    this.unReserve = [];
    this.portsAvailable = [];
    this.cardAvailable = [];
    this.usedPort = [];
    this.level3 = [];
    this.plancardavialbel = [];
    this.planholderavialbel = [];
    this.physicalportcuf = [];
    this.existingPortSelection = [];
    this.physicalportcuf = [];
    this.inflightportcount = 0;
    this.cardFriendlyArray = [];
    this.cardName = [];
    this.portId = [];
    if (!this.workflow) {
      this.enableActionList();
    }
    this.closeSideNav();
    this.resetImgData.emit();
    setTimeout(() => {
      this.cardName = [];
      this.portsAvailable = [];
    }, 0);
  }
  opencuf() {
    if (this.inflightportcount !== 0) {
      this.opencufpopup.emit(this.inflightportcount);
    } else {
      this.opencufpopup.emit(this.inflightportcount);
      this.showsidenav('usage');
    }
  }
  emitPlanData(data) {
    this.existingPortSelection = [];
  }

  nextCardmoveWorkflow(data) {
    this.display = false;
    this.nextWorkflow.emit(data);
  }

  validateRecovery() {
    const slot = [];
    let error = false;
    this.activeObjects.forEach((value) => {
      const slotDetail = value['object'].info.info.MTOSIName;
      const slotCount = slotDetail.split('/')[2];
      const level = value['object'].info.info.Level;
      const obj = {
        slotNumber: slotCount,
        level: value['object'].info.info.Level
      };
      const slotObj = slot.find(x => x.slotNumber === slotCount);
      if (slot.length === 0 || slotObj === undefined) {
        slot.push(obj);
        this.recoveryBtn = true;
      } else if (slotObj.level === level) {
        slot.push(obj);
        this.recoveryBtn = true;
      } else {
        this.recoveryBtn = false;
        error = true;
      }
    });
    if (error) {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.RECOVERY_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }
}
