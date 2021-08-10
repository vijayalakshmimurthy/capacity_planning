import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DetailedAdvaChassisReportComponent } from './detailed-adva-chassis-report.component';

const routes: Routes = [{ path: '', component: DetailedAdvaChassisReportComponent }];


@NgModule({
  declarations: [DetailedAdvaChassisReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class DetailedAdvaChassisReportModule { }
