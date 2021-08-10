// tslint:disable-next-line:max-line-length
import { Component, ViewChild, OnDestroy, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ElementRef } from '@angular/core';
import { DeviceVisualizer2DComponent } from '@BT/srims-visualizer';
import { NavigationService } from '../shared/services/navigation.service';
import { LoaderService } from '../shared/services/loader.service';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { WorkflowService } from '../shared/services/workflow.service';
import { three60Options } from '../shared/constants/three60option.constant';
import { Subscription } from 'rxjs';
import { TwoddynamicComponent } from './twoddynamic/twoddynamic.component';
import { DynamicpopupcompnentComponent } from './dynamicpopupcompnent/dynamicpopupcompnent.component';
import { SatellitedataComponent } from './satellitedata/satellitedata.component';
import { Workflowfields } from '../shared/constants/workflow.constant';
import { NavigationEnd, Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DeviceRecovery } from '../shared/constants/device-recovery.constant';
/** 360
 * @author Viji
 */

/** This is the 360 page Component */
@Component({
    selector: 'app-three60-twod',
    templateUrl: './three60-twod.component.html',
    styleUrls: ['./three60-twod.component.scss']
})
/** Class contents 360 load functionality */
export class Three60TwodComponent implements OnDestroy {

    /** RightPanelData */
    rightPanelInfo: any[] = [];
    /** RightPanelStatusData */
    rightPanelStatusList: any[] = [];
    /** RightPanelPeoductData */
    rightPanelProductList: any[] = [];
    /** RightPanelTotalportcount */
    rightPanelTotalportcount: any[] = [];
    /** Right panel site name */
    rightPanelnfoSiteName;
    /** loader for 360 */
    showLoader = false;
    /** highligh righpane row dara */
    sneidhoverdata: any;
    /** Right panel speed  */
    rightPanelSpeedList: any[] = [];
    /** inital hide page */
    showHtml = false;
    /** change site name */
    changesitename: any[] = [];
    /** sitename */
    siteheading: string;
    /** list of sne for sitename */
    listofsneidinsitename: any = [];
    /** site name table data */
    sneidtabledata: any = [];
    /** sitename port count data */
    totalportcount: any = [];
    /** declared for scroll scenario */
    lazyenable = false;
    previousbtnenable = false;
    tabIndex = 0;
    limit = 0;
    firstTabData: any = [];
    firstsixdata: any = [];
    selectedSneId: any;
    /** 2d image load div enable */
    enablediv = false;
    enabledivOneimg = false;
    enabledivTwoimg = false;
    deltaEnable = false;
    deltavalue;
    originalDelta = [];
    originaldeltavalue = [];
    savedplanincardinfill = [];
    dropdown = [];
    previousvalue;

    /** Staus & produt default value */
    // tslint:disable-next-line:max-line-length
    productNames = ['MRS_productName_broadband', 'MRS_productName_ethernet', 'MRS_productName_backhaul', 'MRS_productName_p2pe', 'MRS_productName_voice', 'MRS_productName_infrastructure', 'MRS_productName_blocked', 'MRS_productName_prtc'];
    statusNames = ['MRS_status_0', 'MRS_status_1', 'MRS_status_2', 'MRS_status_3', 'MRS_status_4', 'MRS_status_5', 'MRS_status_6'];
    portSpeeds = ['MRS_portSpeed_GigE', 'MRS_portSpeed_10GigE', 'MRS_portSpeed_100GigE', 'MRS_portSpeed_FastE'];

