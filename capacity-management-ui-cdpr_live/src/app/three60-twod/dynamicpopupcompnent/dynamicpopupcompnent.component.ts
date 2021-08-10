import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamicpopupcompnent',
  templateUrl: './dynamicpopupcompnent.component.html',
  styleUrls: ['./dynamicpopupcompnent.component.scss']
})
export class DynamicpopupcompnentComponent implements OnInit {

  @Input() deviceConfiguration: any;
  @Input() deviceData: any;
  @Input() sneid: any;
  @Input() loaderpopup: any;
  @Input() deviceperload;
  ngOnInit() {
    this.deviceConfiguration.target = [];
    this.deviceConfiguration.chassisText[0].text = this.sneid;
    this.deviceConfiguration.target = [`x${this.sneid}`];
  }
  /** */
  // listenToEvents(event) {
  //   console.log(event);
  // }

}
