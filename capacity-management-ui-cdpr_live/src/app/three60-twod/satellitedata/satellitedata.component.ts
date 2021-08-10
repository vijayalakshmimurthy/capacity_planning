import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-satellitedata',
  templateUrl: './satellitedata.component.html',
  styleUrls: ['./satellitedata.component.scss']
})
export class SatellitedataComponent implements OnInit {

  @Input() deviceConfiguration: any;
  @Input() deviceData: any;
  @Input() sneid: any;
  @Input() shelfnumber: any;
  @Input() Index: any;
  @Input() uplinkport;
  @Output() sneidforcardmovesat = new EventEmitter();
  @Output() redirectpageto3dsat = new EventEmitter();
  ngOnInit() {
    this.deviceConfiguration.target = [];
    this.deviceConfiguration.chassisText[0].text = this.sneid;
    this.deviceConfiguration.chassisText[0].x = 380;
    this.deviceConfiguration.chassisText[0].y = 8;
    this.deviceConfiguration.target = [`${this.shelfnumber}`];
  }
  ondblClickNavigate(sneid, shelfnumber, Index, event) {
    const obj = {
      sneid,
      shelfnumber,
      Index
    };
    this.sneidforcardmovesat.emit(obj);
    this.redirectpageto3dsat.emit(true);
  }
}
