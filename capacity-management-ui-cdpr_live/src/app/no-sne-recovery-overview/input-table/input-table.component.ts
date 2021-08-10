import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WorkflowService } from 'src/app/shared/services/workflow.service';
import { OrderIdService } from '../../shared/services/order-id.service';
import { staticTable } from '../input-table/input-table-header.constant';
@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit, OnChanges {
  @Input() tableData: any;
  editordr = false;
  minimumDate = new Date();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() deleteMultipleRow = new EventEmitter();
  @Output() rowAdd = new EventEmitter<boolean>();
  public paginatorPosition = 'bottom';
  selectedValue = '360View';
  switchPopup = false;
  @Input() disableEditIcon;
  commonModalProperties: any;
  displaySaveConfirmationPopup = false;
  @Input() disableSubmitBtn;
  currentKey;
  enablerrormessage;
  currentIndex;
  @Input() disableSaveBtn = true;
  @Input() disableExportBtn = true;
  @Output() emitCheckValidation = new EventEmitter<any>();
  @Input() saveSuccess;
  @Input() recoveryTypeHolder;
  @Input() role;
  @Input() disableTable;
  inputTableProperties = {
    headers: [], data: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    refreshPagination: false, customSort: true
  };
  constructor(private orderIdService: OrderIdService, private router: Router, private workflowService: WorkflowService) { }

  ngOnInit() {
    this.inputTableProperties.headers = staticTable;
    this.commonModalProperties = {
      image: '',
      bodyContent: 'Do you want to proceed without saving the data?',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: 'Confirmation',
      dynamicButton: [{ btnName: 'Yes', funcName: 'submit', class: 'btn-modal' },
      { btnName: 'No', funcName: 'cancel', class: 'btn-modal' }],
      width: '500px',
    };
  }

  ngOnChanges() {
    this.inputTableProperties.data = this.tableData;
  }

  checkValidation() {
    this.emitCheckValidation.emit(this.inputTableProperties.data);
  }

  /** funtion for taking delete row id on table */
  onDelete(row) {
    this.deleteRow.emit([row.recover_sne_id]);
  }

  selectRowShowDatePicker(checkValue) {
    if (checkValue) {
      this.editordr = true;
    } else {
      this.editordr = false;
    }
  }

  onRowAddJourney() {
    if (this.disableSubmitBtn) {
      this.displaySaveConfirmationPopup = true;
    } else {
      this.switchPopup = true;
    }
  }

  closePopup() {
    this.switchPopup = false;
  }

  navigateToPage() {
    this.switchPopup = false;
    if (this.selectedValue === 'manualInput') {
      this.workflowService.deviceRecoveryStatus.next(null);
      this.workflowService.previousStatus.next(null);
      this.workflowService.enableDeviceRecoveryWorkflow.next(null);
      this.orderIdService.recoverSNEList.next(null);
      this.router.navigate(['/sne-recovery']);
    } else if (this.selectedValue === '360View') {
      this.workflowService.deviceRecoveryStatus.next(null);
      this.workflowService.previousStatus.next(null);
      this.emitDeviceRecoveryData();
      this.workflowService.enableDeviceRecoveryWorkflow.next(true);
      this.orderIdService.recoverSNEList.next(null);
      this.orderIdService.cardMoveSummary.next(null);
      this.router.navigate(['/three60-twod']);
    }
  }

  emitDeviceRecoveryData() {
    const obj = {
      deviceRecovery: [],
      activestatus: 0,
      enableNextButton: false,
      orderId: []
    };
    setTimeout(() => {
      this.workflowService.deviceRecoveryStatus.next(obj);
    }, 0);
  }

  onClickNavigation(data) {
    const obj = {
      orderId : data.orderId,
      disableSaveBtn : this.disableSaveBtn,
      disableExportBtn : this.disableExportBtn,
      disableSubmitBtn : this.disableSubmitBtn,
      saveSuccess: this.saveSuccess,
      workflow: 'DeviceRecovery'
    };
    this.orderIdService.cardSummary(obj);
    this.router.navigate(['/network-cardmove-summary']);
  }

  showPlanningModal() {
    this.orderIdService.recoverSNEList.subscribe((sneList) => {
      this.deleteRow.emit(sneList);
    });
    this.displaySaveConfirmationPopup = false;
    this.switchPopup = true;
  }

  closeConfirmationpopup() {
   this.displaySaveConfirmationPopup = false;
  }

  isEmpty(rowIndex, key, colIndex) {
    this.currentKey = key;
    this.currentIndex = rowIndex;
    this.enablerrormessage = true;
  }

  isEmptyblur() {
    this.currentKey = 0;
    this.enablerrormessage = false;
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
