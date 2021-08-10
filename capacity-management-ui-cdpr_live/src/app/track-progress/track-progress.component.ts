import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from '../shared/services/app-service';
import { staticTable } from './track-progress-table/track-progress-table-header.constant';

@Component({
  selector: 'app-track-progress',
  templateUrl: './track-progress.component.html',
  styleUrls: ['./track-progress.component.scss']
})
export class TrackProgressComponent implements OnInit {
  selectedValue = 'uploadcsv';
  searchBoxPlaceHolder= 'Search..'
  disableCon = false;
  headerData: any;
  headerpush: any;
  rackTableFilterRecords = [];
    /** clear table on clearall  */
    clearTable;
    // to show message when no records for table
    showErrorMsg = false;
  //cities: any[];
  dropdownfilename = [
    
    // {name: 'JOB', code: 'job'},
    // {name: '1141', code: '1141'},
  
];
public searchedKeyword: string;
public keyword: string;
selectedSearchBy = {};
public isRefresh: boolean;
public uploadedFileData: Array<any> = [];
searchByOptions = [
  { label: 'Job Name', value: 'fileName' },
  { label: 'SNE ID', value: 'sneId' },
  { label: 'Project ID', value: 'projectId' }];
selectedFile: any[];
  // tableSettings = {
  //   headers: [], data: [], paginator: true, scrollHeight: '55vh',
  //   columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: true,
  //   editkey: '', scrollable: true, totalRecords: 0,
  //   rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, customSort: true ,status: []
  // };

/** for pagination api call object */
tableJsonFormat = {
  pageNo: 1,
  pageSize: 0,
  sortByField: '',
  isSortOrder: 'ASC',
  isDownload: false
};
  // to initialize index value on initializaton of page
  index = 0;
  tableSettings = {
    frozenColumns: '', headers: [], data: [], paginator: false, clientPagnination: true, scrollHeight: '55vh', sort: false,
    columnWidth: '30px', columnHeight: '30px', columnWidthDynamic: false, customSort: true, clientSorting: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0, addCheckbox: true,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, filter: true, status: [], siteNameFlag: false
  };


  constructor(private appService: AppService) { }

  // inputTableProperties = {
  //   headers: [], data: [], paginator: true, scrollHeight: '300px',
  //   columnWidth: '', columnHeight: '49px', columnWidthDynamic: false,
  //   editkey: '', scrollable: true, totalRecords: 0,
  //   refreshPagination: false
  // };
  emptyRow = []


  ngOnInit() {
    this.getTableHeader();
   // this.getTable();
 this.resetDropdown();
   // this.inputTableProperties.headers = staticTable;
  }

  exportFilterdRecord(ev) {
    if (Object.keys(ev['filters']).length !== 0) {
      this.rackTableFilterRecords = ev['filteredValue'];
      if (this.rackTableFilterRecords.length > 0) {
    //    this.rackExportDisable = false;
     //   this.rackClearEnable = false;
      } else {
     //   this.rackExportDisable = true;
     //  this.rackClearEnable = false;
      }
    } else {
      this.rackTableFilterRecords = [];
      //this.rackExportDisable = false;
     // this.rackClearEnable = true;
    }
  }

  
  diableFileUploader() {
    if (this.selectedValue === 'manually') {
      this.disableCon = true;
    } else {
      this.disableCon = false;
    }
  }
  // getTableData() {
  //   debugger;
  //   console.log('debugg');
  //   const url = './assets/json/trackprogresstable.json';

