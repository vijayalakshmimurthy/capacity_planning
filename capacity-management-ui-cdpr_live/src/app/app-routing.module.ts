import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './shared/components/logout/logout.component';

/** This is Routing module whcih takes part for routing in whole application */
export const routes: Routes = [
// tslint:disable-next-line:max-line-length
{ path: 'cabling-and-rack-shortfall-capacity-report', loadChildren: './cabling-and-rack-shortfall-capacity-report/cabling-and-rack-shortfall-capacity-report.module#CablingAndRackShortfallCapacityReportModule' },
{ path: 'capacity-dashboard', loadChildren: './capacity-dashboard/capacity-dashboard.module#CapacityDashboardModule'},
{ path: 'capacity-summary-report', loadChildren: './capacity-summary-report/capacity-summary-report.module#CapacitySummaryReportModule'},
// tslint:disable-next-line:max-line-length
{ path: 'detailed-patch-panel-report', loadChildren: './detailed-patch-panel-report/detailed-patch-panel-report.module#DetailedPatchPanelReportModule' },
// tslint:disable-next-line:max-line-length
{ path: 'detailed-adva-chassis-report', loadChildren: './detailed-adva-chassis-report/detailed-adva-chassis-report.module#DetailedAdvaChassisReportModule' },
// tslint:disable-next-line:max-line-length
{ path: 'detail-reservation-report', loadChildren: './detail-reservation-report/detail-reservation-report.module#DetailReservationReportModule' },
{ path: 'detailed-site-report', loadChildren: './detailed-site-report/detailed-site-report.module#DetailedSiteReportModule' },
{ path: 'detailed-site-reportEdgeRT', loadChildren: './detailed-site-report/detailed-site-report.module#DetailedSiteReportModule' },
{ path: 'detailed-site-reportCoreRT', loadChildren: './detailed-site-report/detailed-site-report.module#DetailedSiteReportModule' },
// tslint:disable-next-line:max-line-length
{ path: 'shortfall-automation-detailed-report', loadChildren: './shortfall-automation-detailed-report/shortfall-automation-detailed-report.module#ShortfallAutomationDetailedReportModule' },
// tslint:disable-next-line:max-line-length
{ path: 'shortfall-automation-dashboard', loadChildren: './shortfall-automation-dashboard/shortfall-automation-dashboard.module#ShortfallAutomationDashboardModule' },
{ path: 'reservation-dashboard', loadChildren: './reservation-dashboard/reservation-dashboard.module#ReservationDashboardModule' },
{ path: 'diversity-report', loadChildren: './diversity-report/diversity-report.module#DiversityReportModule' },
{ path: 'chassis-viewer', loadChildren: './chassis-viewer/chassis-viewer.module#ChassisViewerModule' },
{ path: 'three60-twod', loadChildren: './three60-twod/three60-twod.module#Three60TwodModule' },
{ path: 'capacitybuildplan', loadChildren: './cbp-report/cbp-report.module#CbpReportModule' },
{ path: 'phaseForecast', loadChildren: './phase-forecast/phase-forecast.module#PhaseForecastModule' },
{ path: 'product-line-forecast', loadChildren: './product-line-forecast/product-line-forecast.module#ProductLineForecastModule' },
{ path: 'product-line-forecastEdgeRT', loadChildren: './product-line-forecast/product-line-forecast.module#ProductLineForecastModule' },
{ path: 'product-line-forecastCoreRT', loadChildren: './product-line-forecast/product-line-forecast.module#ProductLineForecastModule' },
{ path: 'optimizationplan', loadChildren: './cbp-report/cbp-report.module#CbpReportModule' },
{ path: 'capacitybuildplanRack', loadChildren: './cbp-report/cbp-report.module#CbpReportModule' },
{ path: 'capacitybuildplancable', loadChildren: './cbp-report/cbp-report.module#CbpReportModule' },
{ path: 'card-move', loadChildren: './netopt-card-move/netopt-card-move.module#NetoptCardMoveModule' },
// tslint:disable-next-line:max-line-length
{ path: 'network-cardmove-overview', loadChildren: './network-cardmove-overview/network-cardmove-overview.module#NetworkCardmoveOverviewModule'},
{ path: 'network-cardmove-summary', loadChildren: './nocardmove-summary/cardmove-summary.module#CardMoveSummaryModule' },
{ path: 'track-progress', loadChildren: './track-progress/track-progress.module#TrackprogressModule' },
{ path: 'forecast-analysis', loadChildren: './forecast-analysis/forecast-analysis.module#ForecastAnalysisModule' },
{ path: 'forecast-management-report', loadChildren: './capacity-summary-report/capacity-summary-report.module#CapacitySummaryReportModule'},
{path: 'sne-recovery', loadChildren: './netopt-sne-recovery/netopt-sne-recovery.module#NetoptSneRecoveryModule'},
{ path: 'sne-recovery-overview', loadChildren: './no-sne-recovery-overview/no-sne-recovery-overview.module#NoSneRecoveryOverviewModule'},
{ path: 'logout', component: LogoutComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
