import { Component, Input, OnChanges } from '@angular/core';
import { DoughnutChartOptions } from '../../shared/constants/dsr-chart.constant';
import 'chartjs-plugin-datalabels';
/** This is the DSR PieChart Component */
@Component({
  selector: 'app-dsr-piechart-view',
  templateUrl: './dsr-piechart-view.component.html',
  styleUrls: ['./dsr-piechart-view.component.scss']
})
/** Class contents chart, portspeed and download functionality */
export class DSRPiechartViewComponent implements OnChanges {
  /** Chart input data */
  @Input() pieChartData;
  /** Header name for chart */
  @Input() headerName;
  /** HTML elementId */
  @Input() elementId;

  /** HTML sitename */
  @Input() siteName;
  /** Graph property variable */
  type = 'doughnut';
  /** Graph property variable */
  data: any;
  /** Graph property variable */
  options = DoughnutChartOptions;

  /** model value for portspeed dropdown */
  selectedPortSpeed;

  /** downloadImageName input to dsr-png.directive */
  downloadImageName = 'Pie-chart';
  showPieGraphData = true;
  /** legend value */
  dynamiclegends = [];
  /** Reload graph when lastrefreshed time and currentrefreshed time is different */
  ngOnChanges() {
    if (this.pieChartData !== null) {
      this.showPieGraphData = true;
      this.selectedPortSpeed = this.pieChartData[0]["option"];
      this.loadPieChartByPortSpeed(this.selectedPortSpeed);
    } else {
      this.showPieGraphData = false;
    }
  }

  /** load pie chart based on port speed */
  loadPieChartByPortSpeed(selectedPortSpeed) {    
    for (const key in this.pieChartData) {
      if (selectedPortSpeed === this.pieChartData[key].option) {
        // assign data for graph
        this.data = this.pieChartData[key];
        // set label for graph
        const label = [];
        const color = []
        this.dynamiclegends =[];
        for(const legends of this.pieChartData[key]['legends']) {
          this.dynamiclegends.push(legends)
          label.push(legends['label']);
          color.push(legends['color']);
        }
        this.data.labels = label;
        // set backgroundColor for graph
        this.data.datasets[0].backgroundColor = color;
        // set hoverBackgroundColor for graph
        this.data.datasets[0].hoverBackgroundColor = color;
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
  }
}

