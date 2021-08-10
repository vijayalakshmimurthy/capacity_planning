import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPatchPanelReportComponent } from './detailed-patch-panel-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: DetailedPatchPanelReportComponent }];


@NgModule({
  declarations: [DetailedPatchPanelReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class DetailedPatchPanelReportModule { }
