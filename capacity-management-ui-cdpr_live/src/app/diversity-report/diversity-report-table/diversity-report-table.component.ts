import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-diversity-report-table',
  templateUrl: './diversity-report-table.component.html',
  styleUrls: ['./diversity-report-table.component.scss']
})
export class DiversityReportTableComponent implements OnChanges {

  @Input() tableResponse;
  @Input() loadEditableRow;
  @Input() loadUpdatableRow;
  @Input() groupData;
  @Output() getFilterData = new EventEmitter<any>();
  @Output() getSearchFlag = new EventEmitter<any>();
  @Output() addValueGroup = new EventEmitter<any>();
  prefixLocation = ['BTRAN-', 'TEF-'];
  rowGroupMetadata = {};
  rowGroupdata = {};
  @Input() rowGroupMetaList;
  @Input() rowGroupDataList;
  countFlag = 0;
  sortJSON = [];
  addValues;
  dgnamenFlag = false;
  flagObj = {
    prefixErrorSame: false,
    errorcallDGnamesame: false,
    errorcallDGname: false,
    errorDropdown: false,
    checkflagchar: false,
    updatedJson: []
  };
  datab = '';
  searchvalues;
  constructor() { }

  ngOnChanges() {
    if (this.loadEditableRow) {
      this.editDGName();
    }
    if (this.loadUpdatableRow) {
      this.updateTable();
    }
  }

  editDGName() {
    const saveElems = Array.from(document.querySelectorAll('#autoEdite'));
    saveElems.map((elem: HTMLElement) => {
      elem.click();
    });
  }

  updateTable() {
    const saveElems = Array.from(document.querySelectorAll('#updatedTable'));
    saveElems.map((elem: HTMLElement) => {
      elem.click();
    });
  }

  // Group row and column based on the response
  updateRowGroupMetaData(currentRowData) {
    this.rowGroupMetadata = {};
    this.rowGroupdata = {};
    if (currentRowData) {
      for (let i = 0; i < currentRowData.length; i++) {
        const rowData = currentRowData[i];
        rowData.newab = rowData.diversityGroupName.split(',');
        rowData.newab = rowData.newab.filter(Boolean);
        const sneId = rowData.sneId;
        if (i === 0) {
          this.rowGroupMetadata[sneId] = { index: 0, size: 1 };
          this.rowGroupdata[rowData.cardDetail + rowData.cardStatus + rowData.diversityGroupName + rowData.sneId] = { index: 0, size: 1 };

        } else {
          const previousRowData = currentRowData[i - 1];
          const previousRowGroup = previousRowData.sneId;
          if (sneId === previousRowGroup) {
            this.rowGroupMetadata[sneId].size++;
            if (rowData.cardDetail === previousRowData.cardDetail && rowData.cardStatus === previousRowData.cardStatus &&
              rowData.diversityGroupName === previousRowData.diversityGroupName && rowData.sneId === previousRowData.sneId) {
              this.rowGroupdata[rowData.cardDetail + rowData.cardStatus + rowData.diversityGroupName + rowData.sneId].size++;
            } else {
              this.rowGroupdata[rowData.cardDetail + rowData.cardStatus + rowData.diversityGroupName
                + rowData.sneId] = { index: i, size: 1 };
            }
          } else {
            this.rowGroupMetadata[sneId] = { index: i, size: 1 };
            this.rowGroupdata[rowData.cardDetail + rowData.cardStatus + rowData.diversityGroupName + rowData.sneId] = { index: i, size: 1 };

          }
        }
      }
      this.rowGroupMetaList.push(this.rowGroupMetadata);
      this.rowGroupDataList.push(this.rowGroupdata);
    }
  }

  onSort(currentRowData) {
    this.updateRowGroupMetaData(currentRowData);
    this.sortJSON.push(currentRowData);
    console.log('sortJson', this.sortJSON);
  }

  removeDGNameFromTable(rows, index, value) {
    rows.newab = rows.newab.filter(items => items !== value);
    rows.newab = rows.newab.filter(Boolean);
    const indexValue = this.rowGroupDataList[index][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].index;
    const size = this.rowGroupDataList[index][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].size;
    let sizeCount = 1;
    for (let ii = indexValue; ii < this.sortJSON[index].length; ii++) {
      if (sizeCount <= size) {
        this.sortJSON[index][ii].diversityGroupName = rows.newab.toString();
        sizeCount++;
      }
    }
    this.rowGroupDataList = [];
    this.sortJSON.forEach((updatedJson) => {
      this.updateRowGroupMetaData(updatedJson);
    });
    this.addValues = '';
    rows.dgname = '';
  }

  onCompleteGroupName(event, geocode) {
    const value = geocode + event.query;
    this.getFilterData.emit(value);
  }

