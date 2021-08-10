import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';
import { UtilityService } from '../../shared/services/utility.service';
import { CP_ERROR } from '../../shared/constants/error.constant';
import { Table } from 'primeng-lts/table';
@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.scss']
})
export class OptimizationComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() optBodyRecords: any;
  @Input() confirmStatusValue;
  @Input() cancelStatusValue;
  @Input() confirmDeleteRow;
  @Input() optClearAll;
  @Output() statusChange = new EventEmitter();
  @Output() deleteEachRow = new EventEmitter();
  @Output() submitBtnEnable = new EventEmitter();
  @Output() optFilterTable = new EventEmitter();
  @Output() editrowevent = new EventEmitter();
  @ViewChild('dt', { static: true }) dataTbale;
  header: any = [];
  status: any = [];
  tableData: any = [];
  colspanNo = '2';
  roleName: string;
  /** Row selection */
  selectedRow: any = [];
  selectedValues: any = [];
  statusRowIndex: number;
  rowData: any;
  statusChangeValue: string;
  deleteId: number;
  dateValue: any;
  uncheck = [];
  constructor(private appService: AppService, private utilityService: UtilityService) {
    const roleList: any = sessionStorage.getItem('SRIMS_CURRENT_SESSION').split(',');
    this.roleName = roleList[0];
    this.colspanNo = this.roleName === 'PROD_CE_ADMIN' ? '2' : '1';
  }
  ngOnChanges(changes: SimpleChanges) {
    this.tableData = this.optBodyRecords;
    if (this.confirmStatusValue) {
      const url = environment.base_url + 'card-move/update-status?id=' + this.rowData + '&status=' + this.statusChangeValue;
      this.appService.put(url).subscribe(() => {

      }, (err) => {
        this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      });
      this.confirmStatusValue = false;
    }

    if (this.cancelStatusValue === false) {
      this.tableData.forEach(_ => {
        if (_.id === this.rowData) {
          _.status = 'Awaiting Card Plan';
        }
      });
      this.cancelStatusValue = true;
    }
    if (this.confirmDeleteRow) {
      const url = environment.base_url + 'card-move/delete-workflow?id=' + this.deleteId;
      this.appService.delete(url).subscribe(result => {
        if (result.message.indexOf('Successfully') !== -1) {
          this.tableData = this.tableData.filter(value => value.id !== this.deleteId);
          this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        } else {
          this.utilityService.validateStatus(400, CP_ERROR.STATUS_MESSAGES.FORM_DELETE, CP_ERROR.SEVERITY.ERROR, 3000);
        }
      }, (err) => {
        this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.ERROR, CP_ERROR.SEVERITY.ERROR, 3000);
      });
      this.confirmDeleteRow = false;
    }
    if (this.optClearAll) {
      this.dataTbale.reset();
      this.selectedRow = [];
      this.selectedValues = [];      //
      // this.submitBtnEnable.emit(false);
      // this.optClearAll = false;
    }
  }
  ngOnInit() {
    this.header = [
      { field: 'code1141', header: '1141 Code', type: 'input', width: '100px' },
      { field: 'projectId', header: 'Project ID', type: 'input', width: '93px' },
      { field: 'cpNumber', header: 'CP Number', type: 'input', width: '100px' },
      { field: 'cpDate', header: 'CP Date', type: 'calander', width: '88px' },
      { field: 'sourceSneId', header: 'SNE ID', type: 'input', width: '80px' },
      { field: 'sourceCardMtosiName', header: 'Slot', type: 'input', width: '80px' },
      { field: 'sourceCardName', header: 'Card', type: 'input', width: '85px' },
      { field: 'sourceCardUsedPortsCount', header: 'No.of ports', type: 'input', width: '100px' },
      { field: 'sourceNoOfService', header: 'No.of services', type: 'input', width: '112px' },
      { field: 'destinationSneId', header: 'SNE ID', type: 'input', width: '80px' },
      { field: 'destinationCardMtosiName', header: 'Slot', type: 'input', width: '80px' },
      { field: 'destinationCardName', header: 'Card', type: 'input', width: '85px' },
      { field: 'destinationCardFreePortCount', header: 'No.of ports', type: 'input', width: '100px' },
      { field: 'destinationNoOfService', header: 'No.of services', type: 'input', width: '112px' },
      { field: 'status', header: 'Status', type: 'select', width: '100px' },
    ];
    this.status = [
      { label: 'Select', value: null },
      { label: 'Awaiting Card Plan', value: 'Awaiting Card Plan' },
      { label: 'Completed', value: 'Completed' },
      { label: 'Saved', value: 'Saved' },
      { label: 'Submitted', value: 'Submitted' },
      { label: 'CP Number Received', value: 'CP Number Received' },
    ];
    this.tableData = this.optBodyRecords;
  }

  ngAfterViewInit() {
    // this.dataTbale.reset();
  }
  /** All checkboxs are selected */
  selectRow(e) {
    let wfmtRequest = {};
    if (e) {
      const saveRecords = this.tableData.filter(_ => {
        if (_.status.toLowerCase() === 'saved' && _.cardMoveStatus.toLowerCase() === 'completed') {
          return true;
        }
      });
      this.uncheck = saveRecords;
      this.selectedRow = saveRecords;
      if (this.selectedRow.length > 0) {
        this.submitBtnEnable.emit(wfmtRequest = {
          btn: false,
          list: this.selectedRow
        });
      } else {
        this.submitBtnEnable.emit(wfmtRequest = {
          btn: true,
          list: this.selectedRow
        });
      }
    } else {
      this.selectedRow = [];
      this.submitBtnEnable.emit(wfmtRequest = {
        btn: true,
        list: this.selectedRow
      });
    }
  }

  /** Individual row select in table */
  rowSelect() {
    if (this.uncheck.length !== this.selectedRow.length) {
      this.selectedValues = [];
    } else if (this.selectedRow.length === 0) {
      this.selectedValues = [];
    } else if (this.uncheck.length === this.selectedRow.length) {
      this.selectedValues = ['val1'];
    }
    let wfmtRequest = {};
    if (this.selectedRow.length > 0) {
      this.submitBtnEnable.emit(wfmtRequest = {
        btn: false,
        list: this.selectedRow
      });
    } else {
      this.submitBtnEnable.emit(wfmtRequest = {
        btn: true,
        list: this.selectedRow
      });
    }
  }

  checkingFilter(e) {
    this.optFilterTable.emit(e);
  }
  /** Status change from Awaiting card to Save */
  changingStatus(index: number, rowdata: any, value: string) {
    this.statusRowIndex = index;
    this.rowData = rowdata.id;
    this.statusChangeValue = value;
    this.statusChange.emit('status');
  }

  /** Delete a row from Table */
  deleteRow(id) {
    this.deleteId = id;
    this.deleteEachRow.emit('delete');
  }
  editRow(e) {
    this.editrowevent.emit(e);
  }
}
