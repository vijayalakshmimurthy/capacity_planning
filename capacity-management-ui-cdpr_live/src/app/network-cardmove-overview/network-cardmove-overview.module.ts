import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NetworkCardmoveOverviewComponent } from './network-cardmove-overview.component';
import { NetworkCardmoveOverviewHeaderComponent } from './network-cardmove-overview-header/network-cardmove-overview-header.component';
import { OverviewTableComponent } from './overview-table/overview-table.component';
import { CbpcardComponent } from './cbpcard/cbpcard.component';
import { WfmtPopupComponent } from './wfmt-popup/wfmt-popup.component';

const routes: Routes = [{ path: '', component: NetworkCardmoveOverviewComponent}];


@NgModule({
  declarations: [NetworkCardmoveOverviewComponent, NetworkCardmoveOverviewHeaderComponent,
    OverviewTableComponent, CbpcardComponent, WfmtPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  entryComponents: [
    WfmtPopupComponent
  ],
})
export class NetworkCardmoveOverviewModule { }
