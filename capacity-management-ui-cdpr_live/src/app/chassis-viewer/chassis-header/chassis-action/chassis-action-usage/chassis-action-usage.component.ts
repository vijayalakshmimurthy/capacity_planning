import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../../../shared/services/app-service';
import { environment } from '../../../../../environments/environment';
/** Chassis usage component is to block a free port
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-action-usage',
  templateUrl: './chassis-action-usage.component.html',
  styleUrls: ['./chassis-action-usage.component.scss']
})
export class ChassisActionUsageComponent implements OnInit {
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
  /** array contains selected level3 cardId */
  @Input() level3;
  /** store emailId */
  @Input() emailId;
  /** cuf port  */
  @Input() physicalportcuf;
  /** Emit value when after action is completed */
  @Output() resetValue = new EventEmitter();
  /** Emit value when leftpane close icon is clicked */
  @Output() closeSideNav = new EventEmitter();
  /** usage dropdown value by default */
  usageFlag = [
    { label: 'Select', value: null },
  ];
  /** error count */
  errCountcuf = 1;

  /** usage from value */
  cufForm = new FormGroup({
    notesN: new FormControl('', [Validators.required]),
    capacityUsage: new FormControl('', [Validators.required]),
    emailIds: new FormControl(this.appService.getEmail(), [Validators.required]),
    entireSnes: new FormControl(false)
  });
  /** response value for reservation api */
  responseValue: any;
  /** Modal properties to display modal */
  commonModelProperties: any;
  /** display success modal when api is success */
  displaySuccessPopup = false;
  /** display error modal when api is throwing error */
  displayErrorPopup = false;
  /** display timeout modal after second try */
  displayTimeoutPopup = false;
  /** table setting header for success modal */
  tableSettingsPopup = {
    headers: [], data: [], scrollHeight: '450px', columnWidthDynamic: false,
    scrollable: true
  };
  /** table setting header for success modal */
  staticColumn = [
    { field: 'SNE_ID', header: 'SNE Id', visible: true },
    { field: 'Card_Details', header: 'Card Details', visible: true },
    { field: 'CUF_values', header: 'CUF Values', visible: true },
    { field: 'Status', header: 'Status', visible: true },
    { field: 'Error_code', header: 'ErrorCode', visible: true },
    { field: 'Error_description', header: 'Error Description', visible: true }
  ];
/** Whole Sne Blocked Dropdown */
disableWholesne = false;
  /** create object for service */
  constructor(private appService: AppService) {
    console.log(this.emailId);
  }

  /** load usage dropdown and setemail in left page */
  ngOnInit() {
    const url = environment.base_url + 'cuf-usage-flag/cuf-usage-list';
    this.appService.get(url).subscribe((data) => {
      const a = data.cufValues;
      for (const i of a) {
        const b = { label: i, value: i };
        this.usageFlag.push(b);
      }
    });
    this.cufForm.get('emailIds').setValue(this.appService.getEmail());
    // this.cufForm.get('emailIds').setValue(this.emailId);
  }

  entirecuf(a) {
    if (a.target.checked === true) {
      this.cufForm.get('capacityUsage').setValue('Blocked');
      this.disableWholesne = true;
    } else {
      this.cufForm.get('capacityUsage').setValue(null);
      this.disableWholesne = false;
    }
  }

  /** should call onclick of submit in leftpane */
  onSubmit() {
    this.cancelLayerdPopup();
    let portvalue;
    if (this.level3.length !== 0) {
      portvalue = this.level3;
    } else {
      portvalue = this.physicalportcuf;
    }
    const data = {
      EIN: this.appService.getEIN(),
      SNE_ID: this.sneId,
      CUF_values: this.cufForm.get('capacityUsage').value,
      Notes: this.cufForm.get('notesN').value,
      EmailId: this.cufForm.get('emailIds').value,
      port: portvalue,
      card: this.cardAvailable,
      EntireSNE: this.cufForm.get('entireSnes').value
    };
    const url = environment.base_url + 'chassis-cufUpdate/CUF-update';
    this.appService.post(url, data).subscribe((response) => {
      this.responseValue = response.CUF_Update;
      this.showModal('Success', this.responseValue);
      this.cancelForm();
      this.resetValue.emit();
    }, (error) => {
      if (this.errCountcuf === 1) {
        this.showModal('Error', this.responseValue);
      } else {
        this.showModal('Timeout', this.responseValue);
        this.cancelForm();
        this.resetValue.emit();
      }
      this.errCountcuf++;
    });
  }

  /** reset form value */
  cancelForm() {
    this.hideSideBar();
    this.cufForm.reset();
    this.cufForm.get('emailIds').setValue(this.appService.getEmail());
  }

  /** close sidenav */
  hideSideBar() {
    this.closeSideNav.emit();
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
}
