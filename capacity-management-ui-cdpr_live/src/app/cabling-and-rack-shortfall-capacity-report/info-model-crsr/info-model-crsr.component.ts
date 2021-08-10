import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-model-crsr',
  templateUrl: './info-model-crsr.component.html',
  styleUrls: ['./info-model-crsr.component.scss']
})
export class InfoModelCrsrComponent implements OnInit {
  @Input() display;
  @Output() displayChange = new EventEmitter();
  constructor() { }
  onClose() {
    this.displayChange.emit(false);
  }
  ngOnInit() {
  }

}
