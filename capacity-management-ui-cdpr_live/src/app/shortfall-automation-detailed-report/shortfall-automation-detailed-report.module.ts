import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortfallAutomationDetailedReportComponent } from './shortfall-automation-detailed-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ShortfallAutomationDetailedReportComponent }];


@NgModule({
  declarations: [ShortfallAutomationDetailedReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ShortfallAutomationDetailedReportModule { }
