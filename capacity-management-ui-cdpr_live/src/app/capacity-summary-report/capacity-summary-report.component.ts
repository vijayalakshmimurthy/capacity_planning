import { TableComponent } from './../shared/components/table/table.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { NavigationService } from '../shared/services/navigation.service';
import { environment } from '../../environments/environment';
import { AlertService } from '../shared/services/alert.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { daraultfilter } from '../shared/constants/defaultfilter.constant';
import { RoleService } from '../shared/services/roles.service';
declare let jsPDF;
/** This is CDPR Parent Component whcih contents filter info-modal */
@Component({
  selector: 'app-capacity-summary-report',
  templateUrl: './capacity-summary-report.component.html',
  styleUrls: ['./capacity-summary-report.component.scss']
})
export class CapacitySummaryReportComponent implements OnInit, OnDestroy {
  /** global variable declare here */
  @ViewChild(TableComponent, { static: true }) private tableComponent: TableComponent;
  displayBasic = false;
  display = false;
  public savePreObj = {
    ein: null,
    filterIds: [],
    pageName: 'CDPR'
  };
  pageName = 'CDPR';
  savedFilters = [];
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  tableSettings = {
    frozenColumns: [], headers: [], data: [], paginator: true, scrollHeight: '57vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true
  };
  filterObj: any = {
    deviceModel: [],
    deviceUsage: [],
    deviceType: '',
    deviceVersion: [],
    productType: '',
    portSpeed: [],
    chassisSpeed: [],
    cardModel: [],
    cardType: [],
    cardVersion: [],
    marketType: [],
    nodeType: [],
    ein: 0,
    pageName: 'CDPR',
    preference: 0,
    opticType: []

  };
  pageObj = {
    pageNo: 1,
    pageSize: 0,
    sortOrder: true,
    siteName: '',
    exchangeCode: '',
    enableSorting: true,
    sortByField: 'siteName',
    pageName: 'CDPR'
  };
  searchBoxPlaceHolder = 'Search Site';
  filterData = [];
  filters = [];
  disPlayfilterPopup = false;
  viewType = 'popup';
  originalFilters: any = [];
  expandAllFlag = false;
  collapsAlleFlag = false;
  columnList: any;
  selectedColumns: any;
  errorMsg = '';
  tableDataObj: any = {};
  selectedFilterString = '';
  noRecordError = false;
  noRecords;
  type = 'search';
  navigationSubscription: Subscription;
  currentRole: string;
  headerName: string;
  deviceTypevalue = '';
  constructor(
    private appService: AppService,
    protected alertService: AlertService,
    private router: Router,
    private navigationService: NavigationService,
    private roleService: RoleService) {
    this.navigationSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/capacity-summary-report') {
          this.pageName = 'CDPR';
        } else if (e.url === '/forecast-management-report') {
          this.pageName = 'FMR';
        }
        this.filterObj.ein = Number(this.appService.getEIN());
        this.getSavePre();
      }
      this.tableComponent.clearArray();
    });
  }

  ngOnInit() {
    this.filterObj.ein = Number(this.appService.getEIN());
    this.currentRole = this.roleService.getCurrentRole();
    if (this.currentRole[0] === 'PROD_CE_DESIGNER' || this.currentRole[0] === 'PRE_PROD_CE_DESIGNER') {
      this.headerName = 'Forecast Management Report';
      this.pageName = 'FMR';
      this.filterObj.pageName = this.pageName;
      this.pageObj.pageName = this.pageName;
    } else {
      this.headerName = 'Capacity Demand Prediction Report';
      this.pageName = 'CDPR';
      this.filterObj.pageName = this.pageName;
      this.pageObj.pageName = this.pageName;
    }
  }

  getSavePre() {
    this.noRecordError = false;
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'preference-management/fmr-preference';
    } else {
      // url = environment.base_url + 'preference-management/newPreference';
      url = environment.base_url + 'preference-management/newPreferenceInfo';
    }
    const ein = this.appService.getEIN();
    this.appService.post(url, JSON.parse(JSON.stringify(ein))).subscribe(res => {
      if (res['filterMasterResponse'] !== null) {
        this.updateFilterObj(res['filterMasterResponse']);
        this.filters = res['filterMasterResponse']['filters'];
        this.tableDataObj = res['exchangeInfoResponse'];
        this.noRecordError = true;
        this.noRecords = true;
        this.selectedFilters(this.filters);
        if (this.tableDataObj.hasOwnProperty('exchangeInfo')) {
          this.tableSettings.data = this.tableDataObj.exchangeInfo;
          this.tableSettings.totalRecords = this.tableDataObj.totalRecords;
        }
      } else {
        this.getHeaders();
        this.getTableData();
      }
    }, err => {
    });
  }

  onselectSearch(event) {
    const url = environment.base_url + 'site-management/search-sitename-excode-cdpr';
    this.pageObj.pageName = this.pageName;
    this.pageObj.siteName = event;
    this.pageObj.exchangeCode = event;
    this.pageObj.pageNo = 1;
    this.pageObj.pageSize = 0;
    const reqObj = { ...this.filterObj, ...this.pageObj };
    this.appService.post(url, reqObj).subscribe(res => {
      if (res.exchangeInfo.length > 0) {
        this.tableSettings.data = res.exchangeInfo;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
        this.noRecords = true;
      }
    });
  }

  getHeaders() {
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'generic-header/grid-forecast-managementReport-header';
    } else {
      // url = environment.base_url + 'generic-header/grid-cdpr-header';
      url = environment.base_url + 'generic-header/grid-cdpr-header';
    }
    const reqObj = { ...this.filterObj, ...this.pageObj };
    //  const url = 'assets/json/cdpr_header.json';
    this.appService.post(url, reqObj).subscribe(res => {
      this.bindTableProperties('');
      this.tableSettings.frozenColumns = res.filter(x => x.fixed === true);
      this.tableSettings.headers = res.filter(x => x.fixed !== true);

      this.columnList = JSON.parse(JSON.stringify(res.filter(x => {
        return x.fixed !== true && x.visible === true;
      })));
      this.selectedColumns = JSON.parse(JSON.stringify(res.filter(x => x.fixed !== true)));
      this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    }, err => {
      // this.alertService.error('Preference Not Saved', this.options);
    });
  }

  updateFilterObj(res, bool?) {
    // tslint:disable-next-line:no-shadowed-variable

    this.filterObj = {
      deviceModel: [],
      deviceUsage: [],
      deviceType: '',
      deviceVersion: [],
      productType: '',
      portSpeed: [],
      chassisSpeed: [],
      cardModel: [],
      cardType: [],
      cardVersion: [],
      marketType: [],
      nodeType: [],
      ein: 0,
      pageName: this.pageName,
      preference: 0,
      opticType: []

    };
    res.filters.forEach(element => {
      const filterType = element.filterKey.replace('_', '');
      element.values.forEach(ele => {
        if (this.savePreObj.filterIds.indexOf(ele.id) === -1) {
          if (ele.selected) {
            this.savePreObj.filterIds.push(ele.id);
          }
        }
        if (typeof this.filterObj[filterType] === 'object') {
          if (ele.selected) {
            if (this.filterObj[filterType].indexOf(ele.value) === -1) {
              this.filterObj[filterType].push(ele.value);
            }
          } else {
            if (this.filterObj[filterType].indexOf(ele.value) > -1) {
              this.filterObj[filterType].splice(this.filterObj[filterType].indexOf(ele.value), 1);
            }
          }
        } else if (typeof this.filterObj[filterType] === 'string' || typeof this.filterObj[filterType] === 'number') {
          if (ele.selected) {
            this.filterObj[filterType] = ele.value;
          }
          if (filterType === 'deviceType') {
            if (ele.value === 'Core Rt') {
              this.filterObj.productType = 'Ethernet';
            }
          }
        }
      });
    });
    if ((this.filterObj.portSpeed.indexOf('10GE') !== -1) && this.filterObj.deviceModel.length === 1 &&
      (this.filterObj.deviceModel.indexOf('Nokia 7210 SAS-Sx') !== -1)) {
      this.filterObj.portSpeed.splice(this.filterObj['portSpeed'].indexOf('10GE'), 1);
    }
    if (bool) {
      this.filterObj.preference = 2;
    }
    this.getHeaders();
    return this.filterObj;
  }
  onDialogClose(event) {
    this.display = event;
  }
  showBasicDialoginfo() {
    this.display = true;
  }

  showFilterPopup() {
    this.disPlayfilterPopup = true;
  }
  onSavePreference() {
    this.savePreObj.ein = this.appService.getEIN();
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'preference-management/save-fmr-preference';
    } else {
      url = environment.base_url + 'preference-management/save-preference';
    }
    this.appService.post(url, this.savePreObj).subscribe(res => {
      this.alertService.success('Preference Saved', this.options);
    }, err => {
      this.alertService.error('Preference Not Saved', this.options);
    });
  }

  /** Get filter Json */
  getFilters(from) {

    // const url = environment.base_url + 'filter-management/cascaded-filter-master-new';
    const url = environment.base_url + 'filter-management/cascaded-filter-master-new';
    this.appService.post(url, this.filterObj).subscribe(res => {
      this.filters = JSON.parse(JSON.stringify(res['filters']));
      this.selectedFilters(this.filters);
      if (from !== 'clearall') {
        this.updateFilterObj(JSON.parse(JSON.stringify(res)));
      }
      // tslint:disable-next-line:no-trailing-whitespace
      if (from === 'initial') {
        this.originalFilters = JSON.parse(JSON.stringify(res));
      }
    });
  }
  updateFiltersFromChild(event) {
    const filterType = event.type.replace('_', '');
    if (typeof this.filterObj[filterType] === 'object') {
      if (this.filterObj[filterType].indexOf(event.value) > -1) {
        this.filterObj[filterType].splice(this.filterObj[filterType].indexOf(event.value), 1);
      } else {
        this.filterObj[filterType].push(event.value);
      }
    } else if (typeof this.filterObj[filterType] === 'string' || typeof this.filterObj[filterType] === 'number') {
      this.filterObj[filterType] = event.value;
      if (filterType === 'deviceType') {
        if (event.value === 'Core Rt') {
          this.filterObj.productType = 'Ethernet';
        }
      }
    }
    if (this.savePreObj.filterIds.indexOf(event.id) === -1) {
      this.savePreObj.filterIds.push(event.id);
    }
    this.filterObj.preference = 0;
    this.getFilters('child');
  }
  clearFilters() {
    this.filterObj = JSON.parse(JSON.stringify(this.updateFilterObj(daraultfilter, true)));
    this.getFilters('clearall');
    this.filters = JSON.parse(JSON.stringify(daraultfilter['filters']));
    document.getElementById('changeButton').innerText = 'Expand All';
    this.collapsAlleFlag = JSON.parse(JSON.stringify(true));
    this.expandAllFlag = false;
    this.filterObj.cardModel = [];
    this.filterObj.cardType = [];
  }

  submitFilters() {
    this.pageObj.siteName = '';
    this.pageObj.exchangeCode = '';
    this.getFilters('submit');
    this.getHeaders();
    this.pageObj.pageNo = 1;
    this.tableSettings.refreshPagination = true;
    this.getTableData();
    this.disPlayfilterPopup = false;
    document.getElementById('changeButton').innerText = 'Expand All';
    this.collapsAlleFlag = JSON.parse(JSON.stringify(true));
    this.expandAllFlag = false;
    this.tableComponent.clearArray();
  }

  expandFilterResults() {
    const txtBtn = document.getElementById('changeButton').innerText;
    if (txtBtn === 'Expand All') {
      document.getElementById('changeButton').innerText = 'Collapse';
      this.expandAllFlag = JSON.parse(JSON.stringify(true));
      this.collapsAlleFlag = false;
    } else {
      document.getElementById('changeButton').innerText = 'Expand All';
      this.collapsAlleFlag = JSON.parse(JSON.stringify(true));
      this.expandAllFlag = false;
    }
  }

  selectedColumnChange(event) {
    const selectedHeader = this.tableSettings.headers.filter(x => x.field === event.itemValue.field)[0];
    if (selectedHeader['visible']) {
      this.tableSettings.headers.filter(column => {
        if (column.field === event.itemValue.field) {
          column.visible = false;
          const obj = { data: column, type: 'minus', dependentColumn: false };
          this.updateShowHideList(obj);
          if (column.hasOwnProperty('dependendColumns') && column.dependendColumns !== null) {
            const dependentColumns = this.tableSettings.headers.filter(x => x.field === column.dependendColumns[0]);
            const dependentColumnobj = { data: dependentColumns[0], type: 'minus', dependentColumn: true };
            this.updateShowHideList(dependentColumnobj);
          }
        }
      });
    } else {
      this.tableSettings.headers.filter(column => {
        if (column.field === event.itemValue.field) {
          column.visible = true;
          const obj = { data: column, type: 'add' };
          this.updateShowHideList(obj);
          if (column.hasOwnProperty('dependendColumns') && column.dependendColumns !== null) {
            const dependentColumn = this.tableSettings.headers.filter(x => x.field === column.dependendColumns[0]);
            const dependentColobj = { data: dependentColumn[0], type: 'add', dependentColumn: true };
            this.updateShowHideList(dependentColobj);
          }
        }
      });
    }
  }

  updateShowHideList(event) {
    if (event.type === 'add') {
      if (event.data.child.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < event.data.child.length; i++) {
          event.data.child[i].visible = true;
        }
      }
      const selectedColumnindex = this.selectedColumns.findIndex(x => x.field === event.data.field);
      const selectedArr = event.data.child.filter(x => x.visible === true);
      this.selectedColumns.splice(selectedColumnindex + 1, 0, ...selectedArr);
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
      if (event.dependentColumn) {
        const index = this.selectedColumns.findIndex(x => x.field === event.data.field);
        event.data.visible = true;
        this.selectedColumns.splice(index, 0, ...event.data);
      }
    } else if (event.type === 'minus') {
      event.data.child.forEach(element => {
        if (element.hasOwnProperty('child') && element.child !== null) {
          element.child.forEach(val => {
            const selectedSubColumnData = this.selectedColumns.filter(x => x.field === val.field);
            if (selectedSubColumnData.length) {
              selectedSubColumnData.forEach(data => {
                const selectedSubColumnIndexMinus = this.selectedColumns.findIndex(x => x.field === data.field);
                this.selectedColumns.splice(selectedSubColumnIndexMinus, 1, ...[]);
              });
            }
          });
        }
        const selectedColumnData = this.selectedColumns.filter(x => x.field === element.field);
        if (selectedColumnData.length) {
          selectedColumnData.forEach(data => {
            const selectedColumnIndexMinus = this.selectedColumns.findIndex(x => x.field === data.field);
            this.selectedColumns.splice(selectedColumnIndexMinus, 1, ...[]);
          });
        }
      });
      if (event.data.child.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < event.data.child.length; i++) {
          if (event.data.child[i].visible) {
            event.data.child[i].visible = false;
          }
        }
      }
      if (event.dependentColumn) {
        const index = this.selectedColumns.findIndex(x => x.field === event.data.field);
        event.data.visible = !event.data.visible;
        this.selectedColumns.splice(index, 1);
      }
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    }
  }

  getTableData() {
    this.noRecordError = false;
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'forecastAnalysisReport/fetch-trend-forecast-data';
    } else {
      // url = environment.base_url + 'site-management/exchange-info';
      url = environment.base_url + 'site-management/exchangeInfoNew';
    }
    const reqObj = { ...this.filterObj, ...this.pageObj };
    this.pageObj.pageNo = 0;
    this.pageObj.pageSize = 0;
    this.appService.post(url, reqObj).subscribe(res => {
      if (res.exchangeInfo.length > 0) {
        this.tableSettings.data = res.exchangeInfo;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
        this.bindTableProperties('');
      } else {
        this.tableSettings.data = [];
        // this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
        this.noRecordError = true;
        this.noRecords = true;
      }
      // this.getHeaders();
    });
  }

  getSelectedPageNo(event) {
    this.tableSettings.refreshPagination = false;
    this.pageObj.pageNo = event.page + 1;
    this.getTableData();
  }

  bindTableProperties(type) {
    const height = '100vh';
    if (type === '') {
      this.tableSettings.paginator = true;
      this.tableSettings.scrollable = true;
      this.tableSettings.scrollHeight = `calc(${height} - 350px)`;
      this.tableSettings.frozenWidth = '410px';
      this.tableSettings.columnWidth = '225px';
    } else {
      this.tableSettings.paginator = false;
      this.tableSettings.scrollable = true;
      // tslint:disable-next-line:align
      this.tableSettings.scrollHeight = `calc(${height} - 350px)`;
      this.tableSettings.editkey = 'id';
      this.tableSettings.paginator = false;
    }
  }
  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
    this.errorMsg = '';
    const numbers = /^\d+$/;
    if (event !== null) {
      if (!numbers.test(event.target.value)) {
        if (event.target.value.length > 1) {
          const url = environment.base_url + 'site-management/search-site-name-cdpr?searchParam=' + event.target.value;
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


  OnResetSearchInput(event) {
    this.noRecordError = false;
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'forecastAnalysisReport/fetch-trend-forecast-data';
    } else {
      // url = environment.base_url + 'site-management/exchange-info';
      url = environment.base_url + 'site-management/exchangeInfoNew';
    }
    this.pageObj.siteName = event;
    this.pageObj.exchangeCode = event;
    this.pageObj.pageNo = 0;
    this.pageObj.pageSize = 0;
    const reqObj = { ...this.filterObj, ...this.pageObj };
    this.appService.post(url, reqObj).subscribe(res => {
      if (res.exchangeInfo.length > 0) {
        this.tableSettings.data = res.exchangeInfo;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
        this.noRecords = true;
      }
    });
  }
  getSelectedFilters() {
    // tslint:disable-next-line:no-shadowed-variable
    return this.filters.filter((element) => element.values.some((ele) => ele.selected === true));
  }

  getUpdatedHeaders(event) {
    if (event.type === 'add') {
      const index = this.columnList.findIndex(x => x.field === event.data.field);
      const dataChild = event.data.child.filter(x => x.visible === true);
      this.columnList.splice(index + 1, 0, ...dataChild);
      this.columnList = JSON.parse(JSON.stringify(this.columnList));
      const selectedColumnindex = this.selectedColumns.findIndex(x => x.field === event.data.field);
      const selectedArr = event.data.child.filter(x => x.visible === true);
      this.selectedColumns.splice(selectedColumnindex + 1, 0, ...selectedArr);
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    } else if (event.type === 'minus') {
      const indexMinus = this.columnList.findIndex(x => x.field === event.data.field);
      const dataChild = event.data.child.filter(x => x.visible === true);
      this.columnList.splice(indexMinus + 1, dataChild.length, ...[]);
      this.columnList = JSON.parse(JSON.stringify(this.columnList));
      // tslint:disable-next-line:no-shadowed-variable
      event.data.child.forEach(element => {
        if (element.hasOwnProperty('child') && element.child !== null) {
          element.child.forEach(val => {
            const selectedSubColumnIndexMinus = this.selectedColumns.findIndex(x => x.field === val.field);
            if (selectedSubColumnIndexMinus !== -1) {
              this.selectedColumns.splice(selectedSubColumnIndexMinus, 1, ...[]);
            }
          });
        }
        const selectedColumnIndexMinus = this.selectedColumns.findIndex(x => x.field === element.field);
        if (selectedColumnIndexMinus !== -1) {
          this.selectedColumns.splice(selectedColumnIndexMinus, 1, ...[]);
        }
      });
      // this.columnList = JSON.parse(JSON.stringify(this.selectedColumns));
      this.selectedColumns = JSON.parse(JSON.stringify(this.selectedColumns));
    }
  }
  selectedFilters(filters) {
    this.savePreObj.filterIds = [];
    this.selectedFilterString = '';
    // tslint:disable-next-line:no-shadowed-variable
    filters.forEach(element => {
      const array: any = [];
      element.values.forEach(subEle => {
        if (subEle.selected) {
          array.push(subEle.label);
          this.savePreObj.filterIds.push(subEle.id);
        }
      });
      if (array.length > 0) {
        this.selectedFilterString = this.selectedFilterString + ', ' + element.filterName + ': ' + array.join(',');
      }
    });
    this.selectedFilterString = this.selectedFilterString.replace(/^,/, '');
  }
  /** to get table data based on search Go button */
  onManageSearchData(event) {
    this.noRecordError = false;
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'forecastAnalysisReport/fetch-trend-forecast-data';
    } else {
      // url = environment.base_url + 'site-management/exchange-info';
      url = environment.base_url + 'site-management/exchangeInfoNew';
    }
    this.pageObj.siteName = event;
    this.pageObj.exchangeCode = event;
    this.pageObj.pageNo = 0;
    this.pageObj.pageSize = 0;
    const reqObj = { ...this.filterObj, ...this.pageObj };
    this.appService.post(url, reqObj).subscribe(res => {
      if (res.exchangeInfo.length > 0) {
        this.tableSettings.data = res.exchangeInfo;
        this.tableSettings.totalRecords = res.totalRecords;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
        this.noRecords = true;
      }
    });
  }

  getlistRowSelect(event) {
    this.pageObj.pageSize = event.target.value;
    this.getTableData();
  }
  convert(param) {
    this.noRecordError = false;
    let url;
    if (this.pageName === 'FMR') {
      url = environment.base_url + 'forecastAnalysisReport/fetch-trend-forecast-data';
    } else {
      // url = environment.base_url + 'site-management/exchange-info';
      url = environment.base_url + 'site-management/exchangeInfoNew';
    }
    const reqObj = { ...this.filterObj, ...this.pageObj };
    reqObj.pageNo = -1;
    this.appService.post(url, reqObj).subscribe(res => {
      if (res.exchangeInfo.length > 0) {
        this.tableSettings.data = res.exchangeInfo;
        this.tableSettings.totalRecords = res.totalRecords;
        // this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
        // this.bindTableProperties('');
        const rearrangeJson = [];
        const keys = this.tableSettings.data[0];
        // tslint:disable-next-line:prefer-const
        let deletedKeyArr = [];
        const obj = [...this.tableSettings.frozenColumns, ...this.tableSettings.headers];
        // tslint:disable-next-line:forin
        for (const key in keys) {
          const ss = obj.filter(x => x.field === key);
          if (ss.length === 0) {
            deletedKeyArr.push(key);
          }
        }
        // tslint:disable-next-line:no-shadowed-variable
        this.tableSettings.data.forEach(element => {
          deletedKeyArr.forEach(e => delete element[e]);
        });
        // const dataToShow = this.tableSettings.data as object[];
        // const columnsExport = [...this.tableSettings.frozenColumns, ...this.tableSettings.headers];
        const columnsExport = [... this.tableSettings.frozenColumns, ...this.selectedColumns];
        const colsToFile = columnsExport.map((el) => {
          rearrangeJson.push(el.field);
          return el.header;
        });
        // rearrangeJson = columnsExport.map((el) => el.field);
        const rearrange = JSON.parse(JSON.stringify(this.tableSettings.data, rearrangeJson));
        const rowsToFile = rearrange as object[];
        let header = 'Selected Filter -';
        header += this.selectedFilterString as string;
        let title;
        if (this.pageName === 'CDPR') {
          title = 'Capacity Demand Prediction Report \n' + header;
        } else if (this.pageName === 'FMR') {
          title = 'Forecast Management Report \n' + header;
        }
        if (param === 'csv') {
          const options = {
            showLabels: true,
            showTitle: true,
            title,
            headers: colsToFile
          };
          param = null;
          if (this.pageName === 'CDPR') {
            // tslint:disable-next-line:no-unused-expression
            new ngxCsv(rowsToFile, 'CapacityDemandPredictionReport', options);
          } else if (this.pageName === 'FMR') {
            // tslint:disable-next-line:no-unused-expression
            new ngxCsv(rowsToFile, 'ForecastManagementReport', options);
          }
        } else if (param === 'pdf') {
          // tslint:disable-next-line:prefer-const
          let addTop = 5;
          const doc = new jsPDF('p', 'mm', 'a2');
          if (this.pageName === 'CDPR') {
            doc.text(15, 15, 'Capacity Demand Prediction Report');
          } else if (this.pageName === 'FMR') {
            doc.text(15, 15, 'Forecast Management Report');
          }
          let headers = '';
          headers += this.selectedFilterString;
          // header = header.substring(0, header.lastIndexOf(';'));
          if (header.length > 150) {
            let headerLength = header.length;
            // const v = headers.lastIndexOf(';');
            let count = 0;
            doc.text(15, 25, header.substring(0, 150));
            while (headerLength > 150) {
              ++count;
              headerLength = headerLength - 150;
              addTop = addTop + 5;
              doc.text(15, 25 + addTop, header.substring(((150 * count)), ((150 * count) + 150)));
            }
          } else {
            doc.text(15, 25, header.substring(0, header.length));
          }
          const rowdata = [];
          rowsToFile.forEach((exObj) => {
            // tslint:disable-next-line:no-shadowed-variable
            const obj = [];
            columnsExport.map((colInfo) => {
              if (columnsExport) {
                Object.prototype.hasOwnProperty.bind(exObj)(colInfo.field) ? obj.push(exObj[colInfo.field]) : obj.push('');
                return obj;
              }
            });
            rowdata.push(obj);
          });
          const img = new Image();
          img.src = 'assets/images/BT_purple_logo.png';
          img.onload = () => {
            doc.addImage(img, 'PNG', 380, 10, 20, 10);
            doc.autoTable(colsToFile, rowdata, {
              rowHeight: 4, fontSize: 8, overflow: 'linebreak', margin: { top: (30 + (addTop + 5)), left: 15, right: 15, bottom: 10 },
            });
            if (this.pageName === 'CDPR') {
              doc.save('CapacityDemandPredictionReport.pdf');
            } else if (this.pageName === 'FMR') {
              doc.save('ForecastManagementReport.pdf');
            }
            param = null;
          };
        }
      }
      // this.getHeaders();
    });
  }


  navigateUrl(columnData) {
    if (this.pageName === 'CDPR') {
      console.log(columnData);
      if (columnData.columnIndex === 'siteName') {
        const deviceTypedata = this.getSelectedFilters();
      const filtenameValue = deviceTypedata.filter(x => x.filterName === 'Device Type').map(y => y.values);
      if (!filtenameValue[0]) {
        this.deviceTypevalue = '';
      } else {
        const filtenameSelectedValue = filtenameValue[0].filter(x => x.selected === true);
        for (let i = 0; i < filtenameSelectedValue.length; i++) {

          this.deviceTypevalue = filtenameSelectedValue[i].value;
          //  console.log(filtenameSelectedValue[i].value);
        }
        //  console.log(filtenameSelectedValue[0].value);
       // this.portspeedvalue = filtenameSelectedValue[0].value;
      }
        let reqValue = {
          siteName: columnData.columnValue,
          deviceType: this.deviceTypevalue
        };
        this.navigationService.navigateCDPRToDSRBySiteName.next(reqValue);
        if(this.deviceTypevalue == 'Edge Rt'){
        
        this.router.navigate(['/detailed-site-reportEdgeRT']);
      }
      else if(this.deviceTypevalue == 'Core Rt'){
        this.router.navigate(['/detailed-site-reportCoreRT']);
      }
      } else if (columnData.columnIndex === 'delta' || columnData.columnIndex === 'broadband1gDelta' ||
        columnData.columnIndex === 'broadband10gDelta' || columnData.columnIndex === 'ethernetFasteDelta' ||
        columnData.columnIndex === 'ethernet1gHeDelta' || columnData.columnIndex === 'ethernet10gHeDelta' ||
        columnData.columnIndex === 'ethernet10gWmcDelta' || columnData.columnIndex === 'ethernet100gAccessDelta' ||
        columnData.columnIndex === 'backhaul10gDelta' || columnData.columnIndex === 'backhaul100gDelta' ||
        columnData.columnIndex === 'inflightTodPortsDelta' || columnData.columnIndex === 'inflightNonTodPortsDelta') {
        // navigate to 360page
        // tslint:disable-next-line:prefer-const
        let productype = this.filterObj.productType;
        const three60data = {
          sitename: columnData.rowValue.siteName,
          product_type: productype,
          // portspeed: this.portSpeed
        };
        if (columnData.columnValue <= 0) {
          this.navigationService.navigateCDPRTo360.next(three60data);
          this.router.navigate(['/three60-twod']);
        }
      } else {
        // tslint:disable-next-line:radix
        if (parseInt(columnData.columnValue) !== 0) {
          const Json3D = this.filterObj;
          const chassisView3D = {
            ...Json3D, siteName: columnData.rowValue.siteName, exchangeCode: columnData.rowValue.exchangeCode,
            deviceNo: columnData.rowValue.deviceNo, cardNo: columnData.rowValue.cardNo, portStatus: columnData.columnIndex.toUpperCase()
          };
          delete (chassisView3D.ein);
          this.navigationService.navigateCDPRTo3D.next(chassisView3D);
          this.router.navigate(['/chassis-viewer']);
        }
      }
    } else if (this.pageName === 'FMR') {
      // tslint:disable-next-line:radix
      if (columnData.columnIndex === 'trendAndForecast' && parseInt(columnData.columnValue) !== 0) {
        this.navigationService.navigateFMRToFABySiteName.next(columnData.rowValue.siteName);
        this.router.navigate(['/forecast-analysis']);
      }
    }
  }
  customSort(event) {
    if (event.order === 1) {
      if (this.pageObj.sortOrder !== true || this.pageObj.sortByField !== event.field) {
        this.pageObj.sortOrder = true;
        this.pageObj.sortByField = event.field;
        this.getTableData();
      }
    } else if ((event.order === -1)) {
      if (this.pageObj.sortOrder !== false || this.pageObj.sortByField !== event.field) {
        this.pageObj.sortOrder = false;
        this.pageObj.sortByField = event.field;
        this.getTableData();
      }
    }
  }

  closeallExpandDropdown() {
    document.getElementById('changeButton').innerText = 'Expand All';
    this.collapsAlleFlag = JSON.parse(JSON.stringify(true));
    this.expandAllFlag = false;
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
