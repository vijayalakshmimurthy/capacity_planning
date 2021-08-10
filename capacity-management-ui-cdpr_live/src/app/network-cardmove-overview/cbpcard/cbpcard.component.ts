import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../shared/services/app-service';
import { environment } from '../../../environments/environment';
import { staticTable } from './cbpcard-header-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cbpcard',
  templateUrl: './cbpcard.component.html',
  styleUrls: ['./cbpcard.component.scss']
})
export class CbpcardComponent implements OnInit {
  @Input() tableData;
  noRecordError = false;
  emptyRow = [];
  tableSettings = {
    headers: [], data: [], paginator: true, scrollHeight: '55vh',
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true
  };
  inputTableProperties = {
    headers: [], data: [], paginator: true, scrollHeight: '300px',
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true,
    editkey: '', scrollable: true, totalRecords: 0,
    refreshPagination: false
  };
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.inputTableProperties.headers = staticTable;
    this.getTable();
  }
  getTable() {
    const height = '100vh';
    this.noRecordError = false;
    const url = './assets/json/cardMove_card_Overview.json';
    this.appService.get(url).subscribe(res => {
      console.log(res);
      for (let i = 1; i <= 1; i++) {
        if (i <= 1) {
          this.emptyRow.push(res.cardMoveOverviewCardData);
          this.inputTableProperties.data = this.emptyRow;
          console.log(this.emptyRow);
        }
      }
    });

    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
  }
}
