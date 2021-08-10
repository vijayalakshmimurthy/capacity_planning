import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/** 360 dynamic component
 * @author Viji
 */
@Component({
  selector: 'app-twoddynamic',
  templateUrl: './twoddynamic.component.html',
  styleUrls: ['./twoddynamic.component.scss']
})
export class TwoddynamicComponent implements OnInit {

  hovertable: any;
  matMenuTimer: any;
  popup : boolean = false;
  /** data to load 2d image */
  @Input() deviceConfiguration: any;
  @Input() deviceData: any;
  @Input() enabledivOneimg: any;
  @Input() enabledivTwoimg: any;
  @Input() enablediv: any;
  @Input() firstTabData: any;
  @Input() sneId: any;
  @Input() satellitecount;
  @Output() hoverdata = new EventEmitter();
  @Output() popupdata = new EventEmitter();
  @Output() popupsatellitedata = new EventEmitter();
  @Output() sneidforcardmove = new EventEmitter();
  @Output() redirectpageto3d = new EventEmitter();
  isSingleClick = true;
  timer;
  sneidlist;
 
  ngOnInit() {
    this.deviceConfiguration.chassisText[0].x = 280;
    this.deviceConfiguration.chassisText[0].y = 21;
    this.sneidlist = this.firstTabData.map(sne => sne.sneId);
  }
  /** */
  // listenToEvents(event) {
  //   console.log(event);
  // }
  /** function to pass data onhover on device */
  onMouseover(val) {
    const sneidlist = this.firstTabData.map(sne => sne.sneId);
    const index = sneidlist.indexOf(val);
    const data = {
      val,
      index
    };
    this.hoverdata.emit(data);
  }
  /** function to pass data onmouseleave on device */
  onMouseLeave(index) {
    const data = {
      val: '',
      index : 0
    };
    this.hoverdata.emit(data);
  }
  openpopup(event,sneid) {
    this.isSingleClick = false;
    let obj = {
      val : true,
      sneid: sneid
    }
        this.popupdata.emit(obj);
  }
  /** function ato navigate 3d component */
  ondblClickNavigate(sneid, event) {
    this.timer = 0;
    this.isSingleClick = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.isSingleClick) {
    const obj = {
      sneid
    };
    this.sneidforcardmove.emit(obj);
    this.redirectpageto3d.emit(true);
  }
  }, 250);
  }
  
  opensatellitepopup(val) {
    const satellitedata = [];
    for (let i = 1; i < val; i++) {
      satellitedata.push( this.sneId + ':/shelf=' + `${i + 1}` + ':EXT' + i);
    }
    this.popupsatellitedata.emit(satellitedata);
  }
}
