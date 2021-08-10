import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortfallAutomationDashboardComponent } from './shortfall-automation-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShortfallAutomationDashboardBarchartComponent } from './shortfall-automation-dashboard-barchart/shortfall-automation-dashboard-barchart.component';

const routes: Routes = [{ path: '', component: ShortfallAutomationDashboardComponent }];



@NgModule({
  declarations: [ShortfallAutomationDashboardComponent, ShortfallAutomationDashboardBarchartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ShortfallAutomationDashboardModule { }
