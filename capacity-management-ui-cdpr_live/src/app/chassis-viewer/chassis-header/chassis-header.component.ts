import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/app-service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
/** Chassis header component contains read/edit option, searchbox, actions
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-header',
  templateUrl: './chassis-header.component.html',
  styleUrls: ['./chassis-header.component.scss']
})
export class ChassisHeaderComponent implements OnInit, OnChanges {
  /** filterData */
  filterData = [];
  /** placeholder for searchbox */
  searchBoxPlaceHolder = 'Enter SNE';
  editmodedelta = false;
  /** showToogle after data is loaded */
  @Input() showToggle;
  /** showLoader untill get the response from the api */
  @Input() showLoader;
  /** list of sne */
  @Input() snePrevNext;
  /** deviceInfo to perform action */
  @Input() deviceInfo;
  /** change the boolean value when there is a change in navigator and device */
  @Input() deviceChangeEvent;
  /** disable/enable all the action */
  @Input() clearActionListArray;
  /** selected sneId */
  @Input() sneId;
  /** selected siteName */
  @Input() siteName;
  @Input() cardmoveedit;
  @Input() clearAllplanvalue;
  @Input() workflowenable;
  @Input() editMode;
  @Input() disableinputfield;
  @Input() actiondisable;
  @Input() enablenextbutton;
  @Input() enableplanwindow;
  @Input() planvalue;
  @Input() planBtn;
  @Input() cardmoverequest;
  @Input() selectionDetails;
  @Input() requestData;
  /** Emit value onselect the sne from dropdown */
  @Output() load3dDataBySNE = new EventEmitter();
  /** Emit value when mode is changed */
  @Output() modeChange = new EventEmitter();
  /** Emit value when action is completed */
  @Output() resetImgvalues = new EventEmitter();
  @Output() workflow2emit = new EventEmitter();
  @Output() workfowapi = new EventEmitter();
  @Output() closeplanwind = new EventEmitter();
  @Output() cufpopup = new EventEmitter();
  @Output() saveApiforPlan = new EventEmitter();
  @Output() planInCardmove = new EventEmitter();
  /** defaultInfo to perform action */
  @Input() defaultInfo;
  @Input() deltaEnable;
  @Input() deltavalue;
  @Input() cardInfillFlow;
  @Input() demandId;
  @Input() selectedPlanDetails;
  @Input() showEthernet;
  @Input() productType;
  @Input() originaldeltavalue;
  @Input() originalDelta;
  @Input() savedplanincardinfill;
  @Input() activeObjects;
  @Input() SASPlan;
  @Input() CPMType;
  @Input() deviceVersion;
  @Input() enableNOCardMoveWorkflow;
  @Input() previousvalue;
  prevvalue;
  @Input() emailId;
  @Input() opencufinflightpopup;
  @Input() showhidecuf;
  @Output() nextCardmoveWorkflow = new EventEmitter();
  @Input() enableRecoveryWorkflow;
  @Output() showEmailPopup = new EventEmitter();
  @Output() enablenxtrecovery = new EventEmitter();
  @Input() enableapicall;
  @Input() disablenext;
  @Input() deviceportdetailsdownload;
  @Output() emitNextBtnPortMove = new EventEmitter();
  role;

  /** Constructor */
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
  }

  ngOnChanges() {
    this.prevvalue = this.previousvalue;
  }
  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
    if (event) {
      const numbers = /^\d+$/;
      if (numbers.test(event.target.value)) {
        const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
        this.appService.get(url).subscribe(res => {
          if (res.length > 0) {
            this.filterData = JSON.parse(JSON.stringify(res));
          } else {
            this.filterData = [];
          }
        });
      }
    }
  }

  validateInputData(event) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  /** Onselect call service and get DSR data */
  onselectSearch(event) {
    this.resetImgvalues.emit();
    this.load3dDataBySNE.emit(event);
  }

  /** should call when mode is changed */
  modechange(event) {
    this.editMode = event.target.checked;
    this.modeChange.emit(this.editMode);
  }

  /** show list of sne onFocus */
  showListOnFocus() {
    this.filterData = JSON.parse(JSON.stringify(this.snePrevNext));
  }

  /** reset all the 3d selection after action is performed */
  resetImgData() {
    this.resetImgvalues.emit();
  }

  saveworkflow() {
    this.workfowapi.emit();
  }
  closeplanforcm() {
    this.enableplanwindow = false;
    this.closeplanwind.emit();
  }
  opencufpopup(event) {
    this.cufpopup.emit(event);
  }
  planSaveApi(event) {
    this.clearAllplanvalue = false;
    this.saveApiforPlan.emit(event);
  }
  planEditInCardmove(event) {
    this.planInCardmove.emit(event);
  }
  activatenextstatus() {
    this.workflow2emit.emit();
  }

  nextWorkflow(event) {
    this.nextCardmoveWorkflow.emit(event);
  }

  emitRecovery() {
    this.showEmailPopup.emit();
  }
  emitnextclick() {
    this.enablenxtrecovery.emit();
  }

  emitnextBtnPortMove() {
    this.emitNextBtnPortMove.emit();
  }

  redirectToHomePage() {
    if (this.role !== 'no user') {
      this.router.navigate(['/capacity-summary-report']);
    } else if (this.role === 'no user') {
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }
  }
}
