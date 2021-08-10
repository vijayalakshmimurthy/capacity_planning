import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
/** Capacity Dashboard Parent Component  */
@Component({
  selector: 'app-capacity-dashboard',
  templateUrl: './capacity-dashboard.component.html',
  styleUrls: ['./capacity-dashboard.component.scss']
})
/** Dashboard Parent Component  */
export class CapacityDashboardComponent implements OnInit {
  /** Dashboard complete service data for whole page */
  dashboardData: any;
  /** Keystatsticsdata for key stacs */
  keyStatsticsdata: any;
  /** witdth of the Key Stastics based on window adjust */
  viewWidth;
  /** height of the donut based on window adjust to the key Network Stats adjust */
  viewHeight;
  @Input() trendArray;
  /** Viewchild for adjust the screen */
  @ViewChild('mainScreen', { static: false }) elementView: ElementRef;
  /** card detail table variable */
  tableData: any;
  /** Table settings data Card */
  tableSettingsCard = {
    frozenColumns: [], headers: [], data: [], paginator: false, scrollHeight: '610px', sort: false,
    columnHeight: '49px', columnWidthDynamic: false,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, pagination: false,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };
  /** Table settings data Device */
  tableSettingsDevice = {
    frozenColumns: [], headers: [], data: [], paginator: false, scrollHeight: '610px', sort: false,
    columnHeight: '49px', columnWidthDynamic: false,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, pagination: false,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false
  };

  totalNetworkTrend = {};
  capacityDistribution = [];
  totalProductTrend = {};
  showPieChart = false;
  showProductGraph = false;
  showNetworkStatistics = false;
  showTableData = false;
  noKeyStatistics = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadNetworkTrend();
    this.loadKeyNetworkStatistics();
    this.loadCapacityDistribution();
    this.loadTableData();
    this.loadProductTrend();
  }

  loadNetworkTrend() {
    const url = environment.base_url + 'network-capacity-trend-management/total-network-bandwidth-product8';
    this.appService.get(url).subscribe(res => {
      this.totalNetworkTrend = res.totalNetworkTrend;
      this.showNetworkStatistics = true;
    }, (err) => {
      this.showNetworkStatistics = false;
    });
  }

  loadKeyNetworkStatistics() {
    const url = environment.base_url + 'network-capacity-trend-management/key-network-statistics';
    this.appService.get(url).subscribe(res => {
      this.keyStatsticsdata = res;
      this.loadKeyStatstics();
    }, (err) => {
      this.noKeyStatistics = true;
    });
  }

  loadCapacityDistribution() {
    const url = environment.base_url + 'network-capacity-trend-management/capacity-distribution8';
    this.appService.get(url).subscribe(res => {
      this.capacityDistribution = res;
      this.showPieChart = true;
    }, (err) => {
      this.showPieChart = false;
    });
  }

  loadTableData() {
    const url = environment.base_url + 'device-card-details-management/device-card-details';
    this.appService.get(url).subscribe(res => {
      this.tableData = res;
      this.loadtableData(res);
      this.showTableData = true;
    }, (err) => {
      this.showTableData = false;
    });
  }

  loadProductTrend() {
    const url = environment.base_url + 'network-capacity-trend-management/total-product-bandwidth-port8';
    this.appService.get(url).subscribe(res => {
      this.totalProductTrend = res;
      this.showProductGraph = true;
    }, (err) => {
      this.showProductGraph = false;
    });
  }

  /** Load Graphdata based on type */
  loadKeyStatstics() {
    this.loadLineChartProperties(this.keyStatsticsdata);
    this.viewWidth = this.elementView.nativeElement.offsetWidth;
    this.viewWidth = this.viewWidth - 40;
    this.viewWidth = Math.floor(this.viewWidth / (this.keyStatsticsdata.length));
    this.viewWidth = this.viewWidth - 12 + 'px';
  }

  /** Set borderColor for LineChart */
  loadLineChartProperties(keyStatsticsdata) {
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
    for (const key of Object.keys(keyStatsticsdata)) {
      keyStatsticsdata[key].borderColor = lineBorderColor.get(keyStatsticsdata[key].productType);
    }
  }

  loadtableData(data) {
    const card = data.cardDetails[0];
    this.tableSettingsCard.data = data.cardDetails;
    Object.keys(card).forEach((key) => {
      const value = key;
      const header = {
        field: value, header: value, visible: true,
        properties: { sort: false, editable: false }
      };
      this.tableSettingsCard.headers.push(header);
    });
    const devicedetail = data.deviceDetails[0];
    this.tableSettingsDevice.data = data.deviceDetails;
    Object.keys(devicedetail).forEach((key) => {
      const value = key;
      const header = {
        field: value, header: value, visible: true,
        properties: { sort: false, editable: false }
      };
      this.tableSettingsDevice.headers.push(header);
    });
  }
  /** Call appservice downloadCSV */
  downloadCSVProduct(typeName) {
    if (typeName === 'Ethernet') {
      // tslint:disable-next-line:max-line-length
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-ethernetCapacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'Broadband') {
      // tslint:disable-next-line:max-line-length
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-broadBandCapacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'Backhaul') {
      // tslint:disable-next-line:max-line-length
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-backHaulCapacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'Infrastructure') {
      // tslint:disable-next-line:max-line-length
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-infraStructureCapacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'P2PE') {
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-P2PECapacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'device') {
      const url = environment.base_url + 'device-card-details-management/device-Capacitydata-download';
      this.appService.downloadCSV(url);
    } else if (typeName === 'card') {
      const url = environment.base_url + 'device-card-details-management/card-Capacitydata-download';
      this.appService.downloadCSV(url);
    } else {
      const url = environment.base_url + 'network-capacity-trend-management/lineGraph-networkCapacitydata-download';
      this.appService.downloadCSV(url);
    }
  }
}
