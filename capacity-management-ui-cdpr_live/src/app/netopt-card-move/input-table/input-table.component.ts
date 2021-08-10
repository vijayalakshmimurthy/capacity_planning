import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {
  @Input() inputTableProperties: any;
  editordr = false;
  minimumDate = new Date();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() rowAdd = new EventEmitter<boolean>();
  @Output() emitproceedcheck = new EventEmitter<any>();
  public paginatorPosition = 'top';
  proceedEnable;
  constructor() { }

  ngOnInit() {
  }

  /** funtion for taking delete row id on table */
  onDelete(row, i) {
    this.deleteRow.emit(i);
    this.checkvalidation();
  }
  selectRowShowDatePicker(checkValue) {
    if (checkValue) {
      this.editordr = true;
    } else {
      this.editordr = false;
    }
  }
  checkvalidation() {
    const data = this.inputTableProperties.data;
    for (const value of data) {
      if (value.source_sne !== null && value.source_port !== null && value.destination_sne !== null &&
        value.destination_port !== null && value.fist_Project_No !== null && value.scheme_Driver !== null &&
        value.capacity_Required_Date !== null) {
        if (value.source_sne !== '' && value.source_port !== '' && value.destination_sne !== '' &&
        value.destination_port !== '' && value.fist_Project_No !== '' && value.scheme_Driver !== '' &&
        value.capacity_Required_Date !== '') {
          this.proceedEnable = false;
        } else {
          this.proceedEnable = true;
        }
      } else {
        this.proceedEnable = true;
      }
    }
    this.emitproceedcheck.emit(this.proceedEnable);
  }

  onRowEditAdd() {
    this.rowAdd.emit(true);
    this.proceedEnable = true;
    this.emitproceedcheck.emit(this.proceedEnable);
  }

  isEmpty(data, colIndex) {
    data['showErr'][colIndex] = true;
  }

  findIndexByKeyValue(array, key): number {
    for (let i = 0; i < array.length; i++) {
      if ((array[i]).field === key) {
        return i;
      }
    }
    return -1;
  }
}
