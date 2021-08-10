import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LineChartOptions } from '../../shared/constants/dashboard.constant';

@Component({
  selector: 'app-dashboard-chart-view',
  templateUrl: './dashboard-chart-view.component.html',
  styleUrls: ['./dashboard-chart-view.component.scss']
})
export class DashboardChartViewComponent implements OnChanges {
  /** Chart input data */
  @Input() ProductNetworkTrend;
  @Input() totalNetworkTrend;
  /** Get current time to reload graph */
  @Input() currentRefreshedTime;
  /** HTML elementId */
  @Input() elementId;
  /** Emit value onclick of downloadxls button */
  @Output() downloadCSV = new EventEmitter();
  /** Graph property variable */
  data: any;
  /** Graph property variable */
  options = LineChartOptions;
  /** downloadImageName input to dsr-png.directive */
  downloadImageName = 'Line-chart';
  downloadImageNameTotal = 'line-chart-total';
  /** Graph property variable */
  type = 'line';
  // @Input() trendArray = [];
  constructor() { }

  /** Reload graph when lastrefreshed time and currentrefreshed time is different */
  ngOnChanges() {
    this.loadGraphData();
  }
  /** Load Graphdata based on type */
  loadGraphData() {
    // tslint:disable-next-line:forin
    this.downloadImageNameTotal = 'line-chart-total';
    if (this.ProductNetworkTrend) {
      // tslint:disable-next-line:forin
        this.options = LineChartOptions;
        this.options.title.text = 'No of Ports';
        this.loadProductLineChartProperties(this.ProductNetworkTrend);
        this.data = this.ProductNetworkTrend;
        this.downloadImageName = 'Line-chart';
        // this.trendArray.push(this.data);
    } else if (this.totalNetworkTrend) {
      this.options = LineChartOptions;
      this.loadTotalLineChartProperties(this.totalNetworkTrend);
      this.downloadImageName = 'Line-chart';
      this.data = this.totalNetworkTrend;
    }

  }
  /** Set borderColor for LineChart */
  loadTotalLineChartProperties(data) {
    const lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
    ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c'], ['Voice', '#6400aa'],
    ['DCN', '#6400aa'], ['Blocked', '#6400aa'], ['PRTC', '#6400aa']]);
    // tslint:disable-next-line:no-shadowed-variable
    for (const key of Object.keys(data.datasets)) {
      data.datasets[key].fill = false;
      data.datasets[key].borderColor = lineBorderColor.get(data.datasets[key].label);
    }
  }
  /** Set borderColor for LineChart */
  loadProductLineChartProperties(data) {
    const lineBorderColor = new Map([['1G', '#bfb2ff'], ['10G', '#7f69eb'], ['100G', '#f8bf5d'], ['FE', '#fc6b89']]);
    for (const key of Object.keys(data.datasets)) {
      data.datasets[key].fill = false;
      data.datasets[key].borderColor = lineBorderColor.get(data.datasets[key].label);
    }

  }

  /** Emit value onclick of DownloadXLS */
  downloadCSVLine(typeName) {
    this.downloadCSV.emit(typeName);
  }

}