    /** data to 2d package  */
    deviceConfiguration;
    satellitecountlength;
    shelfnumber;
    deviceData: any;
    twodsneurl = [];
    satelliteshelf = [];
    satshelcounter = 0;
    counter = 0;
    satelliteeData: any;
    /** 3d page navigation */
    navigateCDPRTo360$: Subscription;
    /** dynamic component name */
    componentRef: ComponentRef<any>;
    popupcomponentRef: ComponentRef<any>;
    satellitecontainerrRef: ComponentRef<any>;
    /** popup data */
    popup = false;
    satellitecontainer = false;
    sneidforcardmove;
    toggleIndex = 0;
    coreImage = false;
    satelitteImgae = false;
    /** workflow enable */
    enableworlflow$: Subscription;
    datato360from3d$: Subscription;
    workflowtopage$: Subscription;
    workflowenable = false;
    activestatus = 0;
    cardmoverequest = Workflowfields;
    disablesearchnput = false;
    /** card move fields */
    cardmoveeditrequest;
    cardmoveeditstatus;
    cardmoveedit;
    productType;
    cardinfillsitename = '';
    statusArray: any = [];
    /** filter list */
    filters;
    /** No of devide perload if more than 6 */
    deviceperload;
    /** gif loader  */
    loader = false;
    loaderpopup = false;
    /** Loaded device count */
    totalnumberofDevice;
    statusArray_val = [];
    /** uplink port count for satellite image */
    uplinkport;
    /** api response for each sneid */
    sneidapi_response;
    /** cardmove next button field */
    enableNextButton = false;
    /** cardmove subscribtion */
    enableNOWorlflow$: Subscription;
    enableNOCardMoveWorkflow = false;
    /** show workflow in ui */
    loadWorkflow = true;
    /** cardmove previous button field */
    previousStatus$: Subscription;
    enableDeviceRecoveryWorkflow$: Subscription;
    enableRecoveryWorkflow = false;
    deviceRecovery = DeviceRecovery;
    navigationSubscription: Subscription;
    /** Constructor to inject app service */
    // tslint:disable-next-line:max-line-length
    constructor(private appService: AppService, private router: Router, private loaderService: LoaderService, private navigationService: NavigationService, private resolver: ComponentFactoryResolver, private workflowService: WorkflowService) {
        /** cdpr to 360  navidation function  */
        this.navigateCDPRTo360$ = this.navigationService.navigateCDPRTo360$.subscribe((siteData) => {
            if (siteData) {
                this.productType = siteData.product_type;
                if (siteData.product_type) {
                    // tslint:disable-next-line:max-line-length
                    const url = environment.base_url + 'chassis-viewer/delta-info?siteName=' + siteData.sitename + '&productType=' + siteData.product_type;
                    this.appService.get(url).subscribe(response => {
                        this.deltashow(response);
                    });
                }
                this.load2dDataBySNE(siteData.sitename);
            }
        });
        /** Enable card move */
        this.enableworlflow$ = this.workflowService.enableworlflow$.subscribe((workflow) => {
            if (workflow) {
                this.workflowenable = workflow;
                this.enableNOCardMoveWorkflow = false;
                this.enableRecoveryWorkflow = false;
            }
        });
        this.enableNOWorlflow$ = this.workflowService.enableNOWorlflow$.subscribe((workflow) => {
            if (workflow) {
                this.enableNOCardMoveWorkflow = workflow;
                this.workflowenable = false;
                this.enableRecoveryWorkflow = false;
            }
        });

        this.enableDeviceRecoveryWorkflow$ = this.workflowService.enableDeviceRecoveryWorkflow$.subscribe((workflow) => {
            if (workflow) {
                this.enableRecoveryWorkflow = workflow;
                this.workflowenable = false;
                this.enableNOCardMoveWorkflow = false;
            }
        });

        /** redirect to previous state */
        this.previousStatus$ = this.workflowService.previousStatus$.subscribe((value) => {
            if (value) {
                this.previousvalue = value;
            }
        });
        /** Workflow for 360 page */
        this.workflowtopage$ = this.workflowService.workflowtopage360$.subscribe((cardmovedetails) => {
            if (cardmovedetails) {
                this.loadWorkflow = false;
                this.cardmoveedit = cardmovedetails.editmode;
                // this.workflowenable = true;
                // this.enableNOCardMoveWorkflow = true;
                this.cardmoverequest = cardmovedetails.actualrequ;
                this.cardmoveeditrequest = cardmovedetails.workflowredirection;
                this.cardmoveeditstatus = cardmovedetails.activeStatus;
                if (this.cardmoveeditstatus === 1) {
                    this.disablesearchnput = false;
                } else {
                    this.disablesearchnput = true;
                }
                this.cardmoveedit = cardmovedetails.editmode;
                if (this.enableNOCardMoveWorkflow || this.workflowenable) {
                    if (this.cardmoveeditrequest.workflowstatus < 6) {
                        this.activestatus = Number(this.cardmoveeditrequest.workflowstatus) + 1;
                    } else {
                        this.activestatus = Number(this.cardmoveeditrequest.workflowstatus);
                    }
                    if (this.cardmoverequest.workflowstatus === 5) {
                        if (this.cardmoveeditrequest.cardInfillSavePlanRequest === null) {
                            this.activestatus = 5;
                        }
                    }
                } else if (this.enableRecoveryWorkflow) {
                    this.activestatus = Number(this.cardmoveeditrequest.workflowStatus) + 1;
                }
                this.workflowstatusenable();
                this.emitDeviceRecoveryData();
                if (this.twodcontainer) {
                    this.twodcontainer.clear();
                }
                this.load2dDataBySNE(this.cardmoveeditrequest.siteName);
            }
        });

        /** cardmove 3d data */
        this.datato360from3d$ = this.workflowService.datato360from3d$.subscribe((data) => {
            if (data) {
                this.loadWorkflow = true;
                // tslint:disable-next-line:max-line-length
                const url = environment.base_url + 'chassis-viewer/delta-info?siteName=' + data.sitename + '&productType=' + data.productType;
                if (data.deltaEnable) {
                    this.appService.get(url).subscribe(response => {
                        this.deltashow(response);
                    });
                } else {
                    this.deltaEnable = false;
                }
                this.productType = data.productType;
                this.cardinfillsitename = data.sitename;
                this.cardmoverequest = data.carmoverequest;
                this.activestatus = Number(this.cardmoverequest.workflowstatus) + 1;
                if (this.activestatus === 3) {
                    this.disablesearchnput = true;
                }
                if (data.deltavalue) {
                    setTimeout(() => {
                        this.deltavalue = data.deltavalue;
                    }, 500);
                    this.originalDelta = data.originalDelta;
                    this.deltaEnable = data.deltaEnable;
                }

                if (data.savedplanincardinfill) {
                    this.savedplanincardinfill = data.savedplanincardinfill;
                }
                this.workflowstatusenable();
                this.load2dDataBySNE(data.sitename);
            }
        });
    }

