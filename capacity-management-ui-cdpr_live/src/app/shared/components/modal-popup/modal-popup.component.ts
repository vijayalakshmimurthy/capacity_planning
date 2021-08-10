import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
/** common modal popup for table and info */
@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent implements OnInit {
  /** common modal popup variable difines here  */
  /** input to bind header name  */
  // @Input() header = '';
  /** input to bind table data  */
  // tslint:disable-next-line:variable-name
  flag = 0;
  _display: boolean;
  @Input() popSettings: any;
  /** Output to display chnage to close and again open popup  */
  @Output() displayChange = new EventEmitter();
  /** Output to display cbp delete popup  */
  /** Input to display open popup  */
  @Input()
  get display(): boolean { return this._display; }
  set display(value: boolean) {
    this._display = value;
  }
  // tslint:disable-next-line:no-input-rename
  @Input('popuptype') popuptype = '';
  @Input() commonModelProperties: any;
  @Output() submitData = new EventEmitter<any>();
  @Output() cancelData = new EventEmitter();
  constructor() { }

  /** close funtion to close on cross popup  */
  onClose() {
    // tslint:disable-next-line:no-unused-expression
    this.flag === 1 ? this.flag = 0 : this.cancelData.emit(false);
  }
  ngOnInit() {
  }
  /** cancel funtion to close on cross popup  */
  cancel() {
    this.cancelData.emit(false);
  }
  /** delete funtion to delete any rows  */
  submit() {
    this.submitData.emit();
    this.flag = 1;
  }

}