import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';
@Component({
  selector: 'app-rack-popup',
  templateUrl: './rack-popup.component.html',
  styleUrls: ['./rack-popup.component.scss']
})
export class RackPopupComponent implements OnInit {
  /**
   * @author Binu
   * rack page Popup
   */
  planRackForm: FormGroup;
  header: any = [];
  header1: any = [];
  minimumDate = new Date();
  trsAreaDropDown = [];
  filtersite = [];
  configData: any;
  commonModelProperties: any;
  display = false;
  saswfmt = false;
  popuptype = '';
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private appService: AppService) { }

  ngOnInit() {
    const group = {};
    /** Rack popup header initilization Dynamicaly */
    this.header = this.config.data.dummyJson;
    if(this.header.length > 10) {
      this.header1 = this.header.splice(10, this.header.length);
      this.header1.forEach(value => {
        if (value.type === 'textarea') {
          group[value.formValue] = new FormControl('');
        } else if (value.mandatory !== null && value.mandatory !== undefined && value.mandatory !== '' && value.mandatory) {
          group[value.formValue] = new FormControl(value.mandatoryField, Validators.required);
        } else {
          group[value.formValue] = new FormControl('', Validators.required);
        }
        if (value.type === 'dropdown' && value.formValue === 'busCase' && value.mandatory === false) {
          group[value.formValue] = new FormControl('');
       }
      });
    }

    this.configData = this.config.data;
    this.header.forEach(value => {
      if (value.type === 'textarea') {
        group[value.formValue] = new FormControl('');
      } else if (value.mandatory !== null && value.mandatory !== undefined && value.mandatory !== '' && value.mandatory) {
        group[value.formValue] = new FormControl(value.mandatoryField, Validators.required);
      } else {
        group[value.formValue] = new FormControl('', Validators.required);
      }
      if(value.type === 'dropdown' && value.formValue === 'busCase' && value.mandatory === false) {
        group[value.formValue] = new FormControl('');
     }
    });

    this.planRackForm = new FormGroup(group);
    // if (this.configData.header === 'planRack') {
    //   this.planRackForm.patchValue({
    //     priority: 'P3', schemeDriver: 'Ethernet Growth'
    //   });
    // }
  }
  hidePopup() {
    this.ref.close();
  }
  confirm() {    
    /** For Chaining popup */
    if (this.configData.layerdPopup > 0) {
      const url = environment.base_url + this.configData.url + this.planRackForm.value.code1141.data;
      this.appService.get(url).subscribe(result => {
        if (result.isRecordPresent) {
          this.display = true;
          this.commonModelProperties = {
            image: 'assets/images/question_icon.png',
            bodyContent: result.message,
            popupType: 'confirmationPopup',
            footerButtons: 'true',
            header: '',
            width: '88%',
            // tslint:disable-next-line:max-line-length
            dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-Okay' }, { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }]
          };
        } else {
          this.ref.close(this.planRackForm.value);
        }
      });
    } else {
      this.ref.close(this.planRackForm.value);
    }
  }
  /** Auto Complete Methods
   * @author Binu
 */
  search(ev) {
    const query = ev.query;
    const url = environment.base_url + 'cbp-rack/auto-suggest?searchString=' + query;
    this.appService.get(url).subscribe(result => {
      if (result.status === false) {
        this.filtersite = [];
      } else {
        this.filtersite = result;
      }
    }, (err) => {
      this.filtersite = [];
    });
  }
  selectedValue(e) {
    const url = environment.base_url + 'cbp-rack/get-sitedetails?code1141=' + e;
    this.appService.get(url).subscribe(result => {
      this.planRackForm.patchValue({
        siteName: result[0].siteName
      });
      this.trsAreaDropDown = result[0].trsArea;
    });
  }
  clearSerach(ev) {
    if (this.configData.header === 'planRack') {
      this.trsAreaDropDown = [];
      this.planRackForm.controls['siteName'].reset();
      this.planRackForm.controls['trsArea'].reset();
    }
  }
  /** Layerd Popup Confirm & Cancel Function */
  confirmLayerdPopup() {
    this.display = false;
    this.ref.close(this.planRackForm.value);
  }
  cancelLayerdPopup() {
    this.display = false;
  }
  checkclick() {
    this.saswfmt = true;
  }
  scrollevent(event) {
    this.saswfmt = false;
  }
}
