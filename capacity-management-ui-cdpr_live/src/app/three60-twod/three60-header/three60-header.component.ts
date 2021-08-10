import { Component, Input, Output, EventEmitter , OnChanges, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';
import { Router } from '@angular/router';
/** 360 header
 * @author Viji
 */
/** This is the 360 Header Component */
@Component({
  selector: 'app-three60-header',
  templateUrl: './three60-header.component.html',
  styleUrls: ['./three60-header.component.scss']
})
/** Class contents 360 header functionality */
export class Three60HeaderComponent implements OnChanges, OnInit {

  /** filterData */
  filterData: any = [];

  /** placeholder for searchbox */
  searchBoxPlaceHolder = ' Search Site/1141';
  /** error message for searchbox */
  errorMsg = '';
  prevvalue;

   /** Constructor to inject app service */
  constructor(private appService: AppService, private router: Router) { }
 /** loader input data */
  @Input() showLoader;
   /** workflow enable input data */
  @Input() workflowenable;
  @Input() disablesearchnput;
  @Input() deltaEnable;
  @Input() deltavalue;
  @Input() counter;
  @Input() totalnumberofDevice;
  @Input() dropdown;
  @Input() previousvalue;
  @Input() enableNOCardMoveWorkflow;
  @Input() enableRecoveryWorkflow;
   /** snedata output event */
  @Output() load2dDataBySNE = new EventEmitter();
  @Output() slectedvaluefromdropdown = new EventEmitter();
  role;

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
  }

  ngOnChanges() {
    this.prevvalue = this.previousvalue;
  }
  /** To fill suggestions in search box */

  onkeyPressSearch(event) {
    this.errorMsg = '';
    const alphabets =  /[a-z, A-Z, /]/;
    if (event) {
      if (alphabets.test(event.target.value)) {
        if (event.target.value.length > 1) {
          // const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
          const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
          this.appService.get(url).subscribe(res => {
            if (res.length > 0) {
              this.filterData = JSON.parse(JSON.stringify(res));
            } else {
              this.filterData = [];
              this.errorMsg = 'Site not found';
            }
          });
        }
      }
    }
  }

  validateInputData(event) {
    const pattern = /[a-z, A-Z, /]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /** Onselect call service and get site data data */
  onselectSearch(event) {
    this.load2dDataBySNE.emit(event);
  }

  selectedColumnChange(event) {
    let selecteddropdown = [];
    for(let i=0;i<event.value.length;i++) {
      selecteddropdown.push({sneId : event.value[i].name })
    }
    this.slectedvaluefromdropdown.emit(selecteddropdown);
  }

  redirectToHomePage() {
    if (this.role !== 'no user') {
      this.router.navigate(['/capacity-summary-report']);
    } else if (this.role === 'no user') {
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }
  }
}
