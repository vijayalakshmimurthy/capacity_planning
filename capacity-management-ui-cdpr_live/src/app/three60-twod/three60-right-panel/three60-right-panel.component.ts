import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
/** 360 right panel status,product and speed
 * @author Viji
 */
@Component({
  selector: 'app-three60-right-panel',
  templateUrl: './three60-right-panel.component.html',
  styleUrls: ['./three60-right-panel.component.scss']
})
export class Three60RightPanelComponent implements OnInit, OnChanges {
  /** Right Panel data */
  @Input() rightPanelInfo;
  /** Product list value */
  @Input() rightPanelProductList;
  /** Status list value */
  @Input() rightPanelStatusList;

  /** Status list value */
  @Input() rightPanelnfoSiteName;

  /** highlight table row */
  @Input() hovertable;

  @Input() changesitename;

  /** Speed list value */
  @Input() rightPanelSpeedList;
  @Input() rightPanelTotalportcount;
  @Input() filters;
  @Output() modifyColorParmater = new EventEmitter();
  hoverIndex = -1;
  devicesneid: any;

  @ViewChild('sbeidtab1', { static: false }) sbeidtab1: any;
  @ViewChild('sbeidtab2', { static: false }) sbeidtab2: any;
  productArray: any = [];
  statusArray: any = [];
  speedArray: any = [];
  statusArray_val = [];
  checkbox = true;
  // tslint:disable-next-line:max-line-length
  productNames = ['MRS_productName_broadband', 'MRS_productName_ethernet', 'MRS_productName_backhaul', 'MRS_productName_p2pe', 'MRS_productName_voice', 'MRS_productName_infrastructure', 'MRS_productName_blocked', 'MRS_productName_prtc'];
  statusNames = ['MRS_status_0', 'MRS_status_1', 'MRS_status_2', 'MRS_status_3', 'MRS_status_4', 'MRS_status_5'];
  portSpeeds = ['MRS_portSpeed_GigE', 'MRS_portSpeed_10GigE', 'MRS_portSpeed_100GigE', 'MRS_portSpeed_FastE'];
  productElements = (document.getElementsByName('product') as any as HTMLInputElement[]);
  statusElements = (document.getElementsByName('status') as any as HTMLInputElement[]);
  speedElements = (document.getElementsByName('speed') as any as HTMLInputElement[]);
  constructor() { }
  ngOnInit() {
    this.selectedFilters();
  }
  ngOnChanges() {

    if (this.hovertable) {
      this.onMouseover(this.hovertable);
    }
    if (this.filters) {
      if (this.filters.filterlist.productNames.length !== 0) {
        this.productElements = [];
        this.productArray = this.filters.filters.productValue;
        this.productElements = this.filters.filterlist.productNames;
        // this.checkboxf();
      }
      if (this.filters.filterlist.statusNames.length !== 0) {
        this.statusElements = [];
        this.statusArray = this.filters.filters.statusValue;
        this.statusElements = this.filters.filterlist.statusNames;
        // this.checkboxf();
      }
      if (this.filters.filterlist.portSpeeds.length !== 0) {
        this.speedElements = [];
        this.speedArray = this.filters.filters.speedValue;
        this.speedElements = this.filters.filterlist.portSpeeds;
        // this.checkboxf();
      }
      // this.selectedFilters();
    }
  }
  /** function for filters */
  checkAllForProducts(event: any) {
    return new Promise((resolve, reject) => {
      const productElements = (document.getElementsByName('product') as any as HTMLInputElement[]);
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
  checkAllForSpeed(event: any) {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      const speedElements = (document.getElementsByName('speed') as any as HTMLInputElement[]);
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
  checkAllProducts(event: any) {
    this.checkAllForProducts(event).then(() => {
      this.selectedFilters();
    });
  }

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
  selectedFilters() {
    let obj = {};
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
            obj = {
              filters: {
                productNames: productValue,
                statusNames: this.statusArray.sort(),
                portSpeeds: speedValue,
              },
              filterlist: {
                productNames: this.productElements,
                statusNames: this.statusArray.sort(),
                portSpeeds: this.speedElements,
              }
            };
            this.modifyColorParmater.emit(obj);
          });
        });
      });
    });
  }
  selectedProducts() {
    return new Promise((resolve, reject) => {
      const productsArray: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.productElements.length; i++) {
        if (this.productElements[i].type === 'checkbox') {
          if (this.productElements[i].checked) {
            this.productElements[i].checked = true;
            productsArray.push('MRS_productName_' + this.productElements[i].value);
          }
        }
      }
      const checkAllProduct = (document.getElementsByName('allProducts') as any as HTMLInputElement[]);
      if (checkAllProduct.length !== 0) {
        if (productsArray.length !== this.productElements.length) {
          checkAllProduct[0].checked = false;
        } else {
          checkAllProduct[0].checked = true;
        }
      }

      resolve(productsArray);
    });
  }

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
          this.statusArray_val.push('MRS_status_' + statusElements[i].value);
        }
      }

      if (checkAllStatus.length !== 0) {
        if (statusElements.length !== this.statusArray_val.length) {
          // statusElements[0].checked = false;
          checkAllStatus[0].checked = false;
        } else {
          checkAllStatus[0].checked = true;
          // statusElements[0].checked = true;
        }
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
      let local_arr = [...this.statusArray_val]
      // tslint:disable-next-line:prefer-for-of

      for (let i = 0; i < substatusElements.length; i++) {

        if (substatusElements[i].checked) {
          substatusArray.push(Number(substatusElements[i].value));
          this.statusArray_val.push('MRS_status_' + substatusElements[i].value);
        }
      }
      if (substatusElements.length !== 0) {
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
      }
      for (let i = 0; i < statusElements.length; i++) {
        if (statusElements[i].checked) {
          this.statusArray_val.push('MRS_status_' + statusElements[i].value);
        }
      }
      if (checkAllStatus.length !== 0) {
        if (statusElements.length !== local_arr.length) {
          checkAllStatus[0].checked = false;
        } else {
          checkAllStatus[0].checked = true;
          // statusElements[0].checked = true;
        }
      }
      resolve(substatusArray);
    });
  }
  selectedSpeed() {
    return new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      // tslint:disable-next-line:prefer-const
      let speedsArray: any = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.speedElements.length; i++) {
        if (this.speedElements[i].checked) {
          speedsArray.push('MRS_portSpeed_' + this.speedElements[i].value);
        }
      }
      const checkAllSpeed = (document.getElementsByName('allspeed') as any as HTMLInputElement[]);
      if (checkAllSpeed.length !== 0) {
        if (this.speedElements.length !== speedsArray.length) {
          checkAllSpeed[0].checked = false;
        } else {
          checkAllSpeed[0].checked = true;
        }
      }
      resolve(speedsArray);
    });
  }

  /** moseover event to highlight row based on device selection */
  onMouseover(data) {
    const table1 = this.sbeidtab1.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
    const table2 = this.sbeidtab2.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
    this.hoverIndex = data.index;
    if (data.index > 2) {
      table1.scrollTop = data.index * 25;
      table2.scrollTop = data.index * 25;
    } else {
      table1.scrollTop = 0;
      table2.scrollTop = 0;
    }
    this.devicesneid = data.val;
  }
}
