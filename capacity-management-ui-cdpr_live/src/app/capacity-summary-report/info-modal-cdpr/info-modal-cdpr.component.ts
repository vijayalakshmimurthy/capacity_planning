import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-modal-cdpr',
  templateUrl: './info-modal-cdpr.component.html',
  styleUrls: ['./info-modal-cdpr.component.scss']
})
export class InfoModalCdprComponent implements OnInit {
  @Input() display;
  @Output() displayChange = new EventEmitter();
  @Input() pageName;
  headerName: string;
  constructor() { }
  onClose() {
    this.displayChange.emit(false);
  }

  ngOnInit() {
    if (this.pageName === 'CDPR') {
      this.headerName = 'Capacity Demand Summary Report';
    } else {
      this.headerName = 'Forecast Management Report';
    }
  }

}
