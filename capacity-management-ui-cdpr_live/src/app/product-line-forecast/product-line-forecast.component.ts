import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppService } from '../shared/services/app-service';
import { staticColumn, editColumn, editColumnCorRT, messageColumn, messageColumnCoreRT, emptyColumn, emptyColumnCoreRT, staticColumnSort, staticShow, staticShowCoreRT } from './product-line-header.constant';import { UtilityService } from '../shared/services/utility.service';
import { CP_ERROR } from '../shared/constants/error.constant';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-line-forecast',
  templateUrl: './product-line-forecast.component.html',
  styleUrls: ['./product-line-forecast.component.scss']
})
export class ProductLineForecastComponent implements OnInit {
  /** All Local variable has defined here and viewChild statments are here. */
  href: string;	
  // to initialize index value on initializaton of page	
  index = 0;	
  header: string;
  testType = false; 
  tableSettings = {
    frozenColumns: [], headers: [], data: [], paginator: false, scrollHeight: '55vh', sort: false,
    columnWidth: '', columnHeight: '49px', columnWidthDynamic: true,
    frozenWidth: '', editkey: '', scrollable: true, totalRecords: 0,
    rowGroupData: { groupColName: null, viewType: null }, refreshPagination: false, clientPagnination: true, customSort: false
  };
  hideFizeSize = false;
  fileToUpload: File = null;
  filesizemsg = '';
  uploadFileName = 'No file chosen';
  skippedFile = false;
  cancelTable = true;
  showActionComponent = false;
  failed = false;
  successTable = false;
  showButton: boolean;
  displayBasic = false;
  showTable = false;
  /** Defined uploadData Array resposne of the submit */
  uploadData = [];
  tableType = '';
  deviceName = '';
  deviceType ='';
  /** edit mode check for table variable */
  editMode = false;
  successRecord = 0;
  errorRecord = 0;
  downloadFileName = '';

  /** Download data variable */
  csvData: string;
  fileMessage = '';
  disableButton = false;
  selectedTab = 'Product Line Forecast Upload';

  /* table Component variables */
  columns: any = [];
  rows: any = [];
  forzen: any = [];
  /** To send update in file upload component */
  // fileCancel = '';

  popupType = '';
  /* delete exact row variables */
  rowFordelete = null;

  /* option variables */
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  /** filterData */
  filterData = [];
  searchData = '';
  searchBoxPlaceHolder = 'Search Site /1141 Code';
  type = 'search';
  /** updatedRowObj object for binding updated rows result */
  updatedRowObj = [];
  /** rowUpdatedSuccessfully object for handling flag of updated data */
  rowUpdatedSuccessfully = { updated: false };
  /** noRecordError Flag is for getting No record found message */
  noRecordError = false;
	  /** User Details last updated time  */	
    userName: string;
  /** add row variable */
  headerData;
  /** increment */
  increment = 0;
  /** boolean add */
  addMode = false;
  searchSite = false
  alertCancel = false;
  /** boolean show rows */
  showbutnRows = false;
  /** calender edit variable */
  /** submit button disable */
  submitValue = true;
    /** error records */
    addErrorRecords;
  headerpush;
  /** selected list of data in rows */
  checkedArray;
  allcheck;
    /** success records */
    addsuccessRecords;
    /** secondSubmitRecords */
    secondSubmitRecords;
    /**   successsfully submitted */
    addMessage;
      /** popup show */
  displayAddreport = false;
    successsfullysubmitted;
  /** edit rows disable update and cancel button */
  countEdit = 0;
  /** ViewChild for Function using reset from child */
  @ViewChild(FileUploadComponent, { static: false }) fileUploadRef: FileUploadComponent;
  uploadHeading = 'Upload Product Line Forecast File (XLS, CSV File)';
  constructor(private appService: AppService, private router: Router, private utilityService: UtilityService) { }

  ngOnInit() {
    this.getDeviceTypeRole()
    // if (this.appService.getDeviceType() == "Edge Rt") {	
    //   // this.header = 'Product Line Forecast -Edge RT ';	
    //   this.index = 1;	
    //   this.router.navigate(['/product-line-forecastEdgeRT']);	
    // }	
    // else if (this.appService.getDeviceType() == "Core Rt") {	
    //   // this.header = 'Product Line Forecast - Core RT ';	
    //   this.index = 2;	
    //   this.router.navigate(['/product-line-forecastCoreRT']);	
    // }
    // else{	
    //   this.header = 'Product Line Forecast ';	
    // }
   
  }

