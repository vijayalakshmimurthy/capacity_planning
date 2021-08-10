import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent {
  @Input() inputTableProperties: any;
  editordr = false;
  minimumDate = new Date();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() rowAdd = new EventEmitter<boolean>();
  public paginatorPosition = 'top';
  statusnew;
  proceedEnable;
  recoveryTypeHolder = false;
  @Output() emitproceedcheck = new EventEmitter<any>();
  constructor() { }

  /** funtion for taking delete row id on table */
  onDelete(row, i) {
    this.deleteRow.emit(i);
    this.checkValidation();
  }
  selectRowShowDatePicker(checkValue) {
    if (checkValue) {
      this.editordr = true;
    } else {
      this.editordr = false;
    }
  }

  // checkValidation() {
  //   const data = this.inputTableProperties.data;
  //   for (const value of data) {
  //     if (value.sne_Id !== null && value.holder !== null && value.recovery_type !== null &&
  //       value.fist_Project_No !== null && value.scheme_Driver !== null && value.capacity_Required_Date !== null &&
  //       value.physical_Connector_Removal !== null && value.rack_Recovery !== null && value.network_Change !== null &&
  //       value.auto_Progression !== null) {
  //       if (value.sne_Id !== '' && value.holder !== '' && value.recovery_type !== '' &&
  //         value.fist_Project_No !== '' && value.scheme_Driver !== '' && value.capacity_Required_Date !== '' &&
  //         value.physical_Connector_Removal !== '' && value.rack_Recovery !== '' && value.network_Change !== '' &&
  //         value.auto_Progression !== '') {
  //         this.proceedEnable = false;
  //       } else {
  //         this.proceedEnable = true;
  //       }
  //     } else {
  //       this.proceedEnable = true;
  //     }
  //   }
  //   this.emitproceedcheck.emit(this.proceedEnable);
  // }
  checkValidation() {
    const data = this.inputTableProperties.data;
    for (const value of data) {
      if (value.sne_Id !== null && value.recovery_type !== null &&
        value.fist_Project_No !== null && value.scheme_Driver !== null && value.capacity_Required_Date !== null &&
        value.physical_Connector_Removal !== null && value.rack_Recovery !== null && value.network_Change !== null &&
        value.auto_Progression !== null) {
        if (value.sne_Id !== '' && value.recovery_type !== '' &&
          value.fist_Project_No !== '' && value.scheme_Driver !== '' && value.capacity_Required_Date !== '' &&
          value.physical_Connector_Removal !== '' && value.rack_Recovery !== '' && value.network_Change !== '' &&
          value.auto_Progression !== '') {
          this.proceedEnable = false;
        } else {
          this.proceedEnable = true;
        }
      } else {
        this.proceedEnable = true;
      }
      if (value.recovery_type === 'Chassis' || value.recovery_type === 'Card') {
        value.disabletextbox = false;
        if (value.holder !== '' || value.holder !== null) {
          this.proceedEnable = false;
        } else {
          this.proceedEnable = true;
        }
      } else {
        if (value.recovery_type === 'Device') {
          value.disabletextbox = true;
          this.recoveryTypeHolder = true;
        } else {
          this.recoveryTypeHolder = false;
        }
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
