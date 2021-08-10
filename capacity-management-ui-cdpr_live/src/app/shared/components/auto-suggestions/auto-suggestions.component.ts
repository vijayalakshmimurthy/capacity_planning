import { Component, ViewChild, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { AutoComplete } from 'primeng/autocomplete';
/** This is the shared component for Manage search tab funtionality */

@Component({
  selector: 'app-auto-suggestions',
  templateUrl: './auto-suggestions.component.html',
  styleUrls: ['./auto-suggestions.component.scss']
})
export class AutoSuggestionsComponent implements OnChanges {
  @Input() filterData = [];
  @Input() placeHolder = '';
  @Output() searchStr = new EventEmitter<any>();
  @Output() selectStr = new EventEmitter<any>();
  @Output() showListOnFocus = new EventEmitter<any>();
  @Output() dataKeyEnter = new EventEmitter<any>();
  @Output() validateInputData = new EventEmitter<any>();
  @Output() resetSearchClear = new EventEmitter<any>();
  @Input() disableField;
  @Input() type: string;
  @Input() emptyMessage: string;
  searchData = '';
  @ViewChild(AutoComplete, { static: false })
  private autoComplete: AutoComplete;
  autocompletedata: any = [];
  ngOnChanges() {
    this.autocompletedata = [];
    if (this.filterData.length > 0) {
      this.autocompletedata = this.filterData;
    }
  }

  /** to search on key type on search box */
  onKeyPressSiteCode(event) {
    if (event.target.value.length > 0 && event.keyCode !== 13) {
      this.searchStr.emit(event);
    } else {
      this.searchStr.emit(null);
    }

  }
  /** to search on selcted site on search box */
  onSelectSearch(event) {
    this.selectStr.emit(event);
    if (!this.type) {
     setTimeout(() => {
      this.searchData = '';
     }, 200);
    }
    this.disableField = true;
    setTimeout(() => (this.disableField = false));
  }
  /** to search on go button on search box */
  onManageSearchData() {
    this.dataKeyEnter.emit(this.searchData);
    this.autocompletedata = [];
  }

  showListofSNE() {
    this.showListOnFocus.emit();
    this.autoComplete.show();
  }
  hideListofSNE() {
    this.showListOnFocus.emit();
    // this.autoComplete.hide();
  }
  validateOnKeyPress(event) {
    this.validateInputData.emit(event);
  }
  resetSearch() {
    this.resetSearchClear.emit(this.searchData);
  }
}