    /** Viewchild to fetch 2d visualizer */
    @ViewChild(DeviceVisualizer2DComponent, { static: false }) visualizer: DeviceVisualizer2DComponent;
    /** Viewchild for loading 2d visualizer */
    @ViewChild('2dcontainer', { static: true, read: ViewContainerRef }) twodcontainer: ViewContainerRef;
    /** Viewchild for loading popup conatiner *//** Viewchild for loading popup conatiner */
    @ViewChild('popupcontainer', { static: true, read: ViewContainerRef }) popupcontainer: ViewContainerRef;
    /** Viewchild for loading satellite image conatiner */
    @ViewChild('satellitecontainerr', { static: true, read: ViewContainerRef }) satellitecontainerr: ViewContainerRef;
    /** Viewchild of parent 2d container */
    @ViewChild('devicePanel', { static: false }) devicePanel: ElementRef;


    /** function to load table and 2d data */
    load2dDataBySNE(sitename) {
        this.showHtml = true;
        this.deviceData = null;
        this.enableNextButton = false;
        this.workflowstatusenable();
        if (this.workflowenable || this.enableNOCardMoveWorkflow) {
            if (this.cardmoverequest.siteName !== sitename) {
                this.activestatus = 1;
                this.previousvalue = 1;
                this.workflowstatusenable();
            }
        } else if (this.enableRecoveryWorkflow) {
            if (this.activestatus === 0) {
                this.activestatus = 1;
                this.previousvalue = 1;
                this.emitDeviceRecoveryData();
            }
        }
        if (this.cardinfillsitename !== sitename && this.cardinfillsitename !== '') {
            this.deltaEnable = false;
        }
        this.loadSiteName(sitename);
        this.load2dtabelData(sitename);
        this.loadtotalportcountdata(sitename);
        this.cardinfillsitename = sitename;
        if (this.sneidapi_response) {
            this.sneidapi_response.unsubscribe();
        }
    }

    /** funaction to get sitename */
    loadSiteName(sitename) {
        const url = environment.base_url + 'site-management/search-site-name-excode?searchParam=' + sitename;
        this.appService.get(url).subscribe(response => {
            this.rightPanelnfoSiteName = this.siteheading;
            this.siteheading = response.Response[0].SiteName;
        });

    }
    /** function to load site name table */
    load2dtabelData(sitename) {
        this.dropdown = [];
        this.cleardynamiccomponent();
        this.loaderService.showHideLoader(true);
        const url = environment.base_url + 'threesixty-viewer/sne-data?siteCode=' + sitename;
        this.appService.get(url).subscribe(response => {
            this.loader = true;
            this.dropdown = [...response.dropdownList]
            this.sneidtabledata = [...response.sneList];
            this.deviceperload = response.noofdeviceperload;
            // this.deviceperload = 1;
            this.listofsneidinsitename = response.sneList.map(sne => sne.sneId);
            this.generateTableData(0);
        });

    }
    /** function to load site name portcount  */
    loadtotalportcountdata(sitename) {
        const url = environment.base_url + 'threesixty-viewer/site-port-data?siteCode=' + sitename;
        this.appService.get(url).subscribe(response => {
            this.totalportcount = response;
        });
    }

    /** function to enable staus,product & speed filter  */
    loadRightPanelInfo(data) {
        this.rightPanelnfoSiteName = data.deviceInfo.siteName;
        this.rightPanelStatusList = data.statusList;
        this.rightPanelProductList = data.productList;
        this.rightPanelSpeedList = data.portSpeedList;
        this.changesitename = [];
        this.changesitename.push(data.deviceInfo.siteName);
    }

