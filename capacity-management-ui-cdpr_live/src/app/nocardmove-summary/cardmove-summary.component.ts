import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { UtilityService } from './../shared/services/utility.service';
import { configHeaders, connectivityHeaders, serviceHeaders } from './cardmove-summary-headers.constant';
import { Router } from '@angular/router';
import { OrderIdService } from '../shared/services/order-id.service';
import { WorkflowService } from '../shared/services/workflow.service';

@Component({
  selector: 'app-cardmove-summary',
  templateUrl: './cardmove-summary.component.html',
  styleUrls: ['./cardmove-summary.component.scss']
})
export class CardmoveSummaryComponent implements OnInit {
  // to initialize index value on initializaton of page
  selectedTab;
  header: string;
  // Export Port Move Data Url
  portMoveDataUrl: string;
  @Output() exportData = new EventEmitter();
  @Input() value = true;
  /** Table header variable */
  headerDataConfig: any;
  headerDataConnectivity: any;
  headerDataService: any;
  summaryData;
  portMoveId;
  /** Table settings data */
  tableSettingsConfiguration = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };
  tableSettingsConnectivity = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };
  tableSettingsServices = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };
  pageName: string;
  role;
  constructor(private appService: AppService, private utilityService: UtilityService,
              private router: Router, private orderIdService: OrderIdService, private workflowService: WorkflowService) {
  }

  ngOnInit() {
    this.role = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
    this.orderIdService.cardMoveSummaryPage.subscribe(summaryData => {
      this.summaryData = summaryData;
      if (this.summaryData.workflow === 'DeviceRecovery') {
        this.pageName = 'Device Recovery - Summary';
      } else {
        this.pageName = 'Card Move - Summary';
      }
      this.portMoveDataUrl = environment.no_Base_url + '/port-move/card-move-all-details-csv-data?order-id=' + this.summaryData.orderId;
      this.configurationTable();
    });
  }

  tabChange(event) {
    this.selectedTab = event.originalEvent.target.innerText;
  }

  // for previous page
  back() {
    if (this.summaryData.workflow === 'DeviceRecovery') {
      this.router.navigate(['/sne-recovery-overview']);
    } else {
      this.router.navigate(['/network-cardmove-overview']);
    }
  }

  // load configuration table
  configurationTable() {
    const url = environment.no_Base_url + '/back-haul/read-only-response-data?order-id=' + this.summaryData.orderId;
    this.appService.get(url).subscribe(res => {
      this.headerDataConfig = res.data.config_enabled_ports;
      this.tableSettingsConfiguration.headers = configHeaders;
      this.tableSettingsConfiguration.data = this.headerDataConfig.data;
      this.headerDataConnectivity = res.data.view_connectivity;
      this.tableSettingsConnectivity.headers = connectivityHeaders;
      this.tableSettingsConnectivity.data = this.headerDataConnectivity.data;
      this.headerDataService = res.data.view_services;
      this.tableSettingsServices.headers = serviceHeaders;
      this.tableSettingsServices.data = this.headerDataService.data;
    });
  }

  redirectToHomePage() {
    if (this.role !== 'no user') {
      this.router.navigate(['/capacity-summary-report']);
    } else if (this.role === 'no user') {
      this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
    }
  }
}
