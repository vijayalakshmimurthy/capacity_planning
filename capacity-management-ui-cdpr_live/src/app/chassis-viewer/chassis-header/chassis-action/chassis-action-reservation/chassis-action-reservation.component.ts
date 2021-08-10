import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../shared/services/app-service';
import { environment } from '../../../../../environments/environment';
import { Table } from 'primeng-lts/table';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CP_ERROR } from 'src/app/shared/constants/error.constant';
import { debug } from 'console';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { staticColumnSort, staticColumn } from './chassis-action-reservation-header-constant';
/** Chassis reservation component is to reserve a card/freeport
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-action-reservation',
  templateUrl: './chassis-action-reservation.component.html',
  styleUrls: ['./chassis-action-reservation.component.scss']
})
export class ChassisActionReservationComponent implements OnInit {
  searchBoxPlaceHolder = 'Search...';
  errorMsg = '';
  @Input() disableinputfield;
  filterData = [];
  columns: any = [];
  @Output() load3dDataBySNE = new EventEmitter();
  /** showleft pane */
  @Input() display;
  /** store userType */
  @Input() userType;
  /** array contains selected free portId */
  @Input() portsAvailable;
  /** array contains selected cardId */
  @Input() cardAvailable;
  /** selected sneId */
  @Input() sneId;
  /** store emailId */
  @Input() emailId;
  /** Emit value when leftpane close icon is clicked */
  @Output() closeSideNav = new EventEmitter();
  /** Emit value when after action is completed */
  @Output() resetValue = new EventEmitter();
  /** minimum date */
  minDate: Date;
  /** maximum date */
  maxDate: Date;
  /** expiry date */
  expiryDate: any;
  /** error count */
  errCountreser = 1;
  /** request data for reservation api */
  data;
  /** response value for reservation api */
  responseValue;
  /** Modal properties to display modal */
  commonModelProperties: any;
  /** display success modal when api is success */
  displaySuccessPopup = false;
  /** display error modal when api is throwing error */
  displayErrorPopup = false;
  /** display timeout modal after second try */
  displayTimeoutPopup = false;
  /** Table settings data for success modal */
  tableSettingsPopup = {
    headers: [], data: [], scrollHeight: '450px', columnWidthDynamic: false,
    scrollable: true
  };

  tableSettings = {
    headers: [], data: [], paginator: false, scrollHeight: '55vh',
    columnWidth: '20px', columnHeight: '49px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };

  listOfReservationProjectType = [];
  listOfReservationProjectTypetable = [];
  tableData: any = [1, 2, 5];
  deleteId: number;
  elementList = [];
  listOfReservationProjectType2: number = 1;
  displayCard = false;
  projectpopUp = false;
  deletePopup = false;
  rowForDelete;
  rowForTableDelete;
  displayBasic = false;
  showbutnRows = false;
  popupType = '';
  /** boolean search */
  searchSite = true;
  increment = 0;
  addMode = false;
  headerData: any;
  updateBoolean = false;
  addBoolean = false;
  addhideBoolean = true;
  submitBoolean = false;
  updateHideBoolean = true;
  cancelPopupBoolean = true;
  public userQuestion: string;
  userQuestionUpdate = new Subject<string>();
  /** submit button disable */
  submitValue = true;
  updateValue = true;
  successsfullysubmitted;
  allcheck;
  tableType = '';
  forzen: any = [];
  searchFilter = true;
  /** rowUpdatedSuccessfully object for handling flag of updated data */
  rowUpdatedSuccessfully = { updated: false };
  /** selected list of data in rows */
  checkedArray;
  /** updatedRowObj object for binding updated rows result */
  updatedRowObj = [];
  projectid;
  @Input() confirmDeleteRow;
  @Output() deleteEachRow = new EventEmitter();
  @Output() editrowevent = new EventEmitter();
  /** list of sne */
  @Input() snePrevNext;
  /** table setting header for success modal */
  staticColumn = [
    { field: 'sneId', header: 'SNE Id', visible: true },
    { field: 'portId', header: 'PortId', visible: true },
    { field: 'domainName', header: 'DomainName', visible: true },
    { field: 'tokenID', header: 'TokenId', visible: true },
    { field: 'status', header: 'Status', visible: true },
    { field: 'errorCode', header: 'ErrorCode', visible: true },
    { field: 'errorDescription', header: 'Error Description', visible: true }
  ];
  disPlayfilterPopup = false;
  directPeering = false;
  /** reservation from value */
  reservationForm = new FormGroup({
    domainNames: new FormControl('', [Validators.required]),
    tokenIds: new FormControl('', [Validators.required]),
    calenderDates: new FormControl(''),
    notesN: new FormControl('', [Validators.required]),
    emailIds: new FormControl(this.appService.getEmail(), [Validators.required]),
    entireSnes: new FormControl(false),
    projectType: new FormControl(null),
  });

  /** create object for service */
  constructor(private appService: AppService, private utilityService: UtilityService) {

    const roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    if (roleName === 'PROD_CE_ADMIN') {
      this.userType = 'ADMIN';
    } else {
      this.userType = 'USER';
    }

    // Debounce search.
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        setTimeout(() => {
          //console.log( this.filtesting(value['target'].value),'value');
          this.filterData = this.filtesting(value['target'].value);
        }, 200);

      });

  }
  filtesting(val) {
    return this.elementList.map(x => x.projectType).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  ngOnInit() {
    let nextMonth;
    const today = new Date();
    const month = today.getMonth();
    let year = today.getFullYear();
    // const prevMonth = (month === 0) ? 11 : month - 1;
    // const prevYear = (prevMonth === 11) ? year - 1: year;
     let nextYear =  year
    if (month < 6) {
      nextMonth = (month === 11) ? 0 : month + 6;
    } else if (month >= 6) {
      const reminder = (month % 6);
      nextMonth = reminder;
      nextYear += 1;
    }
    this.minDate = new Date();
    this.minDate.setMonth(month);
    this.minDate.setFullYear(year);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);


    let dd = this.maxDate.getDate();
    let mm = this.maxDate.getMonth() + 1; // January is 0!
 
    // const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = 0 + dd;
    }
    if (mm < 10) {
      mm = 0 + mm;
    }
    this.expiryDate = dd + '/' + mm + '/' + nextYear;
    this.reservationForm.get('emailIds').setValue(this.appService.getEmail());
    console.log(this.emailId)
    this.reservationDropdown();
    // this.headerJson();
    this.updateColumnsOfTable('static');
    this.valueJson();
    // console.log(this.reservationDropdown,'GET api RESERVATION DROPDOWN ON NG ONIT')
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.confirmDeleteRow) {
      const url = environment.base_url + 'card-move/delete-workflow?id=' + this.deleteId;
      this.appService.delete(url).subscribe(result => {
        if (result.message.indexOf('Successfully') !== -1) {
          this.tableData = this.tableData.filter(value => value.id !== this.deleteId);
          //this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        } else {
          // this.utilityService.validateStatus(400, CP_ERROR.STATUS_MESSAGES.FORM_DELETE, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      }, (err) => {
        // this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      });
      this.confirmDeleteRow = false;
    }
  }

  /** should call onclick of submit in leftpane */
  onSubmit() {
    this.cancelLayerdPopup();
    this.loadData();
    const url = environment.base_url + 'chassis-reservation/reservation-details';
    this.appService.post(url, this.data).subscribe((response) => {
      this.responseValue = response.reservationDetails;
      this.showModal('Success', this.responseValue);
      this.cancelForm();
      this.resetValue.emit();
    }, (error) => {
      if (this.errCountreser === 1) {
        this.showModal('Error', this.responseValue);
      } else {
        this.showModal('Timeout', this.responseValue);
        this.cancelForm();
        this.resetValue.emit();
      }
      this.errCountreser++;
    });
  }

  /** load request data */
  loadData() {
    let date = this.reservationForm.get('calenderDates').value;
    if (date === '' || date === null) {
      date = this.expiryDate;
    } else {
      let dd = date.getDate();
      let mm = date.getMonth() + 1; // January is 0!
      const yyyy = date.getFullYear();
      if (dd < 10) {
        dd = 0 + dd;
      }
      if (mm < 10) {
        mm = 0 + mm;
      }
      date = dd + '/' + mm + '/' + yyyy;
    }
    if (this.userType !== 'ADMIN') {
      this.cardAvailable = [];
    }
    this.data = {
      expiryDate: date,
      sneId: this.sneId,
      tokenId: this.reservationForm.get('tokenIds').value,
      notes: this.reservationForm.get('notesN').value,
      emailId: this.appService.getEmail(),
      domainName: this.reservationForm.get('domainNames').value,
      ein: this.appService.getEIN(),
      port: this.portsAvailable,
      card: this.cardAvailable,
      userType: this.userType,
      name: this.appService.getName(),
      entireSne: this.reservationForm.get('entireSnes').value,
      projectType: this.projectid
    };
  }

  /** reset form value */
  cancelForm() {
    this.hideSideBar();
    this.reservationForm.reset();
    this.reservationForm.get('emailIds').setValue(this.appService.getEmail());
  }

  /** close sidenav */
  hideSideBar() {
    this.closeSideNav.emit();
  }

  /** show modal based on service response */
  showModal(popuptype, data) {
    this.displayTimeoutPopup = false;
    this.displayErrorPopup = false;
    if (popuptype === 'Success') {
      this.displaySuccessPopup = true;
      this.tableSettingsPopup.data = data;
      this.tableSettingsPopup.headers = this.staticColumn;
      this.commonModelProperties = {
        popupType: 'informationPopup',
        header: 'Confirmation',
        popSettings: this.tableSettingsPopup,
        footerButtons: 'true',
        dynamicButton: [{ btnName: 'Close', funcName: 'cancel', class: 'btn-modal' }]
      };
    } else if (popuptype === 'Error') {
      this.displayErrorPopup = true;
      this.commonModelProperties = {
        image: '',
        bodyContent: 'Something went wrong !! Want to re-try ?',
        popupType: 'confirmationPopup',
        footerButtons: 'true',
        header: 'Retry',
        dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-modal' },
        { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }],
        width: '748px',
      };
    } else if (popuptype === 'Timeout') {
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
  }

  /** should call onclick of no and close icon in modal */
  cancelLayerdPopup() {
    this.displaySuccessPopup = false;
    this.displayTimeoutPopup = false;
    this.displayErrorPopup = false;
  }
  reservationDropdown() {
    const url = environment.base_url + 'chassis-reservation/projectType?userType=' + this.userType;
    // const url = 'http://10.13.54.64:61012/srimsCDPR/chassis-reservation/projectType?userType=' + this.userType;

    this.appService.get(url).subscribe((response) => {

      this.listOfReservationProjectType = response;
    });
  }

  onkeyPressSearch(event) {

    this.userQuestionUpdate.next(event);
    this.errorMsg = '';
    const numbers = /^\d+$/;
    if (!numbers.test(event.target.value)) {
      if (event.target.value.length > 1) {

        const res = this.tableSettings.data.map(x => x.projectType);

        if (res.length > 0) {
          // this.filterData = JSON.parse(JSON.stringify(res));
        }
        //}

        else {
          //this.filterData = [];
          this.errorMsg = 'No Data found';
        }
        // });
      }
    }
  }
  OnResetSearchInput(event) {
    this.reservationDropdown();
    this.tableSettings.data = [];
    this.headerJson();
    this.valueJson();
    this.tableType = '';


    // this.filterData = [];
  }
  validateInputData(event) {
    const pattern = /[a-z]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  onselectSearch(id) {
    this.tableSettings.data = this.elementList.filter(x => x.projectType == id);
  }

  /** show list of sne onFocus */
  showListOnFocus() {
    this.filterData = JSON.parse(JSON.stringify(this.snePrevNext));
  }

  reset() {
    this.reservationForm.get('projectType').setValue(null);
    this.reservationForm.get('emailIds').setValue(this.appService.getEmail());
  }
  resetTable() {
    this.rowUpdatedSuccessfully.updated = true;
    this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
    this.headerJson();
    this.valueJson();
    this.updateBoolean = false;
    this.cancelPopupBoolean = true;
    this.addhideBoolean = true;
    this.addBoolean = false;
    this.submitBoolean = false;
    this.updateHideBoolean = true;
    this.updateValue = true;
    this.submitValue = true;
    this.searchFilter = true;


  }

  showFilterPopup() {
    this.disPlayfilterPopup = true;
    this.cancelLayerdPopup();
  }
  dropdownChange(a) {
    // this.projectid = ref;
    this.projectid = a.currentTarget.options[a.currentTarget.options.selectedIndex].id;
    if (a.target.value === 'Customize' ) {
      this.projectpopUp = true;
      //const�url�=�'./assets/json/3dreservationheader.json'; 
      this.headerJson();
      this.valueJson();
    }
    if (a.target.value === 'Direct Peering') {
      this.directPeering = true;
    } else {
      this.directPeering = false;
    }
  }
  valueJson() {
    const url = environment.base_url + 'chassis-reservation/projectType?userType=' + this.userType;
    //const url = 'http://10.13.54.64:61012/srimsCDPR/chassis-reservation/projectType?userType=' + this.userType;
    // const url = './assets/json/3djsonreservationvaluefield.json';
    this.appService.get(url).subscribe((response) => {
      // let x = response.filter(y => y.id != 5)
      this.tableSettings.data = response.filter(y => y.id != -1);

      this.elementList = JSON.parse(JSON.stringify(response.filter(y => y.id != -1)));
    });
  }
  headerJson() {
    const url = './assets/json/3dreservationheader.json';
    this.appService.get(url).subscribe((response) => {
      this.tableSettings.headers = response;

    });
  }
  close() {
    this.reset();
    this.reservationDropdown();
    this.projectpopUp = false;
    this.updateBoolean = false;
    this.addBoolean = false;
    this.addhideBoolean = true;
    this.filterData = [];

  }

  //** delete row of table for phase forecast table */
  deleteRow(event) {
    this.rowForDelete = event;
    this.deletePopup = true;
  }
  /** delete cancel popup function for table */
  deleteCancel() {
    this.deletePopup = false;

  }
  /** delete the records in the table */
  deleteOk() {
    this.displayBasic = false;
    this.popupType = '';
    const url = environment.base_url + 'chassis-reservation/projectTypeDeletion?id=' + this.rowForDelete;
   // const url = 'http://10.13.54.64:61012/srimsCDPR/chassis-reservation/projectTypeDeletion?id=' + this.rowForDelete;
    //const url ='http://10.13.54.64:61012/srimsCDPR/chassis-reservation/projectTypeDeletion?id=156314';
    this.appService.delete(url).subscribe(res => {
      const id = this.rowForDelete;
      this.deletePopup = false;
      if (res.message == 'Success') {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.tableData = this.tableData.filter(value => value.id !== this.deleteId);
        this.reservationDropdown();
      } else {
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
      }
      this.resetTable();
    });
  }

  addData2() {
    this.searchFilter = false;
    this.allcheck = true;
    this.checkedArray = [];
    this.addMode = false;
    this.searchSite = false;
    const event = {
      id: this.increment,
      projectType: '',
      //actions: '',
    };
    this.updateColumnsOfTable('addRow');
    this.tableSettings.data.push(event);
    this.increment++;
  }

  addData() {
    this.searchFilter = false;
    this.allcheck = true;
    this.checkedArray = [];
    this.updateBoolean = true;
    this.addBoolean = true;
    this.submitBoolean = true;
    this.updateHideBoolean = false;
    this.cancelPopupBoolean = false;
    this.tableSettings.data = [];
    this.tableSettings.headers = [];
    this.addhideBoolean = false;
    this.updateColumnsOfTable('addRow');
    this.showbutnRows = true;
    this.addMode = false;
    this.searchSite = false;
    const event = {

      id: this.increment,
      projectType: '',
      action: '',
    };
    this.tableSettings.data.push(event);
    this.increment++;
  }
  addRows(event) {
  
    this.searchFilter = false;
    this.checkedArray = event;
  // if (this.checkedArray.filter(x => x.projectType).length > 0 && this.checkedArray.length > 0) {
    if (this.checkedArray.length > 0) {
      this.submitValue = false;
      // this.checkedArray =[];
    } else {
      this.submitValue = true;
    }
   
   // const len = this.headerData.length;
  //  this.tableSettings.headers = this.headerData;
  }
  updateRow(event) {
    if (event != null) {
      this.updateValue = false;
      //this.submitValue = false;
      this.updatedRowObj = [];
      const index = this.updatedRowObj.findIndex(x => x.id === event.id);

      if (index > -1) {
        this.updatedRowObj = this.updatedRowObj.filter(obj => obj.id !== event.id);
      }
      this.updatedRowObj.push(event);
    } else if (event == null) {
      this.updateValue = true;
      // this.submitValue = true;
      // this.updateBoolean = true;
      const len = this.updatedRowObj.length;
      const value = this.updatedRowObj[len - 1];
      Object.keys(value).forEach((key) => { if ((value[key] === '')) { delete value[key]; } });
    }

  }

  updateData() {
    // this.checkedArray =[];
    const url = environment.base_url + 'chassis-reservation/saveProjectType';
    this.appService.post(url, this.updatedRowObj).subscribe(res => {

      // this.appService.post(url,'etts').subscribe(res => {
      if (res.message == 'Success') {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_UPDATE, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.updateBoolean = false;
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));

        this.reservationDropdown();
        this.resetTable();
        // this.projectpopUp=false;
      } else {
        this.utilityService.validateStatus('Info', 'Somthing wrong', CP_ERROR.SEVERITY.ERROR, 5000);
        this.updatedRowObj = [];
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
        this.resetTable();
        this.updateBoolean = false;
      }
      this.updatedRowObj = [];
      this.checkedArray = [];
    });
    this.resetTable();
  }

  onSubmitReservation() {
    this.successsfullysubmitted = true;
    //const url = 'http://10.13.54.64:61012/srimsCDPR/chassis-reservation/saveProjectType';
    const url = environment.base_url + 'chassis-reservation/saveProjectType';
    // this.updatedRowObj = [];

    // this.checkedArray=[];
    // if (this.checkedArray.filter(x => x.projectType).length > 0) {
    let newcheckedArray = this.checkedArray.filter(x => x.projectType != '');
    let blankProjectType = this.checkedArray.filter(x => x.projectType == '').length;
    if (newcheckedArray.length > 0) {

      const pushedArray = [];
      // let x=[];
      newcheckedArray.forEach(element => {
        element.id = 0;
        pushedArray.push(element);
      });
      // console.log(pushedArray);

      this.appService.post(url, pushedArray).subscribe(res => {
        this.successsfullysubmitted = true;
        if (res.message == 'Success') {
          this.tableSettings.data = [];
          this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_SUBMIT, CP_ERROR.SEVERITY.SUCCESS, 3000);
          this.updateBoolean = false;
          this.checkedArray = [];
          this.updatedRowObj = [];
          this.tableType = '';
          this.resetTable();
          this.reservationDropdown();
          // this.projectpopUp=false;
        } else {
          this.tableSettings.data = [];
          this.utilityService.validateStatus('Info', 'Somthing wrong', CP_ERROR.SEVERITY.ERROR, 5000);
          this.checkedArray = [];
          this.resetTable();
          this.updateBoolean = false;

        }
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
        this.updatedRowObj = [];
      });
    }
    else {
      this.utilityService.validateStatus('error', CP_ERROR.ERROR_MESSAGES.CHASSIS_RESERVATION, CP_ERROR.SEVERITY.ERROR, 3000);
      this.updatedRowObj = [];
      this.checkedArray = [];
    }
    this.updatedRowObj = [];
    this.checkedArray = [];
    this.resetTable();

  }

  /** colums defines here for input table */
  updateColumnsOfTable(type) {
    // this.columns = staticColumn;
    this.forzen = staticColumnSort;
    if (type === 'static') {
      this.forzen = staticColumn;
      this.columns = staticColumn;
    } else if (type === 'addRow') {
      this.columns = staticColumnSort;
      // console.log(this.columns);
    }
    this.bindTableProperties(type);
  }

  bindTableProperties(type) {
    this.tableSettings.headers = this.columns;
    if (type === 'static') {
      // this.tableSettings.frozenColumns = [];
      // this.tableSettings.frozenWidth = '';
      this.tableSettings.scrollable = true;
      this.tableSettings.editkey = 'id';
      // this.tableSettings.clientPagnination = false;
    } else if (type === 'addRow') {
      //  this.tableSettings.frozenColumns = this.forzen;
      // this.tableSettings.frozenWidth = '820px';
      this.tableSettings.scrollable = true;
      this.tableSettings.editkey = 'id';
      // this.tableSettings.clientPagnination = false;
    }
  }

}