  getDeviceTypeRole(){   
    this.appService.getDeviceType().subscribe(res => {
      if(res["deviceType"] == "Edge Rt"){
        this.index = 1;	
        this.router.navigate(['/product-line-forecastEdgeRT']);	
        }	
     else if(res["deviceType"] == "Core Rt"){	
      this.index = 2;	
      this.router.navigate(['/product-line-forecastCoreRT']);	
      }	
      this.href = this.router.url.replace('/', '');	
      switch (this.href) {	
        case 'product-line-forecast':	
          this.deviceType = 'LAST_AC_INFO_UPDATE_EDGE_RT'
          this.deviceName = 'Edge_Rt'
          this.header = 'Product Line Forecast- Edge RT ';	
          break;	
        case 'product-line-forecastEdgeRT':	
          this.deviceType = 'LAST_AC_INFO_UPDATE_EDGE_RT'
          this.deviceName = 'Edge_Rt'	
          this.header = 'Product Line Forecast- Edge RT ';	
          // this.index = 1;	
          break;	
        case 'product-line-forecastCoreRT':	
          this.deviceType = 'LAST_AC_INFO_UPDATE_CORE_RT'
          this.deviceName = 'Core_Rt'	
          this.header = 'Product Line Forecast- Core RT ';	
          // this.index = 2;	
          break;	 
      }
      this.userdetails();	
      this.onDownloadClick();		
    });	
  }
  tabChange(event) {
    this.selectedTab = event.originalEvent.target.innerText;
    this.rows = [];
    this.tableSettings.data = [];
    this.addMode = false;
    this.searchSite = false;
    this.testType = false;
    this.tableSettings = JSON.parse(JSON.stringify(this.tableSettings));
    if (this.selectedTab === 'Manage Product Line Forecast') {
      this.addMode = true;
      this.searchSite = true;
      this.showbutnRows = false;
      this.filterData = [];
      this.tableType = '';
      this.updateColumnsOfTable('static');
    }
  }
  /** To fill suggestions in search box */
  onKeyPressSearchBox(event) {
    if (event === null) {
      this.tableSettings.data = [];
    } else {
      
      const url = environment.base_url + 'site-management/search-site-name?searchParam=' + event.target.value;
      this.appService.get(url).subscribe(res => {
        this.filterData = JSON.parse(JSON.stringify(res));
       // this.tableType = '';
      });
    }

  }