    /** function to load 2d data */
    generateTableData(index) {
        this.cleardynamiccomponent();
        const id = document.getElementById('devicepanel');
        id.scrollTop = 100;
        if (this.sneidtabledata.length === 1) {
            this.previousbtnenable = false;
            this.lazyenable = false;
            this.enabledivOneimg = true;
            this.enabledivTwoimg = false;
            this.enablediv = false;
        } else if (this.sneidtabledata.length === 2) {
            this.previousbtnenable = false;
            this.lazyenable = false;
            this.enabledivTwoimg = true;
            this.enablediv = false;
            this.enabledivOneimg = false;
        } else if (this.sneidtabledata.length > 2) {
            this.previousbtnenable = false;
            this.lazyenable = false;
            this.enablediv = true;
            this.enabledivTwoimg = false;
            this.enabledivOneimg = false;
        }
        const finalcount = Math.ceil(this.sneidtabledata.length / 6);
        if (this.deviceperload === 0) {
            this.firstTabData = this.sneidtabledata;
        } else {
            if (index >= 0 && index < finalcount) {
                const i = index * 6;
                if (i + 6 < this.sneidtabledata.length) {
                    this.firstTabData = this.sneidtabledata.slice(i, i + 6);
                } else {
                    this.firstTabData = this.sneidtabledata.slice(i, this.sneidtabledata.length);
                }
                const modules = this.firstTabData.length % 6;
                if (this.sneidtabledata.length > 5) {
                    if (modules <= 3 && modules !== 0) {
                        this.previousbtnenable = true;
                    } else {
                        this.previousbtnenable = false;
                    }
                }
                if (this.sneidtabledata.length > 2) {
                    if (index > 0) {
                        if ((index === (finalcount - 1))) {
                            this.lazyenable = true;
                        } else {
                            this.lazyenable = false;
                        }
                    }
                }
            }
        }
        this.getdatavisulizer(this.firstTabData);
    }
    /** function to retrive sne data from api */
    getdatavisulizer(data) {
        this.showHtml = true;
        if (this.deviceperload === 0) {
            this.firstsixdata = data;
        } else {
            if (data.length >= 6) {
                this.firstsixdata = data.slice(0, 6);
            } else {
                this.firstsixdata = data.slice(0, data.length);
            }
        }
        this.selectedSneId = data.map(sne => sne.sneId);
        this.totalnumberofDevice = this.selectedSneId.length;
        this.twodsneurl = [];
        for (let i = 0; i < this.selectedSneId.length; i++) {
            this.counter = 0;
            this.deviceData = null;
            this.twodsneurl.push(environment.base_url + 'generateJson/retrieve-jsonData?sneId=' + this.selectedSneId[i]);
            // this.loader = false

        }
        this.loadModelData(from(this.twodsneurl), this.selectedSneId);
    }
    /** function to render 2d core image */
    loadModelData(url, sneId) {
        this.loaderService.showHideLoader(true);
        // const url = environment.base_url + 'generateJson/retrieve-jsonData?sneId=' + sneId;
        this.sneidapi_response = url.pipe(concatMap(urlsat => this.appService.get(urlsat)),).subscribe(response => {
            if (response !== null) {
                this.satellitecountlength = response.modelData.childReferenceMap.length;
                if (this.satellitecountlength > 1) {
                    response.modelData.childReferenceMap.splice(1);
                    this.deviceData = response.modelData;
                    
                } else {
                    this.deviceData = response.modelData;
                }
                three60Options.options.target = [];
                three60Options.options.chassisText[0].text = sneId[this.counter];
                three60Options.options.target = [sneId[this.counter]];
                this.deviceConfiguration = three60Options.options;
                const factory = this.resolver.resolveComponentFactory(TwoddynamicComponent);
                this.componentRef = this.twodcontainer.createComponent(factory);
                this.componentRef.instance.deviceConfiguration = this.deviceConfiguration;

                this.componentRef.instance.deviceData = this.deviceData;
                this.componentRef.instance.satellitecount = this.satellitecountlength;
                this.componentRef.instance.enabledivOneimg = this.enabledivOneimg;
                this.componentRef.instance.enabledivTwoimg = this.enabledivTwoimg;
                this.componentRef.instance.enablediv = this.enablediv;
                this.componentRef.instance.firstTabData = this.firstTabData;
                this.componentRef.instance.sneId = sneId[this.counter];
                this.componentRef.instance.hoverdata.subscribe(val => this.sneidhoverdata = val);
                this.componentRef.instance.popupdata.subscribe(val => { if (this.deviceperload !== 0) { this.popupimage(); } /** if (this.deviceperload === 0) {  this.popup = val.val;  this.popupimage();  this.openpopup(val.sneid);} */ });
                this.componentRef.instance.popupsatellitedata.subscribe(val => { this.getsatellitedata(val); });
                // tslint:disable-next-line:max-line-length
                this.componentRef.instance.sneidforcardmove.subscribe(val => { this.sneidforcardmove = val.sneid; this.coreImage = true; this.satelitteImgae = false; });
                this.componentRef.instance.redirectpageto3d.subscribe((val) => { if (val) { this.enableNextButton = true; this.onclickredirect(); } });
                // this.enableNextButton = true;
                if (this.deviceperload !== 0) {
                    this.openpopup(sneId[this.counter]);
                }
                this.deviceData.childReferenceMap[0].renderInfo.sizing.height = 500;
                this.loadRightPanelInfo(response.modelData);
                this.loaderService.showHideLoader(false);
                if (sneId.length - 1 === this.counter) {
                    this.loader = false;
                }
                this.counter++;
            }
            setTimeout(() => {
                this.applyFilter(this.productNames, this.statusNames, this.portSpeeds);
            }, 300);
        });
    }
    /** function to fetch satellite data */
    getsatellitedata(value) {
        this.satellitecontainer = true;
        // tslint:disable-next-line:prefer-for-of
        this.satelliteshelf = [];
        this.satshelcounter = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let a = 0; a < value.length; a++) {
            this.satelliteshelf.push(environment.base_url + 'generateJson/retrieve-satellitejson');
        }
        this.loadSatellitedata(from(this.satelliteshelf), value);
    }
    /** function to render 2d satellite image */
    loadSatellitedata(url, shelf) {
        this.shelfnumber = '';
        url.pipe(concatMap(urlshelf => this.appService.getsatellitedata(urlshelf, shelf[this.satshelcounter])),).subscribe(response => {
            if (response !== null) {
                const index = shelf[this.satshelcounter].indexOf(':');
                const index1 = shelf[this.satshelcounter].indexOf('=');
                const sneid = shelf[this.satshelcounter].slice(0, index);
                this.shelfnumber = shelf[this.satshelcounter].slice(index1 + 1, index1 + 2);
                this.satelliteeData = response.modelData;
                this.uplinkport = response.modelData.uplinkPortInfo;
                this.deviceConfiguration = three60Options.options;
                const factory = this.resolver.resolveComponentFactory(SatellitedataComponent);
                this.satellitecontainerrRef = this.satellitecontainerr.createComponent(factory);
                this.satellitecontainerrRef.instance.deviceConfiguration = this.deviceConfiguration;
                this.satellitecontainerrRef.instance.deviceData = this.satelliteeData;
                this.satellitecontainerrRef.instance.uplinkport = this.uplinkport;
                this.satellitecontainerrRef.instance.Index = this.shelfnumber;
                this.satellitecontainerrRef.instance.shelfnumber = shelf[this.satshelcounter];
                this.satellitecontainerrRef.instance.sneid = sneid;
                // tslint:disable-next-line:max-line-length
                this.satellitecontainerrRef.instance.sneidforcardmovesat.subscribe(val => { this.sneidforcardmove = val.sneid; this.toggleIndex = Number(val.Index) - 1; this.coreImage = false; this.satelitteImgae = true; });
                this.satellitecontainerrRef.instance.redirectpageto3dsat.subscribe((val) => { if (val) { this.enableNextButton = true; this.onclickredirect(); } });
                this.satshelcounter++;
                setTimeout(() => {
                    // this.applyFilter(this.productNames, this.statusNames);
                    this.applyFilter(this.productNames, this.statusNames, this.portSpeeds);
                }, 1000);
            }
        });

    }
    /** function to render popup on core image click */
    openpopup(sneid) {
        this.deviceConfiguration = three60Options.options;
        const factory = this.resolver.resolveComponentFactory(DynamicpopupcompnentComponent);
        this.popupcomponentRef = this.popupcontainer.createComponent(factory);
        this.popupcomponentRef.instance.loaderpopup = true;
        this.popupcomponentRef.instance.deviceperload = this.deviceperload;
        this.popupcomponentRef.instance.deviceConfiguration = this.deviceConfiguration;
        const url = environment.base_url + 'generateJson/retrieve-jsonData?sneId=' + sneid;
        if (this.deviceperload === 0) {
            this.appService.get(url).subscribe(response => {
                response.modelData.childReferenceMap[0].renderInfo.sizing.height = 500;
                this.popupcomponentRef.instance.loaderpopup = false;
                this.popupcomponentRef.instance.deviceData = response.modelData;
                setTimeout(() => {
                    this.applyFilter(this.productNames, this.statusNames, this.portSpeeds);
                }, 100);
            });
        } else {
            this.popupcomponentRef.instance.loaderpopup = false;
            this.popupcomponentRef.instance.deviceData = this.deviceData;

        }
        this.popupcomponentRef.instance.sneid = sneid;

    }
    /** function to enable popup div */
    popupimage() {
        this.popup = true;
    }
    /** function to close popup div */
    closepopup() {
        this.popup = false;
        if (this.deviceperload === 0) {
            if (this.popupcontainer) {
                this.popupcontainer.clear();
            }
        }
    }
    /** function to close satellite popup div */
    closesatpopup() {
        this.satellitecontainer = false;
        if (this.satellitecontainerr) {
            this.satellitecontainerr.clear();
        }
    }
    /** load next and previous 6 data on scroll */
    onScroll(event) {
        const tracker = event.target;
        this.limit = tracker.scrollHeight - tracker.clientHeight;
        const finalcount = Math.ceil(this.sneidtabledata.length / 6);
        if (this.deviceperload !== 0) {
            if (this.tabIndex > 0) {
                if (event.target.scrollTop === 0 && event.target.scrollTop !== this.limit) {
                    setTimeout(() => {
                        this.tabIndex -= 1;
                        this.generateTableData(this.tabIndex);
                    }, 2000);
                }
            }
            if (this.tabIndex < (finalcount - 1)) {
                if (event.target.scrollTop === this.limit && event.target.scrollTop !== 0) {
                    setTimeout(() => {
                        this.tabIndex += 1;
                        this.generateTableData(this.tabIndex);
                    }, 2000);
                }
            }
        }
    }
    /** function to load previous 6 sneid core image */
    loadprevious() {
        this.tabIndex -= 1;
        this.generateTableData(this.tabIndex);
    }
    /** function to scroll back to top */
    scrolltotopfn() {
        this.tabIndex = 0;
        this.lazyenable = false;
        this.generateTableData(this.tabIndex);
    }
    /** function to edit status and product filter  */
    modifyColorParmater(filters) {
        this.filters = filters;
        // this.applyFilter(filters.productNames, filters.statusNames);
        this.applyFilter(filters.filters.productNames, filters.filters.statusNames, filters.filters.portSpeeds);
    }
    /** function to implement filter logic */
    applyFilter = (productNames, statusNames, portSpeeds) => {
        const MRSactiveGroup = document.getElementsByClassName('MRS_is_active');
        Array.from(MRSactiveGroup).forEach((el) => {
            el.classList.remove('MRS_is_active');
        });
        const targets = document.getElementsByClassName('MRS_end_point');
        // tslint:disable-next-line:no-trailing-whitespace
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < targets.length; i++) {
            // tslint:disable-next-line:max-line-length
            if (statusNames.includes(targets[i].classList[1]) && productNames.includes(targets[i].classList[4]) && portSpeeds.includes(targets[i].classList[5])) {
                targets[i].classList.add('MRS_is_active');
            }
        }
    }

    /** function to clear dynamic created component */

    cleardynamiccomponent() {
        if (this.twodcontainer) {
            this.twodcontainer.clear();
        }
        if (this.popupcontainer) {
            this.popupcontainer.clear();
        }
    }
    /** function to redirect to 3d page on sneid click */
    redireto3dchassispage(data) {
        if (this.workflowenable || this.enableNOCardMoveWorkflow) {
            if (this.cardmoveedit) {
                if (this.cardmoveeditstatus === 1) {
                    if (this.cardmoveeditrequest.siteName !== this.siteheading) {
                        this.cardmoverequest.id = '';
                        this.cardmoverequest = this.cardmoveeditrequest;
                        this.cardmoveeditrequest.siteName = this.siteheading;
                        this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                        this.cardmoveeditrequest.sourceSatelliteShelf = data.index;
                        this.activestatus = this.cardmoveeditstatus;
                        if (!this.enableNOCardMoveWorkflow) {
                            this.saveapicall(data.sneid);
                        }
                    }

                    if (this.cardmoveeditrequest.sourceSneId !== data.sneid) {
                        this.cardmoverequest = this.cardmoveeditrequest;
                        this.cardmoveeditrequest.sourceSneId = data.sneid;
                        this.cardmoveeditrequest.sourceSatelliteShelf = data.index;
                        this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                        this.activestatus = this.cardmoveeditstatus;
                        if (!this.enableNOCardMoveWorkflow) {
                            this.saveapicall(data.sneid);
                        }
                    }

                    if (this.coreImage) {
                        if (this.cardmoveeditrequest.sourceSatelliteShelf > 0) {
                            if (this.cardmoveeditrequest.sourceSneId === data.sneid) {
                                this.cardmoverequest = this.cardmoveeditrequest;
                                this.cardmoveeditrequest.sourceSneId = data.sneid;
                                this.cardmoveeditrequest.sourceSatelliteShelf = data.index;
                                this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                                if (!this.enableNOCardMoveWorkflow) {
                                    this.saveapicall(data.sneid);
                                }
                            }
                        }
                    }

                    if (this.satelitteImgae) {
                        if (this.cardmoveeditrequest.sourceSneId === data.sneid) {
                            if (this.cardmoveeditrequest.sourceSatelliteShelf !== data.index) {
                                this.cardmoverequest = this.cardmoveeditrequest;
                                this.cardmoveeditrequest.sourceSneId = data.sneid;
                                this.cardmoveeditrequest.sourceSatelliteShelf = data.index;
                                this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                                if (!this.enableNOCardMoveWorkflow) {
                                    this.saveapicall(data.sneid);
                                }
                            }
                        }
                    }
                    this.redireto3dpage();
                }

                if (this.cardmoveeditstatus === 3) {
                    this.cardmoverequest = this.cardmoveeditrequest;
                    if (this.cardmoveeditrequest.destinationSneId !== data.sneid) {
                        this.cardmoveeditrequest.destinationSneId = data.sneid;
                        this.cardmoveeditrequest.destinationSatelliteShelf = data.index;
                        this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                        this.activestatus = this.cardmoveeditstatus;
                        if (!this.enableNOCardMoveWorkflow) {
                            this.saveapicall(data.sneid);
                        }
                    }

                    if (this.coreImage) {
                        if (this.cardmoveeditrequest.destinationSatelliteShelf > 0) {
                            if (this.cardmoveeditrequest.destinationSneId === data.sneid) {
                                this.cardmoveeditrequest.destinationSneId = data.sneid;
                                this.cardmoveeditrequest.destinationSatelliteShelf = data.index;
                                this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                                if (!this.enableNOCardMoveWorkflow) {
                                    this.saveapicall(data.sneid);
                                }
                            }
                        }
                    }

                    if (this.satelitteImgae) {
                        if (this.cardmoveeditrequest.destinationSneId === data.sneid) {
                            if (this.cardmoveeditrequest.destinationSatelliteShelf !== data.index) {
                                this.cardmoveeditrequest.destinationSneId = data.sneid;
                                this.cardmoveeditrequest.destinationSatelliteShelf = data.index;
                                this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                                if (!this.enableNOCardMoveWorkflow) {
                                    this.saveapicall(data.sneid);
                                }
                            }
                        }
                    }
                }
            } else if (this.activestatus === 1) {
                this.cardmoverequest.id = '';
                this.cardmoverequest.siteName = this.siteheading;
                this.cardmoverequest.sourceSneId = data.sneid;
                this.cardmoverequest.workflowstatus = this.activestatus;
                this.cardmoverequest.sourceSatelliteShelf = data.index;
                if (!this.enableNOCardMoveWorkflow) {
                    this.saveapicall(data.sneid);
                } else {
                    this.redireto3dpage();
                }
            }

            if (this.activestatus === 3) {
                this.cardmoverequest.destinationSneId = data.sneid;
                this.cardmoverequest.destinationSatelliteShelf = data.index;
                this.cardmoverequest.workflowstatus = this.activestatus;
                if (!this.enableNOCardMoveWorkflow) {
                    this.saveapicall(data.sneid);
                } else {
                    this.redireto3dpage();
                }
            }
            this.workflowstatusenable();
        } else if (this.enableRecoveryWorkflow) {
            if (this.cardmoveedit) {
                if (this.cardmoveeditstatus === 1) {
                    if (this.cardmoveeditrequest.siteName !== this.siteheading) {
                        this.deviceRecovery = this.cardmoveeditrequest;
                        this.cardmoveeditrequest.siteName = this.siteheading;
                        this.deviceRecovery.workflowStatus = this.cardmoveeditstatus;
                        this.cardmoveeditrequest.deviceSatelliteShelfIndex = data.index;
                        this.activestatus = this.cardmoveeditstatus;
                    }

                    if (this.cardmoveeditrequest.deviceSneId !== data.sneid) {
                        this.deviceRecovery = this.cardmoveeditrequest;
                        this.cardmoveeditrequest.deviceSneId = data.sneid;
                        this.cardmoveeditrequest.deviceSatelliteShelfIndex = data.index;
                        this.deviceRecovery.workflowStatus = this.cardmoveeditstatus;
                        this.activestatus = this.cardmoveeditstatus;
                    }

                    if (this.coreImage) {
                        if (this.cardmoveeditrequest.deviceSatelliteShelfIndex > 0) {
                            if (this.cardmoveeditrequest.deviceSneId === data.sneid) {
                                this.deviceRecovery = this.cardmoveeditrequest;
                                this.cardmoveeditrequest.deviceSneId = data.sneid;
                                this.cardmoveeditrequest.deviceSatelliteShelfIndex = data.index;
                                this.deviceRecovery.workflowStatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                            }
                        }
                    }

                    if (this.satelitteImgae) {
                        if (this.cardmoveeditrequest.deviceSneId === data.sneid) {
                            if (this.cardmoveeditrequest.deviceSatelliteShelfIndex !== data.index) {
                                this.cardmoverequest = this.cardmoveeditrequest;
                                this.cardmoveeditrequest.deviceSneId = data.sneid;
                                this.cardmoveeditrequest.deviceSatelliteShelfIndex = data.index;
                                this.cardmoverequest.workflowstatus = this.cardmoveeditstatus;
                                this.activestatus = this.cardmoveeditstatus;
                            }
                        }
                    }
                    this.redireto3dpage();
                }
            }
            if (this.activestatus === 1) {
                this.deviceRecovery.siteName = this.siteheading;
                this.deviceRecovery.deviceSneId = data.sneid;
                this.deviceRecovery.workflowStatus = this.activestatus;
                this.deviceRecovery.deviceSatelliteShelfIndex = data.index;
                this.redireto3dpage();
                this.emitDeviceRecoveryData();
            }
        } else {
            this.redireto3dpage();
        }
    }
    /** function to call api to dave carmove data */
    saveapicall(sneid) {
        const url = environment.base_url + 'card-move/save-workflow';
        this.appService.post(url, this.cardmoverequest).subscribe(response => {
            const message = response.message;
            if (message === 'success') {
                this.cardmoverequest = response.saveCardMovePlan;
                this.activestatus = Number(this.cardmoverequest.workflowstatus) + 1;
                this.redireto3dpage();
            } else {
                this.cardmoverequest.workflowstatus -= 1;
            }
        });
    }
    /** function to update workflow status */
    workflowstatusenable() {
        const obj = {
            cardmoverequest: this.cardmoverequest,
            activestatus: this.activestatus,
            loadWorkflow: this.loadWorkflow,
            enableNextButton: this.enableNextButton,
            previousvalue: this.previousvalue
        };
        setTimeout(() => {
            this.workflowService.status.next(obj);
        }, 0);
    }
    /** function to redirect 3d page on device click */
    onclickredirect() {
        const obj = {
            sneid: this.sneidforcardmove,
            index: this.toggleIndex
        };
        this.redireto3dchassispage(obj);
    }
    /** function to enable delta data on header */
    deltashow(detlavalue) {
        for (const delta of detlavalue.deltaInfo) {
            this.originaldeltavalue.push({ speed: delta.portSpeed, value: delta.deltaValue });
        }
        this.deltavalue = detlavalue.deltaInfo;
        this.deltaEnable = true;
    }
    /** function to redirect to 3d page */
    redireto3dpage() {
        let datatoloadpage;
        if (this.cardinfillsitename !== this.siteheading && this.cardinfillsitename !== '') {
            if (this.cardinfillsitename !== undefined) {
                this.deltaEnable = false;
            }
            if (this.productType === undefined) {
                this.productType = 'ALL';
            }
            datatoloadpage = {
                siteName: this.siteheading,
                Index: this.toggleIndex,
                coreImage: this.coreImage,
                satelitteImgae: this.satelitteImgae,
                ProductType: this.productType,
                deltavalue: this.deltavalue,
                deltaEnable: this.deltaEnable,
                sneid: this.sneidforcardmove,
                cardmoveenable: {
                    workflow: (this.workflowenable || this.enableNOCardMoveWorkflow) ? true : false,
                    cardmovedata: this.cardmoverequest
                },
                deviceRecovery: this.deviceRecovery
            };
        } else {
            datatoloadpage = {
                sneid: this.sneidforcardmove,
                Index: this.toggleIndex,
                coreImage: this.coreImage,
                satelitteImgae: this.satelitteImgae,
                productType: this.productType,
                siteName: this.siteheading,
                deltavalue: this.deltavalue,
                deltaEnable: this.deltaEnable,
                originaldeltavalue: this.originaldeltavalue,
                savedplanincardinfill: this.savedplanincardinfill,
                originalDelta: this.originalDelta,
                cardmoveenable: {
                    workflow: (this.workflowenable || this.enableNOCardMoveWorkflow) ? true : false,
                    cardmovedata: this.cardmoverequest
                },
                deviceRecovery: this.deviceRecovery
            };
        }

        this.workflowService.datato3dfrom360.next(datatoloadpage);
        if (!this.enableNOCardMoveWorkflow && !this.enableRecoveryWorkflow) {
            this.router.navigate(['/chassis-viewer']);
        }
    }
    /** function to update selected filter */
    selectedFilters() {
        let filters = {};
        this.selectedStatus().then((statusValue) => {
            this.selectedsubFilters().then((value) => {
                this.statusArray = statusValue;
                this.statusArray = Array.from(new Set(this.statusArray));
                filters = {
                    productNames: this.productNames,
                    statusNames: this.statusArray,
                    portSpeeds: this.portSpeeds
                };
                this.applyFilter(filters['productNames'], filters['statusNames'], filters['portSpeeds']);
            });
        });
    }
    /** function to update selected filter for satellit window */
    selectedsubFilters() {
        return new Promise((resolve, reject) => {
            let substatusArray: any = [];
            let substatusElements = (document.getElementsByName('satsubstatus') as any as HTMLInputElement[]);
            let statusElements = (document.getElementsByName('2dstatus') as any as HTMLInputElement[]);
            let statusArray: any = [];
            let local_arr = [...this.statusArray_val]
            // tslint:disable-next-line:prefer-for-of

            for (let i = 0; i < substatusElements.length; i++) {
                if (substatusElements[i].checked) {
                    substatusArray.push(Number(substatusElements[i].value));
                    this.statusArray_val.push('MRS_status_' + substatusElements[i].value);
                }
            }
            if (substatusElements.length !== substatusArray.length) {
                statusElements[0].checked = false;
                this.statusArray_val.sort().shift();
                local_arr.sort().shift();
            } else {
                statusElements[0].checked = true;
                if (local_arr.indexOf('MRS_status_0') === -1) {
                    this.statusArray_val.sort().unshift('MRS_status_0');
                    local_arr.sort().unshift('MRS_status_0');
                }
            }
            for (let i = 0; i < statusElements.length; i++) {
                if (statusElements[i].checked) {
                    this.statusArray_val.push('MRS_status_' + statusElements[i].value);
                }
            }
            resolve(substatusArray);
        });
    }
    /** load all the selected status value */
    selectedStatus() {
        return new Promise((resolve, reject) => {
            this.statusArray_val = [];
            // tslint:disable-next-line:prefer-const
            let statusElements = (document.getElementsByName('2dstatus') as any as HTMLInputElement[]);
            // tslint:disable-next-line:prefer-const
            let statusArray: any = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < statusElements.length; i++) {
                if (statusElements[i].checked) {
                    this.statusArray_val.push('MRS_status_' + statusElements[i].value);
                }
            }
            resolve(this.statusArray_val);
        });
    }
    /** function to check free is checked or not */
    checkAllFreeStatus(event: any) {
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line:prefer-const
            let substatusElements = (document.getElementsByName('satsubstatus') as any as HTMLInputElement[]);
            if (event.target.id === 'Free') {
                for (let i = 0; i < substatusElements.length; i++) {
                    if (event.target.checked) {
                        substatusElements[i].checked = true;
                    } else {
                        substatusElements[i].checked = false;
                    }
                    if (substatusElements.length - 1 === i) {
                        resolve();
                    }
                }
            }
        });
    }
    /** function to check free status */
    checkFree(event: any) {
        this.checkAllFreeStatus(event).then(() => {
            this.selectedFilters();
        });
    }
    /** function to load sneid based on selection on dropdown */
    slectedvaluefromdropdown(e) {
        if (this.twodcontainer) {
            this.twodcontainer.clear();
        }
        if (this.popupcontainer) {
            this.popupcontainer.clear();
        }
        this.sneidtabledata = e;
        this.generateTableData(0);
    }

    /** function to update workflow status */
    emitDeviceRecoveryData() {
        const obj = {
            deviceRecovery: this.deviceRecovery,
            activestatus: this.activestatus,
            enableNextButton: this.enableNextButton,
            orderId: [],
            previousvalue: this.previousvalue
        };
        setTimeout(() => {
            this.workflowService.deviceRecoveryStatus.next(obj);
        }, 0);
    }

    /** function to destroy all subject and dynamci component */
    ngOnDestroy() {
        this.navigateCDPRTo360$.unsubscribe();
        this.datato360from3d$.unsubscribe();
        this.workflowService.datato360from3d.next(null);
        this.navigationService.navigateCDPRTo360.next(null);
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        if (this.popupcomponentRef) {
            this.popupcomponentRef.destroy();
        }
    }
}
