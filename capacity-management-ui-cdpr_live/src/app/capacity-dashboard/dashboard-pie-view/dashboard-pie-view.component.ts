import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { DoughnutChartOptions } from '../../shared/constants/dashboard.constant';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-pie-view',
  templateUrl: './dashboard-pie-view.component.html',
  styleUrls: ['./dashboard-pie-view.component.scss']
})
export class DashboardPieViewComponent implements OnChanges {
  /** Chart input data */
  @Input() pieChartData;
  /** Graph property variable */
  type = 'doughnut';
  /** Graph property variable */
  data: any;
  /** Graph property variable */
  options = DoughnutChartOptions;
  viewHeight;

  constructor() { }

  /** Reload graph when lastrefreshed time and currentrefreshed time is different */
  ngOnChanges() {
    this.loadPieChartByPortSpeed();
  }
  /** load pie chart based on port speed */
  loadPieChartByPortSpeed() {
    // assign data for graph
    this.data = this.pieChartData;
    // set backgroundColor for graph
    this.data.datasets[0].backgroundColor = ['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050'];
    // set hoverBackgroundColor for graph
    this.data.datasets[0].hoverBackgroundColor = ['#FC8C1D', '#6400aa', '#0991ce', '#8A8A8A', '#e60050'];
    // display value on doughnut chart
    this.data.datasets[0].datalabels = {
      color: (context) => {
        const index = context.dataIndex;
        const value = context.dataset.data[index];
        return value === 0 ? 'transparent' : 'white';
      },
      font: {
        weight: 'bold',
        size: 14,
      }
    };
  }
}