  /** To get data for table while selecting any value from search box */
  onSelectSearch(event) {
    this.noRecordError = false;
    this.addMode = false;
    this.updateColumnsOfTable('edit');
//const url = 'assets/json/productline-forecast-user.json'	
const url= environment.base_url + 'forecast-management/forecast-info?searchData=' + event;
     //const url = environment.base_url + 'forecast-management/forecast-info?searchData=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length > 0) {
        this.rows = res;
        this.tableSettings.data = this.rows;
        this.editMode = true;
      } else {
        this.tableSettings.data = [];
        this.noRecordError = true;
      }
    });
  }
  /** Funtion to open the delete popup */
  deleteRowPopup(deleteObj) {
    this.rowFordelete = deleteObj;
    this.displayBasic = true;
    this.popupType = '30vw';
  }
  /** function to cancel the popup */
  closepopup() {
    this.displayAddreport = false;
  }
  /*
  /** Funtion to cancel the delete popup */
  modelCancel(event: any) {
    this.popupType = '';
    this.displayBasic = false;
    this.rowFordelete = null;
    this.alertCancel = false;
  }
  /** delete perticular record */
  deleteRow() {
    this.displayBasic = false;
    this.popupType = '';
    //const url = environment.base_url + 'forecast-management/delete-forecast-info?id=' + this.rowFordelete +'&deviceType='+ this.deviceType;
    const url = environment.base_url + 'forecast-management/delete-forecast-info?id=' +this.rowFordelete + '&deviceType=' +this.deviceType
    //const url = environment.base_url + 'forecast-management/delete-forecast-info?id=' + this.rowFordelete +'&deviceType='+ this.deviceType;
    this.appService.delete(url).subscribe(res => {
      const id = this.rowFordelete;
      if (res.status) {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.DELETE_INFO, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.tableSettings.data = JSON.parse(JSON.stringify(this.rows.filter(obj => obj.id !== this.rowFordelete)));
        this.rowFordelete = null;
        this.userdetails();
      } else if (res.message === 'Record not found') {
        this.utilityService.validateStatus('Info', CP_ERROR.STATUS_MESSAGES.NO_RECORD, CP_ERROR.SEVERITY.INFO, 5000);
      }
    });
  }

   /** submit msg header */
  submitMessage() {
    let url;
    if(this.deviceName === 'Edge_Rt'){
      // url = 'assets/json/phaseaddedge.json'
      url = 'assets/json/phaseaddedgeFailmessage.json'
      
     }
      else{
       // url = 'assets/json/phaseaddcore.json'
       url = 'assets/json/phaseaddcoreFailmessage.json'
   }
   // const url = environment.base_url + 'generic-header/grid-phase-allmsg-header';
    this.appService.get(url).subscribe(res => {
      this.tableSettings.headers = [];
      this.uploadData = res;
      this.tableSettings.headers = JSON.parse(JSON.stringify(this.uploadData));
      const len = this.uploadData.length;
      this.headerpush = this.uploadData[len - 3];
      this.headerpush.properties.pageName = 'PRODFORECAST';
      this.uploadData.push(this.headerpush);
      this.headerpush = this.uploadData[len - 4];
      this.headerpush.properties.pageName = 'PRODFORECAST';
      this.uploadData.push(this.headerpush);
      const uniheaderData = new Set(this.uploadData);
      this.uploadData = [...uniheaderData];
      this.tableSettings.headers = this.uploadData;
    });
  }
  /** submit record function */
  submitRecord() {
    this.successsfullysubmitted = true;
  const url=environment.base_url + 'forecast-management/add-data?deviceType=' + this.deviceType;
 
    this.appService.post(url, this.checkedArray).subscribe(res => {

      this.displayAddreport = true;
      this.successsfullysubmitted = true;
      if (res.recordsSummary.errorRecord > 0) {
        this.submitMessage();
        this.tableSettings.data = [];
        this.tableSettings.data = res.invalidPhaseForecastRecords;
        this.secondSubmitRecords = res.invalidPhaseForecastRecords;
        this.addErrorRecords = res.recordsSummary.errorRecord;
        this.addsuccessRecords = res.recordsSummary.successRecord;
        this.submitValue = true;
      } else {
      
        //this.submitMessage();
        this.tableSettings.data = [];
        //this.tableSettings.data = res.validPhaseForecastRecords;
        this.addsuccessRecords = res.recordsSummary.successRecord;
        this.addMessage = 'Successfully Added';
        this.addErrorRecords = 0;
        this.submitValue = true;
      }
      this.rowUpdatedSuccessfully.updated = true;
      this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
      this.updatedRowObj = [];
      this.userdetails();
      
    });
  }
  
  /** To update data of searched row from manage component */
  updateRow(event) {
   
    if (event !== null) {
      const index = this.updatedRowObj.findIndex(x => x.id === event.id);
      if (index > -1) {
        this.updatedRowObj = this.updatedRowObj.filter(obj => obj.id !== event.id);
      }
      this.updatedRowObj.push(event);
    }
    const len = this.updatedRowObj.length;
    const value = this.updatedRowObj[len - 1];
    if( this.deviceName !== 'Edge_Rt' && this.deviceName !== 'Core_Rt'){
       Object.keys(value).forEach((key) => { if ((value[key] === '')) { delete value[key]; } });
    }
    this.addMode = false;
    this.tableType = 'update';
    // this.updatedRowObj = [];
    // if (event !== null) {
    //   const index = this.updatedRowObj.findIndex(x => x.id === event.id);
    //   if (index > -1) {
    //     this.updatedRowObj = this.updatedRowObj.filter(obj => obj.id !== event.id);
    //   }
    //   this.updatedRowObj.push(event);
    // }
    // this.tableType = 'update';
  }


  /** Funtion to update the row by id to submit for backend */
  submitData() {
   const url= environment.base_url + 'forecast-management/update-forecast-info-data?deviceType=' +this.deviceType;
   // const url = environment.base_url + 'forecast-management/update-forecast-info-data';
    this.appService.post(url, this.updatedRowObj).subscribe(res => {
      if (res[0].status) {
        this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FORM_UPDATE, CP_ERROR.SEVERITY.SUCCESS, 3000);
        this.updatedRowObj = [];
        this.tableType = '';
        this.rowUpdatedSuccessfully.updated = true;
        this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
        this.onDownloadClick();
        this.userdetails();
       
      } else {
        this.utilityService.validateStatus(status, CP_ERROR.ERROR_MESSAGES.FILE_NOT_SUBMIT, CP_ERROR.SEVERITY.ERROR, 3000);
      }
    }, err => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.FILE_NOT_SUBMIT, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** to get table data based on search Go button */
  onManageSearchData(event) {
    this.filterData = [];
    this.noRecordError = false;
    this.updateColumnsOfTable('edit');
    //const url = 'assets/json/productline-forecast-user.json'	
    const url=environment.base_url + 'forecast-management/forecast-info?searchData=' + event;
   //  const url = environment.base_url + 'forecast-management/forecast-info?searchData=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length > 0) {
        this.rows = res;
        this.tableSettings.data = this.rows;
      } else {
        this.rows = [];
        this.noRecordError = true;
      }
     // this.tableType = 'update';
    });
  }
  OnResetSearchInput(event) {
    this.tableType = '';
    this.tableSettings.data = [];
    this.addMode = true;
  }
  /** search box data reset while clickin on cancel button from top */
  onSearchdataUpdateCancel() {
    this.tableType = '';
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));

    this.rowUpdatedSuccessfully.updated = true;
    this.rowUpdatedSuccessfully = JSON.parse(JSON.stringify(this.rowUpdatedSuccessfully));
  }

  /** To Download the whole Data center Data on the download link */
  onDownloadClick() {
    let url;
    if(this.deviceName === 'Edge_Rt'){
      url = environment.base_url + 'forecast-management/download-forecast-data';
    }
     else{
      url = environment.base_url + 'forecast-management/download-forecast-data-coreRt' 
  }
      this.appService.get(url).subscribe(res => {
       
      this.csvData = res.body.FileContent;
      this.downloadFileName = res.body.FileName;
    });
  }
  userdetails() {	
    const url = environment.base_url + 'forecast-management/get-parameter-value?parameterName=' + this.deviceType	
    // const url='assets/json/productline-forecast-user.json'	
    this.appService.get(url).subscribe(res => {	
      console.log(res);
      
      this.userName = res.parameterValue;	
    });	
  }	


  /** To get the upload response for success and failed case */
  submitfile(event) {
    // this.fileCancel = '';
    // const url = environment.base_url + '/forecast-management/upload-file';
    const url= environment.base_url + 'forecast-management/upload-file?deviceType=' + this.deviceName;
    //const url = environment.base_url + '/forecast-management/upload-file?deviceType=' + this.deviceName;
    this.appService.postFile(url, event).subscribe(res => {
      this.displayBasic = true;
      this.popupType = '50vw';
      if (res.status === true) {
        this.uploadData = res;
        this.successRecord = res.recordsSummary.successRecord;
        this.errorRecord = res.recordsSummary.errorRecord;
        this.fileMessage = '';
      } else {
        this.fileMessage = res.message;
        console.log(res.message);
        this.successRecord = 0;
        this.errorRecord = 0;
      }
    }, err => {
    });
  }

  /** On file upload modal button cancel */
  modelfileuploadCancel() {
    this.displayBasic = false;
    this.onfileUploadFromActionCancel();
  }

  /** To submit the success table json the backend */
  submitFileData() {
    const url = environment.base_url + 'forecast-management/upload-forecast-info?deviceType=' +this.deviceType;
    this.appService.post(url, this.uploadData['validForecastRecords']).subscribe(res => {
      this.utilityService.validateStatus(200, CP_ERROR.STATUS_MESSAGES.FILE_UPLOAD, CP_ERROR.SEVERITY.SUCCESS, 3000);
      this.rows = [];
      this.fileUploadRef.resetFile();
      this.tableType = '';
      this.successRecord = 0;
      this.errorRecord = 0;
      this.userdetails();
     // this.onDownloadClick();
    }, err => {
      this.utilityService.validateStatus(err.status, CP_ERROR.ERROR_MESSAGES.FILE_NOT_SUBMIT, CP_ERROR.SEVERITY.ERROR, 3000);
    });
  }

  /** To show success data center case on table */
  showSucessresult() {
    this.updateColumnsOfTable('');
    this.rows = this.uploadData['validForecastRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.tableSettings.totalRecords = this.successRecord;
    this.displayBasic = false;
    this.popupType = '';
    this.editMode = false;
    this.tableType = 'successTable';
  }

  /** To show failed data center case on table */
  showFailedresult() {
    this.updateColumnsOfTable('message');
    this.rows = this.uploadData['invalidForecastRecords'];
    this.tableSettings.data = JSON.parse(JSON.stringify(this.rows));
    this.tableSettings.totalRecords = this.errorRecord;
    this.displayBasic = false;
    this.editMode = false;
    this.tableType = 'failed';
    this.popupType = '';
  }

  /** cancel file upload while clicking on cancel button from top */
  onfileUploadFromActionCancel() {
    this.rows = [];
    this.successRecord = 0;
    this.errorRecord = 0;
    this.fileUploadRef.resetFile();
    this.tableType = '';
  }
  /** colums defines here for input table */
  updateColumnsOfTable(type) {
    // this.columns = staticColumn;	
    this.forzen = staticColumnSort;	
    if (type === 'edit' && this.href !== 'product-line-forecastCoreRT') {	
      this.columns = editColumn;	
    } else if (type === 'edit' && this.href === 'product-line-forecastCoreRT') {	
      this.forzen = staticColumn;	
      this.columns = editColumnCorRT;	
    } else if (type === 'message' && this.href !== 'product-line-forecastCoreRT') {	
      this.columns = messageColumn;	
      console.log(this.columns);	
    } else if (type === 'message' && this.href === 'product-line-forecastCoreRT') {	
      this.columns = messageColumnCoreRT;	
      console.log(this.columns);	
    } else if (type === '' && this.href !== 'product-line-forecastCoreRT') {	
      this.columns = emptyColumn;	
      console.log(this.columns);	
    }	
    else if (type === '' && this.href === 'product-line-forecastCoreRT') {	
      this.columns = emptyColumnCoreRT;	
      console.log(this.columns);	
    }	
    else if (type === 'static' && this.href !== 'product-line-forecastCoreRT') {	
      this.columns = staticShow;	
    }	
    else if (type === 'static' && this.href === 'product-line-forecastCoreRT') {	
      this.columns = staticShowCoreRT;	
    }	
    this.bindTableProperties(type);	
  }
  bindTableProperties(type) {
  
    const height = '100vh';
    // this.tableSettings.data = this.rows;
    this.tableSettings.headers = this.columns;
    if (type === '' || type === 'message') {
      this.tableSettings.frozenColumns = this.forzen;
      this.tableSettings.frozenWidth = '420px';
      this.tableSettings.clientPagnination = true;
      this.tableSettings.scrollable = true;
      this.testType = false;
      this.tableSettings.scrollHeight = `calc(${height} - 400px)`;

    } else if (type === 'static') {
      this.tableSettings.frozenColumns = [];
      this.tableSettings.frozenWidth = '';
      this.tableSettings.scrollable = true;
      this.tableSettings.editkey = 'id';
      this.testType = false;
      this.tableSettings.clientPagnination = false;
      this.tableSettings.scrollHeight = `calc(${height} - 400px)`;
    } else if (type === 'edit') {
      this.tableSettings.frozenColumns = this.forzen;
      this.tableSettings.frozenWidth = '420px';
      this.tableSettings.scrollable = true;
      this.tableSettings.editkey = 'id';
      this.testType = false;
      this.tableSettings.clientPagnination = false;
      this.tableSettings.scrollHeight = `calc(${height} - 400px)`;
    }
  }
  // addData() {
  //   this.headerData = this.tableSettings.headers;
  //   this.showbutnRows = true;
  //   this.addMode = false;
  //   this.searchSite = false;
  //   const event = {
  //     id: this.increment,
  //     siteName: '',
  //     code1141: '',
  //     broadband1g: '',
  //     broadband10g: '',
  //     ethernetFaste: ' ',
  //     ethernet1gHe: '',
  //     ethernet10gHe: '',
  //     ethernet10gWmcApolloTef : '',
  //     ethernet100gAccess: '',
  //     backhaul10g: '',
  //     backhaul100g: '',
  //     actions:''
  //   }
  //   // this.tableSettings.editable = true;
  //   this.tableSettings.data.push(event);
  //   this.increment++;
  // }
  /** add data for phase forecast json */
  addData() {
    
    this.tableType = '';
    this.allcheck = true;
    this.countEdit++;
    this.tableSettings.frozenColumns = [];
    this.tableSettings.frozenWidth=""
    // const url = environment.base_url + 'generic-header/grid-phaseadd-header';
    let url;
    if(this.deviceName === 'Edge_Rt'){
     url = 'assets/json/phaseaddedge.json'
    }
     else{
      url = 'assets/json/phaseaddcore.json'
  }
      this.appService.get(url).subscribe(res => {
      this.headerData = res;
      this.tableSettings.headers = this.headerData;
      this.tableSettings.headers = this.headerData;
      const len = this.headerData.length;
      this.headerpush = this.headerData[len - 2];
      this.headerpush.properties.pageName = 'PRODFORECAST';
      this.headerData.push(this.headerpush);
      this.headerpush = this.headerData[len - 3];
      this.headerpush.properties.pageName = 'PRODFORECAST';
      this.headerData.push(this.headerpush);
      const uniheaderData = new Set(this.headerData);
      this.headerData = [...uniheaderData];
      this.tableSettings.headers = this.headerData;
      
    });
    this.showbutnRows = true;
    this.addMode = false;
    this.searchSite = false;
    this.tableType = '';
    const event = {
      id: this.increment,
      code1141: '',
      siteName: '',
      broadband1g: '',
      broadband10g: '',
      ethernetFaste: '',
      ethernet1gHe: '',
      ethernet10gHe: '',
      ethernet10gWmcApolloTef: '',
      ethernet100gAccess: '',
      backhaul10g: '',
      backhaul100g: '',
      forecastddlr100g: '',
      forecastddsr100g: '',
      forecastlr4100g: '',
     // forecastlr10100g: '',
      forecastsr4100g: '',
      forecastsr10100g: '',
      forecastother100g: '',
      forecastlr410g: '',
     
    };
    this.testType = true;
    this.tableSettings.data.push(event);
    this.increment++;
  }
  // /** add rows */
  // addRows(event) {
  //     // this.checkedArray = event;
  //     let obj= [{}];
  //     if(this.deviceName == 'Edge_Rt'){
  //       obj= [{"forecastlr410g" : 0,"forecastsr4100g":0,"forecastlr4100g" : 0,"forecastsr10100g":0,
  //              "forecastddsr100g" : 0,"forecastddlr100g":0,"forecastother100g" : 0}]
  //      }
  //     else if(this.deviceName == 'Core_Rt'){
  //       obj= [{"broadband1g" : 0,"broadband10g":0,"ethernetFaste" : 0,"ethernet1gHe":0,
  //             "ethernet10gHe" : 0,"ethernet10gWmcApolloTef":0,"ethernet100gAccess" : 0,
  //             "backhaul10g":0,"backhaul100g":0}]
  //     }
  //     let array1  = event
  //     const mergedArray = [ ...array1, ...obj ]
  //    console.log('Merged Array: ', mergedArray)
  //     //Array.prototype.push.apply(event,obj);
  //     //let concat_obj = event.concat(obj)
  //      this.checkedArray = mergedArray;
  //     //this.checkedArray.push(event);
  //     if (this.checkedArray.length > 0) {
  //       this.submitValue = false;
  //     } else {
  //       this.submitValue = true;
  //     }
  //   const len = this.headerData.length;
  //   this.headerpush = this.headerData[len - 2];
  //   this.headerpush.properties.pageName = 'PRODFORECAST';
  //   this.headerData.push(this.headerpush);
  //   this.headerpush = this.headerData[len - 3];
  //   this.headerpush.properties.pageName = 'PRODFORECAST';
  //   this.headerData.push(this.headerpush);
  //   const uniheaderData = new Set(this.headerData);
  //   this.headerData = [...uniheaderData];
  //   this.tableSettings.headers = this.headerData;
  // }


  /** add rows */
  addRows(event) {
     this.checkedArray = event;
    if (this.checkedArray.length > 0) {
      this.submitValue = false;
    } else {
      this.submitValue = true;
    }
  const len = this.headerData.length;
  this.headerpush = this.headerData[len - 2];
  this.headerpush.properties.pageName = 'PRODFORECAST';
  this.headerData.push(this.headerpush);
  this.headerpush = this.headerData[len - 3];
  this.headerpush.properties.pageName = 'PRODFORECAST';
  this.headerData.push(this.headerpush);
  const uniheaderData = new Set(this.headerData);
  this.headerData = [...uniheaderData];
  this.tableSettings.headers = this.headerData;
}
  /** cancel click option for table row  */
  cancelRows() {
    this.alertCancel = true;
    

  }
  /** model ok click */
  modelOk() {
    this.tableSettings.data.length = 0;
    this.addMode = true;
    this.searchSite = true;
    this.showbutnRows = false;
    this.filterData = [];
    this.tableType = '';
    this.updateColumnsOfTable('static');
    this.alertCancel = false;
    this.testType = false;
    // this.count++;
    // this.uploadFileHeader();
    this.showbutnRows = false;
    this.addMode = true;
    this.searchSite = true;
  }
  validateInputData(event) {
    const pattern = /[a-z, A-Z, /]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
