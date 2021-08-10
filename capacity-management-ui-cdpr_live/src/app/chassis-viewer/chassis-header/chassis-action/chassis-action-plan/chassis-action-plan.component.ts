import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../shared/services/app-service';
import { WorkflowService } from '../../../../shared/services/workflow.service';
import { environment } from '../../../../../environments/environment';
import { NavigationService } from '../../../../shared/services/navigation.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CP_ERROR } from '../../../../shared/constants/error.constant';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-chassis-action-plan',
  templateUrl: './chassis-action-plan.component.html',
  styleUrls: ['./chassis-action-plan.component.scss']
})
export class ChassisActionPlanComponent implements OnInit, OnChanges {
  /** showleft pane */
  @Input() display;
  /** selected sneId */
  @Input() sneId;
  /** selected siteName */
  @Input() siteName;
  /** deviceInfo to perform action */
  @Input() clearAllplanvalue;
  @Input() selectionDetails: any;
  @Input() deviceInfo;
  @Input() workflow;
  @Input() cardmoverequest;
  @Input() cardmoveleftpanel;
  @Input() enablemove;
  @Input() setleftnavheight;
  @Input() defaultInfo;
  @Input() requestData;
  @Input() cardmoveedit;
  @Input() cardInfillFlow;
  @Input() deltavalue;
  @Input() originaldeltavalue;
  @Input() originalDelta;
  @Input() savedplanincardinfill;
  @Input() demandId;
  @Input() selectedPlanDetails;
  @Input() showEthernet;
  @Input() productType;
  /** Emit value when leftpane close icon is clicked */
  @Output() closeSideNav = new EventEmitter();
  @Output() emitSaveApi = new EventEmitter();
  @Output() emitPlanData = new EventEmitter();
  /** disable/enable all the action */
  /** Emit value when after action is completed */
  @Output() resetValue = new EventEmitter();
  @Output() editPlanCardmove = new EventEmitter();
  @Input() portsAvailable;
  /** plan form value */
  planform = new FormGroup({
    planselect: new FormControl('', [Validators.required]),
    planSASselect: new FormControl('', [Validators.required]),
    portselect: new FormControl('')
  });
  planRadio: any = [{ id: 'HE', title: 'HE', value: true }, { id: 'WMC', title: 'WMC', value: false }];
  planselectdemans: Array<any> = [];
  donecheck = (document.getElementsByName('Done') as any as HTMLInputElement[]);
  showUsageList = false;
  disableUsageList = false;
  uasgeFlagCheck = false;
  childCardFlag = false;
  plandash = true;
  usageList = [];
  usageFlagCheck = true;

  showChildCardList = false;
  disableChildCardList = false;
  childCardList = [];
  showWindowList = false;
  disableWindowList = false;
  windowList = [];

  saveBtnDisable = true;
  editBtn = -1;
  opened = -1;
  satelliteid = [];
  planList = [];
  disableDropdown = false;
  //sasTemplateList = []; 
  sasTemplateList = [];
  sasTemplatevalue;
  plann = [];
  plandropdown: any;
  plannvalue;
  selectPlan: any;
  action: any;
  brfProduct: any;
  parentCardType;
  parentCardModel;
  parentCardVersion;
  subCardType;
  subCardModel;
  subCardVersion;
  childCardType;
  childCardModel;
  childCardVersion;
  windows;
  displayplan;
  usageListValue = ' ';

  portAvailability = 0;

  removePlanValue = false;
  updatePlanSave = false;
  notAbleToAddPlan = true;
  selectDemandArray = [];
  savePlanWithCardMove: any;
  savedPlanDetails = [];
  cardmovedPlanDetails = [];
  tokenvalue;
  displayConfirmationModalOnPreview = false;
  displayConfirmationModalOnClose = false;
  commonModelProperties: any;
  /** error count */
  errCount = 1;
  savedPlanto360 = [];
  planSaved = false;
  displayTimeoutPopup = false;
  portDetails: any;
  chassiscapacity = '';
  chasismsg = false;
  deltachange = [];
  openPlan = false;
  slotino = [];
  slotinounsave = [];
  slot;
  originalDataBool = false;
  availActualCapacity;
  availPotentialCapacity;
  cardTotalCapacity;
  index = 0;
  id;
  workflowenable;
  idList = [];
  uniqueidedit;
  selectedPlan;
  selectedSASPlan
  level;
  type;
  slotId;
  slotid_sas: any = [];
  rackId;
  rackPosition;
  free;
  activestatus;
  enableplandiv = false;
  enabledelta = false;
  savePlanSuccess = false;
  disablesaveforcardmove = false;
  selectedports: any;
  satelliteport = [];
  satellite_id = ['S1/2/1/1', 'S1/2/2/1', 'S1/2/3/1', 'S1/2/4/1']
  // satelliteport = [1, 2, 3, 4]
  satellitedrop = false;
  portvalue = "Select";
  selectedsatellite_Id: any = {};
  localsaveobj: any = {};
  disableportdropdown = false;
  disableDropdownSASTemp = false;
  saveportIslocally = [];
  portflag = false;
  portlist = [];
  sasName;
  @Input() SASPlan;
  @Input() enableNOCardMoveWorkflow;
  portId = [];
  @Output() nextCardmoveWorkflow = new EventEmitter();
  constructor(private appService: AppService, private navigationService: NavigationService, private router: Router,
              private utilityService: UtilityService, private workflowService: WorkflowService) { }

