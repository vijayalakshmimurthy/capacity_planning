import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationDashboardComponent } from './reservation-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReservationDashboardPiechartComponent } from './reservation-dashboard-piechart/reservation-dashboard-piechart.component';

const routes: Routes = [{ path: '', component: ReservationDashboardComponent }];

@NgModule({
  declarations: [ReservationDashboardComponent, ReservationDashboardPiechartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ReservationDashboardModule { }
