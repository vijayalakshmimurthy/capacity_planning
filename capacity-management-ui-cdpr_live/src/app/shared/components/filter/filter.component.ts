import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
/** This is the shared component for the Map to get pins based on filters. */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {
  /** Define variables before component initialization */
  @Input() savedFilters: any = [];
  /** Input for serviceTypeFilter (availability, Nodetype, phaseenabled) */
  @Input() ServiceTypeFilter: any = {};
  /** Input for otherFilters (Radius) */
  @Input() filters: any = {};
  /** Input for requestFilters is the request parameter */
  @Output() requestFilters = new EventEmitter<any>();
  /** selectServiceType object */
  selectServiceType: any = {};
  @Output() resetFilters = new EventEmitter<any>();
  @Output() submitFilters = new EventEmitter<any>();
  /** filterViewCustomization object for filter check uncheck */
  @Input() filterViewCustomization = {
    filters: true,
    customFilter: false
  };
  @Input() expandAllFlag = false;
  @Input() collapsAlleFlag = false;
  lastExpandFilter = '';
  @Input() viewType = '';
  isOpen = false;
  expandEnable = false;
  isOpendev = false;
  checkexpend = false;
  /** calling ngonchanges method to get changed Input type decorator */
  ngOnChanges() {
    if (this.savedFilters.length > 0) {
      const serviceType = this.savedFilters.filter(x => x.filterName === 'serviceType').map(y => y.filterValue)[0];
      this.selectServiceType.label = serviceType;
      this.selectServiceType.value = serviceType;
      this.selectServiceType = JSON.parse(JSON.stringify(this.selectServiceType));
    }
    if (this.expandAllFlag) {
      this.expandAllFilterAcco();
      this.expandAllFlag = false;
      this.isOpen = false;
    }

    if (this.collapsAlleFlag) {
      this.collapseAllFilterAcco();
      this.collapsAlleFlag = false;
      this.isOpendev = false;
      this.isOpen = false;
    }
  }

  /** to show checkbox is checked based in saved preference */
  checkFilterIsSaved(value, type) {
    if (this.savedFilters.length > 0) {
      if (this.savedFilters.filter(x => x.filterName === type && x.filterValue === value).length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /** while clicking on checkboxes send event to parent */
  checkFilter(val, filterType, filterId, filterName) {
    const obj = {
      value: val,
      type: filterType,
      id: filterId,
      name: filterName
    };

    this.requestFilters.emit(obj);
    this.selectFillter(obj.name);
    // const ele = document.getElementById(obj.type);
    // ele.classList.add('show');
  }
  /** while selecting service type send an event to parent */
  selectService() {
    this.savedFilters = [];
    const obj = {
      value: this.selectServiceType['value'],
      type: 'serviceType'
    };
    this.requestFilters.emit(obj);
  }

  expandFilter(key) {
    /*if (this.lastExpandFilter !== '' && this.lastExpandFilter !== key) {
      const ele = document.getElementById(this.lastExpandFilter) as HTMLElement;
      ele.classList.remove('show');
    }
    this.lastExpandFilter = key;*/
  }

  expandAllFilterAcco() {
    this.filters.forEach(element => {
      const ele = document.getElementById(element.filterKey) as HTMLElement;
      ele.classList.add('show');
    });
    this.expandEnable = true;
    this.checkexpend = true;
  }

  collapseAllFilterAcco() {
    this.filters.forEach(element => {
      const ele = document.getElementById(element.filterKey) as HTMLElement;
      ele.classList.remove('show');
    });
    this.checkexpend = false;
  }
  selectFillter(filterName) {
    if ((this.expandEnable) && (filterName === 'Device Model') ) {
      this.isOpendev = true;
    } else {
      this.isOpendev = false;
    }
    if (filterName === 'Device Model') {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
    if (this.checkexpend && (filterName !== 'Device Model')) {
      this.isOpendev = true;
    }
  }

}
