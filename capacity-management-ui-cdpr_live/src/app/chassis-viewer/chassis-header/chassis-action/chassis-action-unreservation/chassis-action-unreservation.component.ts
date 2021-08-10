import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../shared/services/app-service';
import { environment } from '../../../../../environments/environment';
import { UtilityService } from '../../../../shared/services/utility.service';
import { CP_ERROR } from '../../../../shared/constants/error.constant';
/** Chassis unreservation component is to unreserve a reserved port
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-action-unreservation',
  templateUrl: './chassis-action-unreservation.component.html',
  styleUrls: ['./chassis-action-unreservation.component.scss']
})
export class ChassisActionUnreservationComponent implements OnInit {
  /** showleft pane */
  @Input() display;
  /** store userType */
  @Input() userType;
  /** array contains selected reserved portId */
  @Input() unReserve;
  /** selected sneId */
  @Input() sneId;
  /** Emit value when after action is completed */
  @Output() resetValue = new EventEmitter();
  /** Emit value when leftpane close icon is clicked */
  @Output() closeSideNav = new EventEmitter();
  @Output() closeUnreserve = new EventEmitter();
  /** store check token api response */
  tokenvalue = null;
  /** error count */
  errCountunreser = 1;
  /** response value for unreservation api */
  responseValue: any;
  /** unreservation from value */
  unReservesForm = new FormGroup({
    domainNames: new FormControl('', [Validators.required]),
    tokenIds: new FormControl('', [Validators.required]),
  });
  /** show unreserve modal for admin */
  showUnReserveModal = false;
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

  /** create object for service */
  constructor(private appService: AppService, private utilityService: UtilityService) { }

  /** load showUnReserveModal modal for admin */
  ngOnInit() {
    if (this.userType === 'ADMIN') {
      this.showUnReserveModal = true;
      this.commonModelProperties = {
        image: '',
        bodyContent: 'Do You want to Un-reserve?',
        popupType: 'confirmationPopup',
        footerButtons: 'true',
        header: 'Confirmation',
        dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-modal' },
        { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }],
        width: '748px',
      };
    }
  }

  /** should call onclick of submit in leftpane */
  onSubmit() {
    this.cancelLayerdPopup();
    let popuptype;
    const data = {
      ein: this.appService.getEIN(),
      sneId: this.sneId,
      domainName: this.unReservesForm.get('domainNames').value,
      tokenId: this.unReservesForm.get('tokenIds').value,
      userType: this.userType,
      portDetail: this.unReserve
    };
    const checkTokenUrl = environment.base_url + 'chassis-reservation/validate-token?portId='
      + this.unReserve[0].Port_ID + '&tokenId=' + this.unReservesForm.get('tokenIds').value + '&domainName='
      + this.unReservesForm.get('domainNames').value;
    this.appService.get(checkTokenUrl).subscribe((response) => {
      this.tokenvalue = response.Token;
      if (response.Token === 'Valid Token and Domain Name') {
        const unReservationUrl = environment.base_url + 'chassis-unreservation/un-reservation-details';
        this.appService.post(unReservationUrl, data).subscribe((responseValue) => {
          this.tokenvalue = '';
          this.responseValue = responseValue.unReservationDetails;
          popuptype =  'Success';
          this.showModal(popuptype, this.responseValue);
          this.cancelForm();
          this.resetValue.emit();
        }, (error) => {
          if (this.errCountunreser === 1) {
            popuptype =  'Error';
            this.showModal(popuptype, this.responseValue);
          } else {
            popuptype =  'Timeout';
            this.showModal(popuptype, this.responseValue);
            this.cancelForm();
            this.resetValue.emit();
          }
          this.errCountunreser++;
        });
      } else {
        this.utilityService.validateStatus(400, this.tokenvalue, CP_ERROR.SEVERITY.ERROR, 3000);
      }
    });
  }

  /** reset form value */
  cancelForm() {
    this.hideSideBar();
    this.unReservesForm.reset();
  }

  /** close sidenav */
  hideSideBar() {
    this.closeSideNav.emit();
  }

  /** Layerd Popup Confirm Function */
  confirmLayerdPopup() {
    let popuptype;
    const data = {
      ein: this.appService.getEIN(),
      sneId: this.sneId,
      domainName: this.unReservesForm.get('domainNames').value,
      tokenId: this.unReservesForm.get('tokenIds').value,
      userType: this.userType,
      portDetail: this.unReserve
    };
    this.showUnReserveModal = false;
    const unReservationUrl = environment.base_url + 'chassis-unreservation/un-reservation-details';
    this.appService.post(unReservationUrl, data).subscribe((response) => {
      this.tokenvalue = '';
      this.responseValue = response.unReservationDetails;
      popuptype =  'Success';
      this.showModal(popuptype, this.responseValue);
      this.cancelForm();
      this.resetValue.emit();
    }, (error) => {
      if (this.errCountunreser === 1) {
        popuptype =  'Error';
        this.showModal(popuptype, this.responseValue);
      } else {
        popuptype =  'Timeout';
        this.showModal(popuptype, this.responseValue);
        this.cancelForm();
        this.resetValue.emit();
      }
      this.errCountunreser++;
    });
  }

  /** Layerd Popup Cancel Function */
  cancelLayerdPopup() {
    this.showUnReserveModal = false;
    this.displaySuccessPopup = false;
    this.displayTimeoutPopup = false;
    this.displayErrorPopup = false;   
    this.closeUnreserve.emit()
  }

  /** show modal based on service response */
  showModal(popuptype, data) {
    if (popuptype === 'Success') {
      this.displaySuccessPopup = true;
      this.tableSettingsPopup.data = data;
      this.tableSettingsPopup.headers = this.staticColumn;
      this.commonModelProperties = {
        popupType: 'informationPopup',
        header: 'Confirmation',
        popSettings : this.tableSettingsPopup,
        footerButtons: 'true',
        dynamicButton: [{ btnName: 'Close', funcName: 'cancel', class: 'btn-modal' }],
        width: '1200px',
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
}
