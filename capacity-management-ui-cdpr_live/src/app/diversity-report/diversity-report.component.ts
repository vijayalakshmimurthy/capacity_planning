import { Component, OnInit } from '@angular/core';
import { AppService } from '../shared/services/app-service';
import { environment } from '../../environments/environment';
import { staticColumn } from './diversity-update.constant';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';
@Component({
  selector: 'app-diversity-report',
  templateUrl: './diversity-report.component.html',
  styleUrls: ['./diversity-report.component.scss']
})
export class DiversityReportComponent implements OnInit {
  displayBasic = false;
  display = false;
  displayInfo = false;
  searchButton = false;
  tableResponse = [];
  roleName: any;
  request;
  editDGButton = false;
  updateTableButton = false;
  checkflag = false;
  errorcallDGnamesame = false;
  errorcallDGname = false;
  prefixErrorSame = false;
  checkflagchar = false;
  errorDropdown = false;
  errorcall = false;
  rowGroupMetaList = [];
  rowGroupDataList = [];
  groupData = [];
  updatedJson = [];
  updatedJsona = [];
  jsonupdated = [];
  respon = [];
  /** export data */
  exportData: string;
  popuptype = '';
  /** downloadExportsheet input to reservation-csv.directive */
  fileName = '';
  displayPopup = false;
  commonModelProperties: any;
  loadUpdatableRow = false;
  loadEditableRow = false;
  headerUpdatePopup = 'Diversity Group Forecast';
  showLoader = false;
  /** Table settings data */
  tableSettingsPopup = {
    headers: [], data: [], scrollHeight: '450px', columnWidthDynamic: false,
    scrollable: true
  };
  constructor(private appService: AppService, private router: Router,  private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.role();
  }
  role() {
    this.roleName = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
  }
  showFilter() {
    this.display = true;
  }
  onDialogClose(event) {
    this.display = event;
  }
  showInfo() {
    this.displayInfo = true;
  }
  onDialogInfoClose(event) {
    this.displayInfo = event;
  }
  OnsearchGroup(event) {
    this.request = event;
    this.exportCSV();
    this.getTableData();
  }

  getTableData() {
    const diversityArray = [];
    const notdiversityArray = [];
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data';
    this.respon = [];
    this.tableResponse = [];
    this.appService.post(url, this.request).subscribe((response) => {
      this.tableResponse = response;
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
      if (this.tableResponse[0].diversityGroupForecastList.length > 0) {
        this.updateTableButton = false;
        this.searchButton = true;
        this.rowGroupMetaList = [];
        this.rowGroupDataList = [];
        this.jsonupdated = [];
        this.updatedJsona = [];
      }
      this.jsonupdated = JSON.parse(JSON.stringify(response));
      if (response[0].diversityGroupForecastList.length > 0) {
        this.editDGButton = true;
        this.loadEditableRow = true;
      }
      response.forEach(a => {
        if (a.diversityGroupForecastList.length > 0) {
          diversityArray.push(a);
        } else {
          notdiversityArray.push(a);
        }
      });
      this.respon = diversityArray.concat(notdiversityArray);
    });
  }
  /** export CSV file */
  exportCSV() {
    const request = this.request;
    const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-download';
    this.appService.post(url, request).subscribe(res => {
      this.exportData = res.body;
      this.fileName = 'Diversity_Group_Forecast.xlsx';
    });
  }

  editDGName() {
    this.updateTableButton = true;
    this.editDGButton = false;
    this.loadUpdatableRow = true;
  }

