import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PieChartOptions } from '../../shared/constants/dsr-chart.constant';

/** This is the pichart Component */
@Component({
  selector: 'app-reservation-dashboard-piechart',
  templateUrl: './reservation-dashboard-piechart.component.html',
  styleUrls: ['./reservation-dashboard-piechart.component.scss']
})
/** Class contents charts data */
export class ReservationDashboardPiechartComponent implements OnChanges {
   /** Chart input data */
  @Input() pieChartData;
   /** header for each pie chart */
  @Input() headerName;
   /** Graph property variable */
   type = 'pie';
   /** Graph property variable */
   data: any;
   /** Graph property variable */
   chartData: any;
   /** Graph property variable */
   labels: any;
   /** Graph property variable */
   options = PieChartOptions;
    /** HTML elementId */
  @Input() elementId;
  /** downloadImageName input to reservation-png.directive */
  downloadImageName = 'Pie-chart';
  /** Reload pie charts */
  ngOnChanges() {
    this.loadPieCharts();
  }
  /** load pie charts */
  loadPieCharts() {
    // tslint:disable-next-line:forin
    for (const key in this.pieChartData) {
    // assign data for graph
    this.data = this.pieChartData[key];
    // assign data to show on right
    this.chartData = this.data.datasets[0].data;
    // set label for graph
    this.labels = this.data.labels;
    // set backgroundColor for graph
    this.data.datasets[0].backgroundColor = ['#e60050',  '#32a319', '#6300a9', '#0991ce', '#fc8c1d', '#606060', '#8a8a8a', '#FFCE56',
     '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F'];
    // set hoverBackgroundColor for graph
    this.data.datasets[0].hoverBackgroundColor = ['#e60050',  '#32a319', '#6300a9', '#0991ce', '#fc8c1d', '#606060', '#8a8a8a', '#FFCE56',
    '#FF6384', '#36A2EB', '#FFD700', '#ADFF2F'];
    }
  }
}