  ngOnInit() {
    if (this.cardInfillFlow) {
      this.originalDataBool = true;
      this.editBtn = 0;
      this.index = 0;
      this.updatePlanSave = true;
      this.enableplandiv = true;
      this.enablemove = true;
      this.setleftnavheight = false;
      if (this.SASPlan) {
        this.disableDropdown = true;
        const ports = this.selectedPlanDetails.slot.split(',');
        this.selectionDetails['Port Numbers'].forEach((data, index) => {
          this.selectedPlanDetails = JSON.parse(JSON.stringify(this.selectedPlanDetails));
          this.portId = data;
          this.slotid_sas = this.selectedPlanDetails.slot;
          this.slotId = ports[index];
          this.selectedPlanDetails.portId = this.portId;
          this.selectDemandArray.push(this.selectedPlanDetails);
          this.uniqueidedit = this.selectDemandArray[this.index].updateId;
        });
      } else {
        this.selectDemandArray.push(this.selectedPlanDetails);
        this.uniqueidedit = this.selectDemandArray[this.index].updateId;
      }
    }
  }
  ChangingValue(event) {
    if (this.planform.get('planSASselect').value !== '') {
      // this.planform.get('planSASselect').value
    }
    this.sasTemplatevalue = event.value.name;
  }
  ngOnChanges() {
    if (this.SASPlan) {
      if (this.selectionDetails['Port Numbers']) {
        this.selectedports = this.selectionDetails['Port Numbers'].sort();
      }

      this.slotid_sas = this.requestData.id.toString();
    }
    if (this.deviceInfo) {
      this.level = this.deviceInfo.info.Level;
      this.type = this.deviceInfo.info.Type;
      this.slotId = this.deviceInfo.info.MTOSIName;
      this.free = this.deviceInfo.info.Free;
      this.rackId = this.defaultInfo.info.RackID;
      this.rackPosition = this.defaultInfo.info.RackPosition;
    } else {
      this.level = this.requestData.level;
      this.type = this.requestData.type;
      this.slotId = this.requestData.id;
      this.free = this.requestData.free;
      this.rackId = this.selectionDetails['Rack ID'];
      this.rackPosition = this.selectionDetails['Rack Position'];
    }
    if (!this.workflow && !this.enableNOCardMoveWorkflow) {
      if (this.savedplanincardinfill.length !== 0) {
        this.selectDemandArray = this.savedplanincardinfill;
      }
    }
    if (this.productType !== '' && this.productType !== 'ALL') {
      this.enabledelta = true;
    }
    if (!this.productType) {
      this.productType = 'ALL';
    }
    if (this.productType === 'Ethernet') {
      this.demandId = 'HE';
    } else {
      this.demandId = '';
    }
    let findport = false;
    let portvalue = [];
    if (this.display && !this.savePlanSuccess) {
      if (!this.workflow) {
        this.display = false;
      }
      if (this.workflow || this.enableNOCardMoveWorkflow) {
        this.requestData.portSpeed = this.cardmoverequest.sourcePortSpeed ? this.cardmoverequest.sourcePortSpeed : '';
      }
      let url = environment.base_url + 'chassis-viewer/card-infill-data';
      if (this.SASPlan) {
        this.disableDropdownSASTemp = false;
        this.disableportdropdown = false;
        this.fetchSASPlanDropdown();
        let vale = 0;
        this.requestData.newSas = true;
        let port = [];
        if (this.selectDemandArray.length !== 0) {
          for (let i of this.selectDemandArray) {
            if (i.cardInfillType === 'New 7210 SAS') {
              if (i.id === '') {
                port.push(i.portId)
                //  const value =  i.portId.every(i => this.selectedports.includes(i));
              }
            }
          }
          // const value =  port[0]every(i => selectedports.includes(i));

          if (port.length !== 0) {
            findport = port[0].some(r => this.selectedports.includes(r));
            const findport1 = port[0].some(r => {
              if (this.selectedports.includes(r)) {
                portvalue.push(r);
              }
            })
          }
          portvalue.join(',')
        }

        // this.requestData.id = [this.slotid_sas]

        url = environment.base_url + 'chassis-viewer/card-infill-data-sas';
        let url1 = environment.base_url + 'chassis-viewer/sas-satellite-names?sneId=' + this.sneId
        this.appService.get(url1).subscribe((response) => {
          if (response) {
            if (response.length !== 0) {
              vale = response.length + 1;
            } else {
              vale = 1;
            }
          }
          this.sasidvaidation(response);
        });

        this.SASPlan = true;
      } else {
        this.SASPlan = false;

      }
      this.appService.post(url, this.requestData).subscribe((response) => {
        if (response) {
          this.fetchPlanDropdown(response);
          if (this.SASPlan) {
            if (findport) {
              this.utilityService.validateStatus(400, 'Plan is already added for port : ' + portvalue, CP_ERROR.SEVERITY.ERROR, 3000);
              this.display = false;
            } else {
              this.display = true;
            }
          }
        }
      });
    }

    if (this.savePlanSuccess && !findport) {
      this.display = true;
      this.savePlanSuccess = false;
    }
    if (this.workflow || this.enableNOCardMoveWorkflow) {
      this.showEthernet = false;
      this.level = this.requestData.level;
      this.type = this.requestData.type;
      this.slotId = this.requestData.id;
      this.free = this.requestData.free;
      if (this.cardmoverequest) {
        this.cardmovedPlanDetails = [];
        this.cardmovedPlanDetails.push(this.cardmoverequest);
        // tslint:disable-next-line:triple-equals
        if (this.cardmoverequest.workflowstatus == 5) {
          this.disablesaveforcardmove = true;
        }
        this.activestatus = this.cardmoverequest.workflowstatus + 1;
      }
      if (this.cardmoverequest.destinationCardType === 'Holder') {
        if (this.cardmoverequest.cardInfillSavePlanRequest !== null && this.cardmoverequest.cardInfillSavePlanRequest.length !== 0) {
          this.editBtn = -1;
          this.index = 0;
          this.selectDemandArray = this.cardmoverequest.cardInfillSavePlanRequest;
          this.setleftnavheight = true;
          // this.removeplanvalue = true;
          // this.updateplansave = true;
          // this.uniqueidedit = null;
        } else {
          this.selectDemandArray = [];
          this.setleftnavheight = false;
          this.cardmovedPlanDetails = [];
        }
      }
      if (this.cardmoveedit) {
        this.editBtn = 0;
      }
    }
    if (this.clearAllplanvalue) {
      this.selectDemandArray = [];
      this.cardmovedPlanDetails = [];
      this.setleftnavheight = false;
      this.disableDropdown = false;
      this.disableChildCardList = false;
      this.disableWindowList = false;
      this.disableUsageList = false;
      this.disableDropdownSASTemp = false;
      this.selectedSASPlan = '';
      this.planform.get('planSASselect').setValue('');
    }
  }
  // getting the value of plan api
  fetchPlanDropdown(carddetail) {
    this.plandropdown = carddetail;
    this.planselectdemans = [];
    this.planRadio.forEach((data) => {
      this.planselectdemans.push(data);
    });
    if (carddetail.cufList !== null) {
      this.loadUsageListValue(carddetail.cufList);
      this.showUsageList = true;
      this.disableUsageList = false;
    } else {
      this.showUsageList = false;
      this.usageFlagCheck = false;
    }
    this.plann = carddetail.valueList;
    if (this.plann !== null && this.plann.length > 0) {
      this.calcluatePort();
      this.loadPlanListValue();
    } else {
      if (!this.workflow && !this.enableNOCardMoveWorkflow) {
        this.closeSideNav.emit();
        if (this.SASPlan) {
            if (carddetail.message === 'Valid Port Selection') {
            this.utilityService.validateStatus(400, carddetail.message, CP_ERROR.SEVERITY.SUCCESS, 3000);
          } else {
            this.utilityService.validateStatus(400, carddetail.message, CP_ERROR.SEVERITY.ERROR, 3000);
          }
        } else {
          this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.THREED_PLAN_ACTION_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      } else {
        if (!this.SASPlan) {
          this.display = true;
        }
      }
    }
  }
  fetchSASPlanDropdown() {
    // this.sasTemplateList = this.sasTemplateList2.sasTemplate
    ////this.showSastemplateList = true;  
    const url = environment.base_url + 'chassis-viewer/sas-template-names';
    this.appService.get(url).subscribe((response) => {
      this.sasTemplateList = response.sasTemplate;
    });
  }
  loadUsageListValue(value) {
    const usgaeListappend = [];
    this.childCardFlag = true;
    this.usageFlagCheck = true;
    this.disableUsageList = false;
    this.usageList = [];
    // usgaeListappend.push({ label: 'Select', value: null });
    value.forEach(val => {
      const usage = { label: val, value: val };
      usgaeListappend.push(usage);
    });
    this.usageList = [...usgaeListappend];
  }

  loadPlanListValue() {
    this.showChildCardList = false;
    this.showWindowList = false;
    this.planList = [];
    // this.planList.push({ label: 'Select', value: null });
    for (const i of this.plann) {
     
      const planname = i.actionName;
      const b = { label: planname, value: planname };
      this.planList.push(b);
    }
  
    if (this.SASPlan) {
      this.selectedPlan = this.planList[0].value;
      this.selectPlan = this.planList[0].value;;
    }
  }

  loadWindowListValue() {
    this.plandropdown.valueList.filter(e => {
      if (e.actionName === this.action) {
        if (e.windows.length > 1) {
          // this.windowList = [{ name: 'Select', value: null }];
          this.showWindowList = true;
          this.childCardFlag = true;
          this.disableWindowList = false;
          e.windows.forEach(val => {
            this.windowList.push({ name: val, value: val });
          });
        } else if (e.windows.length === 1) {
          this.windows = e.windows[0];
          this.windows = e.windows[0];
          this.showWindowList = false;
        } else {
          this.windows = '';
        }
      }
    });
  }

  changeDevice(data) {
    this.saveBtnDisable = true;
    this.childCardFlag = false;
    this.action = data.value;
    this.childCardList = [];
    this.windowList = [];
    this.showChildCardList = false;
    this.showWindowList = false;
    this.selectPlan = data.value;
    this.plandropdown.valueList.filter(e => {
      if (e.actionName === data.value) {
        if (e.childCardModel.length > 1) {
          // this.childCardList = [{ name: 'Select', value: 'null' }];
          this.showChildCardList = true;
          this.childCardFlag = true;
          this.disableChildCardList = false;
          e.childCardModel.forEach(val => {
            this.childCardList.push({ name: val, value: val });
          });
        } else if (e.childCardModel.length === 1) {
          this.showChildCardList = false;
          this.childCardModel = e.childCardModel[0];
        } else {
          this.childCardModel = '';
        }
        if (e.brfProduct !== null && e.brfProduct.length > 0) {
          this.brfProduct = e.brfProduct[0];
        } else {
          this.brfProduct = '';
        }
        if (e.parentCardType !== null && e.parentCardType.length > 0) {
          this.parentCardType = e.parentCardType[0];
        } else {
          this.parentCardType = '';
        }
        if (e.parentCardModel !== null && e.parentCardModel.length > 0) {
          this.parentCardModel = e.parentCardModel[0];
        } else {
          this.parentCardModel = '';
        }
        if (e.parentCardVersion !== null && e.parentCardVersion.length > 0) {
          this.parentCardVersion = e.parentCardVersion[0];
        } else {
          this.parentCardVersion = '';
        }
        if (e.subCardType !== null && e.subCardType.length > 0) {
          this.subCardType = e.subCardType[0];
        } else {
          this.subCardType = '';
        }
        if (e.subCardModel !== null && e.subCardModel.length > 0) {
          this.subCardModel = e.subCardModel[0];
        } else {
          this.subCardModel = '';
        }
        if (e.subCardVersion !== null && e.subCardVersion.length > 0) {
          this.subCardVersion = e.subCardVersion[0];
        } else {
          this.subCardVersion = '';
        }
        if (e.childCardType !== null && e.childCardType.length > 0) {
          this.childCardType = e.childCardType[0];
        } else {
          this.childCardType = '';
        }
        if (e.childCardVersion !== null && e.childCardVersion.length > 0) {
          this.childCardVersion = e.childCardVersion[0];
        } else {
          this.childCardVersion = '';
        }
      }
    });
    this.loadWindowListValue();
    if (this.cardmoveedit) {
      this.workflowstatusenable();
    }
    this.editPlan();
    this.selectPlan = data.value;
    let selectedPlanPort;
    const capacitydata = this.plandropdown;
    for (const informa of capacitydata.valueList) {
      if (informa.actionName === this.selectPlan) {
        selectedPlanPort = informa.portCountData;
      }
    }
    this.portAvailability = selectedPlanPort.portCount;

    if (data.value !== 'New 7210 SAS' && this.childCardFlag === false && this.usageFlagCheck === false) {
      this.saveBtnDisable = false;
      this.removePlanValue = false;
      this.updateValues();
      if (this.enabledelta) {
        this.deltaCalculation(this.selectPlan, '');
      }
      this.updatePlan();
      this.selectedPlan = this.planList[0];
      this.disableDropdown = true;
      this.editBtn = -1;
      this.updatePlanSave = false;
      this.notAbleToAddPlan = true;
    }
  }

  editPlan() {
    if (this.removePlanValue) {
      const selectplan = this.selectDemandArray[this.index].cardInfillType;
      const demandtype = this.selectDemandArray[this.index].demandType;
      if (this.enabledelta) {
        this.deltaCalculation(selectplan, demandtype);
      }
      this.id = this.selectDemandArray[this.index].id;
    }
  }

  OnSelect(data, type) {
    if (data.value.value !== null) {
      if (type === 'Windows') {
        this.windows = data.value.value;
        this.childCardFlag = false;
      } else if (type === 'ChildCard') {
        this.childCardModel = data.value.value;
        this.childCardFlag = false;
      } else if (type === 'UsageList') {
        this.usageFlagCheck = false;
        this.usageListValue = data.value.value;
      }
      if (this.childCardFlag === false && this.usageFlagCheck === false) {
        this.disableUsageList = true;
        this.disableChildCardList = true;
        this.disableWindowList = true;
        this.removePlanValue = false;
        this.updateValues();
        if (this.enabledelta) {
          this.deltaCalculation(this.selectPlan, '');
        }
        this.updatePlan();
        this.selectedPlan = this.planList[0];
        this.disableDropdown = true;
        this.editBtn = -1;
        this.updatePlanSave = false;
        this.updatePlanSave = true;
        this.saveBtnDisable = false;
      }
    }
  }
  OnSasselect(data, type, portid?, satelliteid?, a?) {    
    if (type === 'portlist') {
      this.portvalue = portid;
      this.selectedsatellite_Id[portid] = satelliteid;
    }
    this.portlistvalidation()
  }
  portlistvalidation() {
    // if (event.currentTarget.checked) {
      if (this.planform.status === "VALID") {
        let validation = this.validateSatIdselction();
        if (validation) {
          this.editBtn = -1;
          this.portId = [];
          this.satelliteid = [];
          this.localsaveobj = { ...this.selectedsatellite_Id }
          for (const property in this.localsaveobj) {
            this.portId.push(property);
            this.satelliteid.push(this.localsaveobj[property]);
          }
          this.sasName = this.satelliteid[0].slice(0, this.satelliteid[0].indexOf('/'))
          this.updateValues();
          this.updatesasplan()
          this.portflag = true;
          this.disableportdropdown = true;
          this.disableDropdownSASTemp = true;
          this.disableDropdown = true;
          this.saveBtnDisable = false;
        } else {
         // event.currentTarget.checked = false;
        }
      } else {
      //  event.currentTarget.checked = false;
        //this.utilityService.validateStatus(400, 'Select Plan OR SAS Template should be selected', CP_ERROR.SEVERITY.ERROR, 3000);
        this.utilityService.validateStatus(400, 'SAS Template should be selected', CP_ERROR.SEVERITY.ERROR, 3000);
      }
    //}
  }
  // portlistvalidation(event) {
  //   if (event.currentTarget.checked) {
  //     if (this.planform.status === "VALID") {
  //       let validation = this.validateSatIdselction();
  //       if (validation) {
  //         this.editBtn = -1;
  //         this.portId = [];
  //         this.satelliteid = [];
  //         this.localsaveobj = { ...this.selectedsatellite_Id }
  //         for (const property in this.localsaveobj) {
  //           this.portId.push(property);
  //           this.satelliteid.push(this.localsaveobj[property]);
  //         }
  //         this.sasName = this.satelliteid[0].slice(0, this.satelliteid[0].indexOf('/'))
  //         this.updateValues();
  //         this.updatesasplan()
  //         this.portflag = true;
  //         this.disableportdropdown = true;
  //         this.disableDropdownSASTemp = true;
  //         this.disableDropdown = true;
  //         this.saveBtnDisable = false;
  //       } else {
  //         event.currentTarget.checked = false;
  //       }
  //     } else {
  //       event.currentTarget.checked = false;
  //       //this.utilityService.validateStatus(400, 'Select Plan OR SAS Template should be selected', CP_ERROR.SEVERITY.ERROR, 3000);
  //       this.utilityService.validateStatus(400, 'Select Plan OR SAS Template should be selected', CP_ERROR.SEVERITY.ERROR, 3000);
  //     }
  //   }
  // }
  validateSatIdselction() {
    var objLength = Object.keys(this.selectedsatellite_Id).length;
    if (Object.keys(this.selectedsatellite_Id).length !== this.selectedports.length) {
     // this.utilityService.validateStatus(400, 'Satellite ID should me selected for all ports', CP_ERROR.SEVERITY.ERROR, 3000);
     this.portselection(objLength)
      return false;
    } else {
      let validation  = this.portselection(objLength);
      if(validation) {
        return true;
      }
   }
  }
  portselection(objLength) {
    let uniqueidcheck = {}
    let count = 0;
    for (let val in this.selectedsatellite_Id) {
      count++;
      if (!uniqueidcheck[this.selectedsatellite_Id[val]]) {
        uniqueidcheck[this.selectedsatellite_Id[val]] = 1;
        if (objLength === count) {
          return true;
        }
      } else {
        this.utilityService.validateStatus(400, 'Wrong selection', CP_ERROR.SEVERITY.ERROR, 3000);
        return false;
      }
    } 
  }
  // updateSASValues(portid?, satelliteid?) {
  //   //this.portsAvailable.forEach((data) => {
  //   // this.portsAvailable.forEach((data) => {
  //   //   if(this.slotid_sas.indexOf(data.MTOSIName) === -1)
  //   //   {
  //   //     this.slotid_sas.push(data.MTOSIName);
  //   //   }
  //   // })
  //   // this.slotid_sas = this.slotid_sas.toString();
  //   if (this.portId.indexOf(portid) === -1) {
  //     this.portId.push(portid)
  //   }
  // }
  updatesasplan() {
    if (this.updatePlanSave) {
      for (let val of this.selectDemandArray) {
        if (val.slot === this.slotid_sas) {
          val.cardInfillType = this.selectPlan;
          val.sasTemplateName = this.sasTemplatevalue;
          val.sassIdmap = this.localsaveobj;
          val.sasName = this.sasName;
          val.portId = this.portId;
          val.satelliteId = this.satelliteid;
          this.savedPlanDetails['cardInfillType'] = this.selectPlan;
          this.savedPlanDetails['sasTemplateName'] = this.sasTemplatevalue;
          this.savedPlanDetails['sassIdmap'] = this.localsaveobj;
          this.savedPlanDetails['sasName'] = this.sasName;
          this.savedPlanDetails['portId'] = this.portId;
          this.savedPlanDetails['satelliteId'] = this.satelliteid;
        }
        if (val.id !== '') {
          const value = this.selectDemandArray.slice(this.index, this.index + 1);
          for (const data of value) {
            this.savedPlanDetails.push(data);
          }
        }
      }
    } else {
      let flag = false;
      if (this.selectDemandArray.length !== 0) {
        for (const data of this.selectDemandArray) {
          if (data.slotNumber === this.selectedPlanDetails.slotNumber) {
            flag = true;
            data.cardInfillType = this.selectPlan;
            data.sasTemplateName = this.sasTemplatevalue;
            data.sassIdmap = this.localsaveobj;
            data.sasName = this.sasName;
            data.portId = this.portId;
            data.satelliteId = this.satelliteid;
            this.savedPlanDetails['cardInfillType'] = this.selectPlan;
            this.savedPlanDetails['sasTemplateName'] = this.sasTemplatevalue;
            this.savedPlanDetails['sassIdmap'] = this.localsaveobj;
            this.savedPlanDetails['sasName'] = this.sasName;
            this.savedPlanDetails['portId'] = this.portId;
            this.savedPlanDetails['satelliteId'] = this.satelliteid;
          }
        }
        if (!flag) {
          this.selectDemandArray.push(this.selectedPlanDetails);
          this.savedPlanDetails.push(this.selectedPlanDetails);
        }
      } else {
        this.selectDemandArray.push(this.selectedPlanDetails);
        this.savedPlanDetails.push(this.selectedPlanDetails);
      }
    }
    this.planform.get('planSASselect').setValue('');
    this.planform.get('planselect').setValue('');
    this.planform.get('portselect').setValue('');
  }
  updateValues() {
    this.selectedPlanDetails = {
      id: '',
      childCardModel: this.childCardModel,
      brfProduct: this.brfProduct,
      parentCardType: this.parentCardType,
      parentCardModel: this.parentCardModel,
      parentCardVersion: this.parentCardVersion,
      subCardType: this.subCardType,
      subCardModel: this.subCardModel,
      subCardVersion: this.subCardVersion,
      childCardType: this.childCardType,
      childCardVersion: this.childCardVersion,
      windows: this.windows,
      updateId: Math.floor(Math.random() * 100),
      portAvailability: this.portAvailability,
      productType: (this.selectPlan === 'New 7210 SAS') ? 'Ethernet' : this.productType,
      demandType: this.demandId,
      siteName: this.siteName,
      sneId: this.sneId,
      cardInfillType: this.selectPlan,
      type: this.type,
      slotNumber: (this.selectPlan === 'New 7210 SAS') ? this.slotid_sas : this.slotId,
      slot: (this.selectPlan === 'New 7210 SAS') ? this.slotid_sas : this.slotId,
      rackId: this.rackId,
      rackPosition: this.rackPosition,
      level: this.level,
      free: this.free,
      usageType: this.usageListValue,
      portId: (this.selectPlan === 'New 7210 SAS') ? this.portId : [],
      satelliteId: (this.selectPlan === 'New 7210 SAS') ? this.satelliteid : [],
      sasTemplateName: (this.selectPlan === 'New 7210 SAS') ? this.sasTemplatevalue : '',
      sassIdmap: (this.selectPlan === 'New 7210 SAS') ? this.localsaveobj : '',
      sasName: (this.selectPlan === 'New 7210 SAS') ? this.sasName : ''
    };
  }

  updatePlan() {
    this.enableplandiv = true;
    if (this.updatePlanSave) {
      for (const infoo of this.selectDemandArray) {
        if (infoo.updateId === this.uniqueidedit) {
          infoo.cardInfillType = this.selectPlan;
          infoo.usageType = this.usageListValue;
          infoo.windows = this.windows;
          infoo.childCardModel = this.childCardModel;
          infoo.portAvailability = this.portAvailability;
          infoo.brfProduct = this.brfProduct;
          infoo.parentCardType = this.parentCardType;
          infoo.parentCardModel = this.parentCardModel;
          infoo.parentCardVersion = this.parentCardVersion;
          infoo.subCardType = this.subCardType;
          infoo.subCardModel = this.subCardModel;
          infoo.subCardVersion = this.subCardVersion;
          infoo.childCardType = this.childCardType;
          infoo.childCardVersion = this.childCardVersion;
        }
        if (infoo.id !== '') {
          const value = this.selectDemandArray.slice(this.index, this.index + 1);
          for (const data of value) {
            this.savedPlanDetails.push(data);
          }
        } else {
          for (const data of this.savedPlanDetails) {
            if (data.updateId === this.uniqueidedit) {
              data.cardInfillType = this.selectPlan;
              data.usageType = this.usageListValue;
              data.windows = this.windows;
              data.childCardModel = this.childCardModel;
              data.portAvailability = this.portAvailability;
              data.brfProduct = this.brfProduct;
              data.parentCardType = this.parentCardType;
              data.parentCardModel = this.parentCardModel;
              data.parentCardVersion = this.parentCardVersion;
              data.subCardType = this.subCardType;
              data.subCardModel = this.subCardModel;
              data.subCardVersion = this.subCardVersion;
              data.childCardType = this.childCardType;
              data.childCardVersion = this.childCardVersion;
            }
          }
        }
      }
    } else {
      let flag = false;
      if (this.selectDemandArray.length !== 0) {
        for (const data of this.selectDemandArray) {
          if (data.sneId === this.selectedPlanDetails.sneId) {
            if (data.slotNumber === this.selectedPlanDetails.slotNumber) {
              flag = true;
              data.cardInfillType = this.selectedPlanDetails.cardInfillType;
              data.usageType = this.selectedPlanDetails.usageType;
              data.windows = this.selectedPlanDetails.windows;
              this.savedPlanDetails['cardInfillType'] = this.selectedPlanDetails.cardInfillType;
              this.savedPlanDetails['usageType'] = this.selectedPlanDetails.usageType;
              this.savedPlanDetails['windows'] = this.selectedPlanDetails.windows;
            }
          }
        }
        if (!flag) {
          this.selectDemandArray.push(this.selectedPlanDetails);
          this.savedPlanDetails.push(this.selectedPlanDetails);
        }
      } else {
        this.selectDemandArray.push(this.selectedPlanDetails);
        this.savedPlanDetails.push(this.selectedPlanDetails);
      }
    }
    // this.originaldatabool = false;
    if (this.workflow) {
      if (this.cardmovedPlanDetails.length !== 0) {
        this.cardmovedPlanDetails[0].destinationCardName = this.selectPlan;
      } else {
        this.cardmovedPlanDetails.push(this.cardmoverequest);
        this.cardmovedPlanDetails[0].destinationCardName = this.selectPlan;
      }
      this.selectDemandArray = [];
      this.savedPlanDetails = [];
      this.selectDemandArray.push(this.selectedPlanDetails);
      this.savedPlanDetails.push(this.selectedPlanDetails);
      this.setleftnavheight = true;
    }
  }
  clearAllPlan() {
    this.showWindowList = false;
    this.disableUsageList = false;
    this.showChildCardList = false;
    this.removePlanValue = true;
    this.disableDropdown = false;
    this.disableWindowList = false;
    this.disableChildCardList = false;
    this.disableDropdownSASTemp = false;
    this.disableportdropdown = false;
    if (this.donecheck.length !== 0) {
      this.donecheck[0].checked = false;
    }
    this.selectedsatellite_Id = {};
    this.selectedSASPlan = '';
    this.planform.get('planSASselect').setValue('');
    this.planform.get('planselect').setValue('');
    this.planform.get('portselect').setValue('');
    // this.displaycminfo = [];   

    if (this.productType !== 'ALL') {
      this.usageFlagCheck = false;
    } else {
      this.usageFlagCheck = true;
    }
    this.updatePlanSave = false;
    const arrr = [];
    this.idList = [];
    for (const infoo of this.selectDemandArray) {
      if (infoo.id !== '') {
        this.idList.push(Number(infoo.id));
      }
      arrr.push({ plan: infoo.cardInfillType, type: infoo.demandType });
    }

    /*if (this.enableDelta) {
      for (const i of arrr) {
        const sp = i.plan;
        const type = i.type;
        this.deltacalculation(sp, type);
      }
    }*/

    this.removePlanValue = false;
    if (this.idList.length !== 0) {
      this.deleteAllPlan(this.idList);
      this.savedplanincardinfill = [];
      this.saveportIslocally = [];
    } else {
      this.selectDemandArray = [];
      this.enableplandiv = false;
      this.savedPlanDetails = [];
      this.savedplanincardinfill = [];
      this.savedPlanto360 = [];
      this.saveportIslocally = [];
      this.slotino = [];
      this.saveBtnDisable = true;
    }
    if (this.cardmoveedit) {
      this.setleftnavheight = false;
      this.workflowstatusenable();
    }
    this.sascountapi()
  }

  deleteAllPlan(idlist) {
    const url = environment.base_url + 'capacity-planning-build/delete-all-plan';
    this.appService.post(url, idlist).subscribe((response) => {
      this.selectDemandArray = [];
      this.enableplandiv = false;
      this.savedPlanDetails = [];
      this.savedPlanto360 = [];
      // this.displaycminfo = [];
      this.slotino = [];
      this.saveBtnDisable = true;
    });
  }

  toggle(index) {
    if (this.opened === index) {
      this.opened = -1;
    } else {
      this.opened = index;
    }
  }

  previewBtnClick() {
    if (this.savedPlanDetails.length !== 0) {
      this.displayConfirmationModalOnPreview = true;
      this.commonModelProperties = {
        image: '',
        bodyContent: 'Do You want to Save ?',
        popupType: 'confirmationPopup',
        footerButtons: 'true',
        header: 'Confirmation',
        dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-modal' },
        { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }],
        width: '748px',
      };
    } else {
      this.Preview();
      this.display = false;
    }
  }

