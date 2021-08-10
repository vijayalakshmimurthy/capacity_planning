import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-progress-table',
  templateUrl: './track-progress-table.component.html',
  styleUrls: ['./track-progress-table.component.scss']
})
export class TrackProgressTableComponent implements OnInit {
  @Input() inputTableProperties: any;
  editordr = false;
  minimumDate = new Date();
  constructor() { }

  ngOnInit() {
  }
  selectRowShowDatePicker(checkValue) {
    if (checkValue) {
      // this.showDatepciker = true;
      this.editordr = true;
    } else {
      // this.showDatepciker = false;
      this.editordr = false;
    }
  }
}
