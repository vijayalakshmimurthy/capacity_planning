import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppService } from '../../shared/services/app-service';

@Component({
  selector: 'app-cbp-header',
  templateUrl: './cbp-header.component.html',
  styleUrls: ['./cbp-header.component.scss'],
})

export class CbpHeaderComponent implements OnInit, OnDestroy, OnChanges {
  /** filterData */
  filterData = [];
  /** Show error message when no site found */
  searchSiteErrorMsg: string;
  /** SearchBox PlaceHolderValue */
  searchBoxPlaceHolder = 'Search Site/1141';
  /** Empty message for no data available for searched text */
  emptyMessage = 'Search is not available';
  // tslint:disable-next-line:no-input-rename
  @Input() header;
  @Output() loadTabledatBySearch = new EventEmitter();
  @Output() clearFilterData = new EventEmitter();
  @Output() exportData = new EventEmitter();
  @Input() value = true;
  @Input() clearValue;
  @Input() sitename = '';
  @Input() index: number;
  @Input() exportDisable: boolean;
  @Output() submitButton = new EventEmitter();
  @Output() planRackButton = new EventEmitter();
  /** export data */
  exportDataDir;
  constructor(private appService: AppService) { }
  ngOnInit() {
  }
  ngOnChanges() {
  }
  /** To fill suggestions in search box */
  onkeyPressSearch(event) {
    if (event !== null) {
    this.searchSiteErrorMsg = '';
    if (event.target.value.length > 1) {
      const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
      this.appService.get(url).subscribe(res => {
        if (res.length > 0) {
          this.filterData = JSON.parse(JSON.stringify(res));
        } else {
          this.filterData = [];
          this.searchSiteErrorMsg = 'Site not found';
        }
      });
    }
  }
  }
  /** Onselect call service and get DSR data */
  onselectSearch(event) {
    this.loadTabledatBySearch.emit(event);
  }
  // for export
  tableConvert(download) {
    if (download === 'csv') {
      this.exportData.emit();
    }
  }
  /** clear filter function  */
  clearFilter() {
    this.clearFilterData.emit();
  }
  /** submit button function  */
  submitToWfmt() {
    this.submitButton.emit();
  }
  /**
   * Rack Table Popup
   */
  planRack() {
    this.planRackButton.emit();
  }
  ngOnDestroy() { }
}