  Preview() {
    this.navigationService.navigate3DToCBPBySiteName.next(this.siteName);
    if (this.workflow) {
      this.router.navigate(['/optimizationplan']);
    } else {
      this.router.navigate(['/capacitybuildplan']);
    }
  }

  previewSubmit() {
    this.displayConfirmationModalOnPreview = false;
    this.savePlan();
    if (!this.workflow) {
      this.Preview();
    }
  }

  previewCancel() {

    for (let i = 0; i < this.selectDemandArray.length; i++) {
      if (this.selectDemandArray[i].id === '') {
        this.removePlanValue = true;
        if (this.enabledelta) {
          this.deltaCalculation(this.selectDemandArray[i].cardInfillType, this.selectDemandArray[i].demandType);
        }
        this.selectDemandArray.splice(i, 1);
      }
    }
    this.savedPlanDetails = [];
    this.displayConfirmationModalOnPreview = false;
    this.Preview();
  }

  // close side pane
  sidenavClosed() {
    // this.disableslotsection = false;
    this.originalDataBool = false;
    this.opened = -1;
    this.editBtn = -1;
    this.updatePlanSave = false;
    this.planselectdemans = [];
    this.selectedsatellite_Id = {};
    this.saveportIslocally = [];
    if (this.donecheck.length !== 0) {
      this.donecheck[0].checked = false;
    }
    if (this.savedPlanDetails.length !== 0 && !this.SASPlan) {
      this.showSavePopup();
    } else if (this.savedPlanDetails.length !== 0 && this.SASPlan) {
      let SASPortCount = 0;
      this.showSavePopup();
    } else {
      this.display = false;
    }
    this.planform.get('planSASselect').setValue('');
    this.planform.get('planselect').setValue('');
    this.planform.get('portselect').setValue('');
    this.resetValue.emit();
    this.emitPlanData.emit(this.selectDemandArray);
  }

