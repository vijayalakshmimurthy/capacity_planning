import { MenuConstants } from './../../constants/menu.constant';
import { RoleService } from './../../services/roles.service';
import { WorkflowService } from './../../services/workflow.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app-service';
import { environment } from '../../../../environments/environment';
import { OrderIdService } from '../../services/order-id.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  roles = ['admin', 'user', 'designer'];
  /** Defined local variable */
  headerUser = '';
  loggedIN = true;
  loggedINMenu = true;

  menuList = [];
  userRoleList = [];
  displaySwtichProfile = false;
  showIconnotification = false;
  changedRole = '';
  commonModelProperties: any;
  notificationFromService: any;
  display = false;
  switchPopup = false;
  selectedValue = '360View';
  // tslint:disable-next-line:variable-name
  angular7_url;
  selectedUrl;
  menu;
  headerName = 'Capacity Planning';
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private roleService: RoleService,
              private workflowService: WorkflowService, private appService: AppService,
              private orderIdService: OrderIdService) {
  }


  ngOnInit() {
    this.angular7_url = environment.Angular7_url;
    setTimeout(() => {
      this.changedRole = sessionStorage.getItem('SRIMS_CURRENT_SESSION');
      if (this.changedRole === 'no user') {
        let url  = sessionStorage.getItem('ROUTE');
        this.menu = sessionStorage.getItem('nouser_menu');
        if (this.menu === 'cardmove') {
          url = 'plancardmove';
          this.menuList = [{
            menuName: 'New Plan',
            child : [
                { menuName: this.menu , url },
            ]
          }];
        } else if (this.menu === 'cardRecovery') {
          url = 'devicerecovery';
          this.menuList = [{
            menuName: 'New Plan',
            child : [
                { menuName: this.menu , url },
            ]
          }];
        }
        this.headerName = 'Network Optimization';
      } else {
        this.menuList = MenuConstants.menuMapping[this.changedRole].menuOptions;
        if (this.changedRole === 'PRE_PROD_CE_DESIGNER' || this.changedRole === 'PROD_CE_DESIGNER' ||
        this.changedRole === 'PRE_PROD_CP_ACCOUNTING_USER' ) {
          this.getDeviceTypeRole();
          this.headerName = 'Capacity Planning';
        }
      }

    }, 200);
    this.headerUser = this.appService.getName();
  }
  getDeviceTypeRole() {
    this.appService.getDeviceType().subscribe(res => {
      const edgeFilter = [];

      if (res['deviceType'] === 'Edge Rt') {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.menuList.length; i++) {
          const y = this.menuList[i].child.filter(x => x.menuName !== 'Core RT');
          this.menuList[i].child = y;
          edgeFilter.push(this.menuList[i]);
        }
        this.menuList = edgeFilter;
      } else if (res['deviceType'] === 'Core Rt') {
        this.menuList = this.menuList.filter(x => x.menuName !== 'Trend and Forecast' && x.menuName !== 'Product Line Forecast')
      }


    });
  }

  openSwitchProfile() {
    this.displaySwtichProfile = true;
    this.getRolesPopup();
  }

  closeSwtichProfilePopup() {
    this.displaySwtichProfile = false;
    this.userRoleList = [];
  }

  switchProfile() {

    this.roleService.switchRole(this.changedRole, this.router.url);
    // this.headerUser = MenuConstants.menuMapping[this.changedRole].userName;
    this.menuList = MenuConstants.menuMapping[this.changedRole].menuOptions;

    if (this.changedRole === 'PRE_PROD_CE_DESIGNER' || this.changedRole === 'PROD_CE_DESIGNER' ||
      this.changedRole === 'PRE_PROD_CP_ACCOUNTING_USER') {
      this.getDeviceTypeRole();
    }
    this.closeSwtichProfilePopup();
  }

  getRolesPopup() {
    this.userRoleList = [];
    const roleList: any = sessionStorage.getItem('SRIMS_SESSION').split(',');
    roleList.forEach(element => {
      if (MenuConstants.menuMapping[element]) {
        this.userRoleList.push({ displayName: MenuConstants.menuMapping[element].userName, roleName: element });
      }
    });
  }



  /** Funtion to redirect the logout coponent routing */
  logoutfinal() {
    //  this.services.getLogout().subscribe((data) => {
    this.loggedIN = false;
    this.loggedINMenu = false;
    this.menuList = [];
    document.execCommand('ClearAuthenticationCache');
    this.router.navigate(['/logout']);
  }
  /** Funtion to navigate the module from capacity planning dropdown */
  navigateToUrl(url) {
    if (url) {
      this.workflowService.enableworlflow.next(null);
      this.workflowService.enableNOWorlflow.next(null);
      this.workflowService.enableDeviceRecoveryWorkflow.next(null);
      if (url === '/detail-reservation-report') {
        this.showIconnotification = true;
      } else {
        this.showIconnotification = false;
      }
      if (url === 'trackpage') {
        //  console.log('url to called track page');
        // tslint:disable-next-line:max-line-length
        // same Tab app will load
        this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + '/search-uploads'; });
        // tslint:disable-next-line:max-line-length
        // New Tab app will load
        // this.router.navigate(['/']).then(result =>
        //  { window.open('http://10.52.35.46:61010/srims-networkoptimization/search-uploads', '_blank'); });
      }
      this.router.navigate([url]);
    }
  }
  /** Function to Show Popup */
  notificationPopup() {
    this.display = true;
    const tableJsonFormatDisplayed = {
      ein: '',
      status: 'Displayed',
    };
    const url = environment.base_url + 'detailed-reservation-report/reservation-data/notification?ein=' + this.appService.getEIN();
    this.appService.post(url, tableJsonFormatDisplayed).subscribe(res => {
      if (res !== null) {
        this.commonModelProperties.bodyContent = res.reservationDataList;
      } else {
        this.commonModelProperties.bodyContent = 'No Notification';
      }
      console.log('notification form Service' + res);
    });

    this.commonModelProperties = {
      // bodyContent: 'No Notification',
      popupType: 'confirmationPopup',
      footerButtons: 'true',
      header: 'Notification',
      // tslint:disable-next-line:max-line-length
      dynamicButton: [{ btnName: 'Ok', funcName: 'cancel', class: 'btn-modal' }]
    };
  }
  cancelLayerdPopup() {
    this.display = false;
  }

  headerPopUp(url) {
    this.selectedValue = '360View';
    this.switchPopup = true;
    this.selectedUrl = url;
  }

  closePopup() {
    this.switchPopup = false;
  }

  navigateToPage() {
    this.switchPopup = false;
    if (this.selectedValue === 'manualInput') {
      if (this.selectedUrl === 'devicerecovery') {
        this.clearWorkflowSessionData();
        this.workflowService.enableDeviceRecoveryWorkflow.next(null);
        this.workflowService.enableNOWorlflow.next(null);
        this.workflowService.enableDeviceRecoveryWorkflow.next(null);
        this.router.navigate(['/sne-recovery']);
      } else {
        this.clearWorkflowSessionData();
        this.workflowService.enableDeviceRecoveryWorkflow.next(null);
        this.workflowService.enableNOWorlflow.next(null);
        this.router.navigate(['/card-move']);
      }
    } else if (this.selectedValue === '360View') {
      if (this.selectedUrl === 'devicerecovery') {
        this.clearWorkflowSessionData();
        this.workflowService.enableDeviceRecoveryWorkflow.next(true);
        this.workflowService.enableNOWorlflow.next(null);
        this.router.navigate(['/three60-twod']);
      } else {
        this.clearWorkflowSessionData();
        this.workflowService.enableDeviceRecoveryWorkflow.next(null);
        this.workflowService.enableNOWorlflow.next(true);
        this.router.navigate(['/three60-twod']);
      }
    }
  }

  clearWorkflowSessionData() {
    this.workflowService.status.next(null);
    this.workflowService.previousStatus.next(null);
    this.workflowService.status.next(null);
    this.workflowService.dataToOverviewFrom3d.next(null);
    this.workflowService.deviceRecoveryStatus.next(null);
    this.orderIdService.cardMove.next(null);
    this.orderIdService.emailIdPage.next(null);
    this.orderIdService.cardMoveSummary.next(null);
    this.orderIdService.portMoveObj.next(null);
    this.orderIdService.cardInfillTableData.next(null);
    this.orderIdService.recoverSNEList.next(null);
    this.orderIdService.portMoveIdList.next(null);
  }
}
