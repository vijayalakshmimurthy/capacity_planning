import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForecastAnalysisComponent } from './forecast-analysis.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: ForecastAnalysisComponent }];

@NgModule({
  declarations: [ForecastAnalysisComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ForecastAnalysisModule { }
