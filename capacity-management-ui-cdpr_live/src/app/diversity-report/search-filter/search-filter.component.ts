import { Component, OnInit, Input, Output, EventEmitter, Query } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';
/** this component is Filter popup child component of diversity report */
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
/** diversity report all export class are present here */
export class SearchFilterComponent implements OnInit {
  /** diversity report all global class are present here */
  @Input() display;
  /** it is for searchfilter popup */
  @Output() displayChange = new EventEmitter();
  /** it is for sending the obj to the table */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() OnsearchGroup = new EventEmitter<any>();
  @Output() getFilterData = new EventEmitter<any>();
  /** this is form validator in filter popup */
  diversityForm = new FormGroup({
    ports: new FormControl(null, [Validators.required, this.formPortValidation]),
    groupName: new FormControl('', [Validators.required]),
    code: new FormControl('Select Value', [Validators.required]),
    geocode: new FormControl(null)
  });
  /** this is for code/site flage  filter popup */
  flagCode;
  newcode: '';
  searchvalues;
  popData = [];
  code: '';
  groupName: '';
  newport;
  prefixLocation = ['BTRAN-', 'TEF-'];
  popLocation = null;
  @Input() groupData = [];
  selectDrop = false;
  dispSearchbtn = false;
  portsarray = [];
  portsarrayobj = [];
  payload;
  newgroup;
  @Input() checkflag = false;
  checkflaglength = false;
  errorcallDGnameSearch = false;
  constructor(private appService: AppService) {
  }
  ngOnInit() { }
  /** Popup close on the click of cross mark on filter popup */
  onClose() {
    this.flagCode = '';
    this.code = '';
    this.newcode = '';
    this.popLocation = null;
    this.newport = '';
    this.resetFilterAll();
    this.displayChange.emit(false);
  }
  /** to call the code/Site Name autocomplete api in the filter popup */
  onCompleteSiteCode(event: any) {
    const query = event.query;
    const url = environment.base_url + 'site-management/search-site-name?searchParam=' + query;
    this.appService.get(url).subscribe(res => {
      this.popData = res;
    });
  }
  /** To get data for table while selecting any value from search box */
  onSelectSearch(event, formName) {
    if (formName === 'groupName') {
      this.groupName = event;
    } else if (formName === 'code') {
      this.code = event;
      this.flagCode = event;
    }
  }
  /** funtion for code/site Name custom validation */
  formPortValidation(control: FormControl): { [msg: string]: boolean } {
    if (control.value) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(control.value.charCode);
      if ((+control.value > 40 || (+control.value <= 0))) {
        return { portsValid: true };
      }
      return null;
    }
  }
  /** key press function for not entering value other than number. */
  keyPressPopLocation(event: any) {
    const pattern = /[a-z, A-Z, /]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  /** key press function for not entering value other than number. */
  keyPressPort(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPressAdd(event: any) {
    const pattern = /[a-zA-Z0-9_-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  /** to remove the created group in the filter popup */
  removeCode() {
    this.code = '';
    this.newcode = '';
    this.popLocation = null;
    this.newport = '';
    this.resetFilterAll();
  }
  /** to call the DG group name autocomplete api in the filter popup */
  onCompleteGroupName(event: any) {
    const value = this.diversityForm.value.geocode + event.query;
    this.getFilterData.emit(value);
    /* const query = event.query;
    this.checkflag = false;
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    const url = environment.base_url +
    'diversity-group-forecast-management/diversity-group-forecast-data/diversitygroupname?diversitygroupname=' +
    this.diversityForm.value.geocode + query;
    this.appService.get(url).subscribe(res => {
      if (res.length === 0) {
        this.checkflag = true;
      } else {
        this.groupData = res;
      }
    });*/
  }
  /** to submit the code by add button filter popup */
  onSubmitFrom() {
    this.popLocation = this.diversityForm.value.code;
    const x = this.diversityForm.value.groupName.split(/[-_]/);
    const k = this.diversityForm.value.geocode.split('-');
    if (x[0].toLowerCase() === k[0].toLowerCase()) {
      this.serachFilter(true);
      // tslint:disable-next-line: max-line-length
    } else if ((k[0].toLowerCase() === 'btran' && x[0].toLowerCase() === 'tef') || (k[0].toLowerCase() === 'tef' && x[0].toLowerCase() === 'btran')) {
      this.selectDrop = true;
      this.dispSearchbtn = false;
      setTimeout(() => {
        this.selectDrop = false;
      }, 3000);
    } else {
      this.serachFilter(false);
    }
  }
  serachFilter(value) {
    if (this.portsarray.length !== 5) {
      if (value) {
        this.dispSearchbtn = true;
        this.payload = this.diversityForm.value.groupName;
        this.portsarray.push(this.diversityForm.value.ports + ', ' + this.diversityForm.value.groupName);
        this.portsarray = Array.from(this.portsarray);
        this.portsarrayobj.push({ noOfPorts: this.diversityForm.value.ports, diversityGroupName: this.payload });
        this.portsarrayobj = Array.from(new Set(this.portsarrayobj));
        //  this.newcode = '';
        this.newport = '';
        this.newgroup = '';
        this.checkflag = false;
      } else {
        if ((this.diversityForm.value.geocode + this.diversityForm.value.groupName).length < 16) {
          this.dispSearchbtn = true;
          this.payload = this.diversityForm.value.geocode + this.diversityForm.value.groupName;
          // tslint:disable-next-line:max-line-length
          this.portsarray.push(this.diversityForm.value.ports + ', ' + this.diversityForm.value.geocode + this.diversityForm.value.groupName);
          this.portsarray = Array.from(this.portsarray);
          this.portsarrayobj.push({ noOfPorts: this.diversityForm.value.ports, diversityGroupName: this.payload });
          this.portsarrayobj = Array.from(new Set(this.portsarrayobj));
          //  this.newcode = '';
          this.newport = '';
          this.newgroup = '';
          this.checkflag = false;
        } else {
          this.dispSearchbtn = false;
          this.checkflaglength = true;
          setTimeout(() => {
            this.checkflaglength = false;
          }, 3000);

        }

      }
    } else {
      // this.dispSearchbtn = false;
      this.errorcallDGnameSearch = true;
      setTimeout(() => {
        this.errorcallDGnameSearch = false;
      }, 3000);
    }
  }
  resetFilterAll() {
    this.newcode = '';
    this.newport = '';
    this.newgroup = '';
    this.popLocation = null;
    this.portsarrayobj = [];
    this.portsarray = [];
    this.dispSearchbtn = false;
    this.flagCode = '';
    // setTimeout(() => {
    //   this.diversityForm.reset();
    // }, 3000);
    this.checkflag = false;
    this.diversityForm.controls.geocode.reset();
  }
  removeGroup(portGroupAraay, i) {
    this.portsarray.splice(i, 1);
    this.portsarrayobj.splice(i, 1);
    if (this.portsarray.length <= 0) {
      this.dispSearchbtn = false;
    }
  }
  searchOnGroupValue() {
    let value;
    value = {
      popLocation: this.popLocation,
      diversityGroupDetailForecastList: this.portsarrayobj
    };
    this.resetFilterAll();
    this.displayChange.emit(false);
    this.OnsearchGroup.emit(value);
  }
}
