import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacityDashboardComponent } from './capacity-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardChartViewComponent } from './dashboard-chart-view/dashboard-chart-view.component';
import { DashboardPieViewComponent } from './dashboard-pie-view/dashboard-pie-view.component';
import { KeyStatsticsComponent } from './key-statstics/key-statstics.component';
const routes: Routes = [{ path: '', component: CapacityDashboardComponent}];

@NgModule({
  declarations: [CapacityDashboardComponent, DashboardChartViewComponent, DashboardPieViewComponent, KeyStatsticsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CapacityDashboardModule { }
