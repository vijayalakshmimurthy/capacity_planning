import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { LineChartOptions, BarChartOptions } from '../../shared/constants/dsr-chart.constant';
// import { ProductTypeConstants } from '../../shared/constants/dsr-productType.constant';

/** This is the DSR Chart Component which contains line/Barchart data */
@Component({
  selector: 'app-dsr-chart-view',
  templateUrl: './dsr-chart-view.component.html',
  styleUrls: ['./dsr-chart-view.component.scss']
})
export class DSRChartViewComponent implements OnChanges {
  /** Chart input data */
  @Input() graphData;
  /** Get current time to reload graph */
  @Input() currentRefreshedTime;
  /** HTML elementId */
  @Input() elementId;
  /** devicetype  */
  @Input() deviceType;
  /** HTML sitename */
  @Input() siteName;

  @Input() portspeed;
  /** Emit value onclick of downloadxls button */
  @Output() downloadCSV = new EventEmitter();
  /** Graph property variable */
  type = 'line';
  /** Graph property variable */
  data: any;
  /** Graph property variable */
  options = LineChartOptions;
  /** Producttab variable */
  productType = [];
  /** legends value */
  legends = [];
  /** Store active name value */
  activeTabName = 'Overall';
  /** downloadImageName input to dsr-png.directive */
  downloadImageName = 'Line-chart';
  showlineData = false;
  noLineData = false;
  ondownloadclick = false;


  /** Reload graph when lastrefreshed time and currentrefreshed time is different */
  ngOnChanges() {
    console.log('elementId' + this.elementId);
    this.showlineData = false;
    this.noLineData = false;
    this.loadlabel();
    this.changeProduct({ name: 'Overall', active: true, type: 'line' });
    this.loadGraphData();
  }
  /** storing legends */
  storeLegends(data) {
    this.legends = [];
    for (const key in data) {
      if (key == 'legends') {
        for (const legent in data[key]) {
          this.legends.push(data[key][legent])
        }

        console.log(this.legends);
      }

    }
  }
  /** load label */
  loadlabel() {
    this.productType = [];
    for (const key in this.graphData) {
      if (key != 'portSpeed') {
        if (key != 'siteName') {
          if (key === 'Overall') {
            this.productType.push({ name: key, active: true, type: 'line' })
          } else {
            this.productType.push({ name: key, active: false, type: 'bar' })
          }
        }
      }
    }
  }
  /** Set type based on producttab */
  changeProduct(value) {
    this.productType.forEach(element => {
      if (element.name === value.name) {
        element.active = true;
        this.activeTabName = value.name;
        this.type = value.type;
      } else {
        element.active = false;
      }
    });
    this.loadGraphData();
  }

  /** Load Graphdata based on type */
  loadGraphData() {
    for (const key in this.graphData) {
      if (this.activeTabName.toLowerCase() === key.toLowerCase()) {
        if (this.type === 'line') {
          this.options = LineChartOptions;
          this.loadLineChartProperties(this.graphData[key]);
          this.downloadImageName = 'Line-chart';
        } else {
          this.options = BarChartOptions;
          this.loadBarChartProperties(this.graphData[key]);
          this.downloadImageName = 'Bar-chart';
        }
        this.data = this.graphData[key];
      }
    }
  }

  /** Set borderColor for LineChart */
  loadLineChartProperties(data) {
    this.storeLegends(data);
    if (data !== null) {
      this.showlineData = true;
      let lineBorderColor;
      if (this.deviceType == 'Edge Rt') {
        lineBorderColor = new Map([['Ethernet', '#FC8C1D'], ['Broadband', '#6400aa'], ['Backhaul', '#0991ce'],
        ['Infrastructure', '#c1c1c1'], ['P2PE', '#e60050'], ['Total Capacity', '#6c6c6c']]);
      } else if (this.deviceType == 'Core Rt') {
        lineBorderColor = new Map([['LR4', '#0991ce'], ['SR10', '#6400aa'], ['SR4', '#FC8C1D'],
        ['DD-SR4', '#008A00'], ['DD-LR4', '#e60050'], ['10G', '#48f542'], ['Total Capacity', '#6c6c6c']]);
      }

      for (const key of Object.keys(data.datasets)) {
        data.datasets[key].fill = false;
        data.datasets[key].borderColor = lineBorderColor.get(data.datasets[key].label);
      }
    } else {
      this.noLineData = true;
    }
  }

  /** Set backgroundColor,stack value for BarChart */
  loadBarChartProperties(data) {    
    this.storeLegends(data);
    if (data !== null) {
      const freeportcolor = new RegExp('Free', 'gi');
      const reservedcolor = new RegExp('Reserved', 'gi');
      const usedcolor = new RegExp('Used', 'gi');
      for (const key of Object.keys(data.datasets)) {
        // handle the backgroundColor
        if (data.datasets[key].label.match(freeportcolor) && data.datasets[key].label.match(freeportcolor).length > 0) {
          data.datasets[key].backgroundColor = '#008A24';
        } else if (data.datasets[key].label.match(reservedcolor) && data.datasets[key].label.match(reservedcolor).length > 0) {
          data.datasets[key].backgroundColor = '#6D00A7';
        } else if (data.datasets[key].label.match(usedcolor) && data.datasets[key].label.match(usedcolor).length > 0) {
          data.datasets[key].backgroundColor = '#00A2D7';
        }

        // handle stack value
        const G1Reg = new RegExp('1G', 'gi');
        const G10Reg = new RegExp('10G', 'gi');
        const G100Reg = new RegExp('100G', 'gi');
        if (this.deviceType === 'Edge Rt') {
          if (data.datasets[key].label.match(G1Reg) && data.datasets[key].label.match(G1Reg).length > 0) {
            data.datasets[key].stack = 1;
          } else if (data.datasets[key].label.match(G10Reg) && data.datasets[key].label.match(G10Reg).length > 0) {
              data.datasets[key].stack = 2;
            } else if (data.datasets[key].label.match(G100Reg) && data.datasets[key].label.match(G100Reg).length > 0) {
              data.datasets[key].stack = 3;
            }
        }
        if (this.deviceType === 'Core Rt') {
          if (data.datasets[key].label.match(G10Reg) && data.datasets[key].label.match(G10Reg).length > 0) {
            data.datasets[key].stack = 1;
          } else if (data.datasets[key].label.match(G100Reg) && data.datasets[key].label.match(G100Reg).length > 0) {
            data.datasets[key].stack = 2;
          }
        }
      }
    } else {
      this.noLineData = true;
    }
  }

  /** Emit value onclick of DownloadXLS */
  downloadCSVLine() {
    this.downloadCSV.emit();
  }

  downloadimg() {
    this.ondownloadclick = true;
    setTimeout(() => {
      this.ondownloadclick = false;
    }, 1000)
  }

}
