import { Component, Input, OnChanges, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { PageObjDetailed } from './../../../detail-reservation-report/pageObjDetailed.model';
import { PageObjShortfall } from './../../../shortfall-automation-detailed-report/PageObjShortfall.model';
import { PageObjDetailPatch } from './../../../detailed-patch-panel-report/PageObjDetailPatch.model';
import {​​​​​ debounceTime, distinctUntilChanged, filter }​​​​​ from 'rxjs/operators';
import {​​​​​ Subject }​​​​​ from 'rxjs';
/** This component is the sahred component which will be used for table across the application */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit, AfterViewChecked {
  /** Local varaiable defines here input output */
  @Input() settings: any;
  @Input() exportData;
  @Input() clearData;
  @Input() clearAllRack;
  @Input() siteNameFlag;
  @Input() clearAllCable;
  results: any;
  public listRow = [100, 200, 500];
  public totalCount = 0;
  public pageCount: number;
  public numberPage = 1;
  public totalRecord = 0;
  public deltaIndex: number;
  public deltaSubChildColumnIndex: number;
  ri: any;
  dateValue;
  dateValue1;
  dateValue2;
  value;
  dateValuehd;
  @Input() frozenColumns;
  @Output() deleteRow = new EventEmitter<any>();
  @Output() updatedRow = new EventEmitter<any>();
  @Input() rowUpdatedSuccessfully = { updated: false };
  @Output() updatedHeaders = new EventEmitter<any>();
  @Output() selectedPageNo = new EventEmitter<any>();
  @Output() listRowSelect = new EventEmitter<any>();
  @Output() exportParam = new EventEmitter<any>();
  @Output() filterTableRecords = new EventEmitter<any>();
  @Output() customSortRecord = new EventEmitter<any>();
  @Input() successsfullysubmitted;
  @Input() allCheck;
  pageSize = 100;
  @Input() noRecordError;
  // @Input() filterItem;
  // @Input() filterItemcol;
  rowGroupMetadata: any;
  first = 0;
  currentPageNo = 1;
  /** Emit value onclick of link */
  @Output() navigateUrl = new EventEmitter();
  uncheck = [];
  selectedRow: any;
  selectedValues = [];
  showDatepciker = false;
  selectDateValue = [];
  editordr = false;
  minimumDate = new Date();
  @Output() enableSubmitButton = new EventEmitter();
  @Output() setExpiryDateAllColumnValue = new EventEmitter();
  @Output() setExpiryDateColumnValue = new EventEmitter();
  roleName: string;
  hideAndShow = [];
  // to fetch datatable from html
  @ViewChild('dt', { static: false }) dataTbale;
  public pageData = new PageObjDetailed();
  public pageDataShort = new PageObjShortfall();
  userQuestionUpdate = new Subject<string>();
  @Input() clearAllShortFallData;
  @Input() clearAllDrrData;
  constructor() {
    this.userQuestionUpdate.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {​​​​​
      this.filterEmit();
      }​​​​​);
  }
  /** funtion for row array and pagination */
  ngOnChanges() {
    console.log(this.settings)
    this.roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.selectedValues = [];
    if (this.clearData) {
      this.dataTbale.reset();
      this.selectedRow = [];
      this.selectedValues = [];
    }
    if (this.settings.data) {
      if (this.settings.refreshPagination) {
        this.currentPageNo = 1;
      }
      this.settings.data = JSON.parse(JSON.stringify(this.settings.data));
      this.totalRecord = this.settings.totalRecords || this.settings.data.length;
      if (this.settings.paginator) {
        this.settings.data = JSON.parse(JSON.stringify(this.settings.data));
        this.totalCount = this.pageSize;
        this.totalRecord = this.settings.totalRecords || this.settings.data.length;
        this.numberPage = this.pageSize * (this.currentPageNo - 1) + 1;
        this.pageCount = this.pageSize * this.currentPageNo;
        this.first = (this.currentPageNo - 1) * this.pageSize;
        this.settings.data = [...this.settings.data.slice(0, this.totalCount)];
        this.pageCount = this.pageCount >= (this.totalRecord) ? this.totalRecord : this.pageCount;
      }
      this.loadRowMetaData();
    }
    if (this.rowUpdatedSuccessfully.updated) {
      this.removeEditMode();
      this.rowUpdatedSuccessfully.updated = false;
    }

    if (this.clearAllRack) {
      this.dataTbale.reset();
      this.dateValue = '';
      this.selectedRow = [];
      this.selectedValues = [];
    }

    if (this.clearAllCable) {
      this.dataTbale.reset();
      this.dateValue = '';
      this.selectedRow = [];
      this.selectedValues = [];
    }
    if (this.successsfullysubmitted) {
      this.selectedRow = [];
      this.selectedValues = [];
    }
    if (this.siteNameFlag) {
      this.selectRow(true);
      this.selectedValues = ['val1'];
    }
    if (this.clearAllShortFallData) {
      this.dataTbale.reset();
      this.dateValue = '';
      this.dateValue1 = '';
      this.selectedRow = [];
      this.selectedValues = [];
    }
    if (this.clearAllDrrData) {	
      this.dataTbale.reset();	
      this.dateValue = '';	
      this.dateValue2 = '';      	
      this.selectedRow = [];	
      this.selectedValues = [];	
    }	
    
  }

  ngOnInit() {
    this.pageSize = 100;
  }

  ngAfterViewChecked() {
    if (this.hideAndShow.length > 0 && this.settings.data.length > 0) {
      this.hideAndShow.forEach(value => {
        this.settings.headers.forEach((element) => {
          if (element.field === value && element.visible === true) {
            document.getElementById(value + '_plus').classList.remove('show');
            document.getElementById(value + '_plus').classList.add('hide');
            document.getElementById(value + '_minus').classList.remove('hide');
            document.getElementById(value + '_minus').classList.add('show');
          }
        });
      });
    }
  }
 
  filterEmit() {
    const pagename = this.settings.headers.find(x => x.pageName).pageName;
    const filterFieldName = [];
    if (pagename === 'DRR') {
      this.settings.headers.forEach((element) => {
        filterFieldName.push(element.field);
      });
      const filteredData = Object.keys(this.dataTbale['filters']);
      filterFieldName.filter(ele => {
        if (filteredData.indexOf(ele) !== -1) {
          this.pageData[ele] = [];
          this.pageData[ele].push(this.dataTbale['filters'][ele].value);
        }
      });
      this.exportParam.emit(this.pageData);
    }
    else if (pagename === 'SAR') {
      this.settings.headers.forEach((element) => {
        filterFieldName.push(element.field);
      });
      const filteredData = Object.keys(this.dataTbale['filters']);
      filterFieldName.filter(ele => {
        if (filteredData.indexOf(ele) !== -1) {
          this.pageDataShort[ele] = [];
          this.pageDataShort[ele].push(this.dataTbale['filters'][ele].value);
        }
      });
      this.exportParam.emit(this.pageDataShort);
    }
    else {
      const exportObj = {
        id: '',
      };
      const filterValue = ['exCode', 'projectId', 'cpNumber', 'cpDate', 'productType',
        'sneId', 'slot', 'cardInFillType', 'portAvailability', 'status'];
      const filteredValue = Object.keys(this.dataTbale['filters']);
      filterValue.filter(ele => {
        if (filteredValue.indexOf(ele) !== -1) {
          const filterrrr = this.dataTbale['filters'][ele].value;
          exportObj[ele] = this.dataTbale['filters'][ele].value;
        } else {
          const filterrrr = '';
          exportObj[ele] = '';
        }
      });
      this.exportParam.emit(exportObj);
    }
  }
  /** funtion for pagination on table */
  paginate(event: any) {
    this.currentPageNo = event.page + 1;
    this.selectedPageNo.emit(event);
  }
  /** All checkbox selection */
  selectRow(checkValue) {
    if (checkValue) {
      if (this.allCheck) {
        if (checkValue) {
          this.selectedRow = this.settings.data;
        }
        this.enableSubmitButton.emit(this.selectedRow);
      }
      const savedRecord = this.settings.data.filter(obj => {
        if (obj.status.toLowerCase() === 'saved' || obj.status.toLowerCase() === 'submission failed') {
          return true;
        }
      });
      this.uncheck = savedRecord;
      this.selectedRow = savedRecord;
      this.enableSubmitButton.emit(this.selectedRow);
    } else {
      this.selectedRow = [];
      this.selectedValues = [];
      this.enableSubmitButton.emit(this.selectedRow);
    }
  }
  /** add row functionality for table */
  addRow(rowDetails, index) {
    const indexArray = [];
    this.enableSubmitButton.emit(rowDetails);
  }
  /** row's checkbox selection */
  rowSelect() {
    if (this.allCheck) {
      this.enableSubmitButton.emit(this.selectedRow);
      if (this.uncheck.length !== this.selectedRow.length) {
        this.selectedValues = [];
      } else if (this.selectedRow.length === 0) {
        this.selectedValues = [];
      } else if (this.uncheck.length === this.selectedRow.length) {
        this.selectedValues = ['val1'];
      }
    } else {
      this.enableSubmitButton.emit(this.selectedRow);
      if (this.uncheck.length !== this.selectedRow.length) {
        this.selectedValues = [];
      } else if (this.selectedRow.length === 0) {
        this.selectedValues = [];
      } else if (this.uncheck.length === this.selectedRow.length) {
        this.selectedValues = ['val1'];
      }
    }
  }
  /** funtion for change on page counts on table */
  selectChange(event) {
    this.pageSize = Number(event.target.value);
    this.listRowSelect.emit(event);
  }

  /** funtion for taking delete row id on table */
  onDelete(row, ri) {
    this.deleteRow.emit(row.id);
  }
  /** funtion for taking edit row id on table */
  editRow(rowDetails, index) {
    this.updatedRow.emit(rowDetails);
  }
  /** funtion for sending edit row */
  onEdited(row) {
    if (row.phaseForecastDate) {
      this.updatedRow.emit(null);
    } else {
      this.updatedRow.emit(row);
    }
  }
  /** funtion for removing edit mode */
  removeEditMode() {
    const saveElems = Array.from(document.querySelectorAll('#updatedTable'));
    saveElems.map((elem: HTMLElement) => {
      elem.click();
    });
    // const allrowElement: any = document.querySelectorAll('#updatedTable');
    // allrowElement.forEach(element => {
    //   const el = element as HTMLElement;
    //   el.click();
    // });
  }

  /** funtion to get Flag for filter row */
  getFilterFlag() {
    if (this.settings.headers.filter(x => x.properties.filter === true).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /** funtion to append column on click of plus icon */
  appendColumn(column) {
    this.hideAndShow.push(column.field);
    const index = this.settings.headers.findIndex(x => x.field === column.field);
    this.settings.headers.splice(index + 1, 0, ...column.child);
    const obj = { data: column, type: 'add' };
    this.updatedHeaders.emit(obj);
    const elePlus = document.getElementById(column.field + '_plus') as HTMLElement;
    const eleMinus = document.getElementById(column.field + '_minus') as HTMLElement;
    // elePlus.classList.replace('show', 'hide');
    if(elePlus) {
      elePlus.classList.remove('show');
      elePlus.classList.add('hide');
    }
    if(eleMinus) {
      eleMinus.classList.remove('hide');
      eleMinus.classList.add('show');
    }
    // elePlus.classList.remove('show');
    // elePlus.classList.add('hide');
    // // eleMinus.classList.replace('hide', 'show');
    // eleMinus.classList.remove('hide');
    // eleMinus.classList.add('show');
    if (column.hasOwnProperty('dependendColumns')) {
      if (column.dependendColumns !== null) {
        column.dependendColumns.forEach(element => {
          const ele = document.getElementById(element + '_plus') as HTMLElement;
          const eleMin = document.getElementById(element + '_plus') as HTMLElement;
          if (ele !== null && eleMin !== null) {
            if (eleMin.classList.contains('show')) {
              ele.click();
            }
          }

        });
      }
    }
  }

  /** funtion to remove column on click of minus icon */
  removeColumn(column) {
    if (this.hideAndShow.indexOf(column.field) !== -1) {
      const _ = this.hideAndShow.indexOf(column.field);
      if (_ > -1) {
        this.hideAndShow.splice(_, 1);
        if (column.field === 'forCastPorts') {
          const indexD = this.hideAndShow.indexOf('delta');
          if (indexD > -1) {
            this.hideAndShow.splice(indexD, 1);
          }
          const indexChildD = this.hideAndShow.indexOf('ethernet10gHeDelta');
          if (indexChildD > -1) {
            this.hideAndShow.splice(indexChildD, 1);
          }
        } else if (column.field === 'delta') {
          const indexD = this.hideAndShow.indexOf('forCastPorts');
          if (indexD > -1) {
            this.hideAndShow.splice(indexD, 1);
          }
          const indexChildD = this.hideAndShow.indexOf('ethernet10gHeDelta');
          if (indexChildD > -1) {
            this.hideAndShow.splice(indexChildD, 1);
          }
        }
      }
    }
    const index = this.settings.headers.findIndex(x => x.field === column.field);
    let columnCount = column.child.length;
    if (column.field === 'delta') {
      this.settings.headers.forEach((element) => {
        if (element.parentHeaderName === 'Delta 10G HE') {
          columnCount++;
        }
      });
    }
    this.settings.headers.splice(index + 1, columnCount, ...[]);
    const obj = { data: column, type: 'minus' };
    this.updatedHeaders.emit(obj);
    const elePlus = document.getElementById(column.field + '_plus') as HTMLElement;
    const eleMinus = document.getElementById(column.field + '_minus') as HTMLElement;
    if (elePlus !== null) {
      elePlus.classList.remove('hide');
      elePlus.classList.add('show');
    }
    if (eleMinus !== null) {
      eleMinus.classList.remove('show');
      eleMinus.classList.add('hide');
    }
    if (column.childType && (column.field === 'delta' || column.field === 'forCastPorts')) {
      if (column.field === 'delta') {
        this.deltaIndex = this.settings.headers.findIndex(x => x.field === 'forCastPorts' && x.visible === true);
      }
      if (column.field === 'forCastPorts') {
        const deltaSubChildIndex = this.settings.headers.findIndex(x => x.parentHeaderName === 'Delta 10G HE');
        this.settings.headers.splice(deltaSubChildIndex, 2, ...[]);
        this.deltaIndex = this.settings.headers.findIndex(x => x.field === 'delta' && x.visible === true);
      }
      column = this.settings.headers[this.deltaIndex];
      if (this.deltaIndex > -1) {
        this.settings.headers.splice(this.deltaIndex + 1, column.child.length, ...[]);
        const object = { data: column, type: 'minus' };
        this.updatedHeaders.emit(object);
        const elementPlus = document.getElementById(column.field + '_plus') as HTMLElement;
        const elementMinus = document.getElementById(column.field + '_minus') as HTMLElement;
        if (elementPlus !== null) {
          elementPlus.classList.remove('hide');
          elementPlus.classList.add('show');
        }
        if (elementMinus !== null) {
          elementMinus.classList.remove('show');
          elementMinus.classList.add('hide');
        }
      }
    }
  }

  removeChild(column) {
    if (column.childType && (column.field === 'delta' || column.field === 'forCastPorts')) {
      if (column.field === 'delta') {
        this.deltaIndex = this.settings.headers.findIndex(x => x.field === 'delta');
      }
      if (column.field === 'forCastPorts') {
        this.deltaIndex = this.settings.headers.findIndex(x => x.field === 'forCastPorts');
      }
      column = this.settings.headers[this.deltaIndex];
      if (this.deltaIndex > -1) {
        this.settings.headers.splice(this.deltaIndex + 1, column.child.length, ...[]);
        const object = { data: column, type: 'minus' };
        this.updatedHeaders.emit(object);
        const elementPlus = document.getElementById(column.field + '_plus') as HTMLElement;
        const elementMinus = document.getElementById(column.field + '_minus') as HTMLElement;
        if (elementPlus !== null) {
          elementPlus.classList.remove('hide');
          elementPlus.classList.add('show');
        }

        // eleMinus.classList.replace('show', 'hide');
        if (elementMinus !== null) {
          elementMinus.classList.remove('show');
          elementMinus.classList.add('hide');
        }
      }
      // elePlus.classList.replace('hide', 'show');     
    }
  }
  /** group row logic */
  loadRowMetaData() {
    this.rowGroupMetadata = {};
    if (this.settings.rowGroupData.groupColName) {
      const tableData = this.settings.data;
      // const groupColName = this.settings.rowGroupData.groupColName;
      // iterate table data and get groupName
      for (let i = 0; i < tableData.length; i++) {
        const rowData = tableData[i];
        const groupColName = rowData.groupName;
        // Based on groupName assign index and size
        if (i === 0) {
          this.rowGroupMetadata[groupColName] = { index: 0, size: 1 };
        } else {
          const previousRowData = tableData[i - 1];
          const previousRowGroup = previousRowData['groupName'];
          if (groupColName === previousRowGroup) {
            this.rowGroupMetadata[groupColName].size++;
          } else {
            this.rowGroupMetadata[groupColName] = { index: i, size: 1 };
          }
        }
      }
    }
  }

  /** Emit a event when user clicked on link */
  onClickNavigation(colIndex, colValue, rowVal) {
    const colData = { columnIndex: colIndex, columnValue: colValue, rowValue: rowVal };
    this.navigateUrl.emit(colData);
  }

  /***Filter method for table
   * @author Binu
   *
   * **/

  filterTableRecord(ev) {
    this.filterTableRecords.emit(ev);
  }
  selectRowShowDatePicker(checkValue) {
    if (checkValue) {
      this.showDatepciker = true;
      this.editordr = true;
    } else {
      this.showDatepciker = false;
      this.editordr = false;
    }
  }
  /** From Header Value passed For All Expiry Data Column */
  setExpiryDateAllColumn(dateValuehd) {
    this.setExpiryDateAllColumnValue.emit(dateValuehd);
    this.showDatepciker = false;
  }
  /** For Expiry Date Passed For Table body */
  setExpiryDateColumn(rowDetails, dateValue) {
    rowDetails.reservationExpiryDate = dateValue;
    this.selectDateValue.push(rowDetails);
    this.setExpiryDateColumnValue.emit(this.selectDateValue);
  }
  // customSort(event: any) {
  //   this.customSortRecord.emit(event);
  // }
  customSort(event: any) {
    if (this.settings.clientSorting === true) {
      event.data.sort((data1, data2) => {
        // tslint:disable-next-line:prefer-const
        let value1 = data1[event.field];
        // tslint:disable-next-line:prefer-const
        let value2 = data2[event.field];
        let result = null;
        if (value1 === '' && value2 !== '') {
          result = 1;
        } else if (value1 !== '' && value2 === '') {
          result = -1;
        } else if (value1 === '' && value2 === '') {
          result = 0;
        } else if (value1 === null && value2 !== null) {
          result = 1;
        } else if (value1 !== null && value2 === null) {
          result = -1;
        } else if (value1 === null && value2 === null) {
          result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2, 'en', { numeric: true });
        } else {
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }
        return (event.order * result);
      });
    } else {
      this.customSortRecord.emit(event);
    }
  }
  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  clearArray() {
    this.hideAndShow = [];
  }
}