  //   // this.appService.get(url).subscribe(res => {
  //   //   console.log(res);
  //   //   for (let i =0; i <= 21; i++ ) {
  //   //     if (i <= 21) {
  //   //           this.emptyRow.push(res.cardMoveInputData)
  //   //           this.inputTableProperties.data = this.emptyRow;
  //   //           console.log( this.emptyRow)
  //   //         } 
  //   //   }
  //   //    this.inputTableProperties.data = res.cardMoveInputData;
  //   // });
  // }
   /** Get Table Header */
  getTableHeader() {
   // const dsrHeaderUrl = environment.base_url + 'generic-header/grid-drr-header';
    const dsrHeaderUrl = 'assets/json/trackprogressheader.json';
    this.appService.get(dsrHeaderUrl).subscribe(dsrHeaderColumnResponse => {
      this.headerData = dsrHeaderColumnResponse;
      const len = this.headerData.length;
      this.headerpush = this.headerData[len - 4];
      this.headerpush.properties.fieldTypeCheckboxHeader = 'checkbox';
      this.headerpush.properties.fieldTypeCalenderbodyType = 'calendar';
      this.headerpush.columnWidth = '237px';
      this.headerData.push(this.headerpush);
      const uniheaderData = new Set(this.headerData);
      this.headerData = [...uniheaderData];
      this.tableSettings.headers = this.headerData;
      console.log(this.tableSettings.headers);
    });
    this.getTable();
  }


  
  /** Get Table data */
  getTable() {
    const height = '100vh';
    const searchKeyword = this.appService.searchUploadData.searchedKeyword;
    const selectedSearchBy = this.appService.searchUploadData.selectedSearchByObj;
    //this.noRecordError = false;
    const url = `${environment.no_Base_url}/search-upload/orders`;
    //const url='assets/json/trackprogresstable.json'
    this.appService.get(url).subscribe(res => {
     // this.showErrorMsg = false;
      if (res.data.orderdatalist.length > 0) {
        console.log('table respone', res);
        
        this.tableSettings.data = res.data.orderdatalist;
      //  this.tableSettings.totalRecords = res.data.orderdatalist;
        this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
      } else {
        this.tableSettings.data = [];
        //this.noRecordError = true;
      }
      this.tableSettings.status = [
        { label: 'Select Status', value: null },
        { label: 'Completed', value: 'Completed' },
        { label: 'Built Completed', value: 'Built Completed' },
        { label: 'Built Failed', value: 'Built Failed' },
        { label: 'Uploaded', value: 'Uploaded' },
        { label: 'Complete Failed', value: 'Complete Failed' },
        { label: 'Processing', value: 'Processing' }
      ];
    });
    this.tableSettings.scrollHeight = `calc(${height} - 345px)`;
  }
 /** on page no change call table  */
 getSelectedPageNo(event) {
  this.tableJsonFormat.pageNo = event.page + 1;
}
  /** on items per page change call table  */
  getlistRowSelect(event) {
    this.tableSettings.refreshPagination = true;
    this.tableJsonFormat.pageNo = 1;
    this.tableJsonFormat.pageSize = event.target.value;
  }

  resetDropdown() {
    this.dropdownfilename = [
      {name: 'Backhaul Rearrangement', code: 'BackhaulRearrangement'},
      {name: 'Port Move', code: 'PortMove'},
      {name: 'Recover SNE', code: 'RecoverSNE'},
      
  ];
    //this.listOfReservationProjectType = response;
  }

  getUploadedFileData() {
 //debugger
 this.keyword = '';
 this.selectedSearchBy = {};
 this.appService.searchUploadData.searchedKeyword = '';
 this.appService.searchUploadData.selectedSearchByObj = {};
    this.clearTable = true;
    //this.cardExportDisable = false;
    //this.resetDropdown();
    this.getTable();
  }

  onRefresh() {
  this.keyword = '';
  this.selectedSearchBy = {};
  this.clearTable = true;
  this.isRefresh = true;
  this.getTable();
  }

 // Search data on file name, sne id and EIN
 searchKeyword(keyword: string, selectedSearchByObj) {
  this.selectedSearchBy = selectedSearchByObj;
  const selectedSearchByValue = selectedSearchByObj.value && selectedSearchByObj.value.trim();
  this.searchedKeyword = keyword && keyword.trim();
  this.appService.searchUploadData.searchedKeyword = this.searchedKeyword;
  this.appService.searchUploadData.selectedSearchByObj = this.selectedSearchBy;
  if (selectedSearchByValue) {
    if (this.searchedKeyword) {
        const message = { type: 'error', body: 'Please check the Search value entered' };
     // } else {
      // const url='assets/json/trackprogresreqstable.json'
      const url = `${environment.no_Base_url}/search-upload/ein-orders?searched-by=${selectedSearchByValue}` + `&searched-object=${this.searchedKeyword}`;
   // const url = `${environment.base_url}/srims-networkoptimizationservice/search-upload/ein-orders?searched-by=fileName&searched-object=port`;
      this.appService.get(url).subscribe(res => {
        if (res.data.orderdatalist.length > 0) {
          this.tableSettings.data = res.data.orderdatalist;
         // this.tableSettings.totalRecords = res.data.orderdatalist;
          this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
        } else {
          this.tableSettings.data = [];
          //this.noRecordError = true;
        }
           // this.loaderService.hide();
           // this.uploadedFileData = res.data && res.data.orderdatalist || [];
         //   this.appService.searchUploadData.searchData = this.uploadedFileData;
          }, (err) => {
           // this.appService.handleError(err);
          });
      // }
    } else {
      const message = { type: 'error', body: 'Please check the Search value entered' };
    //  this.toastr.showToastr(message);
    }
  } else {
    const message = { type: 'error', body: 'Please select search by filter' };
    //this.toastr.showToastr(message);
  }
}

}










  


