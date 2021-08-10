import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnChanges } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
/** Chassis right panel contains deviceInfo, statuslist and productlist
 * @author divya.rajasekar@bt.com
 */
@Component({
  selector: 'app-chassis-right-panel',
  templateUrl: './chassis-right-panel.component.html',
  styleUrls: ['./chassis-right-panel.component.scss']
})
export class ChassisRightPanelComponent implements OnInit, OnChanges {
  /** Right Panel data */
  @Input() rightPanelInfo;
  /** Product list value */
  @Input() rightPanelProductList;
  /** Status list value */
  @Input() rightPanelStatusList;
  /** speed list value */
  @Input() rightPanelSpeedList;
  /** Tool tip data */
  @Input() tooltipdata;
  @Input() changedsneid;
  @Input() disableinputfield;
  /** emit an event when there is any change in checkbox selection */
  @Output() modifyColorParmater = new EventEmitter();
  @ViewChild('apollopopup', { static: false }) apollopopup: any;
  @Output() redirectto360page = new EventEmitter();
  /** store product selected value */
  productArray: any = [];
  /** store status selected value */
  statusArray: any = [];
  /** store speed selected value */
  speedArray: any = [];
  datatopopup: any = [];
  cols: any = [];
  SiteName: string;
  phasedate;
  phasestatus;
  substatus;
  statusArray_val = [];
  /** create object for service */
  constructor() { }

  ngOnInit() {
    if (this.rightPanelInfo) {
      this.SiteName = this.rightPanelInfo.siteName;
    }
  }
  ngOnChanges() {
  //  this.substatus =  this.rightPanelStatusList[0].subStausList;
   console.log(this.substatus);
    if (this.tooltipdata) {
      if (this.tooltipdata.message === 'Success') {
        if (this.tooltipdata.showTable === 'No') {
          this.phasedate = this.tooltipdata.Phase_Planned_Date[0].Phase_Planned_date;
          this.phasestatus = this.tooltipdata.Phase_Status[0].Project_Status;
        }
      }
    }
    if (this.changedsneid) {
      let productElements = (document.getElementsByName('allProducts') as any as HTMLInputElement[]);
      let statusElements = (document.getElementsByName('allStatus') as any as HTMLInputElement[]);
      let speedElements = (document.getElementsByName('allspeed') as any as HTMLInputElement[]);
      productElements[0].checked = true;
      statusElements[0].checked = true;
      speedElements[0].checked = true;
      // document.getElementById('0').click();
      // document.getElementById('1').click();
      // document.getElementById('2').click();
    }
  }
  /** should call when all product checkbox is clicked */
  checkAllProducts(event: any) {
    this.checkAllForProducts(event).then(() => {
      this.selectedFilters();
    });
  }

  /** should call when all status checkbox is clicked */
  checkAllStatus(event: any) {
    this.checkAllForStatus(event).then(() => {
      this.selectedFilters();
    });
  }
  checkAllSpeed(event: any) {
    this.checkAllForSpeed(event).then(() => {
      this.selectedFilters();
    });
  }

