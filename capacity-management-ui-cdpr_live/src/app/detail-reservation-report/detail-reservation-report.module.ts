import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailReservationReportComponent } from './detail-reservation-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: DetailReservationReportComponent }];


@NgModule({
  declarations: [DetailReservationReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class DetailReservationReportModule { }
