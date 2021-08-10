import { RoleService } from './shared/services/roles.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmitterService } from './shared/services/emitter.service';
import { MessageService } from 'primeng/api';
import { WorkflowService } from './shared/services/workflow.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/** This is the App Component whcih contains Hearder and routing */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})

/** selector,template,styles of component @export @class AppComponent */
export class AppComponent implements OnDestroy {
  /** inital state of the observer @memberof AppComponent */
  urlObserver = null;
  message: any;
  errorMsg: Subscription;
  showask = true;
  menu;
  options;
  url;
  no_user = ' ';
  // tslint:disable-next-line:max-line-length
  /** Creates an instance of AppComponent. @param {Router} router @param {RoleService} service @param {SessionService} sessionService @memberof AppComponent */
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private roleService: RoleService, private emitterService: EmitterService, private messageService: MessageService, private workflowService: WorkflowService) {
    this.getCurrentRole();
    this.errorMsg = this.emitterService.errorDataChangeEmitted$.subscribe(message => {
      this.message = message;
      if (this.message) {
        this.messageService.add({
          // tslint:disable-next-line:max-line-length
          severity: this.message.severity, summary: this.message.code, detail: this.message.message, life: this.message.life ? this.message.life : 3000
        });
      }
    });
  }

  /** checks for the  current role and eligibility of the current route @memberof AppComponent */
  getCurrentRole() {
    let roles;
    let currentRoles;
    this.no_user = ' ';
    if (!environment.production && !environment.cst) {
      roles = ['PROD_CE_ADMIN', 'PROD_CE_VIEWER', 'PRE_PROD_CE_DESIGNER'];
      if (window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== null
        || window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== 'null') {
        this.no_user = window['CURRENT_USER'].NO_USER;
      }
      console.log(window['CURRENT_USER'])
      if (this.no_user === 'Y') {
        currentRoles = 'no user';
        this.nouserlogic();
        sessionStorage.nouser_menu = this.menu;
      } else {
        currentRoles = ['PRE_PROD_CE_DESIGNER'];
      }
      // currentRoles = ['PRE_PROD_CE_DESIGNER'];
      console.log('Role' + currentRoles);
    } else if (environment.cst && !environment.production) {
      roles = window['CURRENT_USER'].GroupName.split('^');
      if (window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== null ||
        window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== 'null') {
        this.no_user = window['CURRENT_USER'].NO_USER;
      }

      if (this.no_user === 'Y') {
        currentRoles = 'no user';
        this.nouserlogic();
        sessionStorage.nouser_menu = this.menu;
      } else if (roles[roles.indexOf('PRE_PROD_CE_DESIGNER')]) {
        currentRoles = roles[roles.indexOf('PRE_PROD_CE_DESIGNER')];
      } else if (roles[roles.indexOf('PRE_PROD_CP_ADMIN')]) {
        currentRoles = roles[roles.indexOf('PRE_PROD_CP_ADMIN')];
      } else if (roles[roles.indexOf('PRE_PROD_CP_USER')]) {
        currentRoles = roles[roles.indexOf('PRE_PROD_CP_USER')];
      } else {
        currentRoles = roles[0];
      }
      console.log(currentRoles);
    } else {
      roles = window['CURRENT_USER'].GroupName.split('^');
      if (window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== null ||
          window['CURRENT_USER'] !== undefined && window['CURRENT_USER'].NO_USER !== 'null') {
        this.no_user = window['CURRENT_USER'].NO_USER;
      }

      if (this.no_user === 'Y') {
        currentRoles = 'no user';
        sessionStorage.nouser_menu = this.menu;
        this.nouserlogic();
      } else if (roles[roles.indexOf('PROD_CE_DESIGNER')]) {
        currentRoles = roles[roles.indexOf('PROD_CE_DESIGNER')];
      } else if (roles[roles.indexOf('PROD_CE_ADMIN')]) {
        currentRoles = roles[roles.indexOf('PROD_CE_ADMIN')];
      } else if (roles[roles.indexOf('PROD_CE_VIEWER')]) {
        currentRoles = roles[roles.indexOf('PROD_CE_VIEWER')];
      } else {
        currentRoles = roles[0];
      }
    }
    // sessionStorage.SRIMS_SESSION = roles;
    //    this.urlObserver = this.router.events.subscribe((routes: any) => {
    //     this.urlObserver.unsubscribe();
    //     this.roleService.setRoles(currentRoles, routes.url);
    //   });
    if (this.no_user === 'Y') {
      console.log(this.no_user);
      this.roleService.setRoles(currentRoles, this.url);
      if (this.menu === 'cardmove' && this.options === '360') {
        this.workflowService.enableNOWorlflow.next(true);
      } else if (this.menu === 'cardRecovery' && this.options === '360') {
        this.workflowService.enableDeviceRecoveryWorkflow.next(true);
      }
    } else {
      sessionStorage.SRIMS_SESSION = roles;
      this.urlObserver = this.router.events.subscribe((routes: any) => {
        this.urlObserver.unsubscribe();
        this.roleService.setRoles(currentRoles, routes.url);
      });
    }
  }

  nouserlogic() {
    if (window['CURRENT_USER'].MENU !== null || window['CURRENT_USER'].MENU !== 'null') {
      this.menu = window['CURRENT_USER'].MENU;
    }
    if (window['CURRENT_USER'].option !== null || window['CURRENT_USER'].option !== 'null') {
      this.options = window['CURRENT_USER'].option;
    }
    console.log(this.options);
    if (this.menu === 'cardmove' && this.options === '360') {
      this.url = '/three60-twod';
    } else if (this.menu === 'cardmove' && this.options === 'manual') {
      this.url = '/card-move';
    } else if (this.menu === 'cardRecovery' && this.options === '360') {
      this.url = '/three60-twod';
    } else if (this.menu === 'cardRecovery' && this.options === 'manual') {
      this.url = '/sne-recovery';
    } else if (this.menu === 'overView') {
      sessionStorage.orderId = window['CURRENT_USER'].orderid;
      sessionStorage.orderStatus = window['CURRENT_USER'].orderstatus;
      this.url = '/network-cardmove-overview';
    } else if (this.menu === 'recoveryoverView') {
      sessionStorage.orderId = window['CURRENT_USER'].orderid;
      sessionStorage.orderStatus = window['CURRENT_USER'].orderstatus;
      this.url = '/sne-recovery-overview';
    }
  }
  ngOnDestroy() {
    this.errorMsg.unsubscribe();
  }
}