  showSavePopup() {
    this.displayConfirmationModalOnClose = true;
    this.commonModelProperties = {
      image: '',
      bodyContent: 'Do You want to Save ?',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: 'Confirmation',
      dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-modal' },
      { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }],
      width: '748px',
    };
  }

  // saving the plan to db
  savePlan() {

    const sasPortArray = [];
    let sasValidationSuccess = true;
    // this.savedPlanDetails.forEach((value) => {
    //   if (value.cardInfillType === 'New 7210 SAS') {
    //     sasPortArray.push(value.portId);
    //   }
    // });
    // if (sasPortArray.length === 4) {
    //   sasValidationSuccess = this.validateSASSlot(sasPortArray);
    // } 
    if (sasValidationSuccess) {
      this.displayConfirmationModalOnClose = false;
      const data = this.savedPlanDetails.filter((v, i, a) => a.findIndex(t => (t.updateId === v.updateId)) === i);
      const url = environment.base_url + 'capacity-planning-build/save-plan';
      this.appService.post(url, data).subscribe((response) => {
        if (response.failedResult === true) {
          if (response.failedResponse) {
            for (let i = 0; i < response.failedResponse.length; i++) {
              // for (let j = 0; j < this.selectDemandArray.length; j++) {
              //   if (this.selectDemandArray[j].slot === response.failedResponse[j].slotid) {
              //     this.selectDemandArray.splice(i, 1);
              //   }
              // }
              const val = response.failedResponse[i].reason.replace('[', '') + ' , Port ID : ' + response.failedResponse[i].slotid;
              this.utilityService.validateStatus(400, val.replace(']', ''), 'error', 3000);
            }
          } else if (response.message) {
            this.utilityService.validateStatus(400, response.message, CP_ERROR.SEVERITY.ERROR, 3000);
          }

        }
        if (response.successResult === true) {
          this.savedPlanDetails = []
          for (let i = 0; i < response.response.length; i++) {
            this.savePlanWithCardMove = response.response[i];
            if (this.workflow || this.enableNOCardMoveWorkflow) {
              if (this.cardmoverequest.destinationCardType === 'Holder') {
                const obj = {
                  cardinfill: false,
                  cardmove: true,
                  planwithcm: this.savePlanWithCardMove,
                  preview: false
                };
                this.emitSaveApi.emit(obj);
                this.confirmaction();
              }
            }
            let message = CP_ERROR.STATUS_MESSAGES.THREED_PLAN_SAVED + ' , Port ID : ' + response.response[i].portId.join(",")
            this.utilityService.validateStatus(200, message, CP_ERROR.SEVERITY.SUCCESS, 3000);
            // this.savedPlanDetails = [];
            this.savedplanincardinfill = [];
          }
          this.assignSaveVal(response.response);
          this.planSaved = true;
          this.saveBtnDisable = true;
          this.savePlanSuccess = true;
          // this.navigationFlag = true;
        }
      }, (error) => {
        if (this.errCount === 1) {
          this.displayTimeoutPopup = true;
          this.commonModelProperties = {
            image: '',
            bodyContent: 'Please try again after some time !',
            popupType: 'confirmationPopup',
            footerButtons: 'true',
            header: 'Retry',
            dynamicButton: [{ btnName: 'Close', funcName: 'cancel', class: 'btn-modal' }],
            width: '748px',
          };
        }
        for (let i = 0; i < this.selectDemandArray.length; i++) {
          if (this.selectDemandArray[i].id === '') {
            this.selectDemandArray.splice(i, 1);
          }
        }
        this.errCount++;
      });
    } else {
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CBP_CREATION_FOR_SAS_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      this.resetValue.emit();
      this.savedplanincardinfill = [];
      this.selectDemandArray = [];
      this.savedPlanDetails = [];
    }
  }

  // saved planed information from db assinge to local
  assignSaveVal(value) {
    // this.savedPlanDetails = [];
    for (const data of this.selectDemandArray) {
      for (const plan of value) {
        if (plan.slot === data.slot) {
          data.id = plan.id;
        }
        // else if (plan.cardInfillType === 'New 7210 SAS') {
        //   const slotArray = plan.slot.split(',');
        //   slotArray.forEach((index) => {
        //     if (data.slot === index) {
        //       data.id = plan.id;
        //     }
        //   });
        // }
      }
      this.savedPlanDetails.push(data);
    }
    if (!this.workflow || !this.enableNOCardMoveWorkflow) {
      const obj = {
        cardinfill: true,
        cardmove: false,
        originalDelta: this.originalDelta,
        planwithcardinfill: this.savedPlanDetails
      };
      this.emitSaveApi.emit(obj);
    }
    this.savedPlanDetails = [];
  }

  cancelLayerdPopup() {
    this.displayConfirmationModalOnClose = false;
    this.displayTimeoutPopup = false;
    this.resetValue.emit();
  }

  confirmwithoutplan() {
    const obj = {
      cardinfill: false,
      cardmove: true,
      planwithcm: null,
      preview: false
    };
    this.display = false;
    this.emitSaveApi.emit(obj);
    this.router.navigate(['/optimizationplan']);
  }
  confirmwithoutplanpreview() {
    const obj = {
      cardinfill: false,
      cardmove: true,
      planwithcm: null,
      preview: true
    };
    this.display = false;
    this.emitSaveApi.emit(obj);
    this.router.navigate(['/optimizationplan']);
  }
  previewClick() {
    this.previewBtnClick();
  }
  confirmaction() {
    setTimeout(() => {
      this.router.navigate(['/optimizationplan']);
    }, 1000);
  }


  deltaCalculation(selectPlan, demandType) {
    const actionPlanCheck = this.plandropdown.valueList;
    for (const i of actionPlanCheck) {
      if (i.actionName === selectPlan) {
        this.portDetails = i.portCountData;
      }
    }
    const portCountPlan = this.portDetails.portCount;
    let speed;
    let demand;
    if (demandType === '') {
      demand = this.demandId;
    } else {
      demand = demandType;
    }
    if (demand !== '') {
      speed = this.portDetails.portSpeed + ' ' + demand;
    } else {
      speed = this.portDetails.portSpeed;
    }
    if (speed) {
      for (const iterateData of this.originalDelta) {
        // if (demand !== '') {
        //   iterateData.speed = this.portDetails.portSpeed + ' ' + demand;
        // } else {
        //   iterateData.speed = this.portDetails.portSpeed;
        // }
        if (iterateData.actioname === selectPlan && iterateData.speed === speed) {
          if (this.removePlanValue) {
            iterateData.count.pop();
          } else {
            iterateData.count.push(portCountPlan);
          }
        }
      }
    }
    let originalDelta;
    if (speed) {
      for (const original of this.originaldeltavalue) {
        let originalData;
        if (demand !== '') {
          if (original.speed.includes(demand)) {
            originalData = original.speed;
          } else {
            originalData = original.speed + ' ' + demand;
          }
        } else {
          originalData = original.speed;
        }
        if (originalData === speed) {
          originalDelta = original.value;
        }

      }
      for (const delta of this.deltavalue) {
        let deltaVal;
        if (demand !== '') {
          if (delta.portSpeed.includes(demand)) {
            deltaVal = delta.portSpeed;
          } else {
            deltaVal = delta.portSpeed + ' ' + demand;
          }
        } else {
          deltaVal = delta.portSpeed;
        }
        if (deltaVal === speed) {
          for (const cal of this.originalDelta) {
            if (speed === cal.speed) {
              if (cal.count.length === 0) {
                delta.deltaValue = originalDelta;
              }
              for (const portcount of cal.count) {
                originalDelta += portcount;
                delta.deltaValue = originalDelta;
              }
            }
          }
        }
      }
    }
  }

  calcluatePort() {
    const plandata = this.plandropdown;
    this.calculationCapacity();
    this.planList = [];
    if (this.openPlan) {
      this.portCheck();
    }
    this.plannvalue = plandata.valueList;
    this.changeRadio(this.demandId);

  }

  // check port available in saved plan list
  portCheck() {
    this.slotinounsave = [];
    this.slotino = [];
    // check port is alerady planned but not saved
    for (const infoo of this.selectDemandArray) {
      if (infoo.sneId === this.sneId) {
        if (infoo.slotNumber === this.slot) {
          this.slotinounsave.push(infoo.slotNumber);
        }
      }
    }
    if (!this.originalDataBool) {
      if (this.slotinounsave.indexOf(this.slot) !== -1) {
        this.disableDropdown = true;
        this.disableUsageList = true;
      } else {
        this.disableDropdown = false;
        this.disableUsageList = false;
      }
    }
    // checking port are aviable in saved plans
    for (const infoo of this.savedPlanto360) {
      if (infoo.sneId === this.sneId) {
        if (infoo.slotNumber === this.slot) {
          this.slotino.push(infoo.slotNumber);
        }
      }
    }
    if (this.slotino.indexOf(this.slot) !== -1) {
      if (!this.cardmoveedit) {
        this.utilityService.validateStatus(400, 'Plan is already saved for this slot'
          + this.slotId, CP_ERROR.SEVERITY.ERROR, 3000);
      }
      this.closeSideNav.emit();
      this.display = false;
    } else {
      // this.display = true;
      if (!this.SASPlan) {
        this.display = true;
      }
    }
  }

  // capacity calculation
  calculationCapacity() {
    const capacitydata = this.plandropdown;
    this.availActualCapacity = capacitydata.availActualCapacity;
    this.availPotentialCapacity = capacitydata.availPotentialCapacity;
    this.cardTotalCapacity = capacitydata.cardTotalCapacity;
    let availableport = this.availActualCapacity - this.cardTotalCapacity;

    if (availableport < 0) {
      this.disableDropdown = false;
      availableport = this.availPotentialCapacity - this.cardTotalCapacity;
      if (availableport < 0) {
        this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.THREED_PLAN_SPEED_LIMITATION_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      } else {
        this.openPlan = true;
        if (!this.workflow) {
          this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.THREED_PLAN_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      }
    } else {
      this.openPlan = true;
    }
    if (!this.originalDataBool) {
      if (this.plandropdown.isPlanPresent === '1') {
        if (!this.workflow && !this.SASPlan) {
          this.closeSideNav.emit();
          this.utilityService.validateStatus(400, this.slotId +
            'slot already planned for capacity building', CP_ERROR.SEVERITY.ERROR, 3000);
        } else if (this.SASPlan) {
          this.closeSideNav.emit();
          this.utilityService.validateStatus(400, this.plandropdown.message, CP_ERROR.SEVERITY.ERROR, 3000);
        }
        this.openPlan = false;
      } else {
        //  this.display = true;
        if (!this.SASPlan) {
          this.display = true;
        }
      }
    }
  }

  changeRadio(demandid) {
    let selectplan;
    this.demandId = demandid;
    if (this.updatePlanSave) {
      this.selectDemandArray[this.index].demandType = demandid;
      if (this.enabledelta) {
        this.deltaCalculation(selectplan, this.demandId);
        this.removePlanValue = true;
      }
    }
    if (this.index >= 0) {
      if (this.selectDemandArray.length !== 0) {
        selectplan = this.selectDemandArray[this.index].cardInfillType;
      }
    }
    for (const portcount of this.plannvalue) {
      const portdata = portcount.portCountData;
      const acnam = portcount.actionName;
      const speed = portdata.portSpeed + ' ' + this.demandId;
      const portcountplan = portdata.portCount;
      this.originalDelta.push({ actioname: acnam, count: [], speed });
    }
    this.originalDelta = this.originalDelta.filter((v, i, a) => a.findIndex(t =>
      (t.actioname === v.actioname && t.speed === v.speed)) === i);
    if (this.removePlanValue) {
      if (this.enabledelta) {
        if (selectplan !== "New 7210 SAS") {
          this.deltaCalculation(selectplan, this.demandId);
        }
      }
    }
    this.removePlanValue = false;
  }

  // removing single plan
  removePlan(index) {

    this.showWindowList = false;
    this.showChildCardList = false;
    this.disableUsageList = false;
    this.disableDropdown = false;
    this.removePlanValue = true;
    this.disableDropdownSASTemp = false;
    this.disableportdropdown = false;
    this.selectedsatellite_Id = {};
    if (this.donecheck.length !== 0) {
      this.donecheck[0].checked = false;
    }
    this.planform.get('planSASselect').setValue('');
    this.planform.get('planselect').setValue('');
    this.planform.get('portselect').setValue('');
    // this.displaycminfo = [];
    if (this.productType !== 'ALL') {
      this.usageFlagCheck = false;
    } else {
      this.usageFlagCheck = true;
    }
    this.updatePlanSave = false;
    this.slotino.splice(index, 1);
    const selectplan = this.selectDemandArray[index].cardInfillType;
    const demandtype = this.selectDemandArray[index].demandType;
    this.id = this.selectDemandArray[index].id;

    if (this.enabledelta) {
      this.deltaCalculation(selectplan, demandtype);
    }

    this.removePlanValue = false;
    if (this.id) {
      this.deleteCBPData(this.id, index);
    } else {
      this.selectDemandArray.splice(index, 1);
      if (this.savedPlanDetails.length === index) {
        this.savedPlanDetails.splice(index - 1, 1);
        this.saveportIslocally.splice(index - 1, 1)
      } else {
        this.savedPlanDetails.splice(index, 1);
        this.saveportIslocally.splice(index, 1)
      }
      if (this.selectDemandArray.length === 0) {
        this.enableplandiv = false;
      }
    }
    this.loadPlanListValue();
    if (this.savedPlanDetails.length === 0) {
      this.saveBtnDisable = true;
    } else {
      let SASPortCount = 0;
      this.savedPlanDetails.forEach((value) => {
        if (value.cardInfillType === 'New 7210 SAS') {
          SASPortCount++;
        }
      });
      if (SASPortCount === 1) {
        this.saveBtnDisable = true;
      } else {
        this.saveBtnDisable = false;
      }
    }
    if (selectplan === 'New 7210 SAS') {
      this.sascountapi()
    }
  }

  deleteCBPData(id, index) {
    let isCardMove;
    if (this.workflowenable) {
      isCardMove = true;
    } else {
      isCardMove = false;
    }
    const url = environment.base_url + 'capacity-planning-build/delete-plan?id=' + id + '&isCardMove=' + isCardMove;
    this.appService.delete(url).subscribe((result) => {
      const message = result['message'];
      if (result['status'] === true) {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.selectDemandArray.splice(index, 1);
        if (this.savedPlanDetails.length === index) {
          this.savedPlanDetails.splice(index - 1, 1);
          this.saveportIslocally.splice(index - 1, 1)
        } else {
          this.savedPlanDetails.splice(index, 1);
          this.saveportIslocally.splice(index, 1)
        }
        // this.savedPlanDetails = [];
        this.saveBtnDisable = true;
        // this.displaycminfo = [];
        if (this.selectDemandArray.length === 0) {
          this.enableplandiv = false;
        }
      } else {
        this.utilityService.validateStatus(400, message, CP_ERROR.SEVERITY.ERROR, 3000);
      }
    });
  }
  workflowstatusenable() {
    this.activestatus = 5;
    this.editPlanCardmove.emit(this.activestatus);
  }
  onEdited(index) {    
    this.showWindowList = false;
    this.showChildCardList = false;
    this.removePlanValue = true;
    this.updatePlanSave = true;
    this.disableportdropdown = false;
    this.disableDropdownSASTemp = false;
    this.index = index;
    this.editBtn = index;
    this.disableDropdown = false;
    this.disableUsageList = false;

    this.uniqueidedit = this.selectDemandArray[this.index].updateId;
    const arrayListValue = this.selectDemandArray[index];
    const payload = {
      productType: arrayListValue.productType,
      siteName: arrayListValue.siteName,
      sneId: arrayListValue.sneId,
      type: arrayListValue.type,
      id: arrayListValue.id,
      level: arrayListValue.level,
      free: arrayListValue.free,
      portSpeed: '',
      newSas: false
    };
    let url = environment.base_url + 'chassis-viewer/card-infill-data';
    if (arrayListValue.cardInfillType === 'New 7210 SAS') {
      let vale = 'S3';
      this.saveBtnDisable = true;
      this.SASPlan = true;
      this.selectedports = arrayListValue.portId.sort();
      this.selectPlan = arrayListValue.cardInfillType;
      this.localsaveobj = JSON.parse(JSON.stringify(arrayListValue.sassIdmap));
      this.portId = arrayListValue.portId;
      // this.satelliteid = arrayListValue.satelliteId;
      this.satelliteid = [];
      this.selectedsatellite_Id = {};

      if (this.donecheck.length !== 0) {
        this.donecheck[0].checked = false;
      }
      payload.id = [arrayListValue.id]
      payload.newSas = true;
      url = environment.base_url + 'chassis-viewer/card-infill-data-sas';
      this.sasidvaidation(vale, this.index);
    } else {
      this.SASPlan = false;
    }
    this.appService.post(url, payload).subscribe((response) => {
      if (response) {
        this.edidDropdownFunc(response);
      }
    });
  }

  edidDropdownFunc(value) {
    this.plann = value.valueList;
    this.plandropdown = value;
    if (value.cufList !== null) {
      this.loadUsageListValue(value.cufList);
      this.showUsageList = true;
    } else {
      this.showUsageList = false;
    }
    if (this.plann !== null) {
      this.loadPlanListValue();
    } else {
      this.closeSideNav.emit();
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.THREED_PLAN_ACTION_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      }
  }

  validateSAS2(portId): boolean {
    let validationSuccess = false;
    let slotId = 0;
    portId.forEach((value) => {
      if (value.charAt(0) !== slotId) {
        slotId = value.charAt(0);
        validationSuccess = true;
      } else {
        validationSuccess = false;
      }
    });
    return validationSuccess;
  }

  validateSASSlot(portId): boolean {
    let count = 0;
    portId.forEach((index) => {
      if (index.charAt(0) === portId[0].charAt(0)) {
        count++;
      }
    });
    if (count >= 3) {
      return false;
    } else {
      const validationSuccess = this.validateSASPort(portId);
      if (!validationSuccess) {
        return false;
      } else {
        return true;
      }
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
        // tslint:disable-next-line:radix
      } else if (sameslot.length === 2 && parseInt(sameslot[0].charAt(4)) !== (parseInt(sameslot[1].charAt(4))) + 1 &&
        // tslint:disable-next-line:radix
        parseInt(sameslot[0].charAt(4)) !== (parseInt(sameslot[1].charAt(4))) - 1) {
        value = true;
      } else {
        value = false;
      }
      validationSuccess = (validationSuccess && value);
    });
    return validationSuccess;
  }
  sasidvaidation(count, index?) {
    let array = []
    this.satelliteport = []
    let totalcount = count.length + 1;
    let countval = count;
    let sascount;
    if (this.updatePlanSave) {
      for (let i of this.selectDemandArray[index].satelliteId) {
        array.push(i);
      }
    } else {
      if (this.selectDemandArray.length !== 0) {
        for (let i of this.selectDemandArray) {
          if (i.id === '') {
            if (i.sneId === this.sneId) {
              if (i.cardInfillType === 'New 7210 SAS') {
                countval.push(i.sasName);
              }
            }
          }
        }
      }
      for (let i = 1; i <= countval.length; i++) {
        let vaa = `${'S'}` + i;
        if (countval.indexOf(`${'S'}` + i) == -1) {
          totalcount = i
          break;
        }
      }
      for (let i of this.satellite_id) {
        sascount = 'S' + totalcount;
        let string = i.replace(/S1/, sascount);
        array.push(string);
      }
    }
    array.sort(function (a, b) {
      if (a > b)
        return 1;
      if (a < b)
        return -1;
      return 0;
    });
    for (let i of array) {
      this.satelliteport.push({ label: i });
    }
  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
  sascountapi() {
    let vale = 1;
    let url1 = environment.base_url + 'chassis-viewer/sas-satellite-names?sneId=' + this.sneId;
    this.appService.get(url1).subscribe((response) => {
      if (response) {
        if (response.length !== 0) {
          vale = response.length + 1;

        }
      }
      this.sasidvaidation(response);
    });
  }

  nextWorkflow() {
    const requestData = this.savedPlanDetails.filter((v, i, a) => a.findIndex(t => (t.updateId === v.updateId)) === i);
    this.display = false;
    this.nextCardmoveWorkflow.emit(requestData);
  }

}