  /** to call the DG group name autocomplete api in the filter popup */
  getFilterData(event: any) {
    this.checkflag = false;
    this.loadUpdatableRow = false;
    this.loadEditableRow = false;
    // tslint:disable-next-line:max-line-length
    const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data/diversitygroupname?diversitygroupname=' + event;
    this.appService.get(url).subscribe(res => {
      if (res.length === 0) {
        this.checkflag = true;
        this.groupData = [];
      } else {
        this.groupData = res;
      }
    });
  }
  /** to get update table modal */
  onDialogUpdateClose(event) {
    this.displayPopup = event;
    this.popuptype = '';
  }
  /** to get update table */
  showUpdatePopup() {
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.respon.length; i++) {
      for (const j of this.updatedJsona) {
        this.respon[i].diversityGroupForecastList = this.updatedJsona[j];
      }
    }
    let value;
    value = {
      previuosData: this.jsonupdated,
      updatedData: this.respon
    };
    //  search data second hit
    // tslint:disable-next-line:max-line-length
    const url = environment.base_url + 'diversity-group-forecast-management/getPacReqJson';
    this.appService.post(url, value).subscribe(res => {
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
      this.displayPopup = true;
      this.commonModelProperties = {
        popupType: 'informationPopup',
        header: 'Diversity Group Forecast',
        popSettings: this.tableSettingsPopup,
        footerButtons: 'false',
        width: '1200px',
      };
      if (res.responseData) {
        this.tableSettingsPopup.data = res.responseData;
        this.tableSettingsPopup.headers = staticColumn;
      }
    }, (error) => {
      this.errorcall = true;
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
      setTimeout(() => {
        this.errorcall = false;
      }, 3000);
    });
    this.editDGButton = false;
    this.updateTableButton = false;
    this.tableResponse = [];
    this.searchButton = false;
    this.updatedJson = [];
    this.rowGroupMetaList = [];
    this.rowGroupDataList = [];
    this.updatedJsona = [];
  }
  getSearchFlag(event) {
    this.updatedJson = event.updatedJson;
    if (event.errorcallDGname) {
      this.errorcallDGname = event.errorcallDGname;
      setTimeout(() => {
        this.errorcallDGname = false;
      }, 2000);
    } else if (event.errorcallDGnamesame) {
      this.errorcallDGnamesame = event.errorcallDGnamesame;
      setTimeout(() => {
        this.errorcallDGnamesame = false;
      }, 2000);
    } else if (event.prefixErrorSame) {
      this.prefixErrorSame = event.prefixErrorSame;
      setTimeout(() => {
        this.prefixErrorSame = false;
      }, 2000);
    }
  }
  addValueGroup(event) {
    this.getSearchFlag(event);
    if (event.checkflagchar) {
      this.checkflagchar = event.checkflagchar;
      setTimeout(() => {
        this.prefixErrorSame = false;
      }, 2000);
    } else if (event.errorDropdown) {
      this.errorDropdown = event.errorDropdown;
      setTimeout(() => {
        this.errorDropdown = false;
      }, 2000);
    }
  }
  cancelValue() {
    this.respon = [];
    const diversityArray = [];
    const notdiversityArray = [];
    this.loaderService.showHideLoader(true);
    this.showLoader = true;
    const url = environment.base_url + 'diversity-group-forecast-management/diversity-group-forecast-data';
    this.appService.post(url, this.request).subscribe((response) => {
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
      if (response[0].diversityGroupForecastList.length > 0) {
        this.updateTableButton = false;
        this.searchButton = true;
        this.rowGroupMetaList = [];
        this.rowGroupDataList = [];
        this.jsonupdated = [];
        this.updatedJsona = [];
      }
      this.tableResponse = response;
      this.jsonupdated = JSON.parse(JSON.stringify(response));
      if (response[0].diversityGroupForecastList.length > 0) {
        this.editDGButton = true;
        this.loadEditableRow = true;
      }
      response.forEach(a => {
        if (a.diversityGroupForecastList.length > 0) {
          diversityArray.push(a);
        } else {
          notdiversityArray.push(a);
        }
      });
      this.respon = diversityArray.concat(notdiversityArray);
    }, (error) => {
      this.loaderService.showHideLoader(false);
      this.showLoader = false;
    });
  }
  /** to route phase forecast Page */
  phaseForecast() {
    this.router.navigate(['/phaseForecast']);
  }

  cancelpopup() {
    this.displayPopup = false;
  }
}
