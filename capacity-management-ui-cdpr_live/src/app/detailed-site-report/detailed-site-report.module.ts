import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedSiteReportComponent } from './detailed-site-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { DSRChartViewComponent } from './dsr-chart-view/dsr-chart-view.component';
import { DSRPiechartViewComponent } from './dsr-piechart-view/dsr-piechart-view.component';
import {TreeTableModule} from 'primeng/treetable';

const routes: Routes = [{ path: '', component: DetailedSiteReportComponent }];


@NgModule({
  declarations: [DetailedSiteReportComponent, DSRChartViewComponent, DSRPiechartViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DialogModule,
    AccordionModule,
    TreeTableModule,
    RouterModule.forChild(routes),
  ]
})
export class DetailedSiteReportModule { }
