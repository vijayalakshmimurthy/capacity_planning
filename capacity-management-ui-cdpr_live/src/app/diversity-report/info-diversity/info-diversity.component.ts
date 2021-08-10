import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
/** this component is Info child component of diversity report */
@Component({
  selector: 'app-info-diversity',
  templateUrl: './info-diversity.component.html',
  styleUrls: ['./info-diversity.component.scss']
})
export class InfoDiversityComponent {
/** Input class to display popup */
  @Input() display;
/** Ouput class to display close popup so it can open again */
  @Output() displayChangeInfo = new EventEmitter();
/** Onclose class to display will emit for hide and show */
  onClose() {
    this.displayChangeInfo.emit(false);
  }

}
