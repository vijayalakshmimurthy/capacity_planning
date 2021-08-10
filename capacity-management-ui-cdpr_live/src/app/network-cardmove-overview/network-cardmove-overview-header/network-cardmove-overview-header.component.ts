import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-network-cardmove-overview-header',
  templateUrl: './network-cardmove-overview-header.component.html',
  styleUrls: ['./network-cardmove-overview-header.component.scss']
})
export class NetworkCardmoveOverviewHeaderComponent {
  @Output() saveCBP = new EventEmitter<any>();
  @Output() submitCBP = new EventEmitter<any>();
  @Output() saveCardMove = new EventEmitter<any>();
  @Output() submitCardMove = new EventEmitter<any>();
  @Output() exportCardMove = new EventEmitter<any>();
  @Output() redirectToHomePage = new EventEmitter<any>();
  @Input() disableCardInfillSave;
  @Input() disablePortMoveSave;
  @Input() disablePortMoveSubmit;
  @Input() disableCardInfillSubmit;
  @Input() disableExportButton;
  @Input() enableNOCardMoveWorkflow;
  @Input() index;

  constructor() { }

  saveCardInfill() {
    this.saveCBP.emit();
  }

  submitCardInfill() {
    this.submitCBP.emit();
  }

 savetoValidate() {
   this.saveCardMove.emit();
  }

  submitEnable() {
   this.submitCardMove.emit();
  }

  export() {
    this.exportCardMove.emit();
  }

  redirect() {
    this.redirectToHomePage.emit();
  }
}