  checkFree(event: any) {
    this.checkAllFreeStatus(event).then(() => {
      this.selectedFilters();
    });
  }
  /** should call when all product checkbox is clicked */
  checkAllForProducts(event: any) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let productElements = (document.getElementsByName('product') as any as HTMLInputElement[]);
      if (event.target.name === 'allProducts') {
        for (let i = 0; i < productElements.length; i++) {
          if (event.target.checked) {
            productElements[i].checked = true;
          } else {
            productElements[i].checked = false;
          }
          if (productElements.length - 1 === i) {
            resolve();
          }
        }
      }
    });
  }

  /** should call when all status checkbox is clicked */
  checkAllForStatus(event: any) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let statusElements = (document.getElementsByName('status') as any as HTMLInputElement[]);
      let substatusElements = (document.getElementsByName('substatus') as any as HTMLInputElement[]);
      if (event.target.name === 'allStatus') {
        for (let i = 0; i < substatusElements.length; i++) {
          if (event.target.checked) {
            substatusElements[i].checked = true;
          } else {
            substatusElements[i].checked = false;
          }
        }
        for (let i = 0; i < statusElements.length; i++) {
          if (event.target.checked) {
            statusElements[i].checked = true;
          } else {
            statusElements[i].checked = false;
          }
          if (statusElements.length - 1 === i) {
            resolve();
          }
        }
      }
    });
  }

  checkAllFreeStatus(event: any) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      
      let substatusElements = (document.getElementsByName('substatus') as any as HTMLInputElement[]);
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
  /** should call when all speed checkbox is clicked */
  checkAllForSpeed(event: any) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let speedElements = (document.getElementsByName('speed') as any as HTMLInputElement[]);
      if (event.target.name === 'allspeed') {
        for (let i = 0; i < speedElements.length; i++) {
          if (event.target.checked) {
            speedElements[i].checked = true;
          } else {
            speedElements[i].checked = false;
          }
          if (speedElements.length - 1 === i) {
            resolve();
          }
        }
      }
    });
  }

  /** should call checkbox is clicked */
  selectedFilters() {
    let filters = {};
    this.selectedProducts().then((productValue) => {
      this.productArray = productValue;
      this.productArray = Array.from(new Set(this.productArray));
      this.selectedStatus().then((statusValue) => {
        this.selectedsubFilters().then((value) => {
          this.statusArray = statusValue;
          this.statusArray = Array.from(new Set(this.statusArray));
          this.selectedSpeed().then((speedValue) => {
            this.speedArray = speedValue;
            this.speedArray = Array.from(new Set(this.speedArray));
            filters = {
              productNames: productValue,
              statusNames: this.statusArray.sort(),
              portSpeeds: speedValue
            };
            this.modifyColorParmater.emit(filters);
          });
        });
      });
    });
  }


  /** load all the selected product value */
  selectedProducts() {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let productElements = (document.getElementsByName('product') as any as HTMLInputElement[]);
      // tslint:disable-next-line:prefer-const
      let productsArray: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < productElements.length; i++) {
        if (productElements[i].checked) {
          productsArray.push(productElements[i].value);
        }
      }
      const checkAllProduct = (document.getElementsByName('allProducts') as any as HTMLInputElement[]);
      if (productsArray.length !== productElements.length) {
        checkAllProduct[0].checked = false;
      } else {
        checkAllProduct[0].checked = true;
      }
      resolve(productsArray);
    });
  }

  /** load all the selected status value */
  selectedStatus() {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let statusElements = (document.getElementsByName('status') as any as HTMLInputElement[]);
      // let substatusElements = (document.getElementsByName('substatus') as any as HTMLInputElement[]);
      const checkAllStatus = (document.getElementsByName('allStatus') as any as HTMLInputElement[]);
      // tslint:disable-next-line:prefer-const
      this.statusArray_val = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < statusElements.length; i++) {
        if (statusElements[i].checked) {
          this.statusArray_val.push(Number(statusElements[i].value));
        }
      }
      // tslint:disable-next-line:prefer-const
      // let substatusArray: any = [];
      // //  tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < substatusElements.length; i++) {
      //   if (statusElements[0].checked) {
      //     substatusElements[i].checked = true;
      //   } else {
      //     substatusElements[i].checked = false;
      //   }
      // }

      if (statusElements.length !== this.statusArray_val.length) {
        // statusElements[0].checked = false;
        checkAllStatus[0].checked = false;
      } else {
        checkAllStatus[0].checked = true;
        // statusElements[0].checked = true;
      }
      resolve(this.statusArray_val);
    });
  }

  selectedsubFilters() {
    return new Promise((resolve, reject) => {
      let substatusArray: any = [];
      let substatusElements = (document.getElementsByName('substatus') as any as HTMLInputElement[]);
      const checkAllStatus = (document.getElementsByName('allStatus') as any as HTMLInputElement[]);
      let statusElements = (document.getElementsByName('status') as any as HTMLInputElement[]);
      let statusArray: any = [];
      let local_arr = [];
      local_arr = [...this.statusArray_val]
      // tslint:disable-next-line:prefer-for-of

      for (let i = 0; i < substatusElements.length; i++) {
        if (substatusElements[i].checked) {
          substatusArray.push(Number(substatusElements[i].value));
          this.statusArray_val.push(Number(substatusElements[i].value));
        }
      }
      if (substatusElements.length !== substatusArray.length) {
        statusElements[0].checked = false;
        this.statusArray_val.sort().shift();
        local_arr.sort().shift();
      } else {
        statusElements[0].checked = true;
        if(local_arr.indexOf(0) === -1) {
          this.statusArray_val.sort().unshift(0);
          local_arr.sort().unshift(0);
        }
      }
      for (let i = 0; i < statusElements.length; i++) {
        if (statusElements[i].checked) {
          this.statusArray_val.push(Number(statusElements[i].value));
        }
      }
      if (statusElements.length !== Array.from(new Set(local_arr)).length) {
        checkAllStatus[0].checked = false;
      } else {
        checkAllStatus[0].checked = true;
        // statusElements[0].checked = true;
      }
      resolve(substatusArray);
    });
  }
  /** load all the selected speed value */
  selectedSpeed() {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let speedElements = (document.getElementsByName('speed') as any as HTMLInputElement[]);
      // tslint:disable-next-line:prefer-const
      let speedsArray: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < speedElements.length; i++) {
        if (speedElements[i].checked) {
          speedsArray.push((speedElements[i].value));
        }
      }
      const checkAllSpeed = (document.getElementsByName('allspeed') as any as HTMLInputElement[]);
      if (speedElements.length !== speedsArray.length) {
        checkAllSpeed[0].checked = false;
      } else {
        checkAllSpeed[0].checked = true;
      }
      resolve(speedsArray);
    });
  }
  /** function to show table @author vijayalakhsmi */
  onMouseover(value, title, event) {
    const celldetails = {
      value,
      title
    };
    const responsedata = this.tooltipdata;
    if (title !== 'Phase Forecast Date') {
      if (responsedata.message === 'Success') {
        this.datatopopup = [];
        if (responsedata.showTable === 'Yes') {
          if (title === 'Phase Planned Date') {
            this.datatopopup = responsedata.Phase_Planned_Date;
            this.cols = [
              { field: 'Project_ID', header: 'Project ID', width: '20%' },
              { field: 'Job_Type', header: 'Job Type', width: '40%' },
              { field: 'Phase_Planned_date', header: 'Phase Planned Date', width: '25%' }];
          } else {
            this.datatopopup = responsedata.Phase_Status;

            this.cols = [
              { field: 'Project_ID', header: 'Project ID', width: '20%' },
              { field: 'Job_Type', header: 'Job Type', width: '40%' },
              { field: 'Project_Status', header: 'Status', width: '20%' }];
          }
          this.apollopopup.toggle(event);
        }
      }
    }
  }

  hideoverlay(eve) {
    this.apollopopup.hide(event);
  }

  redirectto360() {
    const data = {
      Sitename: this.SiteName,
      redirect: true
    };
    this.redirectto360page.emit(data);
  }
}
