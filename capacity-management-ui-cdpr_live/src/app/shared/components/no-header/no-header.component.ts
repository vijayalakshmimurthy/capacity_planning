import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

declare const window: any;
// tslint:disable-next-line: max-line-length
const sharedUrl = 'https://btgroupcloud.sharepoint.com/teams/SRIMSNetworkOptimisation/_layouts/15/Doc.aspx?OR=teams&action=edit&sourcedoc={C2D361BE-8BC3-4589-A067-F4DF34B23023}';

@Component({
  selector: 'app-no-header',
  templateUrl: './no-header.component.html',
  styleUrls: ['./no-header.component.scss']
})
export class NoHeaderComponent {

  public contents: Array<any> = [
    { id: 1, title: 'Search uploads', routeValue: '/search-uploads' },
    {
      id: 3, title: 'Plan Migration', child: [
        { id: 31, title: 'Plan Card Move', routeValue: '/port-move'},
        { id: 32, title: 'Backhaul Rearrangement', routeValue: '/backhaul/rearrangement' }
      ]
    },
    {
      id: 4, title: 'Inventory Recovery', child: [
        { id: 41, title: 'Device Recovery', routeValue: '/inventory-recovery/recover-sne-update' },
        { id: 42, title: 'Remove Ends for VPLS', routeValue: '/inventory-recovery/remove' },
        { id: 43, title: 'Cease Backhaul Links', routeValue: '/backhaul/links' }
      ]
    },
    { id: 2, title: 'Reports', routeValue: '/reports' },
  ];

  public userName = 'User';
  public EIN;
  public name;
  switchPopup = false;

  constructor(private router: Router) {
    if (this.EIN === '' || this.EIN === null || this.EIN !== 'undefined') {
      this.EIN = '611856638';
    }
    if (window.hasOwnProperty('CURRENT_USER')) {
      this.EIN = window['CURRENT_USER'].EIN;
    }
    if (this.name === '' || this.name === null || this.name !== 'undefined') {
      this.name = 'Aradhana Songara';
    }
    if (window.hasOwnProperty('CURRENT_USER')) {
      this.name = window['CURRENT_USER'].Name;
    }
  }

  // go to to download user guide
  goToHelp(): void {
    window.open(sharedUrl, '_blank');
  }

  navigateToUrl(value) {
    this.router.navigate(['/']).then(result => { window.location.href = environment.no_url_trackpage + value; });
  }
}
