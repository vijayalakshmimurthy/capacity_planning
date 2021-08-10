import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
/** This is the shared component for the Map to use custom location. */
@Component({
  selector: 'app-custom-location',
  templateUrl: './custom-location.component.html',
  styleUrls: ['./custom-location.component.scss']
})
export class CustomLocationComponent implements OnChanges {
  /** Define variables before component initialization */
  customMode = '';
  lat = '';
  lng = '';
  postcode: '';
  isSubmitted = false;
  /** Custom location dropdown item array as a input */
  @Input() customLocationDrp = [];
  /** mapClick object defines as input */
  @Input() mapClick = { value: '', type: '' };
  @Output() CustomFilters = new EventEmitter<any>();
  @Output() resetCustomFilters = new EventEmitter<any>();
  /** clearAllBtnFlag flag defines as input */
  clearAllBtnFlag = { flag: false };

  /** calling ngonchanges method to get changed Input type decorator */
  ngOnChanges() {
    if (this.mapClick.type === 'OnClickOnMap' || this.mapClick.type === 'selectSite') {
      this.clearAllWhileMapClick();
    }
  }

  /** Method for changing custom mode */
  changeCustomMode(event) {
    this.customMode = event.value.value;
    this.clearAllWhileClickOnBtn();
  }

  /** Submit postcode or lattitude and longitude */
  onSubmit() {
    const obj = {
      customMode: this.customMode,
      lat: this.lat,
      lng: this.lng,
      postcode: this.postcode
    };
    this.clearAllBtnFlag.flag = true;
    this.isSubmitted = true;
    this.CustomFilters.emit(obj);
  }

  /** send to parent while click on clear button as well as filter reset */
  clearAllWhileClickOnBtn() {
    if (this.isSubmitted) {
      const obj = {
        value: '',
        type: ''
      };
      this.resetCustomFilters.emit(obj);
    }
    this.clearAllWhileMapClick();
  }

  /** filter reset */
  clearAllWhileMapClick() {
    this.lat = '';
    this.lng = '';
    this.postcode = '';
    this.isSubmitted = false;
    this.clearAllBtnFlag.flag = false;
  }

}