  onSelectSearchAdd(item, rows, i, j) {
    if (rows.newab.length !== 30) {
      const newvalue = item.replace(/_/g, '-').split('-');
      const checkvalue = newvalue[0] + '-' + newvalue[1];
      let addValueFlag = true;
      let countBtran = 0;
      let countTef = 0;
      rows.newab.forEach(element => {
        const dgNameEle = element.toLowerCase();
        const searchIndex = dgNameEle.search(checkvalue.toLowerCase());
        if (searchIndex !== -1) {
          addValueFlag = false; // -1 means not found in the newab, then able to add for other index.
        }
        if (element.toLowerCase().includes('btran')) {
          countBtran++;
        } else {
          countTef++;
        }
      });
      if (item.toLowerCase().includes('btran')) {
        countBtran++;
      } else {
        countTef++;
      }
      if ((countBtran >= 6) || (countTef >= 6)) {
        this.flagObj.prefixErrorSame = true;
        setTimeout(() => {
          rows.dgname = '';
          this.flagObj.prefixErrorSame = false;
        }, 2000);
      } else if ((!rows.newab.find(a => a.includes(checkvalue))) && (addValueFlag)) {
        rows.newab.push(item);
        rows.newab = rows.newab.filter(Boolean);
        rows.newab = Array.from(new Set(rows.newab));
        const index = this.rowGroupDataList[j][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].index;
        const size = this.rowGroupDataList[j][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].size;
        let sizeCount = 1;
        for (let ii = index; ii < this.sortJSON[j].length; ii++) {
          if (sizeCount <= size) {
            this.sortJSON[j][ii].diversityGroupName = rows.newab.toString();
            sizeCount++;
          }
        }
        this.rowGroupMetaList = [];
        this.rowGroupDataList = [];
        this.sortJSON.forEach((updatedJson) => {
          this.updateRowGroupMetaData(updatedJson);
        });
        this.dgnamenFlag = true;
      } else {
        this.flagObj.errorcallDGnamesame = true;
        setTimeout(() => {
          rows.dgname = '';
          this.flagObj.errorcallDGnamesame = false;
        }, 1000);
      }
    } else {
      this.flagObj.errorcallDGname = true;
      setTimeout(() => {
        this.flagObj.errorcallDGname = false;
      }, 2000);
    }
    this.getSearchFlag.emit(this.flagObj);
    rows.dgname = '';
  }
  editRow(rows, i, j, newDG) {
    this.addValues = newDG;
    // console.log('ss', newDG);
    if (this.dgnamenFlag) {
      setTimeout(() => {
        // console.log('ss', rows.dgname);
        rows.dgname = '';
        this.dgnamenFlag = false;
      }, 1000);
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
  getdropdown(item, rows, i, j) {
    this.searchvalues = j;
  }
  addValue(item, rows, i, j) {
    if (rows.newab.length !== 30 && this.addValues !== '' && rows.dgname) {
      const dropValue = this.searchvalues.split('-');
      const dgValue = this.addValues.split(/[-_]/);
      if (dropValue[0].toLowerCase() === dgValue[0].toLowerCase()) {
        this.datab = this.addValues;
        this.testFuntion(rows, j);
        // tslint:disable-next-line:max-line-length
      } else if ((dropValue[0] === 'btran' && dgValue[0].toLowerCase() === 'tef') || (dropValue[0].toLowerCase() === 'tef' && dgValue[0].toLowerCase() === 'btran')) {
        this.flagObj.errorDropdown = true;
        setTimeout(() => {
          this.flagObj.errorDropdown = false;
        }, 1000);
      } else {
        // this.flagObj.errorDropdown = false;
        this.datab = this.searchvalues + this.addValues;
        this.testFuntion(rows, j);
      }

    } else {
      this.flagObj.errorcallDGname = true;
      setTimeout(() => {
        this.flagObj.errorcallDGname = false;
      }, 2000);
    }
    this.addValueGroup.emit(this.flagObj);
  }
  // Test function
  testFuntion(rows, j) {
    if (this.datab.length < 16) {
      const newvalue = this.datab.replace(/_/g, '-').split('-');
      const checkvalue = newvalue[0] + '-' + newvalue[1];
      let addValueFlag = true;
      let countBtran = 0;
      let countTef = 0;
      rows.newab.forEach(element => {
        const dgNameEle = element.toLowerCase();
        const searchIndex = dgNameEle.search(checkvalue.toLowerCase());
        if (searchIndex !== -1) {
          addValueFlag = false; // -1 means not found in the newab, then able to add for other index.
        }
        if (element.toLowerCase().includes('btran')) {
          countBtran++;
        } else {
          countTef++;
        }
      });
      if (this.datab.toLowerCase().includes('btran')) {
        countBtran++;
      } else {
        countTef++;
      }
      if ((countBtran >= 6) || (countTef >= 6)) {
        this.flagObj.prefixErrorSame = true;
        setTimeout(() => {
          rows.dgname = '';
          this.flagObj.prefixErrorSame = false;
        }, 2000);
      } else if ((!rows.newab.find(a => a.includes(checkvalue))) && (addValueFlag)) {
        rows.newab.push(this.datab);
        rows.newab = rows.newab.filter(Boolean);
        rows.newab = Array.from(new Set(rows.newab));
        const index = this.rowGroupDataList[j][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].index;
        const size = this.rowGroupDataList[j][rows.cardDetail + rows.cardStatus + rows.diversityGroupName + rows.sneId].size;
        let sizeCount = 1;
        for (let ii = index; ii < this.sortJSON[j].length; ii++) {
          if (sizeCount <= size) {
            this.sortJSON[j][ii].diversityGroupName = rows.newab.toString();
            sizeCount++;
          }
        }
        this.rowGroupDataList = [];
        this.sortJSON.forEach((updatedJson) => {
          //  rows.dgnamen='';
          // console.log('aa', updatedJson);
          this.updateRowGroupMetaData(updatedJson);
          // this.updatedjsona.push(updatedJson)
          // console.log('array', this.updatedjsona);
        });
        this.addValues = '';
        rows.dgname = '';
      } else {
        this.flagObj.errorcallDGnamesame = true;
        setTimeout(() => {
          rows.dgname = '';
          this.flagObj.errorcallDGnamesame = false;
        }, 2000);
      }
    } else {
      this.flagObj.checkflagchar = true;
      setTimeout(() => {
        rows.dgname = '';
        this.flagObj.checkflagchar = false;
      }, 2000);
    }
    this.addValueGroup.emit(this.flagObj);
  }
}
