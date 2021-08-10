import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PhaseForecastComponent } from '../phase-forecast/phase-forecast.component';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [{ path: '', component: PhaseForecastComponent}];
@NgModule({
  declarations: [PhaseForecastComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PhaseForecastModule { }

