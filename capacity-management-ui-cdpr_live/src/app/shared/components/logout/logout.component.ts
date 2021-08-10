import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
/** This is the shared component for logout funtionality */
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  /** Local varaiable defines here */
  constructor() { }

  ngOnInit() {
  }
  /** Funtion to redirect the siteminder page from login page */
  onNavigation() {
    sessionStorage.removeItem('SRIMS_CURRENT_SESSION');
    sessionStorage.removeItem('SRIMS_SESSION');
    if (window['CURRENT_USER']) {
      window['CURRENT_USER'] = null;
    }
    document.execCommand('ClearAuthenticationCache');
    window.location.href = environment.logout_url;
  }
}
