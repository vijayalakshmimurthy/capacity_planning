import { Component, Input } from '@angular/core';
/** Common Component for Chart */
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
/** Component requires data,type and options to display graph */
export class ChartComponent {
  /** Data binds value to the chart */
  @Input() data: any;
  /** Based on type chart will generate */
  @Input() type: string;
  /** Bind features to the chart */
  @Input() options: any;
  /** Indicate Height */
  @Input() height: string;
}
