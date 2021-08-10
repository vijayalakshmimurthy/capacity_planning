import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { staticTable } from './over-view-header';
import { Router } from '@angular/router';
import { WorkflowService } from '../../shared/services/workflow.service';
import { OrderIdService } from '../../shared/services/order-id.service';
@Component({
  selector: 'app-overview-table',
  templateUrl: './overview-table.component.html',
  styleUrls: ['./overview-table.component.scss']
})
export class OverviewTableComponent implements OnInit, OnChanges {
  paginatorPosition = 'top';
  tableSettings = {
    headers: [], data: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true
  };
  selectedValue = '360View';
  switchPopup = false;
  emptyRow = [];
  enablerrormessage;
  // arrayList = [];
  /** Table header variable */
  headerData: any;
  @Input() tableData;
  @Input() enableNOCardMoveWorkflow;
  cardSummaryOrderId;
  inputTableProperties = {
    headers: [], data: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0, customSort: true,
    refreshPagination: false
  };
  @Input() orderIDValue;
  minimumDate = new Date();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() emitsavecheck = new EventEmitter<any>();
  saveenable = true;
  currentKey;
  commonModalProperties: any;
  displaySaveConfirmationPopup = false;
  currentIndex;
  @Input() disableCardInfillSave;
  @Input() disablePortMoveSave;
  @Input() disablePortMoveSubmit;
  @Input() disableCardInfillSubmit;
  @Input() disableExportButton;
  @Input() cardInfillTableData;
  @Input() saveSucess;
  @Input() portMoveList;
  @Input() disableTable;
  constructor(private router: Router, private workflowService: WorkflowService,
              private orderIdService: OrderIdService) { }

  ngOnInit() {
    this.inputTableProperties.headers = staticTable;
    const height = '100vh';
    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
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
    this.checkvalidation();
  }
  checkvalidation() {
    const data = this.inputTableProperties.data;
    for (const value of data) {
      if (value.fist_Project_No !== null && value.scheme_Driver !== null && value.capacity_Required_Date !== null ) {
        if (value.fist_Project_No !== '' && value.scheme_Driver !== '' && value.capacity_Required_Date !== '' ) {
          this.saveenable = false;
        } else {
          this.saveenable = true;
        }
      } else {
        this.saveenable = true;
        break;
      }
    }
    this.emitsavecheck.emit(this.saveenable);
  }
  /** funtion for taking delete row id on table */
  onDelete(row) {
    this.deleteRow.emit([row.portmoveid]);
  }

  onRowAddJourney() {
    if (this.saveSucess) {
      this.switchPopup = true;
    } else {
      this.displaySaveConfirmationPopup = true;
    }
  }

  closeConfirmationpopup() {
    this.displaySaveConfirmationPopup = false;
  }

  onClickNavigation(data, param2) {
    const obj = {
      orderId : data.orderId,
      disablePortMoveSave : this.disablePortMoveSave,
      disablePortMoveSubmit : this.disablePortMoveSubmit,
      disableCardInfillSave : this.disableCardInfillSave,
      disableCardInfillSubmit: this.disableCardInfillSubmit,
      disableExportButton: this.disableExportButton,
      cardInfillTableData: this.cardInfillTableData,
      workflow: 'CardMove'
    };
    this.orderIdService.cardSummary(obj);
    this.router.navigate(['/network-cardmove-summary']);
  }

  closePopup() {
    this.switchPopup = false;
  }

  navigateToPage() {
    this.switchPopup = false;
    if (this.selectedValue === 'manualInput') {
      this.router.navigate(['/card-move']);
      this.workflowService.enableNOWorlflow.next(null);
      this.orderIdService.cardInfillTableData.next(null);
    } else if (this.selectedValue === '360View') {
      this.workflowService.status.next(null);
      this.workflowService.previousStatus.next(null);
      this.workflowstatusenable();
      this.workflowService.enableNOWorlflow.next(true);
      this.orderIdService.portMoveObj.next(null);
      this.orderIdService.cardInfillTableData.next(null);
      this.router.navigate(['/three60-twod']);
    }
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

  showPlanningModal() {
    this.deleteRow.emit(this.portMoveList);
    this.displaySaveConfirmationPopup = false;
    this.switchPopup = true;
  }

  workflowstatusenable() {
    const obj = {
      cardmoverequest: [],
      activestatus: 0,
      enableNextButton: false
    };
    setTimeout(() => {
      this.workflowService.status.next(obj);
    }, 100);
  }

}

