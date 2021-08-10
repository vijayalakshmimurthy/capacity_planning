import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapacitySummaryReportComponent } from './capacity-summary-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InfoModalCdprComponent } from './info-modal-cdpr/info-modal-cdpr.component';
import { MultiSelectModule } from 'primeng/multiselect';
const routes: Routes = [{ path: '', component: CapacitySummaryReportComponent }];


@NgModule({
  declarations: [CapacitySummaryReportComponent, InfoModalCdprComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DialogModule,
    AccordionModule,
    MultiSelectModule,
    RouterModule.forChild(routes),
  ]
})
export class CapacitySummaryReportModule { }
