import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { NavigationService } from '../shared/services/navigation.service';
import { WorkflowService } from '../shared/services/workflow.service';
import { environment } from '../../environments/environment';
import { VisualizerOptions } from '../shared/constants/visualizer.constant';
import { DeviceVisualizer3DComponent } from '@BT/srims-visualizer';
import { Subscription, Subject } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';
import { UtilityService } from './../shared/services/utility.service';
import { CP_ERROR } from './../shared/constants/error.constant';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { OrderIdService } from '../shared/services/order-id.service';
import { DeviceRecovery } from '../shared/constants/device-recovery.constant';
import { AppRegExpressionsConfig } from './../shared/literals/app.regex';
/** Chassis Component is to perform operation on chassis and shelf image
 *  @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-viewer',
  templateUrl: './chassis-viewer.component.html',
  styleUrls: ['./chassis-viewer.component.scss']
})
export class ChassisViewerComponent implements OnInit, OnDestroy {
  /** LeftPanelData */
  leftPanelInfo = {};
  /** LeftPanelTitle */
  leftPanelTitle: string;
  showclearAllBtn = false;
  /** ImageData */
  visualizerData: any;
  /** display chassis image */
  enable3dData = false;
  /** RightPanelData */
  rightPanelInfo: any = [];
  /** RightPanelStatusData */
  rightPanelStatusList: any[] = [];
  /** RightPanelProductData */
  rightPanelProductList: any[] = [];
  /** store tooltipData */
  tooltipdata: any = [];
  Siteheading: any;
  selectionDetails;
  requestData;
  /** RightPanelPeoductData */
  rightPanelSpeedList: any[] = [];
  /** expand left panel is true */
  resizeLeftPanel = false;
  /** store entire retrievejson api response */
  deviceData: any;
  /** store deviceInfo */
  deviceInfo: any;
  /** change the boolean value when there is a change in navigator and device */
  deviceChangeEvent = false;
  /** selected NodeId from navigator */
  selectNodeBasedonIds = [];
  getServiceReqData = [];
  /** store list of SNE */
  snePrevNext = [];
  /** store prev sne */
  prevSne: any;
  /** store next sne */
  nextSne: any;
  /** to enable prev button */
  isUpDisabled = false;
  /** to enable next button */
  isDownDisabled = false;
  /** display loader when true */
  showLoader = false;

  /** sneid changed */
  changedsneid;
  /** NavigatorData */
  navigatorData = {};
  /** store the service tab data on click on port/card */
  getServiceData = [];
  filters = {};
  /** DeviceVisualizer3D options */
  options = VisualizerOptions;
  /** sneId */
  sneId: string;
  /** siteName */
  siteName: string;
  productType = 'ALL';
  opencufinflightpopup = 0;
  showhidecuf = false;
  /** Default product list in right panel */
  productName: any[] = ['broadband', 'ethernet', 'backhaul', 'p2pe', 'voice', 'infrastructure', 'blocked', 'prtc'];
  /** Default status list in right panel */
  statusName: any[] = [0, 1, 2, 3, 4, 5, 6];
  speedName: any[] = ['GigE', '10GigE', '100GigE', 'FastE'];
  @ViewChild(DeviceVisualizer3DComponent, { static: false }) visualizer: DeviceVisualizer3DComponent;
  /** Get the DSR page SNE and load 3dpage */
  navigateDSRTo3DBySNE$: Subscription;
  /** Get the DSR page siteName and load 3dpage */
  navigateDSRTo3DBySiteName$: Subscription;
  /** Get the CDPR Page Data and load 3dpage */
  navigateCDPRTo3D$: Subscription;
  enableworlflow$: Subscription;
  datato3dfrom360$: Subscription;
  workflowtopage$: Subscription;
  navigateCBPTo3DByRowData$: Subscription;
  /** disable all the action */
  clearActionListArray: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  /** editMode should be false by default */
  editMode = false;
  workflowenable = false;
  cardmoverequest;
  cardmoveeditrequest;
  activestatus;
  clearAllplanvalue = false;
  disableinputfield = false;
  actiondisable = false;
  srcObject;
  destinationobj;
  enablenextbutton = false;
  enableplanwindow = false;
  sourceSlot;
  planvalue = '';
  planBtn = false;
  defaultInfo: any;
  cardmoveedit;
  cardmoveeditstatus;
  sneid;
  deltaEnable = false;
  deltavalue;
  originaldeltavalue = [];
  errorMsgService = [];
  cardInfillFlow = false;
  toggleIndex = 0;
  coreImage = false;
  satelitteImgae = false;
  enablvalidationoncard = false;
  selectedPlanDetails = {};
  demandId;
  showEthernet = false;
  redirectngto360 = false;
  savedplanincardinfill = [];
  originalDelta = [];
  closeLeftPlan = false;
  cardInfillData: any;
  modeChangeValue = false;
  speed = '';
  navigatorchildren: any;
  activeObjects: any;
  SASPlan = false;
  CPMType;
  changecountvalue;
  deviceVersion: string;
  lagGroupno: string;
  count = 1;
  enableNOWorlflow$: Subscription;
  enableNOCardMoveWorkflow = false;
  loadWorkflow = true;
  previousStatus$: Subscription;
  previousvalue;
  showEmailPopup = false;
  emailPopup = false;
  cufpopupopen = false;
  emailId: string;
  emails: any;
  cpEmailId: string;
  emailIds: any;
  errorMsg = false;
  showPlanAndMove = false;
  portListResponse: any;
  enableDeviceRecoveryWorkflow$: Subscription;
  enableRecoveryWorkflow = false;
  deviceRecovery = DeviceRecovery;
  orderId = [];
  portMoveOrderId: any;
  enableapicall: any;
  disablenext = false;
  exCode;
  deviceportdetailsdownload;
  /** create object for service */
  constructor(private appService: AppService,
              private navigationService: NavigationService,
              private router: Router,
              private loaderService: LoaderService,
              private utilityService: UtilityService,
              private workflowService: WorkflowService,
              private orderIdService: OrderIdService) {
    this.navigateDSRTo3DBySNE$ = this.navigationService.navigateDSRTo3DBySNE$.subscribe((snevalue) => {
      if (snevalue) {
        this.load3dDataBySNE(snevalue);
      }
    });

    // tslint:disable-next-line:max-line-length
    this.navigateDSRTo3DBySiteName$ = this.navigationService.navigateDSRTo3DBySiteName$.pipe(takeUntil(this.destroy$)).subscribe((siteData) => {
      if (siteData) {
        this.loadSNEByDSRData(siteData);
      }
    });

    this.previousStatus$ = this.workflowService.previousStatus$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.previousvalue = value;
      }
    });

    this.navigateCDPRTo3D$ = this.navigationService.navigateCDPRTo3D$.pipe(takeUntil(this.destroy$)).subscribe((filterData) => {
      if (filterData) {
        this.loadSNEByCDPRData(filterData);
        
      }
    });
    this.navigateCBPTo3DByRowData$ = this.navigationService.navigateCBPTo3DByRowData$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.sneId = value.sneId;
        this.load3dDataBySNE(value.sneId);
        this.cardInfillFlow = true;
        this.cardInfillData = value;
      }
    });
    this.enableworlflow$ = this.workflowService.enableworlflow$.pipe(takeUntil(this.destroy$)).subscribe((workflow) => {
      if (workflow) {
        this.enableNOCardMoveWorkflow = false;
        this.workflowenable = workflow;
      }
    });
    this.enableNOWorlflow$ = this.workflowService.enableNOWorlflow$.pipe(takeUntil(this.destroy$)).subscribe((workflow) => {
      if (workflow) {
        this.enableNOCardMoveWorkflow = workflow;
        this.workflowenable = false;
      }
    });
    this.enableDeviceRecoveryWorkflow$ = this.workflowService.enableDeviceRecoveryWorkflow$.subscribe((workflow) => {
      if (workflow) {
        this.enableRecoveryWorkflow = workflow;
        this.enableNOCardMoveWorkflow = false;
      }
    });
    this.workflowtopage$ = this.workflowService.workflowtopage3d$.pipe(takeUntil(this.destroy$)).subscribe((cardmovedetails) => {
      if (cardmovedetails) {
        this.loadWorkflow = false;
        this.disableinputfield = true;
        this.editMode = true;
        this.cardmoveedit = cardmovedetails.editmode;
        this.cardmoverequest = cardmovedetails.actualrequ;
        this.cardmoveeditrequest = cardmovedetails.workflowredirection;
        this.coreImage = cardmovedetails.coreImage;
        this.satelitteImgae = cardmovedetails.satelitteImgae;
        this.cardmoveeditstatus = cardmovedetails.activeStatus;

        if (this.enableNOCardMoveWorkflow) {
          this.actiondisable = true;
          this.options.selection = 'single';
          this.activestatus = Number(this.cardmoveeditrequest.workflowstatus) + 1;
        } else if (this.enableRecoveryWorkflow) {
          this.activestatus = Number(this.cardmoveeditrequest.workflowStatus) + 1;
        }

        if (this.cardmoveeditstatus === 2 && (this.workflowenable || this.enableNOCardMoveWorkflow)) {
          this.sneid = this.cardmoveeditrequest.sourceSneId;
          this.toggleIndex = this.cardmoveeditrequest.sourceSatelliteShelf;
        }
        if (this.cardmoveeditstatus === 2 && this.enableRecoveryWorkflow) {
          this.sneid = this.cardmoveeditrequest.deviceSneId;
          this.toggleIndex = this.cardmoveeditrequest.deviceSatelliteShelfIndex;
        }
        if (this.cardmoveeditstatus === 4 || this.cardmoveeditstatus === 5) {
          this.sneid = this.cardmoveeditrequest.destinationSneId;
          this.toggleIndex = this.cardmoveeditrequest.destinationSatelliteShelf;
        }
        if (this.cardmoverequest.destinationCardType === 'Holder') {
          if (this.cardmoverequest.cardInfillSavePlanRequest === null) {
            if (Number(this.cardmoveeditrequest.workflowstatus) === 5 && this.workflowenable) {
              this.activestatus = 5;
            } else if (Number(this.cardmoveeditrequest.workflowstatus) === 4 && this.enableNOCardMoveWorkflow) {
              this.activestatus = 4;
            }
          }
        }
        this.selectionDetails = {
          'SNE ID': this.sneid,
          'Rack ID': this.cardmoverequest.rackId,
          'Rack Position': this.cardmoverequest.rackPosition,
          'Slot Number': this.cardmoverequest.destinationCardMtosiName,
        };
        this.requestData = {
          productType: this.productType,
          siteName: 'ABERDARE',
          sneId: this.sneid,
          type: this.cardmoverequest.destinationCardType,
          id: this.cardmoverequest.destinationCardMtosiName,
          level: this.cardmoverequest.destinationCardLevel,
          free: this.cardmoverequest.free
        };
        // this.sitename = this.cardmoveeditrequest.siteName;
        this.load3dDataBySNE(this.sneid);
      }
    });
    this.datato3dfrom360$ = this.workflowService.datato3dfrom360$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data) {
        this.loadWorkflow = true;
        if (data.cardmoveenable.workflow) {
          this.cardmoverequest = data.cardmoveenable.cardmovedata;
          this.coreImage = data.coreImage;
          this.satelitteImgae = data.satelitteImgae;
          this.activestatus = Number(this.cardmoverequest.workflowstatus) + 1;
          this.editMode = true;
          this.disableinputfield = true;
          this.actiondisable = true;
          this.options.selection = 'single';
          this.workflowstatusenable();
        }
        if (data.productType) {
          // const url = environment.base_url + 'chassis-viewer/delta-info?siteName=' + data.siteName + '&productType=' + data.productType;
          this.productType = data.productType;
          this.originaldeltavalue = data.originaldeltavalue;
          this.originalDelta = data.originalDelta;
          if (data.deltavalue !== undefined && data.deltavalue.length !== 0) {
            this.showEthernet = true;
            this.deltavalue = data.deltavalue;
            this.deltaEnable = data.deltaEnable;
            // this.deltashow(this.deltavalue);
          }
        }
        if (data.savedplanincardinfill) {
          this.savedplanincardinfill = data.savedplanincardinfill;
        }
        if (data.Index) {
          // this.options.deviceIndex = Number(data.Index) - 1;
          this.toggleIndex = data.Index;
        } else {
          this.toggleIndex = 0;
        }
        if (data.deviceRecovery.workflowStatus) {
          this.activestatus = Number(data.deviceRecovery.workflowStatus) + 1;
          this.editMode = true;
          this.disableinputfield = true;
          this.actiondisable = false;
          this.emitDeviceRecoveryData();
        }
        // this.visualizer.triggerMethod('toggle_chassis', [this.toggleIndex]);
        this.load3dDataBySNE(data.sneid);
      }
    });
  }

  /** Apply color on page load */
  ngOnInit() {
    this.filters = {
      productNames: this.productName,
      statusNames: this.statusName,
      portSpeeds: this.speedName
    };
    this.cpEmailId = this.appService.getEmail();
    this.getNOEmailIdByEIN();
  }

  /** load cardInfill request */
  loadCardInfillData() {
    this.actiondisable = false;
    this.enableplanwindow = true;
    this.editMode = true;
    this.workflowenable = false;
    this.enableNOCardMoveWorkflow = false;
    this.productType = 'ALL';
    if (this.productType === 'Ethernet') {
      this.showEthernet = true;
      this.demandId = 'HE';
    } else {
      this.demandId = '';
    }

    const portId = [];
    if (this.cardInfillData.cardInFillType === 'New 7210 SAS') {
      const ports = this.cardInfillData.slot.split(',');
      ports.forEach((value) => {
        let val = '';
        const slot = value.split('=');
        slot.splice(0, 1);
        slot.forEach((index) => {
          val += index.substring(0, 2);
        });
        portId.push(val);
      });
      this.SASPlan = true;
      this.requestData = {
        productType: this.productType,
        siteName: this.cardInfillData.siteName,
        sneId: this.sneId,
        type: this.cardInfillData.type,
        id: [this.cardInfillData.slot],
        newSas: true
      };
      this.selectionDetails = {
        'SNE ID': this.cardInfillData.sneId,
        'Rack ID': this.cardInfillData.rackId,
        'Rack Position': this.cardInfillData.rackPostion,
        'Port Numbers': portId
      };
    } else {
      this.selectedPlanDetails['portId'] = [];
      this.selectionDetails = {
        'SNE ID': this.cardInfillData.sneId,
        'Rack ID': this.cardInfillData.rackId,
        'Rack Position': this.cardInfillData.rackPostion,
        'Slot Number': this.cardInfillData.slot,
      };
      this.requestData = {
        productType: this.productType,
        siteName: this.cardInfillData.siteName,
        sneId: this.sneId,
        type: this.cardInfillData.type,
        id: this.cardInfillData.slot,
        level: this.cardInfillData.level,
        free: this.cardInfillData.free,
        newSas: false
      };
    }

    this.selectedPlanDetails = {
      id: this.cardInfillData.id,
      updateId: Math.floor(Math.random() * 100),
      productType: this.productType,
      checked: this.cardInfillData.checked,
      cpDate: this.cardInfillData.cpDate,
      cpNumber: this.cardInfillData.cpNumber,
      portAvailability: this.cardInfillData.portAvailability,
      projectId: this.cardInfillData.projectId,
      status: this.cardInfillData.status,
      demandType: this.demandId,
      type: this.cardInfillData.type,
      sneId: this.cardInfillData.sneId,
      cardInfillType: this.cardInfillData.cardInFillType,
      slotNumber: this.cardInfillData.slot,
      slot: this.cardInfillData.slot,
      rackId: this.cardInfillData.rackId,
      rackPosition: this.cardInfillData.rackPostion,
      siteName: this.cardInfillData.siteName,
      level: this.cardInfillData.level,
      free: this.cardInfillData.free
    };
  }

  /** load left panel info based on sne */
  loadLeftPanelInfo(data, title) {
    this.leftPanelInfo = data;
    this.leftPanelTitle = title;
    this.lagGroupno = data.info['Lag Group No'];
  }

  /** load right panel info based on sne */
  loadRightPanelInfo(data) {
    this.rightPanelInfo = data.deviceInfo;
    const sneValue = data.deviceInfo.deviceDetails.filter(d => d.title === 'SNE ID');
    const cpmType = data.deviceInfo.deviceDetails.filter(d => d.title === 'CPM Type');
    const deviceVersion = data.deviceInfo.deviceDetails.filter(d => d.title === 'Device Version');
    const exCode = data.deviceInfo.deviceDetails.filter(d => d.title === '1141 Code');
    if (this.siteName !== undefined && this.siteName !== data.deviceInfo.siteName) {
      this.deltaEnable = false;
    }
    this.sneId = sneValue[0].value;
    this.CPMType = cpmType[0].value;
    this.deviceVersion = deviceVersion[0].value;
    this.exCode = exCode[0].value;
    this.siteName = data.deviceInfo.siteName;
    this.rightPanelProductList = data.productList;
    this.rightPanelSpeedList = data.portSpeedList;
    this.rightPanelStatusList = data.statusList;
    // this.rightPanelStatusList	= [{
    //   "statusName": "Free",
    //   "statusColor": "#003C0F",
    //   "isActive": true,
    //   "value": 0
    // },
    // {
    //   "statusName": "Used",
    //   "statusColor": "#005C7B",
    //   "isActive": true,
    //   "value": 1
    // },
    // {
    //   "statusName": "Reserved",
    //   "statusColor": "#543907",
    //   "isActive": true,
    //   "value": 2
    // },
    // {
    //   "statusName": "Inflight",
    //   "statusColor": "#e3db10",
    //   "isActive": true,
    //   "value": 3
    // },
    // {
    //   "statusName": "Cabled Up",
    //   "statusColor": "#6bdbce",
    //   "isActive": true,
    //   "value": 4
    // },
    // {
    //   "statusName": "Un-Cabled",
    //   "statusColor": "#fd6500",
    //   "isActive": true,
    //   "value": 5
    // },
    // {
    //   "statusName": "SAS connected",
    //   "statusColor": "#FF0000",
    //   "isActive": true,
    //   "value": 6
    // }]
  }

  /** Listen event when there is a change in visualizer structure */
  listenToEvents(event) {
    console.log(event);

    // this.disableinputfield = true;
    // if(this.workflowenable) {
    //    setTimeout(() => (this.disableinputfield = true));
    // } else {
    //    setTimeout(() => (this.disableinputfield = false));
    // }
    this.showhidecuf = false;
    switch (event.name) {
      case 'ready':
        // this.visualizer.triggerMethod( 'filter', [this.filters]);
        // tslint:disable-next-line:max-line-length
        this.visualizer.triggerMethod('multi_status_filter', [this.filters['productNames'], this.filters['statusNames'], this.filters['portSpeeds']]);
        // tslint:disable-next-line:max-line-length
        // this.visualizer.visualizer.multi_status_filter(this.filters['productNames'], this.filters['statusNames'], this.filters['portSpeeds']);
        break;
      case 'deviceClick':
        const data = event.data.data.detail;
        this.deviceInfo = event.data.data.detail.currentObject.info;
        const selectedInfo = data.currentObject.info;
        this.loadLeftPanelInfo(selectedInfo, selectedInfo.header);
        this.getSelecteduuids(data.activeObjects);
        this.getSelectedModelIds(data.activeObjects);
        this.getServiceDetails();
        this.showClearAllButton(data.activeObjects);
        this.defaultInfo = this.deviceData.defaultInfo;
        this.deviceChangeEvent = !this.deviceChangeEvent;
        this.activeObjects = event.data.data.detail.activeObjects;
        this.clearActionListArray = false;
        this.modeChangeValue = false;
        const regularexpslot = /^slot=/;
        const slotres = this.deviceInfo.info.MTOSIName.split('/');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < slotres.length; i++) {
          if (regularexpslot.test(slotres[i])) {
            this.sourceSlot = slotres[i].substring(slotres[i].indexOf('=') + 1, slotres[i].length);
          }
        }
        if (this.workflowenable || this.enableNOCardMoveWorkflow) {
          if (this.cardmoveedit) {
            this.cardeditmode();
          } else {
            this.validateCard();
          }
        }
        this.selectionDetails = {
          'SNE ID': this.sneId,
          'Rack ID': this.deviceData.defaultInfo.info.RackID,
          'Rack Position': this.deviceData.defaultInfo.info.RackPosition,
          'Slot Number': this.deviceInfo.info.MTOSIName,
        };
        this.requestData = {
          productType: this.productType,
          siteName: this.siteName,
          sneId: this.sneId,
          type: this.deviceInfo.info.Type,
          id: this.deviceInfo.info.MTOSIName,
          level: this.deviceInfo.info.Level,
          free: this.deviceInfo.info.Free
        };
    }
  }

  /** Expand left panel when event is true */
  expandLeftPanel(event) {
    this.resizeLeftPanel = event;
  }

  /** Emitter method from chassis right panel- when there is change in right panel checkbox */
  modifyColorParmater(filters) {
    this.visualizer.triggerMethod('multi_status_filter', [filters['productNames'], filters['statusNames'], filters['portSpeeds']]);
    // this.visualizer.visualizer.multi_status_filter(filters['productNames'], filters['statusNames'], filters['portSpeeds']);
  }

  /** Emitter method from chassis header while selecting sne - load 3d page based on sne */
  load3dDataBySNE(sneid) {
    this.deviceportdetailsdownload = environment.base_url + 'generateJson/device-port-details-download?deviceId=' + sneid;
    this.showclearAllBtn = false;
    this.clearActionListArray = true;
    this.load3dModelData(sneid);
    this.loadNavigatorData(sneid);
    this.loadListofSne(sneid);
    this.gettabledataapollo(sneid);
    
    this.changecountvalue = 1;

    setTimeout(() => {
      this.changecountvalue = 0;
    },  100);

    if (this.count === 2) {
      this.clearAllplanvalue = true;
    }
    this.count++;
  }

  /** load 3d data based on SNE */
  load3dModelData(sneid) {
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    this.enable3dData = false;
    const url = environment.base_url + 'generateJson/retrieve-jsonData?sneId=' + sneid;
    this.appService.get(url).subscribe(response => {     
      this.options.deviceIndex = this.toggleIndex;
      this.enable3dData = true;
      // convert date to a string in UTC timezone format:
      this.deviceData = response['modelData'];
      this.visualizerData = this.deviceData;
      this.loadLeftPanelInfo(this.deviceData.defaultInfo, this.deviceData.defaultInfo.title);
      this.loadRightPanelInfo(this.deviceData);
      this.onLoadPrevNextSneId(sneid);
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
      if (this.cardmoveedit) {
        this.cardmoveeditoncircleclick();
      }
      if (this.cardInfillFlow) {
        this.loadCardInfillData();
      }
    });
    this.changedsneid = sneid;
  }

  loadsatellitedata(sneid, shelf) {
    const url = environment.base_url + 'generateJson/retrieve-satellitejson';
    // const url = 'http://10.52.35.46:61010/srimsCDPR/generateJson/retrieve-satellitejson';
    this.appService.getsatellitedata(url, shelf).subscribe(response => {
      this.enable3dData = true;
      this.deviceData = response['modelData'];
      this.visualizerData = this.deviceData;
      this.loadLeftPanelInfo(this.deviceData.defaultInfo, this.deviceData.defaultInfo.title);
      this.loadRightPanelInfo(this.deviceData);
      this.onLoadPrevNextSneId(sneid);
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
    });
  }
  /** load navigator data based on SNE */
  loadNavigatorData(sneid) {
    const url = environment.base_url + 'generateJson/retrieve-navigatorjson?sneId=' + sneid;
    this.appService.get(url).subscribe(response => {
      if (response.data) {
        if (this.workflowenable || this.enableNOCardMoveWorkflow) {
          this.navigatorchildren = Object.assign([], response.data.navigator.nodes[0].children);
          response.data.navigator.nodes[0].children.splice(0, this.navigatorchildren.length);
          response.data.navigator.nodes[0].children.push(this.navigatorchildren[this.toggleIndex]);
          if (response.data.navigator.nodes[0].children.methods) {
            response.data.navigator.nodes[0].children.methods = [];
          }
          this.navigatorData = response.data;
        } else {
          this.navigatorData = response.data;
        }
      }
    });
  }

  /** Emitter method from chassis left panel- while selecting a node */
  ejectDeviceSelection(data) {
    this.deviceInfo = data.currentNodeData;
    this.defaultInfo = this.deviceData.defaultInfo;
    this.deviceChangeEvent = !this.deviceChangeEvent;
    this.clearActionListArray = false;
    this.modeChangeValue = false;
    this.selectNodeBasedonIds = data.selectedNodeId;
    this.showClearAllButton(data.selectedNodeId);
    this.getServiceReqData = data.serviceReqData;
    this.getServiceDetails();
    this.visualizer.triggerMethod('eject_by_id', [data.selectedNodeId]);
    // this.visualizer.ejectDevice(data.selectedNodeId);
    const slotres = this.deviceInfo.info.MTOSIName.split('/');
    const regularexpslot = /^slot=/;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < slotres.length; i++) {
      if (regularexpslot.test(slotres[i])) {
        this.sourceSlot = slotres[i].substring(slotres[i].indexOf('=') + 1, slotres[i].length);
      }
    }
    if (this.workflowenable || this.enableNOCardMoveWorkflow) {
      this.validateCard();
    }
    this.loadLeftPanelInfo(data.currentNodeData, data.currentNodeData.info.header);
    this.selectionDetails = {
      'SNE ID': this.sneId,
      'Rack ID': this.deviceData.defaultInfo.info.RackID,
      'Rack Position': this.deviceData.defaultInfo.info.RackPosition,
      'Slot Number': this.deviceInfo.info.MTOSIName,
    };
    this.requestData = {
      productType: this.productType,
      siteName: this.siteName,
      sneId: this.sneId,
      type: this.deviceInfo.info.Type,
      id: this.deviceInfo.info.MTOSIName,
      level: this.deviceInfo.info.Level,
      free: this.deviceInfo.info.Free
    };
  }

  /** store all the selected uuid to array and pass to chassis left panel to highlight navigator */
  getSelecteduuids(activeObjects) {
    this.selectNodeBasedonIds = [];
    if (activeObjects) {
      activeObjects.forEach((value) => {
        if (this.selectNodeBasedonIds.indexOf(value['object'].srimsId) === -1) {
          this.selectNodeBasedonIds.push(value['object'].srimsId);
        }
      });
    }
  }

  /** Get service tab detail while selecting node */
  getServiceDetails() {
    if (this.getServiceReqData.length) {
      const url = environment.base_url + 'card-move/get-pacs-service';
      this.appService.post(url, this.getServiceReqData).subscribe(response => {
        if (response.data !== null) {
          this.getServiceData = response.data;
          this.errorMsgService = [];
        } else {
          this.errorMsgService = response.message;
        }
      });
    } else {
      this.getServiceData = [];
      this.errorMsgService = [];
    }
  }

  /** store all the model id to array */
  getSelectedModelIds(activeObjects): any {
    this.getServiceReqData = [];
    activeObjects.forEach((value) => {
      if (value['object'].info.info.Type !== 'Holder') {
        if (this.getServiceReqData.indexOf(value['object'].info.model.id) === -1) {
          this.getServiceReqData.push(value['object'].info.model.id);
        }
      } else {
        this.getServiceReqData = [];
      }
    });
  }

  /** load the list of sne associated to site */
  loadListofSne(sneID) {
    const url = environment.base_url + 'chassis-viewer/sne-details-siteName/searchDataSiteName?searchDataSiteName=' + sneID;
    this.appService.get(url).subscribe(response => {
      this.snePrevNext = response;
    });
  }

  /** method is enable prev and next button based on sne */
  onLoadPrevNextSneId(sneID) {
    if (this.snePrevNext.length > 0) {
      // tslint:disable-next-line:radix
      const index = this.snePrevNext.indexOf(parseInt(sneID));
      if (index === 0) {
        if (this.snePrevNext.length > 1) {
          this.isUpDisabled = true;
          this.isDownDisabled = false;
          this.nextSne = this.snePrevNext[index + 1]; // For tooltip
        } else {
          this.isUpDisabled = true;
          this.isDownDisabled = true;
        }
      } else if (index === this.snePrevNext.length - 1) {
        this.isUpDisabled = false;
        this.isDownDisabled = true;
        this.prevSne = this.snePrevNext[index - 1]; // For tooltip
      } else {
        this.isUpDisabled = false;
        this.isDownDisabled = false;
        this.prevSne = this.snePrevNext[index - 1]; // For tooltip
        this.nextSne = this.snePrevNext[index + 1]; // For tooltip
      }
    }
  }

  /** should call when next and prev button is clicked */
  changeSneID(value) {
    let sneId;
    if (value === 'prev') {
      sneId = this.prevSne;
    } else if (value === 'next') {
      sneId = this.nextSne;
    }
    this.selectNodeBasedonIds = [];
    this.getServiceReqData = [];
    this.showclearAllBtn = false;
    this.clearActionListArray = true;
    this.load3dModelData(sneId);
    this.loadNavigatorData(sneId);
  }

  /** method is enable clearall button */
  showClearAllButton(data) {
    if (data.length > 0) {
      this.showclearAllBtn = true;
      setTimeout(() => {this.disablenext = false; } , 0);
      this.enableapicall = {};
    } else {
      setTimeout(() => {this.disablenext = true; } , 0);
      this.enableapicall = {};
      this.showclearAllBtn = false;
    }
  }

  /** method is clear all the device and navigator selection selection */
  resetImgvalues() {
    this.clearActionListArray = true;
    this.selectNodeBasedonIds = [];
    this.getServiceReqData = [];
    this.getServiceData = [];
    this.errorMsgService = [];
    // this.visualizer.triggerMethod('eject_by_id', []);
    if (!this.closeLeftPlan) {
      this.showclearAllBtn = false;
      if (this.workflowenable || this.enableNOCardMoveWorkflow) {
        this.actiondisable = true;
      }
    }
    if (!this.workflowenable || this.enableNOCardMoveWorkflow) {
      this.showclearAllBtn = false;
      if (this.visualizer) {
        this.visualizer.ejectDevice([]);
      }
    }
    if (this.deviceData) {
      this.loadLeftPanelInfo(this.deviceData.defaultInfo, this.deviceData.defaultInfo.title);
      // this.loadRightPanelInfo(this.deviceData);
    }
    this.closeLeftPlan = false;
    this.cardInfillFlow = false;
    this.disablenext = true;
  }

  /** Emitter method from chassis header - when mode is getting changed */
  modeChange(editMode) {
    this.deviceInfo = null;
    this.editMode = editMode;
    this.resetImgvalues();
    this.modeChangeValue = true;
  }

  /** should call when page is redirected from DSR to 3D */
  loadSNEByDSRData(siteData) {
    const url = environment.base_url + 'chassis-viewer/snefilterDetailSiteData8/searchType?searchType=' + siteData.searchType;
    this.appService.post(url, siteData).subscribe((sneID) => {
      if (sneID.length) {
        const sneid = sneID[0];
        this.deviceportdetailsdownload = environment.base_url + 'generateJson/device-port-details-download?deviceId=' + sneid;
        this.snePrevNext = sneID;
        this.load3dModelData(sneid);
        this.loadNavigatorData(sneid);
      }
    });
  }

  /** should call when page is redirected from CDPR to 3D */
  loadSNEByCDPRData(filterData) {
    const url = environment.base_url + 'chassis-viewer/snefilterData8';
    this.appService.post(url, filterData).subscribe((sneID) => {
      if (sneID.length) {
        const sneid = sneID[0];
        this.deviceportdetailsdownload = environment.base_url + 'generateJson/device-port-details-download?deviceId=' + sneid;
        this.snePrevNext = sneID;
        this.load3dModelData(sneid);
        this.loadNavigatorData(sneid);
      }
    });
  }

  /** Emitter method from chassis left panel- while clicking on the eyeicon */
  loadChassisByIndex(index) {
    this.showclearAllBtn = false;
    this.selectNodeBasedonIds = [];
    this.getServiceReqData = [];
    this.getServiceData = [];
    // this.visualizer.triggerMethod('eject_by_id', []);
    this.visualizer.triggerMethod('toggle_chassis', [index]);
    this.visualizer.ejectDevice([]);
    // this.visualizer.toggleChassis(index);
  }
  /** apollo 4b show table on right panel(date & staus) @author vijayalakhsmi */
  gettabledataapollo(sneid) {
    const url = environment.base_url + 'notification/get-prtc?sneId=' + sneid;
    this.appService.get(url).subscribe(res => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < res.Phase_Planned_Date.length; i++) {
        const cpdate = res.Phase_Planned_Date[i].Phase_Planned_date;
        const index = cpdate.indexOf('T');
        const date = cpdate.slice(0, index);
        res.Phase_Planned_Date[i].Phase_Planned_date = date;
        this.tooltipdata = res;
      }
      this.tooltipdata = res;
    });
  }

  redirectto360page(data) {
    if (data.redirect) {
      this.Siteheading = data.Sitename;
      this.redirectto360();
    }
  }
  validateCard() {
    this.srcObject = {
      level: this.deviceInfo.info.Level,
      type: this.deviceInfo.info.Type,
      usedportcount: 2
    };
    this.destinationobj = {
      level: this.deviceInfo.info.Level,
      type: this.deviceInfo.info.Type,
      free: this.deviceInfo.info.Free,
      usedportcount: 2,
      freeportcount: 2
    };
    if (this.deviceInfo.info.Type === 'PhysicalPort') {
      this.srcObject['status'] = this.deviceInfo.model.status;
      this.destinationobj['status'] = this.deviceInfo.model.status;
    }
    let uplinkport;
    if (this.coreImage) {
      if (Number(this.sourceSlot) <= 12) {
        this.enablvalidationoncard = true;
      } else {
        this.enablvalidationoncard = false;
      }
    }
    if (this.satelitteImgae) {
      if (Number(this.sourceSlot) < 2) {
        if (this.deviceInfo.info.Uplink) {
          uplinkport = this.deviceInfo.info.Uplink;
        } else {
          uplinkport = 'N';
        }
        if (uplinkport !== 'N') {
          this.enablvalidationoncard = false;
          this.visualizer.ejectDevice([]);
          this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.PORT_MOVE_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        } else {
          this.enablvalidationoncard = true;
        }
      } else {
        this.enablvalidationoncard = false;
      }
    }
    this.cardmoverequest.workflowstatus = this.activestatus - 1;
    if (this.selectNodeBasedonIds.length !== 0) {
      if (this.enablvalidationoncard) {
        if (this.cardmoveedit) {
          if (this.cardmoveeditstatus === 2) {
            this.actiondisable = true;
            this.validateSourceCard(this.srcObject);
          } else if (this.cardmoveeditstatus === 4 || this.cardmoveeditstatus === 5) {
            this.validateDestinationCard(this.srcObject, this.destinationobj);
          }
        } else {
          if (this.activestatus === 2) {
            this.actiondisable = true;
            this.validateSourceCard(this.srcObject);
          } else if (this.activestatus === 4 || this.activestatus === 5) {
            this.validateDestinationCard(this.srcObject, this.destinationobj);
          }
        }
      } else {
        this.actiondisable = true;
        this.enablenextbutton = false;
      }
    } else {
      this.enableplanwindow = false;
      this.enablenextbutton = false;
      this.actiondisable = true;
      this.clearAllplanvalue = false;
    }
    if (this.enableNOCardMoveWorkflow) {
      if (this.enablenextbutton) {
        if (!this.cardmoveedit) {
          this.cardmoverequest.workflowstatus = this.activestatus;
        }
      }
      this.workflowstatusenable();
    }
  }
  validateSourceCard(src) {
    this.enablenextbutton = false;
    // if (Number(this.sourceSlot) <= 12) {
    if (src.type === 'Card' || src.type === 'Plugin') {
      if (src.level === 'Level1' || src.level === 'Level2' || src.level === 'Level3') {
        if (src.usedportcount > 0) {
          this.cardmovedataassign();
          this.enablenextbutton = true;
        }
      }
    } else if (src.type === 'PhysicalPort') {
      if (src.usedportcount > 0) {
        if (src.status === 1 && this.workflowenable) {
          this.enablenextbutton = true;
        } else if (src.status >= 1 && src.status <= 5 && this.enableNOCardMoveWorkflow) {
          this.cardmovedataassign();
          this.enablenextbutton = true;
        } else {
          this.enablenextbutton = false;
          this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.PORT_MOVE_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      }
    } else {
      this.enablenextbutton = false;
      this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CARD_MOVE_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    }
  }

  validateDestinationCard(src, dest): boolean {
    const typeMap1 = ['Card', 'Plugin'];
    const typeMap2 = ['Holder'];
    let levelMap;
    if (this.satelitteImgae && dest.type === 'Card' && dest.free === 'Yes') {
      levelMap = { Level1: ['Level1', 'Level2'], Level2: ['Level1', 'Level2'], Level3: ['Level1', 'Level2', 'Level3'], };
    } else {
      levelMap = { Level1: ['Level1'], Level2: ['Level1', 'Level2'], Level3: ['Level1', 'Level2', 'Level3'] };
    }
    if (Number(this.sourceSlot) <= 12) {
      if (dest.level && this.cardmoverequest.sourceCardLevel) {
        for (const key in levelMap) {
          if (key === this.cardmoverequest.sourceCardLevel) {
            if (Object.values(levelMap[key]).indexOf(dest.level) !== -1) {
              if (dest.type === 'Card' || dest.type === 'Plugin') {
                if (this.cardmoverequest.sourceCardMtosiName !== this.deviceInfo.info.MTOSIName) {
                  this.enablenextbutton = true;
                  this.cardmovedataassign();
                } else {
                  this.enablenextbutton = false;
                  this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CARD_MOVE_SOURCE_DESTINATION_SAME_ERROR,
                      CP_ERROR.SEVERITY.ERROR, 3000);
                }
              } else if (dest.type === 'Holder') {
                this.enablenextbutton = false;
                this.cardmovedataassign();
                return true;
              }
            } else {
              if (this.workflowenable) {
                this.actiondisable = true;
              } else if (this.enableNOCardMoveWorkflow) {
                this.enablenextbutton = false;
                this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CARD_MOVE_LEVEL_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
              }
            }
          }
        }
      } else if (this.cardmoverequest.sourceCardType === 'PhysicalPort') {
        if (dest.type === 'PhysicalPort') {
          if (!this.enableNOCardMoveWorkflow) {
            if (dest.status === 0) {
              this.cardmovedataassign();
            } else {
              this.actiondisable = true;
            }
          } else {
            if (dest.status >= 3 && dest.status <= 5) {
              if (this.cardmoverequest.sourceCardMtosiName !== this.deviceInfo.info.MTOSIName) {
                this.enablenextbutton = true;
                this.cardmovedataassign();
              } else {
                this.enablenextbutton = false;
                this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.CARD_MOVE_SOURCE_DESTINATION_SAME_ERROR,
                    CP_ERROR.SEVERITY.ERROR, 3000);
              }
            } else {
              this.enablenextbutton = false;
              this.utilityService.validateStatus(400, CP_ERROR.ERROR_MESSAGES.PORT_MOVE_ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
            }
          }
        } else {
          this.cardmovedataassign();
        }
      }
    }
  }
  activatenextstatus(event) {
    this.cardmovedataassign();
  }
  cardmovedataassign() {
    const status = this.cardmoveeditstatus ? this.cardmoveeditstatus : this.activestatus;
    if (this.enableNOCardMoveWorkflow) {
      let deviceid;
      if (this.deviceInfo.model) {
        deviceid = this.deviceInfo.model.id;
      } else {
        deviceid = this.deviceInfo.uuid;
      }
      this.speed = this.deviceInfo.model.portSignalType;
      if (this.speed !== undefined) {
        if (this.speed === 'GigE') {
          this.speed = this.speed.replace('GigE', '1G');
        } else {
          this.speed = this.speed.replace('GigE', 'G');
        }
      }
      if (status === 2) {
        this.cardmoverequest.sourceCardId = deviceid;
        this.cardmoverequest.sourceCardLevel = this.deviceInfo.info.Level;
        this.cardmoverequest.sourceCardType = this.deviceInfo.info.Type;
        this.cardmoverequest.productType = null;
        this.cardmoverequest.sourceCardMtosiName = this.deviceInfo.info.MTOSIName;
        this.cardmoverequest.sourceSlot = this.sourceSlot;
        this.cardmoverequest.sourceCardName = this.deviceInfo.info['Spec Name'];
        this.cardmoverequest.free = this.deviceInfo.info.Free;
        this.cardmoverequest.rackId = this.deviceData.defaultInfo.info.RackID;
        this.cardmoverequest.rackPosition = this.deviceData.defaultInfo.info.RackPosition;
        this.cardmoverequest.sourceCardUsedPortsCount = this.srcObject.usedportcount;
        this.cardmoverequest.sourcePortSpeed = this.speed;
        this.cardmoverequest.sourcePortId = this.deviceInfo.info.Name;
        this.redirectto360();
      }
      if (status === 4 || status === 5) {
        this.actiondisable = false;
        if (this.cardmoverequest.destinationCardId !== deviceid) {
          this.activestatus = 4;
          this.clearAllplanvalue = true;
          this.cardmoverequest.destinationCardId = deviceid;
          this.workflowstatusenable();
        }
        this.cardmoverequest.cardInfillSavePlanRequest = null;
        this.cardmoverequest.destinationCardId = deviceid;
        this.cardmoverequest.destinationCardLevel = this.deviceInfo.info.Level;
        this.cardmoverequest.destinationCardType = this.deviceInfo.info.Type;
        this.cardmoverequest.destinationCardMtosiName = this.deviceInfo.info.MTOSIName;
        this.cardmoverequest.destinationCardName = this.deviceInfo.info['Spec Name'];
        this.cardmoverequest.destinationSlot = this.sourceSlot;
        this.cardmoverequest.free = this.deviceInfo.info.Free;
        this.cardmoverequest.rackId = this.deviceData.defaultInfo.info.RackID;
        this.cardmoverequest.rackPosition = this.deviceData.defaultInfo.info.RackPosition;
        this.cardmoverequest.destinationFreePortCount = 3;
        this.cardmoverequest.destinationPortSpeed = this.speed;
        this.cardmoverequest.destinationPortId = this.deviceInfo.info.Name;
        this.cardmoveeditrequest = this.cardmoverequest;
      }
      if (status !== 2) {
        this.enablemovebutton();
      }
    }
  }
  cardmoveeditoncircleclick() {
    let type;
    let ejectslot;
    if (this.workflowenable || this.enableNOCardMoveWorkflow) {
      if (this.cardmoveeditstatus === 2) {
        this.actiondisable = true;
        if (this.cardmoveeditrequest.sourceCardType) {
          type = this.cardmoveeditrequest.sourceCardType;
          ejectslot = this.cardmoverequest.sourceCardId;
        }
      }
    }
    if (this.enableNOCardMoveWorkflow) {
      if (this.cardmoveeditstatus === 4 && this.cardmoveeditrequest.destinationCardType !== 'Holder') {
        if (this.cardmoveeditrequest.destinationCardType) {
          type = this.cardmoveeditrequest.destinationCardType;
          ejectslot = this.cardmoverequest.destinationCardId;
          // this.sourcecarid = ejectslot;
          this.enablemovebutton();
        }
      }
      if (this.cardmoveeditstatus === 4 && this.cardmoveeditrequest.destinationCardType === 'Holder') {
        type = this.cardmoveeditrequest.destinationCardType;
        ejectslot = this.cardmoverequest.destinationCardId;
        this.actiondisable = false;
        this.enableplanwindow = true;
        this.enablemovebutton();
      }
    }
    if (this.enableNOCardMoveWorkflow || this.workflowenable) {
      const popoutuuid = type + ':' + ejectslot;
      setTimeout(() => {
        if (type) {
          this.visualizer.triggerMethod('eject_by_id', [popoutuuid]);
          // this.visualizer.ejectDevice(popoutuuid);
        }
      }, 3000);
      if (this.showEmailPopup) {
        this.emailPopup = true;
      }
      this.workflowstatusenable();
    } else if (this.enableRecoveryWorkflow) {
      setTimeout(() => {
          this.visualizer.triggerMethod('eject_by_id', this.cardmoveeditrequest.ejectDeviceId);
      }, 3000);
      this.emitDeviceRecoveryData();
    }
  }

  cardeditmode() {
    if (this.cardmoveeditstatus === 2) {
      if (this.cardmoverequest.sourceCardId !== '' && this.cardmoveeditrequest.sourceCardId !== this.deviceInfo.model.id) {
        this.cardmoverequest.sourceCardId = this.deviceInfo.model.id;
        this.cardmoveeditrequest = this.cardmoveeditrequest;
        this.cardmoveeditrequest.sourceCardMtosiName = this.deviceInfo.info.MTOSIName;
        this.cardmoveeditrequest.sourceCardId = this.deviceInfo.model.id;
        this.cardmoveeditrequest.sourceCardName = this.deviceInfo.info['Spec Name'];
        this.cardmoveeditrequest.sourceCardLevel = this.deviceInfo.info.Level;
        this.cardmoveeditrequest.sourceCardType = this.deviceInfo.info.Type;
        this.cardmoveeditrequest.free = this.deviceInfo.info.free;
        this.cardmoveeditrequest.rackId = this.deviceData.defaultInfo.info.RackID;
        this.cardmoveeditrequest.rackPosition = this.deviceData.defaultInfo.info.RackPosition;
        this.cardmoverequest = this.cardmoveeditrequest;
      }
      this.validateCard();
    }
    if (this.cardmoveeditstatus === 4 || this.cardmoveeditstatus === 5) {
      if (this.cardmoverequest.destinationCardId !== this.deviceInfo.model.id) {
        this.clearAllplanvalue = true;
        this.activestatus = 4;
        this.cardmoveeditrequest.destinationCardId = this.deviceInfo.model.id;
        this.cardmoveeditrequest.destinationCardId = this.deviceInfo.model.id;
        this.cardmoveeditrequest.destinationCardName = this.deviceInfo.info['Spec Name'];
        this.cardmoveeditrequest.destinationCardMtosiName = this.deviceInfo.info.MTOSIName;
        this.cardmoveeditrequest.destinationCardLevel = this.deviceInfo.info.Level;
        this.cardmoveeditrequest.destinationCardType = this.deviceInfo.info.Type;
        this.cardmoveeditrequest.free = this.deviceInfo.info.free;
        this.cardmoveeditrequest.rackId = this.deviceData.defaultInfo.info.RackID;
        this.cardmoveeditrequest.rackPosition = this.deviceData.defaultInfo.info.RackPosition;
        this.cardmoveeditrequest.cardInfillSavePlanRequest = null;
        this.cardmoverequest = this.cardmoveeditrequest;

      }
      this.validateCard();
    }
    this.workflowstatusenable();
  }
  saveapicall() {
    this.cardmoverequest.workflowstatus = this.activestatus;
    const url = environment.base_url + 'card-move/save-workflow';
    this.appService.post(url, this.cardmoverequest).subscribe(response => {
      const message = response.message;
      if (message === 'success') {
        this.cardmoverequest = response.saveCardMovePlan;
        if (this.activestatus === 2) {
          this.redirectto360();
        }
        if (this.activestatus === 4) {
          this.enableplanwindow = true;
        }
        if (this.activestatus === 4 || this.activestatus === 5) {
          this.cardmoverequest.workflowstatus = this.activestatus;
          if (this.cardmoverequest.workflowstatus < 5) {
            this.activestatus = Number(this.cardmoverequest.workflowstatus) + 1;
          } else {
            this.activestatus = Number(this.cardmoverequest.workflowstatus);
          }
          this.workflowstatusenable();
        }
      } else {
        this.cardmoverequest.workflowstatus -= 1;
        this.enablenextbutton = false;
        this.workflowstatusenable();
        this.enableplanwindow = false;
        this.utilityService.validateStatus(400, message, CP_ERROR.SEVERITY.ERROR, 3000);
      }
    });
  }
  planInCardmove(event) {
    this.activestatus = event;
    this.workflowstatusenable();
  }
  enablemovebutton() {
    this.portMoveOrderId = null;
    this.orderIdService.cardMovePage.subscribe(orderId => {
      this.portMoveOrderId = orderId;
    });
    if (this.cardmoverequest.destinationCardType !== '') {
      this.planBtn = true;
      this.clearAllplanvalue = false;
      if (this.enableNOCardMoveWorkflow) {
          if ((this.cardmoverequest.destinationCardType === 'Card' || this.cardmoverequest.destinationCardType === 'Holder' ||
            this.cardmoverequest.destinationCardType === 'Plugin')) {
              if (this.cardmoverequest.sourceCardType === 'Card' || this.cardmoverequest.sourceCardType === 'Plugin') {
                this.getListOfPorts(this.cardmoverequest.sourceCardId, this.cardmoverequest.destinationCardId);
              }
              if (this.cardmoverequest.destinationCardType === 'Holder') {
                  this.enableplanwindow = true;
              }
          }
      }
    }
  }
  workfowapi() {
    this.showarmovenav();
  }
  closeplanwind() {
    this.closeLeftPlan = true;
    this.enableplanwindow = false;
    this.opencufinflightpopup = 0;
    // tslint:disable-next-line:triple-equals
    if (this.workflowenable) {
      if (Number(this.cardmoverequest.workflowstatus) === 4 || Number(this.cardmoverequest.workflowstatus) === 5) {
        this.showclearAllBtn = true;
        setTimeout(() => {
          this.actiondisable = false;
        }, 0);
      }
    } else if (this.enableNOCardMoveWorkflow) {
      this.previousvalue = 4;
      this.enablenextbutton = false;
      this.workflowstatusenable();
    }

  }
  cufpopup(event) {
    if (event === 1) {
      this.cufpopupopen = true;
    }
  }
  closecufpopup() {
    this.cufpopupopen = false;
    this.opencufinflightpopup  = 2;
    this.showhidecuf = true;
  }
  openleftpanel() {
    this.cufpopupopen = false;
    this.opencufinflightpopup = 1;
    this.showhidecuf = true;
  }
  showarmovenav() {
    if (this.workflowenable) {
      // tslint:disable-next-line:triple-equals
      if (this.cardmoverequest.workflowstatus == 3) {
        this.saveapicall();
      } else {
        this.enableplanwindow = true;
      }
    }
  }
  workflowstatusenable() {
    const obj = {
      cardmoverequest: this.cardmoverequest,
      activestatus: this.activestatus,
      loadWorkflow: this.loadWorkflow,
      enableNextButton: this.enablenextbutton
    };
    setTimeout(() => {
      this.workflowService.status.next(obj);
    }, 100);
  }
  redirectto360() {
    this.redirectngto360 = true;
    if (!this.deltaEnable) {
      this.deltavalue = [];
    }
    const datato3d = {
      sitename: this.rightPanelInfo.siteName,
      productType: this.productType,
      deltavalue: this.deltavalue,
      savedplanincardinfill: this.savedplanincardinfill,
      originalDelta: this.originalDelta,
      deltaEnable: this.deltaEnable
    };
    if (this.workflowenable || this.enableNOCardMoveWorkflow) {
      datato3d['carmoverequest'] = this.cardmoverequest;
    } else {
      datato3d['carmoverequest'] = '';
    }
    this.workflowService.datato360from3d.next(datato3d);
    if (!this.enableNOCardMoveWorkflow) {
      this.router.navigate(['/three60-twod']);
    }
  }
  saveApiforPlan(data) {
    if (data.cardmove) {
      this.cardmoverequest.cardInfillSavePlanRequest = data.planwithcm;
      if (!data.preview && this.workflowenable) {
        this.saveapicall();
      }
      if (this.enableNOCardMoveWorkflow) {
        this.emailPopup = true;
        this.workflowstatusenable();
      }
    }
    if (data.cardinfill) {
      this.originalDelta = data.originalDelta,
        this.savedplanincardinfill = data.planwithcardinfill;
    }
  }

  deltashow(detlavalue) {
    for (const delta of detlavalue.deltaInfo) {
      this.originaldeltavalue.push({ speed: delta.portSpeed, value: delta.deltaValue });
    }
    this.showEthernet = true;
    this.deltavalue = detlavalue.deltaInfo;
    this.deltaEnable = true;
  }
  redirectToOverviewPage() {
    if (this.validateEmail()) {
      if (this.enableNOCardMoveWorkflow) {
        this.errorMsg = false;
        this.formCardMoveRequestObj();
      } else {
        this.errorMsg = false;
        this.formDeviceRecoveryObject();
        this.emitDeviceRecoveryData1();
      }
    } else {
      this.errorMsg = true;
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

  getListOfPorts(sourceCardId, destinationCardId) {
    const data = [];
    const url = environment.base_url + 'card-move/get-ports?sourceCardId=' + sourceCardId + '&destinationCardId=' + destinationCardId +
                '&destinationType=' + this.cardmoverequest.destinationCardType;
    this.appService.get(url).subscribe(response => {
      if (response.status) {
        response.cardMoveOverviewDetails.forEach((value) => {
          const reqData = {
            source_sne: value.sourceSneId,
            source_port: value.sourcePortId,
            destination_sne: value.destinationSneId,
            destination_port: value.destinationPortId,
            fist_Project_No: null,
            capacity_Required_Date: null,
            scheme_Driver: null
          };
          data.push(reqData);
        });
        this.portListResponse = {
          roCallRequestData: {
            orderId: this.portMoveOrderId,
            emailId: this.emailIds,
            fileName: null,
            requestData: data
          }
        };
      } else {
        this.enablenextbutton = false;
        this.workflowstatusenable();
        this.utilityService.validateStatus(400, response.message, CP_ERROR.SEVERITY.ERROR, 5000);
      }
    });
  }

  closeEmailPopup() {
    this.emailPopup = false;
    if (this.enableNOCardMoveWorkflow) {
      this.previousvalue = 4;
      this.cardmoverequest.workflowstatus = 3;
      this.workflowstatusenable();
    }
  }

  nextCardmoveWorkflow(requestData) {
    requestData[0].exCode = this.exCode;
    this.cardmoverequest.cardInfillSavePlanRequest = requestData;
    this.emitNextBtnPortMove();
  }

  emitDeviceRecoveryData() {
    const obj = {
      deviceRecovery: this.deviceRecovery,
      activestatus: this.activestatus,
      enableNextButton: this.enablenextbutton,
      orderId: this.orderId
    };
    setTimeout(() => {
      this.workflowService.deviceRecoveryStatus.next(obj);
    }, 0);
  }
  emitDeviceRecoveryData1() {
    const obj = {
      deviceRecovery: this.deviceRecovery,
      activestatus: this.activestatus,
      enableNextButton: this.enablenextbutton,
      orderId: this.orderId,
      apiproceed: true
    };
    this.enableapicall = obj;
    this.emailPopup = false;
  }

  workflowstatusenable1() {
    const obj = {
      cardmoverequest: this.cardmoverequest,
      activestatus: this.activestatus,
      loadWorkflow: this.loadWorkflow,
      enableNextButton: this.enablenextbutton,
      apiproceed: true
    };
    this.enableapicall = obj;
    this.emailPopup = false;
  }

  showEmailPopupForRecovery() {
    this.orderIdService.cardMovePage.subscribe(orderId => {
      if (orderId) {
        console.log(orderId);
        this.orderId.push(orderId);
      }
    });
    this.formDeviceRecoveryObject();
  }

  getNOEmailIdByEIN() {
    const url = environment.no_Base_url + '/cease-of-backhaul/email-Id';
    this.appService.get(url).subscribe(res => {
      if (Object.keys(res.data).length === 0) {
        this.emailIds = this.cpEmailId;
      } else {
        this.emailIds = res.data.emailId;
      }
    }, (err) => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  formDeviceRecoveryObject() {
    const cardId = [];
    if (this.activeObjects) {
      this.activeObjects.forEach((value) => {
          cardId.push(value['object'].info.model.id);
      });
    }
    this.deviceRecovery.holderName = cardId;
    this.deviceRecovery.RecoveryType = 'Card';
    this.deviceRecovery.ejectDeviceId = this.selectNodeBasedonIds;
    this.deviceRecovery.emailId = this.emailIds;
    this.enablenextbutton = true;
    this.emitDeviceRecoveryData();
  }
  enablenxtrecovery() {
     if (this.orderId.length > 0) {
       this.formDeviceRecoveryObject();
       this.emitDeviceRecoveryData1();
    } else {
       this.emailPopup = true;
    }
  }

  emitNextBtnPortMove() {
    if (this.portMoveOrderId !== null) {
      this.formCardMoveRequestObj();
    } else {
      this.emailPopup = true;
    }
  }

  formCardMoveRequestObj() {
    if (this.cardmoverequest.destinationCardType === 'PhysicalPort') {
      const reqObj = {
        roCallRequestData: {
          orderId: this.portMoveOrderId,
          emailId: this.emailIds,
          fileName: null,
          requestData: [{
            source_sne: this.cardmoverequest.sourceSneId,
            source_port: this.cardmoverequest.sourcePortId,
            destination_sne: this.cardmoverequest.destinationSneId,
            destination_port: this.cardmoverequest.destinationPortId ? this.cardmoverequest.destinationPortId : null,
            fist_Project_No: null,
            capacity_Required_Date: null,
            scheme_Driver: null
          }]
        }
      };
      this.orderIdService.setPortMoveRequestObj(reqObj);
      this.workflowstatusenable1();
    } else if (this.cardmoverequest.destinationCardType === 'Card' || this.cardmoverequest.destinationCardType === 'Plugin') {
      this.orderIdService.setPortMoveRequestObj(this.portListResponse);
      this.workflowstatusenable1();
    } else if (this.cardmoverequest.destinationCardType === 'Holder') {
      if (this.cardmoverequest.sourceCardType === 'PhysicalPort') {
        const holder = this.cardmoverequest.destinationCardId.split('');
        const reqObj = {
          roCallRequestData: {
            orderId: this.portMoveOrderId,
            emailId: this.emailIds,
            fileName: null,
            requestData: [{
              source_sne: this.cardmoverequest.sourceSneId,
              source_port: this.cardmoverequest.sourcePortId,
              destination_sne: this.cardmoverequest.destinationSneId,
              destination_port: holder[holder.length - 1],
              fist_Project_No: null,
              capacity_Required_Date: null,
              scheme_Driver: null
            }]
          }
        };
        this.orderIdService.setPortMoveRequestObj(reqObj);
      } else if (this.cardmoverequest.sourceCardType === 'Card' || this.cardmoverequest.sourceCardType === 'Plugin') {
        this.orderIdService.setPortMoveRequestObj(this.portListResponse);
      }
      this.orderIdService.setCardInfillTableData(this.cardmoverequest.cardInfillSavePlanRequest);
      this.workflowstatusenable1();
      this.emailPopup = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.navigateDSRTo3DBySNE$.unsubscribe();
    this.navigationService.navigateDSRTo3DBySNE.next(null);
    this.navigateDSRTo3DBySiteName$.unsubscribe();
    this.navigationService.navigateDSRTo3DBySiteName.next(null);
    this.navigateCDPRTo3D$.unsubscribe();
    this.navigationService.navigateCDPRTo3D.next(null);
    this.workflowService.datato3dfrom360.next(null);
    this.datato3dfrom360$.unsubscribe();
    this.navigateCBPTo3DByRowData$.unsubscribe();
    this.navigationService.navigateCBPTo3DByRowData.next(null);
  }
}
