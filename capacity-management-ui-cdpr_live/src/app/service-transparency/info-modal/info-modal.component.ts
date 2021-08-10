import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/** This component is for HTML modal info */
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
/** This component is for HTML modal info */
export class InfoModalComponent {
  @Input() displayBasic;
  @Output() displayChange = new EventEmitter();
  onClose() {
    this.displayChange.emit(false);
  }
}
