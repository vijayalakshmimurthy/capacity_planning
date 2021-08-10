import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BarChartOptions } from '../../shared/constants/shorfall-chart.constant';
/** This is the barchart Component */
@Component({
  selector: 'app-shortfall-automation-dashboard-barchart',
  templateUrl: './shortfall-automation-dashboard-barchart.component.html',
  styleUrls: ['./shortfall-automation-dashboard-barchart.component.scss']
})
/** Class contents charts data */
export class ShortfallAutomationDashboardBarchartComponent implements OnChanges {
  /** Chart input data */
 @Input() barChartData;
  /** header for each pie chart */
 @Input() headerName;
  /** Graph property variable */
  type = 'bar';
  /** Graph property variable */
  data: any;
  /** Graph property variable */
  chartData: any;
  /** Graph property variable */
  labels: any;
  /** Graph property variable */
  options = BarChartOptions;
   /** HTML elementId */
 @Input() elementId;
 /** downloadImageName input to reservation-png.directive */
 downloadImageName = 'Bar-chart';
 /** Reload pie charts */
 ngOnChanges() {
   this.loadBarCharts();
 }
 /** load pie charts */
 loadBarCharts() {
   // tslint:disable-next-line:forin
   for (const key in this.barChartData) {
   // assign data for graph
   this.data = this.barChartData[key];
   // assign data to show on right
   for (let i = 0; i < this.data.datasets.length; i++) {
   this.chartData = this.data.datasets[i].data;
   // set label for graph
   this.labels = this.data.labels;
   // set backgroundColor for graph
  //  this.data.datasets[0].backgroundColor = ['#e60050',  '#32a319', '#6300a9', '#0991ce', '#fc8c1d', '#606060', '#8a8a8a', '#FFCE56',
  //   '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F'];
  //   this.data.datasets[i].backgroundColor = ['#0991ce','#fc8c1d','#9e9896' ,'#6300a9','#32a319'];
  //  // set hoverBackgroundColor for graph
  //  this.data.datasets[i].hoverBackgroundColor = ['#0991ce','#fc8c1d','#9e9896' ,'#6300a9','#32a319'];
  }
   }
  // this.loadTotalLineChartProperties(this.barChartData);
 }
//  loadTotalLineChartProperties(data) {
//   const lineBorderColor = new Map([['Total Capacity Shortfall Received', '#0991ce']]);
//   // tslint:disable-next-line:no-shadowed-variable
//   for (const key of Object.keys(data.datasets)) {
//     data.datasets[key].fill = false;
//     data.datasets[key].borderColor = lineBorderColor.get(data.datasets[key].label);
//   }
// }
}
